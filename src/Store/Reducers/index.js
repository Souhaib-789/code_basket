
import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import GeneralReducer from "./GeneralReducer";
import SnippetReducer from "./SnippetReducer";

// const eventPlanPersistConfig = {
//   key: "root",
//   storage: storage,
//   whitelist: [
//     "EventPlanningReducer",
//     "GuestReducer",
//     "EventReducer",
//     "AuthReducer",
//   ],
// };

const AppReducers = combineReducers({
  GeneralReducer,
  AuthReducer,
  SnippetReducer
});

const Reducer = (state, action) => {
  if (action.type === "IsLogout") {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};
// const persistedReducer = persistReducer(eventPlanPersistConfig, Reducer);

export default Reducer;
