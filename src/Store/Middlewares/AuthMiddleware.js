import { changeTheme, hideLoading, sessionExpired, showAlert, showLoading } from "../Actions/GeneralActions";
import { getUser, isLogin, onUpdateProfile } from "../Actions/AuthAction";
import supabase from "../../config/supabase-client";

export const AuthMiddleware = {

  login: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: params?.email,
            password: params?.password,
          })

          if (error) {
            dispatch(showAlert({ title: 'login', message: error?.message ? error?.message : 'Invalid email or pasword', type: 'Error' }));
            reject(error);
          }

          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select()
            .eq('id', data?.user?.id)
            .single();

          if (profileError) {
            dispatch(showAlert({ title: 'login', message: error?.message ? error?.message : 'Something went wrong', type: 'Error' }));
            reject(error);
          }
          else {
            resolve(true);
            localStorage.setItem("@user", JSON.stringify(profileData));
            localStorage.setItem("@token", data?.session?.access_token);
            dispatch(isLogin(true));
            dispatch(getUser(profileData));
          }
        } catch (error) {
          reject(error);
          dispatch(showAlert({ title: 'login', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  loginWithGoogle: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {

          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });

          if (error) {
            dispatch(showAlert({ title: 'login', message: error?.message ? error?.message : 'Something went wrong', type: 'Error' }));
            reject(error);
          }
        
        
        } catch (error) {
          reject(error);
          dispatch(showAlert({ title: 'login', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  signUp: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const { error } = await supabase.auth.signUp({
            email: params?.email,
            password: params?.password,
            options: {
              data: {
                name: params?.Name,
                bio: params?.bio,
                image: null,
                no_of_snippets: 0
              }
            }
          })

          if (error) {
            dispatch(showAlert({ title: 'signup', message: error?.message, type: 'Success' }));
            reject(error);
          } else {
            resolve(true);
            dispatch(showAlert({ message: 'Account created successfully', type: 'Success' }));
          }


        } catch (error) {
          reject(error);
          dispatch(
            showAlert({ title: 'signUp', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  updateProfile: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const data_to_send = { name: params?.name, bio: params?.bio }
          console.log('params', params.image);

          if (params?.image) {
            const file = params?.image;
            const fileExt = file.name
            const fileName = `${Math.random().toFixed(3)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase
              .storage
              .from('profiles_images')
              .upload(filePath, file);


            if (error) {
              dispatch(showAlert({ title: 'updateProfile', message: error?.message || 'Image upload failed', type: 'Error' }));
              return reject(error);
            }

            try {
              const { data: URLData, error: urlError } = await supabase
                .storage
                .from('profiles_images')
                .getPublicUrl(data?.path);

              data_to_send.image = URLData?.publicUrl;

              if (urlError) {
                console.log('urlError', urlError)
                dispatch(showAlert({ title: 'updateProfile', message: urlError?.message || 'Image upload failed', type: 'Error' }));
                return reject(urlError);
              }
            }
            catch (error) {
              console.log(error);
            }
          }

          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .update(data_to_send)
            .eq('id', params?.user_id)
            .select()

          if (profileError) {
            dispatch(showAlert({
              title: 'updateProfile',
              message: profileError?.message || 'Profile update failed',
              type: 'Error'
            }));
            return reject(profileError);
          }

          const { data: snippetData, error: snippetError } = await supabase
            .from('snippets')
            .update({ created_by: { sub: params?.user_id, ...profileData?.[0] } })
            .eq('user_id', params?.user_id);

          if (snippetError) {
            dispatch(showAlert({
              title: 'updateProfile',
              message: snippetError?.message || 'Something went wrong!',
              type: 'Error'
            }));
            return reject(snippetError);
          }

          console.log('profileData', profileData?.[0]);


          dispatch(onUpdateProfile({ sub: params?.user_id, ...profileData?.[0] }));
          dispatch(showAlert({ message: 'Profile updated successfully', type: 'Success' }));
          resolve(true);

        } catch (error) {
          reject(error);
          dispatch(
            showAlert({ title: 'updateProfile', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },


  logout: () => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          await supabase.auth.signOut();
          localStorage.clear();
          dispatch(getUser(null));
          dispatch(isLogin(false));
          dispatch(sessionExpired(false));
          dispatch(changeTheme(false))
          resolve(true);

        } catch (error) {
          reject(error);
          dispatch(showAlert({ type: "Error", message: "Network error" }));
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

};
