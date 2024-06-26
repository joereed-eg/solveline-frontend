
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import router from 'next/router';
 import { CompanyUserAction, CompanyUserTypes } from '@/redux/action-types/companyUserActionTypes';
import { companyProfileApi, downloadInvoiceApi, employeeInvitationApi, employeeListApi, emptyWalletApi, getCompnayDashboardKpiApi, getPaymentHistoryApi, getWalletLedgerHistoryApi, updateEmployeeStatusApi, verifyLinkApi } from '../requests/companyUserRequest';
import { toast } from 'react-toastify';
import { downloadInvoiceLoading, emloyeeInvitationLoader, emptyWalletAmountLoader, setCompnayDashboardKpi, setCopmanyPaymentHistory, setCopmanyPaymentHistoryLoader, setCopmanyPaymentHistoryMetaParams, setCopmanyWalletLedgerHistory, setCopmanyWalletLedgerHistoryMetaParams, setCopmanyWalletLedgerLoader, setEmloyeeList, setEmloyeeListLoader, setUpdateEmployeeStatus, verifyLinkLoader } from '@/redux/actions/comanyUserActions';
import { getProfileData, googleLoginLoading, isUserInvited, setFormErrors, setUserEmail, setUserProfile } from '@/redux/actions/userActionTypes';
import { ICompanyProfile, IEmployeeData, IUpdateEmployeeStatus } from '@/types/companyInterface';
import { setEmloyeeListForFundAllocations } from '@/redux/actions/fundManagementActions';


