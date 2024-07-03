import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { addProfileImageApi, deleteProfileImageApi, downloadInvoiceApi, forgotPasswordStageOneApi, forgotPasswordStageThreeApi, forgotPasswordStageTwoApi, getCategoryListApi, getCountryListApi, getPaymentHistoryApi, getProfileApi, getSearchServicesFilteApi, getWalletHistoryApi, resendOtpApi, userGoogleLoginApi, userLoginApi, userLogoutApi, userProfileApi, userSignupApi, verifyEmailApi } from '../requests/userHandlerRequest';
import { UserActionTypes, UserActions } from '@/redux/action-types/userActionTypes';
import { toast } from 'react-toastify';
import router from 'next/router';
import { downloadInvoiceLoading, editProfileImageLoader, googleLoginLoading, sendOtp, sendOtpLoader, setCategoryList, setConsumerWalletHistory, setConsumerWalletHistoryMetaParams, setConsumerWalletLoader, setCountryList, setFormErrors, setPaymentHistory, setPaymentHistoryMetaParams, setSearchHistory, setServicesFilter, setServicesFilterLoader, setServicesMetaParams, setUserEmail, setUserForgotPasswordVerifyToken, setUserProfile, userSignupLoding, verifyEmailLoader } from '@/redux/actions/userActionTypes';
import { IResendOtp, IUserProfile } from '@/types/userInterface';
import { api } from '@/api-config/api';
import { appointmentListLoader } from '@/redux/actions/appointmentActions';


