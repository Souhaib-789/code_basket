
import ActionTypes from './ActionTypes';

const getUser = payload => {
    return {
        type: ActionTypes.GET_USER,
        payload: payload,
    };
};

const isLogin = payload => {
    
    return {
        type: ActionTypes.IsLogin,
        payload: payload,
    };
};

const onUpdateProfile = payload => {
    return {
        type: ActionTypes.UPDATE_PROFILE,
        payload: payload,
    };
};

const isLogout = payload => {
    
    return {
        type: ActionTypes.IsLogout,
        payload: payload,
    };
};


export {  getUser, isLogin, isLogout, onUpdateProfile };

