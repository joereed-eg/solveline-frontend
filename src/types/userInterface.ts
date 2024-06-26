import { IPagination } from "./appointmentInterface";
import { IProviderService, ISetSearchHistory, IservicesMetaParams } from "./providerServicesInterface";

export interface IUser {
    countryList:ICountry[];
    userEmail:string;
    verifyEmailLoader:boolean;
    isUserInvited:boolean;
    userProfile:IUserProfile;
    userVerifyToken:string;
    userSignUpLoading:boolean;
    signupSuccess:boolean;
    formEroors:IFormErrors;
    searchServicesFilter:IProviderService[];
    searchHistory:ISetSearchHistory;
    searchServicesFilterLoader:boolean;
    createChannelLoading:boolean;
    sendOtpLoader:boolean;
    editProfileLoader:boolean;
    servicesMetaParams:IservicesMetaParams;
    googleLogin:boolean;
    paymentHistoryData:IPaymentHistoryData[];
    paymentHistoryMetaParams:IPaymentHistoryMetaParams;
    invoiceDownloadLoading:boolean;
    walletHistoryLoader:boolean;
    walletHistoryData:IWalletHistory[]
    walletHistoryMetaParams:IPaymentHistoryMetaParams
  }

  export enum Roles {
    CONSUMER= "consumer",
    COMPANY = "company"
  }
   
  export interface IUserSignup {
    email: string,
    password: string,
    confirm_password: string,
  }
  export interface IUserLogin {
    email: string,
    password: string,
  }
  export interface IGoogleLogin {
    type:string,
    signup_source:string,
    data:{
        access_token: string
    }
  }
  export interface IResendOtp {
    stage?:string,
    email: string,
  }
  export interface IVerifyEmail {
    stage?:string;
    otp: string,
    email: string,
  }
  export interface IForgotPassword {
    stage?:string;
    email?: string,
    verify_token:string,
    password: string,
    password_confirmation: string,
  }

  
  export interface ICountry {
    value: number,
    label: string,
    country_code: string,
  }
  export interface IFormErrors {
    form_errors?:{
      email?: string,
      password?: string,
    }
    message?: string,
  }
  export interface IUserProfile {
    country?: any;
    isAuth?: boolean,
    email?:string,
    id?: number | null,
    name?: string,
    address?: string,
    city?: string,
    mobile_no?: number | null,
    profile_status?: string,
    role?: string,
    status?: string,
    image?:string,
    gender?:string,
    date_of_birth?:any,
    about?:string,
    total_voucher?: number | null,
    parent_user_id?: number | null,
    chat_token?: string,
    approx_consumer_count?: string,
    uuid?: string,
    isProfile?:boolean,
    total_received_amount?:string,
    available_amount?:any,
    wallet_amount?:string,
  }
  export interface IAddProfileImage {
    image:File
  }
  
  export interface IServicesFilter {
    name?: string;
    ratings?: string[];
    availability?: Date | null | string;
    start_price?: number;
    end_price?: number;
    specialization?: string[];
    page?:number;
  }
  
  export interface IPaymentHistoryData {
    amount:string;
    provider_name:string;
    image:string;
    created_at:string;
    id:number;
    service_name:string;
    refund:IRefundPaymentHistory[];
  }

  export interface IRefundPaymentHistory {
    amount:string;
    created_at:string;
    id:number;
  }
  export interface IPaymentHistoryPayload {
    page?:number;
    search?:string;
  }
  export interface IWalletHistory {
    id:number;
    user_id:string;
    amount:string;
    type:string;
    reason:string;
    description:string;
    service_name:string;
    provider_name:string;
    created_at:string;
    youtube_link:string;
    company_image: string;
    company_name:string;
    service_image: string;
    refund:IWalletHistory[]
  }
  
  export interface Image {
    file_link: string;
  }
  export interface IPaymentHistoryMetaParams {
    meta_params:IPagination;
  }