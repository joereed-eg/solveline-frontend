import { ICategory, ICountry, IForgotPassword, IFormErrors, IGoogleLogin, IPaymentHistoryData, IPaymentHistoryMetaParams, IPaymentHistoryPayload, IResendOtp, IServicesFilter, IUserLogin, IUserProfile, IUserSignup, IVerifyEmail, IWalletHistory } from "@/types/userInterface";
import { UserActionTypes, UserActions } from "../action-types/userActionTypes";
import { IProviderService, ISetSearchHistory, IservicesMetaParams } from "@/types/providerServicesInterface";

 

export const setUserEmail = (payload:string): UserActionTypes => ({
    type: UserActions.SET_USER_EMAIL,
    payload
})
export const logoutUser = (): UserActionTypes => ({
    type: UserActions.USER_LOGOUT,
})
export const isUserInvited = (payload:boolean): UserActionTypes => ({
    type: UserActions.IS_USER_INVITED,
    payload
})
export const setFormErrors = (payload:IFormErrors): UserActionTypes => ({
    type: UserActions.SET_FORM_ERRORS,
    payload
})
 
export const getProfileData = (): UserActionTypes => ({
    type: UserActions.GET_PROFILE_DATA,
})
export const setProfileData = (payload:IUserProfile): UserActionTypes => ({
    type: UserActions.SET_PROFILE_DATA,
    payload
})
export const setUserForgotPasswordVerifyToken = (payload:string): UserActionTypes => ({
    type: UserActions.VERIFY_TOKEN,
    payload
})
export const userSignupSuccess = (payload:boolean): UserActionTypes => ({
    type: UserActions.USER_SIGNUP_SUCCESS,
    payload
})
export const userSignup = (payload:IUserSignup): UserActionTypes => ({
    type: UserActions.USER_SIGNUP,
    payload
})
export const userSignupLoding = (payload:boolean): UserActionTypes => ({
    type: UserActions.USER_SIGNUP_LODING,
    payload
})
export const googleLoginLoading = (payload:boolean): UserActionTypes => ({
    type: UserActions.GOOGLE_LOGIN_LOADING,
    payload
})
export const userLogin = (payload:IUserLogin): UserActionTypes => ({
    type: UserActions.USER_LOGIN,
    payload
})
export const userGoogleLogin = (payload:IGoogleLogin): UserActionTypes => ({
    type: UserActions.USER_GOOGLE_LOGIN,
    payload
})
    
export const getCountryList = (): UserActionTypes => ({
    type: UserActions.GET_COUNTRY_LIST,
})
    
export const setCountryList = (payload:ICountry[]): UserActionTypes => ({
    type: UserActions.SET_COUNTRY_LIST,
    payload
})
export const getCategoryList = (): UserActionTypes => ({
    type: UserActions.GET_CATEGORY_LIST,
})
    
export const setCategoryList = (payload:ICategory[]): UserActionTypes => ({
    type: UserActions.SET_CATEGORY_LIST,
    payload
})
    
export const sendOtp = (payload:IResendOtp): UserActionTypes => ({
    type: UserActions.SEND_OTP,
    payload
})
export const sendOtpLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.SEND_OTP_LOADER,
    payload
})
    
export const verifyEmail = (payload:IVerifyEmail): UserActionTypes => ({
    type: UserActions.VERIFY_EMAIL,
    payload
})
export const verifyEmailLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.VERIFY_EMAIL_LOADER,
    payload
})
export const getUserProfile = (payload:number): UserActionTypes => ({
    type: UserActions.GET_USER_PROFILE_DATA,
    payload
})
export const setUserProfile = (payload:IUserProfile): UserActionTypes => ({
    type: UserActions.SET_USER_PROFILE_DATA,
    payload
})
export const forgotPasswordStageOne = (payload:IResendOtp): UserActionTypes => ({
    type: UserActions.FORGOT_PASSWORD_STAGE_ONE,
    payload
})
export const forgotPasswordStageTwo = (payload:IVerifyEmail): UserActionTypes => ({
    type: UserActions.FORGOT_PASSWORD_STAGE_TOW,
    payload
})
export const forgotPasswordStageThree = (payload:IForgotPassword): UserActionTypes => ({
    type: UserActions.FORGOT_PASSWORD_STAGE_THREE,
    payload
})
    
export const userLogout = (): UserActionTypes => ({
    type: UserActions.LOGOUT,
})
    

export const getServicesFilter = (payload:IServicesFilter): UserActionTypes => ({
    type: UserActions.GET_SEARCH_SERVICES_FILTER,
    payload
})

export const setServicesFilter = (payload:IProviderService): UserActionTypes => ({
    type: UserActions.SET_SEARCH_SERVICES_FILTER,
    payload
})
export const setServicesFilterLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.SET_SEARCH_SERVICES_FILTER_LOADER,
    payload
})
export const setSearchHistory = (payload:ISetSearchHistory): UserActionTypes => ({
    type: UserActions.SET_SEARCH_HISTORY,
    payload
})
export const addProfileImage = (payload:File): UserActionTypes => ({
    type: UserActions.ADD_PROFILE_IMAGE,
    payload
})
export const deleteProfileImage = (): UserActionTypes => ({
    type: UserActions.DELETE_PROFILE_IMAGE,
})
export const editProfileImageLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.EDIT_PROFILE_IMAGE_LOADER,
    payload
})
export const setServicesMetaParams = (payload:IservicesMetaParams): UserActionTypes => ({
    type: UserActions.SET_SERVICES_METAPARAMS,
    payload
})
export const resetServicesFilterData = (payload:[]): UserActionTypes => ({
    type: UserActions.RESET_SEARCH_SERVICES_FILTER,
    payload
})
export const getPaymentHistory = (payload:IPaymentHistoryPayload): UserActionTypes => ({
    type: UserActions.GET_PAYMENT_HISTORY,
    payload
})
 
export const setPaymentHistory = (payload:IPaymentHistoryData): UserActionTypes => ({
    type: UserActions.SET_PAYMENT_HISTORY,
    payload
})
export const resetPaymentData = (payload:[]): UserActionTypes => ({
    type: UserActions.RESET_PAYMENT_HISTORY,
    payload
})
export const setPaymentHistoryMetaParams = (payload:IPaymentHistoryMetaParams): UserActionTypes => ({
    type: UserActions.SET_PAYMENT_HISTORY_METAPARAMS,
    payload
})
export const downloadInvoice = (payload:number): UserActionTypes => ({
    type: UserActions.DOWNLOAD_INVOICE,
    payload
})
export const downloadInvoiceLoading = (payload:boolean): UserActionTypes => ({
    type: UserActions.DOWNLOAD_INVOICE_LOADING,
    payload
})



export const getConsumerWalletHistory = (payload:IPaymentHistoryPayload): UserActionTypes => ({
    type: UserActions.GET_CONSUMER_WALLET_HISTORY,
    payload
})
export const setConsumerWalletHistory = (payload:IWalletHistory): UserActionTypes => ({
    type: UserActions.SET_CONSUMER_WALLET_HISTORY,
    payload
})
export const setConsumerWalletLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.SET_CONSUMER_WALLET_HISTORY_LOADER,
    payload
})
export const setConsumerWalletHistoryMetaParams = (payload:IPaymentHistoryMetaParams): UserActionTypes => ({
    type: UserActions.SET_CONSUMER_WALLET_HISTORY_METAPARAMS,
    payload
})
export const resetConsumerWalletData = (payload:[]): UserActionTypes => ({
    type: UserActions.RESET_CONSUMER_WALLET_HISTORY,
    payload
})