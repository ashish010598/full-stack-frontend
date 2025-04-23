import * as types from "./types";

const initialState = {
  loading: false,
  token: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.RESET_STATE: {
      return {
        ...state,
        loading: false,
        token: null,
        error: null,
      };
    }
    default:
      return state;
  }
}
