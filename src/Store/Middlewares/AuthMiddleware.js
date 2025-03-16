import { hideLoading, sessionExpired, showAlert, showLoading } from "../Actions/GeneralActions";
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

  // GeneralType: () => {
  //   return (dispatch) => {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const data = await Axios.get(Apis.getAllTypes);
  //         if (data?.status == 200) {
  //           resolve(data?.data?.data);
  //           dispatch(getTypes(data?.data?.data));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "GeneralType",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       }
  //     });
  //   };
  // },

  // login: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userdata?.email);
  //         formdata.append("password", userdata?.password);
  //         formdata.append("role", userdata?.role);
  //         formdata.append("device_id", userdata?.deviceID);
  //         const data = await Axios.post(Apis.login, formdata);
  //         if (data?.status == 200) {
  //           const encodedData = JSON.parse(atob(data?.data?.data));
  //           Storage.setToken(encodedData?.token);
  //           Storage.setUser("@user", JSON.stringify(encodedData));
  //           Storage.setERole("@role", JSON.stringify(encodedData?.role));
  //           Storage.setRole("role", JSON.stringify(encodedData?.role));
  //           dispatch(getUser(encodedData));
  //           dispatch(isLogin(true));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "login",
  //             message: error?.response?.data?.message
  //               ? error?.response?.data?.message
  //               : error.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // Sociallogin: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userdata?.email);
  //         formdata.append("first_name", userdata?.given_name);
  //         formdata.append("last_name", userdata?.family_name);
  //         // formdata.append("device_id", userdata?.deviceID);
  //         formdata.append("role", userdata?.role);
  //         const data = await Axios.post(Apis.social_login, formdata);
  //         if (data?.status == 200) {
  //           const encodedData = data?.data?.data;
  //           Storage.setToken(encodedData?.token);
  //           Storage.setUser("@user", JSON.stringify(encodedData));
  //           Storage.setERole("@role", JSON.stringify(encodedData?.role));
  //           Storage.setRole("role", JSON.stringify(encodedData?.role));
  //           dispatch(getUser(encodedData));
  //           dispatch(isLogin(true));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "Sociallogin",
  //             message: error?.response?.data?.message
  //               ? error?.response?.data?.message
  //               : "Internal error",
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },
  // getUserData: () => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const data = await Axios.get(
  //           Apis.getUserData,
  //           await headers.config()
  //         );
  //         if (data?.status == 200) {
  //           const encodedData = JSON.parse(atob(data?.data?.data));
  //           Storage.setUser("@user", JSON.stringify(encodedData));
  //           dispatch(getUser(encodedData));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "login",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },
  // onChangeNotification: () => {
  //   return (dispatch) => {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         dispatch(showLoading());
  //         const data = await Axios.get(
  //           Apis.updateNotificationSetting,
  //           await headers.config()
  //         );
  //         if (data?.status == 200) {
  //           Storage.setUser("@user", JSON.stringify(data?.data?.data));
  //           dispatch(getUser(data?.data?.data));
  //           resolve(true);
  //         }
  //       } catch (error) {
  //         reject(error);
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // signUp: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("first_name", userdata.first_name);
  //         formdata.append("last_name", userdata.last_name);
  //         formdata.append("email", userdata.email);
  //         formdata.append("contact_no", userdata.contact_no);
  //         formdata.append("password", userdata.password);
  //         formdata.append("confirm_password", userdata.confirm_password);
  //         formdata.append("role", userdata.role);
  //         if (userdata.dob) formdata.append("dob", userdata.dob);
  //         if (userdata.gender) formdata.append("gender", userdata.gender);
  //         if (userdata.vendor_type)
  //           formdata.append("vendor_type", userdata.vendor_type);
  //         if (userdata.company_name)
  //           formdata.append("company_name", userdata.company_name);
  //         if (userdata.experience)
  //           formdata.append("experience", userdata.experience);
  //         if (userdata.service_id)
  //           formdata.append("service_id", userdata.service_id);
  //         if (userdata.company_image)
  //           formdata.append("company_image", userdata.company_image);

  //         const data = await Axios.post(Apis.signup, formdata);

  //         if (data?.status == 200) {
  //           resolve(true);
  //           dispatch(
  //             showAlert({
  //               title: "signup",
  //               message: data?.data?.message,
  //               type: "Success",
  //               status: data?.status,
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "signUp",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // logout: () => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const data = await Axios.get(Apis.logout, await headers.config());
  //         if (data) {
  //           resolve(true);
  //         }
  //       } catch (error) {
  //         if (error.message == "Request failed with status code 401") {
  //           resolve(true);
  //         } else {
  //           reject(error);
  //         }
  //       } finally {
  //         dispatch(hideLoading());
  //         resolve(true);
  //         Storage.clearStorage();
  //         dispatch(isLogout());
  //       }
  //     });
  //   };
  // },

  // forgetPassword: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userdata?.email);
  //         const data = await Axios.post(Apis.forgotPassword, formdata);
  //         if (data?.status == 200) {
  //           resolve(data?.data);
  //         }
  //       } catch (error) {
  //         dispatch(
  //           showAlert({
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //           })
  //         );
  //         reject(error);
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },
  // verifyCode: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("id", userdata?.id);
  //         formdata.append("code", userdata?.code);
  //         const data = await Axios.post(Apis.verifyCode, formdata);
  //         if (data?.status == 200) {
  //           resolve(data?.data);
  //           dispatch(
  //             showAlert({
  //               message: data?.data?.message,
  //               type: "Success",
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         dispatch(
  //           showAlert({
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //           })
  //         );
  //         reject(error);
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // changePassword: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("token", userdata?.token);
  //         formdata.append("email", userdata?.email);
  //         formdata.append("password", userdata?.newPassword);
  //         formdata.append("confirm_password", userdata?.confirmPassword);
  //         const data = await Axios.post(Apis.changePassword, formdata);
  //         if (data?.status == 200) {
  //           resolve(true);
  //           dispatch(
  //             showAlert({
  //               title: "Change password",
  //               message: data?.data?.message,
  //               type: "Success",
  //               status: data?.status,
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // updatePassword: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("old_password", userdata?.currentPassword);
  //         formdata.append("new_password", userdata?.newPassword);
  //         formdata.append("confirm_password", userdata?.confirmPassword);
  //         const data = await Axios.post(
  //           Apis.updatePassword,
  //           formdata,
  //           await headers.config()
  //         );
  //         if (data?.status == 200) {
  //           resolve(true);
  //           dispatch(
  //             showAlert({
  //               title: "Update password",
  //               message: data?.data?.message,
  //               type: "Success",
  //               status: data?.status,
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "Update password",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // contactUs: (userdata) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userdata?.email);
  //         formdata.append("query_title", userdata?.query_title);
  //         formdata.append("message", userdata?.message);
  //         const data = await Axios.post(
  //           Apis.contactUs,
  //           formdata,
  //           await headers.config()
  //         );

  //         if (data?.status == 200) {
  //           resolve(true);
  //           dispatch(
  //             showAlert({
  //               title: "contactUs",
  //               message: data?.data?.message,
  //               type: "Success",
  //               status: 200,
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "contactUs",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },
  // UpdateRole: ({ user_id, role }) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("user_id", user_id);
  //         formdata.append("role", role);

  //         const data = await Axios.post(
  //           Apis.updateRole,
  //           formdata,
  //           await headers.config()
  //         );
  //         if (data?.status == 200) {
  //           resolve(data?.data);
  //           dispatch(
  //             showAlert({
  //               title: "UpdateRole",
  //               message: data?.data?.message,
  //               type: "Success",
  //               status: 200,
  //             })
  //           );
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             title: "UpdateRole",
  //             message: error?.response?.data?.message,
  //             type: "Error",
  //             status: error?.response?.status,
  //           })
  //         );
  //       } finally {
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },
  // /Muneeeb code:
  // Login: (userData) => {
  //   return (dispatch) => {
  //     // dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         // let formdata = new FormData();
  //         // formdata.append("email", userData?.email);
  //         // formdata.append("password", userData?.password);
  //         // // formdata.append('device_id', userData?.DeviceToken);
  //         // formdata.append("role", userData?.role);
  //         // const { data } = await Axios.post(Apis.login, formdata);
  //         // if (data?.success) {
  //         localStorage.setItem("token", "data?.data?.token");
  //         localStorage.setItem("@user", "JSON.stringify(data?.data)");
  //         localStorage.setItem("role", userData);
  //         dispatch(getUser({ name: "michel" }));
  //         dispatch(isLogin(true));
  //         // dispatch(
  //         //   isLogin({ isLogin: true, userData: { name: "michel" } })
  //         // );
  //         //   dispatch(hideLoading());
  //         // } else {
  //         //   dispatch(hideLoading());
  //         //   dispatch(
  //         //     showAlert({ type: "error", message: data?.message })
  //         //   );
  //         // }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(showAlert({ type: "Error", message: "Network error" }));
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  logout: () => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          localStorage.clear();
          dispatch(getUser(null));
          dispatch(isLogin(false));
          dispatch(sessionExpired(false));
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

  // getUserInfo: () => {
  //   return (dispatch) => {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const { data } = await Axios.get(Apis.getUserInfo, {
  //           headers: headers.config(),
  //         });
  //         if (data?.success) {
  //           localStorage.setItem("@user", JSON.stringify(data?.data));
  //           dispatch(getUser(data?.data));
  //         } else {
  //           dispatch(showAlert({ type: "Error", message: data?.message }));
  //         }
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   };
  // },

  // UpdateProfile: (userData) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();

  //         if (userData?.pickImage) {
  //           formdata.append("profile_image", userData?.pickImage);
  //         }
  //         formdata.append("first_name", userData?.Firstname);
  //         formdata.append("last_name", userData?.Lastname);
  //         formdata.append("contact_no", userData?.ContactNumber);
  //         for (const [i, document] of userData?.MultipleAddress.entries()) {
  //           if (document?.street) {
  //             formdata.append(`addresses[${i}][street]`, document?.street);
  //           } else {
  //             formdata.append(`addresses[${i}][street]`, null);
  //           }
  //           if (document?.state) {
  //             formdata.append(`addresses[${i}][state]`, document?.state);
  //           } else {
  //             formdata.append(`addresses[${i}][state]`, null);
  //           }
  //           if (document?.zipcode) {
  //             formdata.append(`addresses[${i}][zipcode]`, document?.zipcode);
  //           } else {
  //             formdata.append(`addresses[${i}][zipcode]`, null);
  //           }
  //           if (document?.id) {
  //             formdata.append(`addresses[${i}][address_id]`, document?.id);
  //           }
  //         }
  //         formdata.append("category_id", userData?.selectedCategory);
  //         // userData?.StartTime
  //         //   ? formdata.append("working_start_time", userData?.StartTime)
  //         //   : formdata.append("working_start_time", null);
  //         // userData?.EndTime
  //         //   ? formdata.append("working_end_time", userData?.EndTime)
  //         //   : formdata.append("working_end_time", null);
  //         // formdata.append('profile_image', null);

  //         const { data } = await Axios.post(Apis.updateProfile, formdata, {
  //           headers: headers.config(),
  //         });
  //         if (data?.success) {
  //           resolve(data);
  //           localStorage.setItem("@user", JSON.stringify(data?.data));
  //           dispatch(getUser(data?.data));
  //           dispatch(hideLoading());
  //         } else {
  //           dispatch(hideLoading());
  //           dispatch(showAlert({ type: "Success", message: data?.message }));
  //           // Alert.alert('Note', data?.message);
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(showAlert({ type: "Warning", message: "Network Error" }));
  //         // alert('Network Error');
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // ForgotPassword: (userData) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userData?.email);
  //         const { data } = await Axios.post(Apis.forgotPassword, formdata);
  //         if (data?.success) {
  //           resolve(data);
  //           dispatch(hideLoading());
  //           dispatch(showAlert({ type: "Success", message: data?.message }));
  //         } else {
  //           dispatch(hideLoading());
  //           // Alert.alert('Note', data?.message);
  //           dispatch(showAlert({ type: "Warning", message: data?.message }));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(showAlert({ type: "Warning", message: "Network error" }));
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // ConfirmPassword: (userData) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("email", userData?.Email);
  //         formdata.append("password", userData?.Password);
  //         formdata.append("confirm_password", userData?.ConfirmPassword);

  //         const { data } = await Axios.post(Apis.change_password, formdata);
  //         if (data?.success) {
  //           resolve(data);
  //           dispatch(hideLoading());
  //         } else {
  //           dispatch(hideLoading());
  //           // Alert.alert('Note', data?.message);
  //           dispatch(showAlert({ type: "warning", message: data?.message }));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(showAlert({ type: "warning", message: "Network Error" }));
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // updatePassword: (userData) => {
  //   return (dispatch) => {
  //     dispatch(showLoading());
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let formdata = new FormData();
  //         formdata.append("old_password", userData?.old_password);
  //         formdata.append("new_password", userData?.new_password);
  //         formdata.append("confirm_password", userData?.confirm_password);

  //         const { data } = await Axios.post(
  //           Apis.updatePassword,
  //           formdata,
  //           await headers.config()
  //         );
  //         if (data?.success) {
  //           resolve(data);
  //           dispatch(hideLoading());
  //           dispatch(showAlert({ type: "Success", message: data?.message }));
  //         } else {
  //           dispatch(hideLoading());
  //           dispatch(showAlert({ type: "Warning", message: data?.message }));
  //         }
  //       } catch (error) {
  //         reject(error);
  //         dispatch(
  //           showAlert({
  //             type: "Error",
  //             message: error?.response?.data?.message,
  //           })
  //         );
  //         dispatch(hideLoading());
  //       }
  //     });
  //   };
  // },

  // /Muneeeb code:
};
