import ActionTypes from "./ActionTypes";

const showAlert = (payload) => {
  return {
    type: ActionTypes.SHOW_ALERT,
    payload,
  };
};

const hideAlert = () => {
  return {
    type: ActionTypes.HIDE_ALERT,
  };
};
const showRinging = (payload) => {
  return {
    type: ActionTypes.SHOW_RINGING,
    payload,
  };
};

const hideRinging = () => {
  return {
    type: ActionTypes.HIDE_RINGING,
  };
};
const declineRinging = (payload) => {
  return {
    type: ActionTypes.DECLINE_RINGING,
    payload,
  };
};

const showLoading = () => {
  return {
    type: ActionTypes.SHOW_LOADING,
  };
};

const hideLoading = () => {
  return {
    type: ActionTypes.HIDE_LOADING,
  };
};

const UpdateTheme = (payload) => {
  return {
    type: ActionTypes.UPDATE_THEME,
    payload,
  };
};

const getTypes = (payload) => {
  return {
    type: ActionTypes.GENERAL_TYPES,
    payload,
  };
};

const UpdateTypes = (payload) => {
  return {
    type: ActionTypes.UPDATE_TYPES,
    payload,
  };
};
const sessionExpired = (payload) => {
  return {
    type: ActionTypes.SESSION_EXPIRED,
    payload,
  };
};

const priceFormat = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
};

export {
  showLoading,
  hideLoading,
  showAlert,
  hideAlert,
  UpdateTheme,
  getTypes,
  UpdateTypes,
  showRinging,
  hideRinging,
  declineRinging,
  sessionExpired,
  priceFormat,
};
