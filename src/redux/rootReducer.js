import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import studentReducer from "./student/reducer";
import driveReducer from "./drive/reducer";

export default combineReducers({
  auth: authReducer,
  students: studentReducer,
  drives: driveReducer,
});
