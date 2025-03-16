// import { roles } from "../config/roles";
import Storage from "./AsyncStorage";

export const checkRouteName = (route) => {
  // const role = localStorage.getItem("role");

  const routes = route.split("/");
  
  return routes[0];
};

// export const getHeaders = () => {
//   let token = localStorage.getItem("token");
//   return {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

export const getImagineAPIHeaders = () => {
  let API_KEY = process.env.REACT_APP_IMAGINE_ART_API_KEY;
  return {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
    
  };
};
// export const headers = {
//   config: async () => {
//     let token = await Storage.getToken();
//     return {
//       // timeout: 5000,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   },
//   configRNFetch: async () => {
//     let token = await Storage.getToken();
//     return {
//       // timeout: 5000,
//       headers: {
//         Accept: "*/*",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   },
// };

// export const GlobalDebug = (function () {
//   var savedConsole = console;
//   /**
//    * @param {boolean} debugOn
//    * @param {boolean} suppressAll
//    */
//   return function (debugOn, suppressAll) {
//     var suppress = suppressAll || false;
//     if (debugOn === false) {
//       // supress the default console functionality
//       // console = {};
//       console.log = function () {};
//       // supress all type of consoles
//       if (suppress) {
//         console.info = function () {};
//         console.warn = function () {};
//         console.error = function () {};
//       } else {
//         console.info = savedConsole.info;
//         console.warn = savedConsole.warn;
//         console.error = savedConsole.error;
//       }
//     } else {
//       console = savedConsole;
//     }
//   };
// })();
export const phoneFormat = (text) => {
  var cleaned = ("" + text).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    var intlCode = match[1] ? "+1 " : "",
      number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
        ""
      );
    return number;
  }
  return text;
};
