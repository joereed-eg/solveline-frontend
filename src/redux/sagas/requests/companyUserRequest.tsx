import { api } from "@/api-config/api";
import { ICompanyProfile, IEmployeeInvitationPaylod, IEmployeeSearch, IVerifyLink } from "@/types/companyInterface";
import { IPaymentHistoryPayload } from "@/types/userInterface";

export const verifyLinkApi = async (data: IVerifyLink) => {
    return await api.post(`auth/verify-link`, data);
};
export const employeeInvitationApi = async (data: IEmployeeInvitationPaylod) => {
    return await api.post(`company/send-employee-invitation`, data);
};
export const employeeListApi = async (data:IEmployeeSearch) => {
    return await api.get(`company/employee-list?page=${data?.page}&search=${data?.search}`);
};

export const companyProfileApi = async (data: ICompanyProfile) => {
    let profilePayload = {
        name: data?.name,
        email: data?.email,
        about: data?.about,
        address: data?.address,
        approx_consumer_count: data.approx_consumer_count,
        country: data?.country.id ? data?.country.id : data?.country,
    }
    return await api.put(`company/profile-update`, profilePayload);
};

export const updateEmployeeStatusApi = async (id:number) => {
    return await api.put(`company/update-employee-status?id=${id}`);
};
export const getPaymentHistoryApi = async (data:IPaymentHistoryPayload) => {
    return await api.get(`company/payment-history?page=${data?.page}`);
};

export const downloadInvoiceApi = async (id:number) => {
    return await api.get(`company/download-invoice?id=${id}`);
};

export const getWalletLedgerHistoryApi = async (data:IPaymentHistoryPayload) => {
    return await api.get(`company/wallet-ledger?page=${data?.page}&search=${data?.search}`);
};
export const getCompnayDashboardKpiApi = async () => {
    return await api.get(`company/dashboard-kpi`);
};
export const emptyWalletApi = async (id:number) => {
    return await api.put(`company/empty-wallet/${id}`);
};






