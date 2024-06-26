import { ICompanyProfile, IDashboardKpi, IEmployeeData, IEmployeeInvitationPaylod, IEmployeeSearch, IPaymentHistoryData, IUpdateEmployeeStatus, IVerifyLink } from "@/types/companyInterface";
import { CompanyUserAction, CompanyUserTypes } from "../action-types/companyUserActionTypes";
import { IPaymentHistoryMetaParams, IPaymentHistoryPayload } from "@/types/userInterface";
import { IWalletLedger } from "@/types/fundManagementInterface";
 

export const verifyLink = (payload:IVerifyLink): CompanyUserTypes => ({
    type: CompanyUserAction.VERIFY_LINK,
    payload
})
export const verifyLinkLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.SET_VERIFY_LINK_LOADER,
    payload
})
export const updateCopmanyProfileData = (payload:ICompanyProfile): CompanyUserTypes => ({
    type: CompanyUserAction.UPDATE_COMPANY_PROFILE_DATA,
    payload
})
export const getEmloyeeList = (payload:IEmployeeSearch): CompanyUserTypes => ({
    type: CompanyUserAction.GET_EMPLOYEE_LIST,
    payload
})
export const setEmloyeeListLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.SET_EMPLOYEE_LIST_LOADER,
    payload
})
export const resetEmployeeList = (payload:IEmployeeData): CompanyUserTypes => ({
    type: CompanyUserAction.RESET_EMPLOYEE_LIST,
    payload
})
export const setEmloyeeList = (payload:IEmployeeData): CompanyUserTypes => ({
    type: CompanyUserAction.SET_EMPLOYEE_LIST,
    payload
})
export const updateEmployeeStatus = (payload:number): CompanyUserTypes => ({
    type: CompanyUserAction.UPDATE_EMPLOYEE_STATUS,
    payload
})
export const setUpdateEmployeeStatus = (payload:IUpdateEmployeeStatus): CompanyUserTypes => ({
    type: CompanyUserAction.SET_UPDATE_EMPLOYEE_STATUS,
    payload
})
export const emloyeeInvitation = (payload:IEmployeeInvitationPaylod): CompanyUserTypes => ({
    type: CompanyUserAction.EMPLOYEE_INVITATION,
    payload
})
export const emloyeeInvitationSuccess = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.EMPLOYEE_INVITATION_SUCCESS,
    payload
})
export const emloyeeInvitationLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.EMPLOYEE_INVITATION_LOADER,
    payload
})

export const getCompanyPaymentHistory = (payload:IPaymentHistoryPayload): CompanyUserTypes => ({
    type: CompanyUserAction.GET_COMPANY_PAYMENT_HISTORY,
    payload
})
export const setCopmanyPaymentHistory = (payload:IPaymentHistoryData): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY,
    payload
})
export const setCopmanyPaymentHistoryLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY_LOADER,
    payload
})
export const setCopmanyPaymentHistoryMetaParams = (payload:IPaymentHistoryMetaParams): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY_METAPARAMS,
    payload
})

export const resetPaymentData = (payload:[]): CompanyUserTypes => ({
    type: CompanyUserAction.RESET_COPMANY_PAYMENT_HISTORY,
    payload
})

export const downloadInvoice = (payload:number): CompanyUserTypes => ({
    type: CompanyUserAction.COPMANY_DOWNLOAD_INVOICE,
    payload
})
export const downloadInvoiceLoading = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.COPMANY_DOWNLOAD_INVOICE_LOADING,
    payload
})

export const getCompanyWalletLedgerHistory = (payload:IPaymentHistoryPayload): CompanyUserTypes => ({
    type: CompanyUserAction.GET_COMPANY_WALLET_LEDGER_HISTORY,
    payload
})
export const setCopmanyWalletLedgerHistory = (payload:IWalletLedger): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY,
    payload
})
export const setCopmanyWalletLedgerLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY_LOADER,
    payload
})
export const setCopmanyWalletLedgerHistoryMetaParams = (payload:IPaymentHistoryMetaParams): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY_METAPARAMS,
    payload
})
export const resetWalletLedgerData = (payload:[]): CompanyUserTypes => ({
    type: CompanyUserAction.RESET_COPMANY_WALLET_LEDGER_HISTORY,
    payload
})
export const getCompnayDashboardKpi = (): CompanyUserTypes => ({
    type: CompanyUserAction.GET_COMPANY_DASHBOARD_KPI,
})
export const setCompnayDashboardKpi = (payload:IDashboardKpi): CompanyUserTypes => ({
    type: CompanyUserAction.SET_COMPANY_DASHBOARD_KPI,
    payload
})
export const emptyWalletAmount = (payload:number): CompanyUserTypes => ({
    type: CompanyUserAction.EMPTY_WALLET_AMOUNT,
    payload
})
export const emptyWalletAmountLoader = (payload:boolean): CompanyUserTypes => ({
    type: CompanyUserAction.EMPTY_WALLET_AMOUNT_LOADER,
    payload
})