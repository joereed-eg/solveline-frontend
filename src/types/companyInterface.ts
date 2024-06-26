import { IPagination } from "./appointmentInterface"
import { IWalletLedger } from "./fundManagementInterface"
import { IPaymentHistoryMetaParams, IUserProfile } from "./userInterface"

export interface ICompanyInitialState {
   verifyLinkLoader:boolean
   employeeInvitationLoader:boolean
   employeeInvitationSuccess:boolean
   employeeListLoader:boolean
   employeeList:IEmployeeData
   paymentHistoryLoader:boolean
   invoiceDownloadLoading:boolean
   paymentHistoryData:IPaymentHistoryData[]
   paymentHistoryMetaParams: IPaymentHistoryMetaParams
   walletLedgerHistoryMetaParams: IPaymentHistoryMetaParams
   walletLedgerHistoryData: IWalletLedger[]
   walletLedgerHistoryLoader: boolean
   emptyWalletAmountLoader: boolean
   compnayDashboardKpis:IDashboardKpi
   }
   
   export interface IVerifyLink {
      token:string | string[]
   }
   
   export interface ICompanyProfile {
      isAuth?: boolean,
      email?:string,
      id?: number | null,
      name?: string,
      address?: string,
      country?: any;
      profile_status?: string,
      role?: string,
      status?: string,
      image?:string,
      about?:string,
      approx_consumer_count?:string,
      available_amount?:number,
      isProfile?:boolean,
    }
   export interface IEmployeeInvitationPaylod {
      email:string,
    }
   export interface IEmployeeSearch {
      search:string,
      page:number
    }
   export interface IEmployeeData {
      data:IUserProfile[]
      meta_params:IPagination
    }
   export interface IUpdateEmployeeStatus {
      status:string;
      id:number;
    }
   export interface IPaymentHistoryData {
      amount:string;
      payment_date:string;
      id:number;
    }
   export interface IDashboardKpi {
      total_employee:number;
      total_amount_allocated_to_employee:string;
      total_amount_used_by_employee:string;
      total_available_amount:string;
      total_inactive_employee:number;
      total_appointment_made_by_employee:number;
    
    }