function* verifyLinkHandler(action: CompanyUserTypes) {
    yield put(verifyLinkLoader(true))
    try {
        const { data } = yield call(verifyLinkApi, action.payload);
        if (data.status) {
            const userPorfile: ICompanyProfile = {
                email: data?.data?.email,
                role: data?.data?.role,
                isAuth: false,
                profile_status: 'incomplete',
            }
            yield put(setUserProfile(userPorfile))
            yield put(isUserInvited(true))
            yield put(setUserEmail(""))
            router.push("/signup");
            toast.error(data?.data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            toast.error(data?.errors.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            if(data?.errors?.message === "Invitation already accepted."){
                router.push("/login");
            }
        }
    } catch (error: any) {

    } finally {
        yield delay(9000)
        yield put(verifyLinkLoader(false))
    }
}

function* updateProfileDataHandler(action: CompanyUserTypes) {
    yield put(googleLoginLoading(true));

    try {
        const { data } = yield call(companyProfileApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            const userPorfile: ICompanyProfile = {
                isAuth: true,
                email: data?.data?.email,
                address: data?.data?.address,
                id: data?.data?.id,
                name: data?.data?.name,
                profile_status: data?.data?.profile_status,
                approx_consumer_count: data?.data?.approx_consumer_count,
                role: data?.data?.role,
                status: data?.data?.status,
                about: data?.data?.about,
                image: data?.data?.image,
                country:data?.data?.country,
                available_amount:data?.data?.available_amount
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
        yield delay(400)
        yield put(googleLoginLoading(false));
    }
}

function* employeeInvitationHandler(action: CompanyUserTypes) {
    yield put(emloyeeInvitationLoader(true))
    try {
        const { data } = yield call(employeeInvitationApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            yield put({ type: CompanyUserAction.EMPLOYEE_INVITATION_SUCCESS, payload: true });

        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
    } finally {
        yield put(emloyeeInvitationLoader(false))
    }
}

function* getemployeeListHandler(action: CompanyUserTypes) {
    yield put(setEmloyeeListLoader(true))
    try {
        const { data } = yield call(employeeListApi, action.payload);
        if (data.status) {
            const employeeData: IEmployeeData = {
                data: data?.data,
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data?.meta_params?.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setEmloyeeList(employeeData))
        } else {
            const employeeData: IEmployeeData = {
                data: data?.data,
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data?.meta_params?.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setEmloyeeList(employeeData))
        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
    } finally {
        yield put(setEmloyeeListLoader(false))
    }
}

function* updateEmployeeStatusHandler(action: CompanyUserTypes) {
    yield put(emloyeeInvitationLoader(true))
    try {
        const { data } = yield call(updateEmployeeStatusApi, action.payload);
        if (data.status) {
             let updateEmployeData:IUpdateEmployeeStatus = {
                id: action.payload,
                status:data?.data?.status,
             }
             yield put(setUpdateEmployeeStatus(updateEmployeData))
             toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        yield put(setFormErrors(error?.response?.data.errors))
    } finally {
        yield put(emloyeeInvitationLoader(false))
    }
}

function* getCopmanyPaymentHistoryHandler(action: CompanyUserTypes) {
    yield put(setCopmanyPaymentHistoryLoader(true));
    try {
        const { data } = yield call(getPaymentHistoryApi, action.payload);
        if (data.status) {
            yield put(setCopmanyPaymentHistory(data?.data))
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
            yield put(setCopmanyPaymentHistoryMetaParams(metaParams))
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setCopmanyPaymentHistoryLoader(false));
    }
}


function* invoiceDownloadHandler(action: CompanyUserTypes) {
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

function* getCopmanyWalletLedgerHistoryHandler(action: CompanyUserTypes) {
    yield put(setCopmanyWalletLedgerLoader(true));
    try {
        const { data } = yield call(getWalletLedgerHistoryApi, action.payload);
        if (data.status) {
            yield put(setCopmanyWalletLedgerHistory(data?.data))
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
            yield put(setCopmanyWalletLedgerHistoryMetaParams(metaParams))
        }
    
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(setCopmanyWalletLedgerLoader(false));
    }
}

function* getCopmanyDashboardKpiHistoryHandler() {
    // yield put(setCopmanyWalletLedgerLoader(true));
    try {
        const { data } = yield call(getCompnayDashboardKpiApi);
        if (data.status) {
            yield put(setCompnayDashboardKpi(data?.data))
           
         } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(setCopmanyWalletLedgerLoader(false));
    }
}

function* emptyWalletAmountHandler(action: CompanyUserTypes) {
    yield put(emptyWalletAmountLoader(true));
    try {
        const { data } = yield call(emptyWalletApi, action.payload);
        if (data.status) {
             yield put(setEmloyeeListForFundAllocations(data?.data))
             yield put(getProfileData())
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
        yield delay(2000)
        yield put(emptyWalletAmountLoader(false));
    }
}



export default function* companySaga() {
    yield takeLatest(CompanyUserAction.VERIFY_LINK, verifyLinkHandler);
    yield takeLatest(CompanyUserAction.UPDATE_COMPANY_PROFILE_DATA, updateProfileDataHandler);
    yield takeLatest(CompanyUserAction.EMPLOYEE_INVITATION, employeeInvitationHandler);
    yield takeLatest(CompanyUserAction.GET_EMPLOYEE_LIST, getemployeeListHandler);
    yield takeLatest(CompanyUserAction.UPDATE_EMPLOYEE_STATUS, updateEmployeeStatusHandler);
    yield takeLatest(CompanyUserAction.GET_COMPANY_PAYMENT_HISTORY, getCopmanyPaymentHistoryHandler);
    yield takeLatest(CompanyUserAction.COPMANY_DOWNLOAD_INVOICE, invoiceDownloadHandler);
    yield takeLatest(CompanyUserAction.GET_COMPANY_WALLET_LEDGER_HISTORY, getCopmanyWalletLedgerHistoryHandler);
    yield takeLatest(CompanyUserAction.GET_COMPANY_DASHBOARD_KPI, getCopmanyDashboardKpiHistoryHandler);
    yield takeLatest(CompanyUserAction.EMPTY_WALLET_AMOUNT, emptyWalletAmountHandler);
}