function* userSignupHandler(action: UserActionTypes) {
    yield put(userSignupLoding(true));
    try {
        const { data } = yield call(userSignupApi, action.payload);
        if (data.status) {
            yield put(setUserEmail(data?.data?.user?.email))
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            if (data?.data?.access_token?.length > 0) {
                yield localStorage.setItem("access_token", data?.data?.access_token);
                yield (api.defaults.headers.common = {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                });
                const userPorfile: IUserProfile = {
                    isAuth: true,
                    email: data?.data?.user?.email,
                    address: data?.data?.user?.address,
                    id: data?.data?.user?.id,
                    mobile_no: data?.data?.user?.mobile,
                    name: data?.data?.user?.name,
                    profile_status: data?.data?.user?.profile_status,
                    role: data?.data?.user?.role,
                    status: data?.data?.user?.status,
                    image: data?.data?.user?.image,
                    approx_consumer_count: data?.data?.user?.approx_consumer_count,
                    total_voucher: data?.data?.user?.total_voucher,
                    chat_token: data?.data?.user?.chat_token,
                    country: data?.data?.user?.country,
                    date_of_birth: data?.data?.user?.date_of_birth,
                    about: data?.data?.user?.about,
                    gender: data?.data?.user?.gender,
                    parent_user_id:data?.data?.user?.parent_user_id,
                    uuid: data?.data?.user?.uuid,
                    wallet_amount:data?.data?.user?.wallet_amount,
                    available_amount:data?.data?.user?.available_amount,
                }
                yield put(setUserProfile(userPorfile))
                yield put({ type: UserActions.USER_SIGNUP_SUCCESS, payload: true });
            } else {
                router.push(`/verify-email`);
            }

        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
        yield put(userSignupLoding(false));
    } finally {
        // yield put(userSignupLoding(false));
        yield put(userSignupLoding(false));
    }
}

function* userLoginHandler(action: UserActionTypes) {
    yield put(userSignupLoding(true));
    try {
        const { data } = yield call(userLoginApi, action.payload);
        if (data.status) {
            yield localStorage.setItem("access_token", data?.data?.access_token);
            yield (api.defaults.headers.common = {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            });
            yield put(setUserEmail(data?.data?.user?.email))
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.user?.email,
                address: data?.data?.user?.address,
                id: data?.data?.user?.id,
                mobile_no: data?.data?.user?.mobile,
                name: data?.data?.user?.name,
                profile_status: data?.data?.user?.profile_status,
                role: data?.data?.user?.role,
                status: data?.data?.user?.status,
                image: data?.data?.user?.image,
                approx_consumer_count: data?.data?.user?.approx_consumer_count,
                total_voucher: data?.data?.user?.total_voucher,
                chat_token: data?.data?.user?.chat_token,
                country: data?.data?.user?.country,
                date_of_birth: data?.data?.user?.date_of_birth,
                about: data?.data?.user?.about,
                gender: data?.data?.user?.gender,
                parent_user_id:data?.data?.user?.parent_user_id,
                uuid: data?.data?.user?.uuid,
                wallet_amount:data?.data?.user?.wallet_amount,
                available_amount:data?.data?.user?.available_amount,
            }
            yield put(setUserProfile(userPorfile))
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            if (data?.data?.user?.profile_status === "incomplete") {
                yield call(router.push, `/personalinformation`);
            } else if (data?.data?.user?.profile_status === "complete") {
                yield call(router.push, `/`);
            }
        } else {
            yield put(setFormErrors(data?.errors))
        }
    } catch (error: any) {
        if (error?.response?.data.errors.code === 'ERR009') {
            yield put(setUserEmail(action.payload.email))
            let resendOtp: IResendOtp = {
                email: action?.payload?.email
            }
            yield put(sendOtp(resendOtp))
        }
        yield put(setFormErrors(error?.response?.data.errors))

    } finally {
        yield delay(1000)
        yield put(userSignupLoding(false));
    }
}
function* userGoogleLoginHandler(action: UserActionTypes) {
    yield put(googleLoginLoading(true));
    try {
        const { data } = yield call(userGoogleLoginApi, action.payload);
        if (data.status) {
            yield localStorage.setItem("access_token", data?.data?.access_token);
            yield (api.defaults.headers.common = {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            });
            yield put(setUserEmail(data?.data?.user?.email))
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.user?.email,
                address: data?.data?.user?.address,
                id: data?.data?.user?.id,
                mobile_no: data?.data?.user?.mobile,
                name: data?.data?.user?.name,
                profile_status: data?.data?.user?.profile_status,
                role: data?.data?.user?.role,
                status: data?.data?.user?.status,
                image: data?.data?.user?.image,
                total_voucher: data?.data?.user?.total_voucher,
                chat_token: data?.data?.user?.chat_token,
                country: data?.data?.user?.country,
                date_of_birth: data?.data?.user?.date_of_birth,
                about: data?.data?.user?.about,
                gender: data?.data?.user?.gender,
                parent_user_id:data?.data?.user?.parent_user_id,
                uuid: data?.data?.user?.uuid,
                wallet_amount:data?.data?.user?.wallet_amount,
                available_amount:data?.data?.user?.available_amount,
            }
            yield put(setUserProfile(userPorfile))
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            if (data?.data?.user?.profile_status === "incomplete") {
                yield call(router.push, `/personalinformation`);
            } else if (data?.data?.user?.profile_status === "complete") {
                yield call(router.push, `/`);
            }
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        if (error?.response?.data.errors.code === 'ERR009') {
            yield put(setUserEmail(action.payload.email))
            let resendOtp: IResendOtp = {
                email: action?.payload?.email
            }
            yield put(sendOtp(resendOtp))
        }
        yield put(setFormErrors(error?.response?.data.errors))

    } finally {
        yield put(googleLoginLoading(false));
    }
}
function* resendOtpHandler(action: UserActionTypes) {
    yield put(sendOtpLoader(true))
    try {
        const { data } = yield call(resendOtpApi, action.payload);
        if (data.status) {
            router.push(`/verify-email`);
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");

    } finally {
        yield put(userSignupLoding(false));
        yield put(sendOtpLoader(false))
    }
}

function* getCountryListHandler() {
    try {
        const { data } = yield call(getCountryListApi);
        if (data.status) {
            yield put(setCountryList(data?.data));
        } else {

        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setLearnMoreLoader(false));
    }
}
function* getCategoryListHandler() {
    try {
        const { data } = yield call(getCategoryListApi);
        if (data.status) {
            yield put(setCategoryList(data?.data));
        } else {

        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setLearnMoreLoader(false));
    }
}
function* verifyEmailHandler(action: UserActionTypes) {
    yield put(verifyEmailLoader(true))

    try {
        const { data } = yield call(verifyEmailApi, action.payload);
        if (data.status) {

            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield localStorage.setItem("access_token", data?.data?.access_token);
            yield (api.defaults.headers.common = {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            });
            yield put(setUserEmail(data?.data?.user?.email))
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.user?.email,
                address: data?.data?.user?.address,
                id: data?.data?.user?.id,
                mobile_no: data?.data?.user?.mobile,
                name: data?.data?.user?.name,
                profile_status: data?.data?.user?.profile_status,
                role: data?.data?.user?.role,
                status: data?.data?.user?.status,
                image: data?.data?.user?.image,
                total_voucher: data?.data?.user?.total_voucher,
                chat_token: data?.data?.user?.chat_token,
                country: data?.data?.user?.country,
                date_of_birth: data?.data?.user?.date_of_birth,
                about: data?.data?.user?.about,
                gender: data?.data?.user?.gender,
                parent_user_id:data?.data?.user?.parent_user_id,
                uuid: data?.data?.user?.uuid,
                wallet_amount:data?.data?.user?.wallet_amount,
                available_amount:data?.data?.user?.available_amount,
            }
            yield put(setUserProfile(userPorfile))
            if (data?.data?.user?.profile_status === "incomplete") {
                yield call(router.push, `/personalinformation`);
            } else if (data?.data?.user?.profile_status === "complete") {
                yield call(router.push, `/`);
            }

        } else {

        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
        yield put(setFormErrors(error?.response?.data?.errors))
    } finally {
        yield put(verifyEmailLoader(false))
    }
}
function* forgotPasswordStageOneHandler(action: UserActionTypes) {
    yield put(sendOtpLoader(true))
    try {
        const { data } = yield call(forgotPasswordStageOneApi, action.payload);
        if (data.status) {

            router.push(`/forgot-password-verifyemail`);
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put(setUserEmail(data?.data?.email))

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            // yield put(setFormErrors(error?.response?.data.errors))
        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
    } finally {
        yield put(sendOtpLoader(false))
    }
}
function* forgotPasswordStageTwoHandler(action: UserActionTypes) {
    yield put(verifyEmailLoader(true))

    try {
        const { data } = yield call(forgotPasswordStageTwoApi, action.payload);
        if (data.status) {
            router.push(`/new-password`);
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put(setUserForgotPasswordVerifyToken(data?.data?.verify_token))

        } else {
            console.log(data, "sdflkjsdlfsdlkj")
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        console.log(error?.response?.data?.errors.message, "sdflkjsdlfsdlkj")
        yield put(setFormErrors(error?.response?.data?.errors.message))
        toast.error(error?.response?.data?.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setLearnMoreLoader(false));
        yield put(verifyEmailLoader(false))

    }
}
function* forgotPasswordStageThreeHandler(action: UserActionTypes) {
    yield put(verifyEmailLoader(true))
    try {
        const { data } = yield call(forgotPasswordStageThreeApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield call(router.push, `/login`);
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(verifyEmailLoader(false))
    }
}
function* getSearchServicesFilterHandler(action: UserActionTypes) {
    yield put(setServicesFilterLoader(true))
    try {
        const { data } = yield call(getSearchServicesFilteApi, action.payload);
        if (data.status) {
            yield put(setServicesFilter(data?.data))
            yield put(setSearchHistory(data?.meta_params?.request))
            const metaParams = {
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setServicesMetaParams(metaParams))
        } else {
            yield put(setSearchHistory(data?.meta_params?.request))
            yield put(setServicesFilter(data?.data))
            const metaParams = {
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setServicesMetaParams(metaParams))
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setServicesFilterLoader(false))
    }
}

function* setProfileDataHandler(action: UserActionTypes) {
    yield put(googleLoginLoading(true));
    try {
        const { data } = yield call(userProfileApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.email,
                address: data?.data?.address,
                id: data?.data?.id,
                country: data?.data?.country,
                mobile_no: data?.data?.mobile,
                name: data?.data?.name,
                profile_status: data?.data?.profile_status,
                approx_consumer_count: data?.data?.approx_consumer_count,
                role: data?.data?.role,
                status: data?.data?.status,
                total_voucher: data?.data?.total_voucher,
                about: data?.data?.about,
                gender: data?.data?.gender,
                chat_token: data?.data?.chat_token,
                date_of_birth: data?.data?.date_of_birth,
                uuid: data?.data?.uuid,
                parent_user_id:data?.data?.parent_user_id,
                image: data?.data?.image,
                wallet_amount:data?.data?.wallet_amount,
                available_amount:data?.data?.available_amount,
            }
            yield put(setUserProfile(userPorfile))
            if (action.payload.isProfile === true) {
                router.push(`/profile`);
            } else {
                router.push(`/`);
            }

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield delay(1000)
        yield put(googleLoginLoading(false));
    }
}


function* getProfileDataHandler() {
    // yield put(googleLoginLoading(true));
    try {
        const { data } = yield call(getProfileApi);
        if (data.status) {
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.email,
                address: data?.data?.address,
                id: data?.data?.id,
                country: data?.data?.country,
                mobile_no: data?.data?.mobile,
                name: data?.data?.name,
                profile_status: data?.data?.profile_status,
                approx_consumer_count: data?.data?.approx_consumer_count,
                role: data?.data?.role,
                status: data?.data?.status,
                total_voucher: data?.data?.total_voucher,
                about: data?.data?.about,
                gender: data?.data?.gender,
                chat_token: data?.data?.chat_token,
                date_of_birth: data?.data?.date_of_birth,
                uuid: data?.data?.uuid,
                parent_user_id:data?.data?.parent_user_id,
                image: data?.data?.image,
                wallet_amount:data?.data?.wallet_amount,
                available_amount:data?.data?.available_amount,
            }
            yield put(setUserProfile(userPorfile))

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield delay(1000)
        // yield put(googleLoginLoading(false));
    }
}

function* addProfileImageHandler(action: UserActionTypes) {
    yield put(editProfileImageLoader(true));

    try {
        const { data } = yield call(addProfileImageApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.email,
                address: data?.data?.address,
                id: data?.data?.id,
                mobile_no: data?.data?.mobile,
                name: data?.data?.name,
                profile_status: data?.data?.profile_status,
                role: data?.data?.role,
                status: data?.data?.status,
                image: data?.data?.image,
                total_voucher: data?.data?.total_voucher,
                about: data?.data?.about,
                gender: data?.data?.gender,
                approx_consumer_count:data?.data?.approx_consumer_count,
                chat_token: data?.data?.chat_token,
                date_of_birth: data.data?.date_of_birth,
                country: data?.data?.country,
                parent_user_id:data?.data?.parent_user_id,
                uuid: data?.data?.uuid,
                wallet_amount:data?.data?.wallet_amount,
                available_amount:data?.data?.available_amount,
            }
            yield put(setUserProfile(userPorfile))

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(editProfileImageLoader(false));
    }
}

function* deleteProfileImageHandler(action: UserActionTypes) {
    yield put(editProfileImageLoader(true));

    try {
        const { data } = yield call(deleteProfileImageApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            // yield put(removeProfileImage())
            const userPorfile: IUserProfile = {
                isAuth: true,
                email: data?.data?.email,
                address: data?.data?.address,
                id: data?.data?.id,
                mobile_no: data?.data?.mobile,
                name: data?.data?.name,
                profile_status: data?.data?.profile_status,
                role: data?.data?.role,
                status: data?.data?.status,
                image: data?.data?.image,
                total_voucher: data?.data?.total_voucher,
                about: data?.data?.about,
                gender: data?.data?.gender,
                chat_token: data?.data?.chat_token,
                date_of_birth: data.data?.date_of_birth,
                country: data?.data?.country,
                uuid: data?.data?.uuid,
                parent_user_id:data?.data?.parent_user_id,
                wallet_amount:data?.data?.wallet_amount,
                available_amount:data?.data?.available_amount,
            }
            yield put(setUserProfile(userPorfile))
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(editProfileImageLoader(false));
    }
}

function* getPaymentHistoryHandler(action: UserActionTypes) {
    yield put(appointmentListLoader(true));

    try {
        const { data } = yield call(getPaymentHistoryApi, action.payload);
        if (data.status) {
            yield put(setPaymentHistory(data?.data))
            const metaParams = {
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setPaymentHistoryMetaParams(metaParams))
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(appointmentListLoader(false));
    }
}

function* invoiceDownloadHandler(action: UserActionTypes) {
    yield put(downloadInvoiceLoading(true));

    try {
        const { data } = yield call(downloadInvoiceApi, action.payload);
        if (data.status) {
            const invoice_url = `${data.data.invoice_url}`;
            const newTab = window.open(invoice_url, '_blank');
            if (newTab) {
                newTab.opener = null;
            } else {
                throw new Error('Failed to open the invoice in a new tab.');
            }
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.errors?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(downloadInvoiceLoading(false));
    }
}

function* walletHistorydHandler(action: UserActionTypes) {
    yield put(setConsumerWalletLoader(true));
    try {
        const { data } = yield call(getWalletHistoryApi, action.payload);
        if (data.status) {
            yield put(setConsumerWalletHistory(data?.data))
            const metaParams = {
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setConsumerWalletHistoryMetaParams(metaParams))
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setConsumerWalletLoader(false));
    }
}

function* userLogoutdHandler() {
     try {
        const { data } = yield call(userLogoutApi);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
         } else {
            // toast.error(data?.message, {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setConsumerWalletLoader(false));
    }
}

export default function* userSaga() {
    yield takeLatest(UserActions.USER_SIGNUP, userSignupHandler);
    yield takeLatest(UserActions.GET_COUNTRY_LIST, getCountryListHandler);
    yield takeLatest(UserActions.GET_CATEGORY_LIST, getCategoryListHandler);
    yield takeLatest(UserActions.SEND_OTP, resendOtpHandler);
    yield takeLatest(UserActions.VERIFY_EMAIL, verifyEmailHandler);
    yield takeLatest(UserActions.USER_LOGIN, userLoginHandler);
    yield takeLatest(UserActions.FORGOT_PASSWORD_STAGE_ONE, forgotPasswordStageOneHandler);
    yield takeLatest(UserActions.FORGOT_PASSWORD_STAGE_TOW, forgotPasswordStageTwoHandler);
    yield takeLatest(UserActions.FORGOT_PASSWORD_STAGE_THREE, forgotPasswordStageThreeHandler);
    yield takeLatest(UserActions.SET_PROFILE_DATA, setProfileDataHandler);
    yield takeLatest(UserActions.GET_PROFILE_DATA, getProfileDataHandler);
    yield takeLatest(UserActions.GET_SEARCH_SERVICES_FILTER, getSearchServicesFilterHandler);
    yield takeLatest(UserActions.ADD_PROFILE_IMAGE, addProfileImageHandler);
    yield takeLatest(UserActions.DELETE_PROFILE_IMAGE, deleteProfileImageHandler);
    yield takeLatest(UserActions.USER_GOOGLE_LOGIN, userGoogleLoginHandler);
    yield takeLatest(UserActions.GET_PAYMENT_HISTORY, getPaymentHistoryHandler);
    yield takeLatest(UserActions.DOWNLOAD_INVOICE, invoiceDownloadHandler);
    yield takeLatest(UserActions.USER_LOGOUT, userLogoutdHandler);
    yield takeLatest(UserActions.GET_CONSUMER_WALLET_HISTORY, walletHistorydHandler);

}