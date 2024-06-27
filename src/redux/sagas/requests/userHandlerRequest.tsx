import { api } from "@/api-config/api";
import { IPaymentHistoryPayload } from "@/types/userInterface";
import { IForgotPassword, IResendOtp, IServicesFilter, IUserLogin, IUserProfile, IUserSignup, IVerifyEmail } from "@/types/userInterface";

export const userSignupApi = async (data: IUserSignup) => {
    return await api.post(`auth/signup`, data);
};
export const userLoginApi = async (data: IUserLogin) => {
    return await api.post(`auth/login`, data);
};
export const userGoogleLoginApi = async (data: IUserLogin) => {
    return await api.post(`auth/social-signup`, data);
};
export const getCountryListApi = async () => {
    return await api.get(`country-list`);
};
export const getCategoryListApi = async () => {
    return await api.get(`category-list`);
};
export const resendOtpApi = async (data: IResendOtp) => {
    return await api.post(`auth/resend-OTP`, data);
};
export const verifyEmailApi = async (data: IVerifyEmail) => {
    return await api.post(`auth/verify-email`, data);
};
export const forgotPasswordStageOneApi = async (data: IResendOtp) => {
    return await api.post(`auth/forgot-password`, data);
};
export const forgotPasswordStageTwoApi = async (data: IVerifyEmail) => {
    return await api.post(`auth/forgot-password`, data);
};
export const forgotPasswordStageThreeApi = async (data: IForgotPassword) => {
    return await api.post(`auth/forgot-password`, data);
};

export const getSearchServicesFilteApi = async (data: IServicesFilter) => {
    const availabilityCheck = data?.availability === "Invalid date" ? "" : data?.availability;
    return await api.get(`services?page=${data?.page}&name=${data?.name}&category=${data?.category}&ratings=${data?.ratings}&availability=${availabilityCheck}&start_price=${data?.start_price}&end_price=${data?.end_price}`);
};
export const userProfileApi = async (data: IUserProfile) => {
    let profilePayload = {
        name: data?.name,
        email: data?.email,
        address: data?.address,
        gender: data?.gender,
        date_of_birth: data?.date_of_birth,
        country: data?.country.id ? data?.country.id : data?.country,
        about: data?.about,
    }
    return await api.put(`profile`, profilePayload);
};
export const getProfileApi = async () => {
    return await api.get(`profile`);
};

export const addProfileImageApi = async (image: File) => {
    return await api.post(`profile/add-profile-image`,
        {
            image: image
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};

export const deleteProfileImageApi = async (image: File) => {
    return await api.get(`profile/delete-profile-image`,);
};


export const getPaymentHistoryApi = async (data:IPaymentHistoryPayload) => {
    return await api.get(`payment-history?page=${data?.page}`);
};
export const downloadInvoiceApi = async (id:number) => {
    return await api.get(`invoice?id=${id}`);
};

export const getWalletHistoryApi = async (data:IPaymentHistoryPayload) => {
    return await api.get(`consumer/wallet-history?page=${data?.page}&search=${data?.search}`);
};
export const userLogoutApi = async () => {
    return await api.get(`logout`);
};