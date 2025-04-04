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

const showUploadingLoading = () => {
  return {
    type: ActionTypes.SHOW_UPLOADING_LOADING,
  };
};

const hideUploadingLoading = () => {
  return {
    type: ActionTypes.HIDE_UPLOADING_LOADING,
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
  showUploadingLoading,
  hideUploadingLoading,
  sessionExpired,
  priceFormat,
};
