import { ICompanyInitialState } from "@/types/companyInterface";
import {
  CompanyUserAction,
  CompanyUserTypes,
} from "../action-types/companyUserActionTypes";

const initialState: ICompanyInitialState = {
  verifyLinkLoader: false,
  employeeInvitationLoader: false,
  employeeInvitationSuccess: false,
  employeeList: {
    data: [],
    meta_params: {
      current_page: 0,
      hasMorePage: false,
      last_page: 0,
      nextPage: 0,
      path: "",
      per_page: 0,
      total_count: 0,
    },
  },
  employeeListLoader: false,
  paymentHistoryData: [],
  paymentHistoryLoader: false,
  invoiceDownloadLoading: false,
  paymentHistoryMetaParams: {
    meta_params: {
      current_page: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      total_count: 0,
      hasMorePage: false,
      nextPage: 0,
    },
  },
  walletLedgerHistoryData: [],
  walletLedgerHistoryLoader: false,
  walletLedgerHistoryMetaParams: {
    meta_params: {
      current_page: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      total_count: 0,
      hasMorePage: false,
      nextPage: 0,
    },
  },
  compnayDashboardKpis:{
    total_amount_allocated_to_employee:'$0',
    total_amount_used_by_employee:'$0',
    total_appointment_made_by_employee:0,
    total_available_amount:"$0",
    total_employee:0,
    total_inactive_employee:0
  },
  emptyWalletAmountLoader:false,
};

export default function companyReducer(
  state = initialState,
  action: CompanyUserTypes
): ICompanyInitialState {
  switch (action.type) {
    case CompanyUserAction.SET_VERIFY_LINK_LOADER: {
      return {
        ...state,
        verifyLinkLoader: action.payload,
      };
    }
    case CompanyUserAction.EMPLOYEE_INVITATION_LOADER: {
      return {
        ...state,
        employeeInvitationLoader: action.payload,
      };
    }
    case CompanyUserAction.EMPLOYEE_INVITATION_SUCCESS: {
      return {
        ...state,
        employeeInvitationSuccess: action.payload,
      };
    }

    case CompanyUserAction.SET_EMPLOYEE_LIST: {
      const { data, meta_params } = action.payload;
      const concatenatedData = [...state.employeeList.data, ...data];

      return {
        ...state,
        employeeList: {
          data: concatenatedData,
          meta_params: {
            ...state.employeeList.meta_params,
            ...meta_params,
          },
        },
      };
    }
    case CompanyUserAction.RESET_EMPLOYEE_LIST: {
       return {
        ...state,
        employeeList: action.payload,
      };
    }
    case CompanyUserAction.SET_EMPLOYEE_LIST_LOADER: {
      return {
        ...state,
        employeeListLoader: action.payload,
      };
    }
    case CompanyUserAction.SET_UPDATE_EMPLOYEE_STATUS: {
      const { status, id } = action.payload;
      const updatedData = state.employeeList.data.map((appointment) => {
        if (appointment.id === id) {
          return {
            ...appointment,
            status: status,
          };
        }
        return appointment;
      });
      return {
        ...state,
        employeeList: {
          ...state.employeeList,
          data: updatedData,
        },
      };
    }
    case CompanyUserAction.RESET_COPMANY_PAYMENT_HISTORY: {
      return {
        ...state,
        paymentHistoryData: action.payload,
      };
    }
    case CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY: {
      const paymentHistorylist = [
        ...state.paymentHistoryData,
        ...action.payload,
      ];
       return {
        ...state,
        paymentHistoryData: paymentHistorylist, // Update paymentHistoryData with the concatenated data
      };
    }
    case CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY_LOADER: {
      return {
        ...state,
        paymentHistoryLoader: action.payload,
      };
    }
    case CompanyUserAction.SET_COMPANY_PAYMENT_HISTORY_METAPARAMS: {
      return {
        ...state,
        paymentHistoryMetaParams: action.payload,
      };
    }
    case CompanyUserAction.COPMANY_DOWNLOAD_INVOICE_LOADING: {
      return {
        ...state,
        invoiceDownloadLoading: action.payload,
      };
    }
    case CompanyUserAction.RESET_COPMANY_WALLET_LEDGER_HISTORY: {
      return {
        ...state,
        walletLedgerHistoryData: action.payload,
      };
    }
    case CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY: {
      const walletLedgerHistorylist = [
        ...state.walletLedgerHistoryData,
        ...action.payload,
      ];
      return {
        ...state,
        walletLedgerHistoryData: walletLedgerHistorylist, // Update paymentHistoryData with the concatenated data
      };
    }
    case CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY_LOADER: {
      return {
        ...state,
        walletLedgerHistoryLoader: action.payload,
      };
    }
    case CompanyUserAction.SET_COMPANY_WALLET_LEDGER_HISTORY_METAPARAMS: {
      return {
        ...state,
        walletLedgerHistoryMetaParams: action.payload,
      };
    }
    case CompanyUserAction.SET_COMPANY_DASHBOARD_KPI: {
      return {
        ...state,
        compnayDashboardKpis: action.payload,
      };
    }
    case CompanyUserAction.EMPTY_WALLET_AMOUNT_LOADER: {
      return {
        ...state,
        emptyWalletAmountLoader: action.payload,
      };
    }
    default:
      return state;
  }
}
