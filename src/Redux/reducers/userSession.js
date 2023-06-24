import {
  LOGOUT,
  IS_VERIFIED,
  USER_TOKEN,
  SIGNUPRESPONSE,
  AGENT_USER_ID
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  routeToSignIn: true,
  isUserVerified: false,
  token: '',
  userData: '',
  agentId:''
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case LOGOUT:
      return {
        ...state,
        token:'',
        isUserVerified: false,
      };
    case IS_VERIFIED:
      return {
        ...state,
        isUserVerified: action.payload,
      }
    case USER_TOKEN:
      return {
        ...state,
        isUserVerified: true,
        token: action.payload
      };
    case SIGNUPRESPONSE:
      return {
        ...state,
        userData: action.payload
      };
    case AGENT_USER_ID:
      return {
        ...state,
        agentId: action.payload
      };
    default:
      return state;
  }
}
