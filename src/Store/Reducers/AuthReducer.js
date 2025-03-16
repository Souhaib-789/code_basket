import ActionTypes from "../Actions/ActionTypes";

let initialState = {
  isLogin: null,
  user: {},
};

const AuthReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.IsLogin:
      state = { ...state, isLogin: action.payload };
      break;

    case ActionTypes.GET_USER:
      state = { ...state, user: action.payload };
      break;

    case ActionTypes.IsLogout:
      state = { user: null, isLogin: false };
      break;


    case ActionTypes.UPDATE_PROFILE:
      state = { ...state, user: { ...state.user, ...action.payload } };
      localStorage.setItem("@user", JSON.stringify({ ...state.user, ...action.payload }));
      break;

    default:
      break;
  }
  return state;
};

export default AuthReducer;
