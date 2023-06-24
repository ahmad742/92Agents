import {
  postRequest,
  getRequest,
} from '../index';

export const SignUpApi = payload => postRequest(`/signup1`, payload);
export const AccountTypeAPI = payload => postRequest(`/signup2`, payload);
export const VerifyAccountAPI = payload => postRequest(`/signup3`, payload);
export const LoginApi = payload => postRequest(`/login`, payload);
export const ChangePasswordAPI = payload => postRequest(`/changepassword`, payload);
export const GetPersonalBioAPI = payload => postRequest(`/getpersonalbio`, payload);
export const UpdatePersonalBioAPI = payload => postRequest(`/editpersonalbio`, payload);
export const GetSecurityQuesAPI = payload => getRequest(`/getsecurtyquestion`, payload);
export const SecurityQuesAnsAPI = payload => getRequest(`/securtyquestion`, payload);
export const EditProfileAPI = payload => getRequest(`/profilesettings`, payload);
export const AddNotesAPI = payload => postRequest(`/addNotes`, payload);
export const GetNotesAPI = payload => postRequest(`/notes`, payload);
export const GetBookmarks = payload => postRequest(`/getBookmarked`, payload);
export const GetPostDetailsAPI = payload => postRequest(`/getPostDetails`, payload);
export const MyJobsAPI = payload => postRequest(`/buyerPosts`, payload);
export const SearchAgentsAPI = payload => postRequest(`/searchAgentsList`, payload);
export const JobDetailsAPI = payload => postRequest(`/getPostDetails`, payload);
export const GetAllMessagesAPI = payload => postRequest(`/messageslist/get/conversation`, payload);
export const GetAllChatListAPI = payload => postRequest(`messageslist/get/conversation/messages`, payload);
export const ContactUsAPI = payload => postRequest(`contactSend`, payload);
export const SaveCardAPI = payload => postRequest(`saveCard`, payload);
export const ProfilePictureAPI = payload => postRequest(`profilePicture`, payload);
export const ForgotPasswordAPI = payload => postRequest(`forgotPassword`, payload);
export const Send_Message_API = payload => postRequest(`insert/new/messages`, payload);
export const GetMessagesAPI = payload => getRequest(`/messages`, payload);

