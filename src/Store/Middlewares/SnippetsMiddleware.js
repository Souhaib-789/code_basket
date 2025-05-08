import supabase from "../../config/supabase-client";
import { hideLoading, hideUploadingLoading, showAlert, showLoading, showUploadingLoading } from "../Actions/GeneralActions";
import { chatSession } from "../../config/aiModel";
import { deleteSnippet, getMySnippets, getSnippetDetail, getSnippetsList } from "../Actions/SnippetActions";


export const SnippetsMiddleware = {

    uploadCodeSnippet: params => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                dispatch(showUploadingLoading());
                try {

                    const promptWithoutDescription = `Analyze the following code snippet and provide a JSON object with the following keys:\n\n- \"language\": Identify the programming language and, if applicable, the framework used in the code snippet.\n- \"usage_example\": Provide a practical usage example that shows how to use the code, including sample input (only in text description from) and expected output (only in text description from) if applicable.\n\nHere is the code snippet:${params?.snippet} \n\nMake sure your output  is a valid JSON object.\n`
                    const prompt = `Analyze the following code snippet and provide a JSON object with the following keys:\n\n- \"description\": Write a concise explanation of what the code does and its overall purpose.\n- \"language\": Identify the programming language and, if applicable, the framework used in the code snippet.\n- \"usage_example\": Provide a practical usage example that shows how to use the code, including sample input (only in text description from) and expected output (only in text description from) if applicable.\n\nHere is the code snippet:${params?.snippet} \n\nMake sure your output is a valid JSON object.\n`

                    const response = await chatSession.sendMessage(
                        params?.description ? promptWithoutDescription : prompt
                    );

                    const resultText = response?.response?.text();
                    const cleanedResult = resultText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                    let formattedResult;
                    try {
                        formattedResult = JSON.parse(cleanedResult);
                        // console.log(formattedResult)
                    } catch (parseError) {
                        // console.error('Failed to parse JSON:', parseError);
                        dispatch(showAlert({ title: 'Upload Snippet', message: 'Failed to parse JSON', type: 'Error' }));
                    }


                    const dataToSend = {
                        user_id: params?.user_id.toString(),
                        title: params?.title,
                        type: params?.type,
                        description: params?.description ? params?.description : formattedResult?.description,
                        language: formattedResult?.language,
                        framework: formattedResult?.framework,
                        usage_example: formattedResult?.usage_example,
                        snippet: params?.snippet,
                        thumbnail: params?.thumbnail,
                        created_by: params?.created_by
                    }


                    const { data, error } = await supabase
                        .from('snippets')
                        .insert([dataToSend])
                        .single()

                    if (error) {
                        dispatch(showAlert({ title: 'Upload Snippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
                        reject(error)
                    }
                    else {
                        resolve(true)
                    }

                } catch (error) {
                    reject(error);
                    dispatch(showAlert({ title: 'uploadCodeSnippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

                } finally {
                    dispatch(hideUploadingLoading());
                }
            });
        };
    },

    getCodeSnippets: params => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {

                    let query = supabase
                        .from('snippets')
                        .select('id, title, description, language, created_by')
                        .eq('type', params?.snippetType)


                    if (params?.language) { query = query.eq('language', params?.language) }
                    if (params?.search) {
                        query = query.ilike('title', `%${params?.search}%`)
                    }


                    const { data, error } = await query;


                    console.log('data', params);

                    if (error) {
                        dispatch(showAlert({ title: 'Upload Snippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
                        reject(error)
                    }
                    else {
                        resolve(true)
                        dispatch(getSnippetsList(data))
                    }

                } catch (error) {
                    reject(error);
                    dispatch(showAlert({ title: 'getCodeSnippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

                }
            });
        };
    },

    getCodeSnippetsDetail: params => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {

                    const { data, error } = await supabase
                        .from('snippets')
                        .select('*')
                        .eq('id', params?.id)
                        .single();


                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(true)
                        dispatch(getSnippetDetail(data))
                    }

                } catch (error) {
                    reject(error);
                    dispatch(showAlert({ title: 'getCodeSnippetDetail', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

                }
            });
        };
    },

    getMyCodeSnippets: params => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {

                    const { data, error } = await supabase
                        .from('snippets')
                        .select('*')
                        .eq('user_id', params?.id)


                    if (error) {
                        dispatch(showAlert({ title: 'get My Code Snippets', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
                        reject(error)
                    }
                    else {
                        resolve(true)
                        if (data) {
                            dispatch(getMySnippets(data))
                        }
                        // console.log('--------', data)
                    }

                } catch (error) {
                    reject(error);
                    dispatch(showAlert({ title: 'get My Code Snippets', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

                }
            });
        };
    },

    
    deleteCodeSnippet: params => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(showLoading());
                    const { data, error } = await supabase
                        .from('snippets')
                        .delete()
                        .eq('id', params?.id)


                    if (error) {
                        dispatch(showAlert({ title: 'Delete Code Snippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
                        reject(error)
                    }
                    else {
                        resolve(true)
                        dispatch(deleteSnippet(params?.id))
                    }

                } catch (error) {
                    reject(error);
                    dispatch(showAlert({ title: 'Delete Code Snippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
                }
                finally {
                    dispatch(hideLoading());
                }
            });
        };
    },

    // uploadCodeSnippet: params => {
    //     return dispatch => {
    //         dispatch(showLoading());
    //         return new Promise(async (resolve, reject) => {
    //             try {

    //                 // const formData = new FormData();
    //                 // formData.append('prompt', 'a clean and modern website user interface element to picking a set of three radio buttons. The first button should be selected and filled with a blue dot. The other two are empty circles. The layout should be simple with a white background.');
    //                 // formData.append('style', 'imagine-turbo');
    //                 // formData.append('aspect_ratio', '1:1');

    //                 // axios.post(IMAGINE_ART_API, formData, getImagineAPIHeaders())
    //                 //     .then(response => {
    //                 //         // fsreact.writeFile('output.jpg', response.data);
    //                 //         // const imageUrl = Buffer.from(response.data, 'binary').toString('base64');
    //                 //         const imageUrl = URL.createObjectURL(response.data);
    //                 //         console.log('Base64 image:', imageUrl);
    //                 //         resolve(imageUrl)
    //                 //     })
    //                 //     .catch(error => {
    //                 //         reject(error);
    //                 //         console.error('Error:', error.response ? error.response.data : error.message);
    //                 //     });



    //                 // const { data, error } = await supabase
    //                 //     .from('snippets')
    //                 //     .insert([params])
    //                 //     .single()

    //                 // if (error) {
    //                 //     dispatch(showAlert({ title: 'Upload Snippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));
    //                 //     reject(error)
    //                 // }
    //                 // else {
    //                 //     resolve(imageUrl)
    //                 // }

    //             } catch (error) {
    //                 reject(error);
    //                 dispatch(showAlert({ title: 'uploadCodeSnippet', message: error?.message ? error?.message : 'Something went wrong!', type: 'Error' }));

    //             } finally {
    //                 dispatch(hideLoading());
    //             }
    //         });
    //     };
    // },



};
