import { notification } from "antd";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const AlertComp = () => {
  const alert = useSelector((state) => state.GeneralReducer.alertOptions);
  const [api, contextHolder] = notification.useNotification();

  const firstUpdate = useRef(true);
//   console.log("alert", alert);
  useEffect(() => {
    if (!firstUpdate.current) {
      api.open({
        message: alert?.message ? alert?.message : "Network Error",
        duration: 2,
        type: alert?.type?.toLowerCase(),
        placement: "top",
        key: "updatable",
        // onClose: () => dispatch(hideAlert()),
      });
    } else {
      firstUpdate.current = false;
    }
  }, [alert]);

  return contextHolder;
};

export default AlertComp;
