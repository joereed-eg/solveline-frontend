import { IUser } from "@/types/userInterface";
import { UserActionTypes, UserActions } from "../action-types/userActionTypes";

const initialState: IUser = {
  countryList: [],
  categoryList:[],
  userEmail: "",
  sendOtpLoader: false,
  verifyEmailLoader: false,
  signupSuccess: false,
  isUserInvited: false,
  userProfile: {
    address: "",
    isAuth: false,
    id: null,
    mobile_no: null,
    name: "",
    image: "",
    profile_status: "",
    role: "",
    status: "",
    total_voucher: null,
    email: "",
  },
  userVerifyToken: "",
  userSignUpLoading: false,
  formEroors: {
    form_errors: {
      email: "",
      password: "",
    },
    message: "",
  },
  searchServicesFilter: [],
  searchServicesFilterLoader: false,
  searchHistory: {
    availability: [],
    end_price: "",
    name: "",
    ratings: null,
    category: null,
    start_price: "",
  },
  createChannelLoading: false,
  editProfileLoader: false,
  servicesMetaParams: {
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
  googleLogin: false,
  paymentHistoryData: [],
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
  invoiceDownloadLoading:false,
  walletHistoryData: [],
  walletHistoryLoader: false,
  walletHistoryMetaParams: {
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
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
): IUser {
  switch (action.type) {
    case UserActions.SET_COUNTRY_LIST: {
      return {
        ...state,
        countryList: action.payload,
      };
    }
    case UserActions.SET_CATEGORY_LIST: {
      return {
        ...state,
        categoryList: action.payload,
      };
    }
    case UserActions.VERIFY_EMAIL_LOADER: {
      return {
        ...state,
        verifyEmailLoader: action.payload,
      };
    }
    case UserActions.IS_USER_INVITED: {
      return {
        ...state,
        isUserInvited: action.payload,
      };
    }
    case UserActions.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        signupSuccess: action.payload,
      };
    }
    case UserActions.SET_FORM_ERRORS: {
      return {
        ...state,
        formEroors: action.payload,
      };
    }
    case UserActions.SET_USER_EMAIL: {
      return {
        ...state,
        userEmail: action.payload,
      };
    }
    case UserActions.USER_SIGNUP_LODING: {
      return {
        ...state,
        userSignUpLoading: action.payload,
      };
    }
    case UserActions.SEND_OTP_LOADER: {
      return {
        ...state,
        sendOtpLoader: action.payload,
      };
    }
    case UserActions.SET_USER_PROFILE_DATA: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case UserActions.VERIFY_TOKEN: {
      return {
        ...state,
        userVerifyToken: action.payload,
      };
    }
    case UserActions.RESET_SEARCH_SERVICES_FILTER: {
      return {
        ...state,
        searchServicesFilter: action.payload,
      };
    }
    case UserActions.SET_SEARCH_SERVICES_FILTER: {
      const searchServicesFilterData = [
        ...state.searchServicesFilter,
        ...action.payload,
      ];
      return {
        ...state,
        searchServicesFilter: searchServicesFilterData, // Update searchServicesFilter with the concatenated data
      };
    }
    case UserActions.RESET_PAYMENT_HISTORY: {
      return {
        ...state,
        paymentHistoryData: action.payload,
      };
    }
    case UserActions.SET_PAYMENT_HISTORY: {
      const paymentHistorylist = [
        ...state.paymentHistoryData,
        ...action.payload,
      ];
      return {
        ...state,
        paymentHistoryData: paymentHistorylist, // Update paymentHistoryData with the concatenated data
      };
    }
    case UserActions.SET_PAYMENT_HISTORY_METAPARAMS: {
      return {
        ...state,
        paymentHistoryMetaParams: action.payload,
      };
    }

    case UserActions.SET_SEARCH_SERVICES_FILTER_LOADER: {
      return {
        ...state,
        searchServicesFilterLoader: action.payload,
      };
    }
    case UserActions.SET_SERVICES_METAPARAMS: {
      return {
        ...state,
        servicesMetaParams: action.payload,
      };
    }
    case UserActions.SET_SEARCH_HISTORY: {
      return {
        ...state,
        searchHistory: action.payload,
      };
    }
    case UserActions.EDIT_PROFILE_IMAGE_LOADER: {
      return {
        ...state,
        editProfileLoader: action.payload,
      };
    }
    case UserActions.GOOGLE_LOGIN_LOADING: {
      return {
        ...state,
        googleLogin: action.payload,
      };
    }
    case UserActions.DOWNLOAD_INVOICE_LOADING: {
      return {
        ...state,
        invoiceDownloadLoading: action.payload,
      };
    }
    case UserActions.RESET_CONSUMER_WALLET_HISTORY: {
      return {
        ...state,
        walletHistoryData: action.payload,
      };
    }
    case UserActions.SET_CONSUMER_WALLET_HISTORY: {
      const walletHistoryList = [
        ...state.walletHistoryData,
        ...action.payload,
      ];
      return {
        ...state,
        walletHistoryData: walletHistoryList, // Update paymentHistoryData with the concatenated data
      };
    }
    case UserActions.SET_CONSUMER_WALLET_HISTORY_LOADER: {
      return {
        ...state,
        walletHistoryLoader: action.payload,
      };
    }
    case UserActions.SET_CONSUMER_WALLET_HISTORY_METAPARAMS: {
      return {
        ...state,
        walletHistoryMetaParams: action.payload,
      };
    }

    case UserActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
