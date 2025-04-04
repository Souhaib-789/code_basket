import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  showAlert: false,
  alertOptions: null,
  loading: false,
  uploadingLoading: false,

  sessionExpired: false,
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SESSION_EXPIRED:
      state = { ...state, sessionExpired: false };
      break;

    case ActionTypes.SHOW_ALERT:
      state = { ...state, showAlert: true, alertOptions: action.payload, sessionExpired: action.payload?.status == 401 ? true : false };
      break;

    case ActionTypes.HIDE_ALERT:
      state = { ...state, showAlert: false, alertOptions: null };
      break;

    case ActionTypes.SHOW_UPLOADING_LOADING:
      state = { ...state, uploadingLoading: true };
      break;

    case ActionTypes.HIDE_UPLOADING_LOADING:
      state = { ...state, uploadingLoading: false };
      break;


    case ActionTypes.SHOW_LOADING:
      state = { ...state, loading: true };
      break;

    case ActionTypes.HIDE_LOADING:
      state = { ...state, loading: false };
      break;


    default:
      break;
  }
  return state;
};

export default GeneralReducer;
