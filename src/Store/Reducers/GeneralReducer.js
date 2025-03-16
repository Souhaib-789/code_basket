import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  showAlert: false,
  alertOptions: null,
  loading: false,
  GeneralTypes: null,
  showRinging: false,
  ringingOptions: null,
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
    case ActionTypes.SHOW_RINGING:
      state = { ...state, showRinging: true, ringingOptions: action.payload };
      break;
    case ActionTypes.DECLINE_RINGING:
      state = { ...state, showRinging: false, ringingOptions: action.payload };
      break;

    case ActionTypes.HIDE_RINGING:
      state = { ...state, showRinging: false, ringingOptions: null };
      break;

    case ActionTypes.SHOW_LOADING:
      state = { ...state, loading: true };
      break;

    case ActionTypes.HIDE_LOADING:
      state = { ...state, loading: false };
      break;

    case ActionTypes.GENERAL_TYPES:
      state = { ...state, GeneralTypes: action.payload };
      break;

    case ActionTypes.UPDATE_TYPES:
      state = { ...state, GeneralTypes: { ...state?.GeneralTypes, ...action.payload } };
      break;

    default:
      break;
  }
  return state;
};

export default GeneralReducer;
