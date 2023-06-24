//auth actions...
import {
  LOGOUT,
  USER_TOKEN,
  IS_VERIFIED,
  SIGNUPRESPONSE,
  AGENT_USER_ID
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})

export const userToken = (payload) => ({
  type: USER_TOKEN,
  payload,
});
export const isVerified = (payload) => ({
  type: IS_VERIFIED,
  payload
})
export const signUpResponse = (payload) => ({
  type: SIGNUPRESPONSE,
  payload
})
export const agentuserroleID = (payload) => ({
  type: AGENT_USER_ID,
  payload
})

