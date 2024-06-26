import { IFundManagementInitialState } from "@/types/fundManagementInterface";
import {
  FundManagementActions,
  FundManagementActionsTypes,
} from "../action-types/fundManagementTypes";

const initialState: IFundManagementInitialState = {
  employeeListFrofundAllocations: {
    employees: [],
    available_amount: 0,
  },
  employeeListFrofundAllocationsLoader:false,
  addFundLoader:false,
  addFundSuccess:false,
};

export default function FundManagementReducer(state = initialState, action: FundManagementActionsTypes): IFundManagementInitialState {
  switch (action.type) {
    case FundManagementActions.SET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS: {
      return {
        ...state,
        employeeListFrofundAllocations: action.payload,
      };
    }
    case FundManagementActions.SET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS_LOADER: {
      return {
        ...state,
        employeeListFrofundAllocationsLoader: action.payload,
      };
    }
    case FundManagementActions.ADD_FUND_LOADER: {
      return {
        ...state,
        addFundLoader: action.payload,
      };
    }
    case FundManagementActions.ALLOCATE_FUND_SUCCESS: {
      return {
        ...state,
        addFundSuccess: action.payload,
      };
    }

    default:
      return state;
  }
}
