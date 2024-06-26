export interface UserActionTypes {
  type: UserActions;
  payload?: any;
}
export enum UserActions {
  SET_USER_EMAIL = "SET_USER_EMAIL",
  LOGOUT = "LOGOUT",
  IS_USER_INVITED = "IS_USER_INVITED",
  SET_FORM_ERRORS = "SET_FORM_ERRORS",
  VERIFY_TOKEN = "VERIFY_TOKEN",
  USER_SIGNUP = "USER_SIGNUP",
  USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS",
  USER_SIGNUP_LODING = "USER_SIGNUP_LODING",
  SET_PROFILE_DATA = "SET_PROFILE_DATA",
  GET_PROFILE_DATA = "GET_PROFILE_DATA",
  USER_LOGIN = "USER_LOGIN",
  GET_COUNTRY_LIST = "GET_COUNTRY_LIST",
  SET_COUNTRY_LIST = "SET_COUNTRY_LIST",
  SEND_OTP = "SEND_OTP",
  SEND_OTP_LOADER = "SEND_OTP_LOADER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  VERIFY_EMAIL_LOADER = "VERIFY_EMAIL_LOADER",
  GET_USER_PROFILE_DATA = "GET_USER_PROFILE_DATA",
  SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA",
  FORGOT_PASSWORD_STAGE_ONE = "FORGOT_PASSWORD_STAGE_ONE",
  FORGOT_PASSWORD_STAGE_TOW = "FORGOT_PASSWORD_STAGE_TWO",
  FORGOT_PASSWORD_STAGE_THREE = "FORGOT_PASSWORD_STAGE_THREE",
  
  GET_SEARCH_SERVICES_FILTER = "GET_SEARCH_SERVICES_FILTER",
  SET_SEARCH_SERVICES_FILTER_LOADER = "SET_SEARCH_SERVICES_FILTER_LOADER",
  SET_SEARCH_SERVICES_FILTER = "SET_SEARCH_SERVICES_FILTER",
  RESET_SEARCH_SERVICES_FILTER = "RESET_SEARCH_SERVICES_FILTER",
  SET_SERVICES_METAPARAMS = "SET_SERVICES_METAPARAMS",
  SET_SEARCH_HISTORY = "SET_SEARCH_HISTORY",


  ADD_PROFILE_IMAGE = "ADD_PROFILE_IMAGE",
  DELETE_PROFILE_IMAGE = "DELETE_PROFILE_IMAGE",
  EDIT_PROFILE_IMAGE_LOADER = "EDIT_PROFILE_IMAGE_LOADER",

  USER_GOOGLE_LOGIN = "USER_GOOGLE_LOGIN",
  GOOGLE_LOGIN_LOADING = "GOOGLE_LOGIN_LOADING",
  USER_LOGOUT = "USER_LOGOUT",

  GET_PAYMENT_HISTORY = "GET_PAYMENT_HISTORY",
  SET_PAYMENT_HISTORY = "SET_PAYMENT_HISTORY",
  RESET_PAYMENT_HISTORY = "RESET_PAYMENT_HISTORY",
  SET_PAYMENT_HISTORY_METAPARAMS = "SET_PAYMENT_HISTORY_METAPARAMS",
  
  GET_CONSUMER_WALLET_HISTORY= "GET_CONSUMER_WALLET_HISTORY",
  SET_CONSUMER_WALLET_HISTORY= "SET_CONSUMER_WALLET_HISTORY",
  SET_CONSUMER_WALLET_HISTORY_LOADER= "SET_CONSUMER_WALLET_HISTORY_LOADER",
  SET_CONSUMER_WALLET_HISTORY_METAPARAMS= "SET_CONSUMER_WALLET_HISTORY_METAPARAMS",
  RESET_CONSUMER_WALLET_HISTORY= "RESET_CONSUMER_WALLET_HISTORY",


  DOWNLOAD_INVOICE = "DOWNLOAD_INVOICE",
  DOWNLOAD_INVOICE_LOADING = "DOWNLOAD_INVOICE_LOADING",
}
