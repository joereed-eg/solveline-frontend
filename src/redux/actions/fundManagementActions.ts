 import { IAddFund, IEmployeeListForFundAllocations, IEmployeeListForFundAllocationsData } from "@/types/fundManagementInterface";
import { FundManagementActionsTypes } from "../action-types/fundManagementTypes";
import { FundManagementActions } from "../action-types/fundManagementTypes";
 

export const addFund = (payload:IAddFund): FundManagementActionsTypes => ({
    type: FundManagementActions.ADD_FUND,
    payload
})
export const addFundLader = (payload:boolean): FundManagementActionsTypes => ({
    type: FundManagementActions.ADD_FUND_LOADER,
    payload
})
export const verifyFund = (payload:number): FundManagementActionsTypes => ({
    type: FundManagementActions.VERIFY_FUND,
    payload
})
export const getEmloyeeListForFundAllocations = (): FundManagementActionsTypes => ({
    type: FundManagementActions.GET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS,
})
export const setEmloyeeListForFundAllocations = (payload:IEmployeeListForFundAllocationsData): FundManagementActionsTypes => ({
    type: FundManagementActions.SET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS,
    payload
})
export const setEmloyeeListForFundAllocationsLoader = (payload:boolean): FundManagementActionsTypes => ({
    type: FundManagementActions.SET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS_LOADER,
    payload
})
export const allocateFund = (payload:IEmployeeListForFundAllocations[]): FundManagementActionsTypes => ({
    type: FundManagementActions.ALLOCATE_FUND,
    payload
})
export const allocateFundSuccess = (payload:boolean): FundManagementActionsTypes => ({
    type: FundManagementActions.ALLOCATE_FUND_SUCCESS,
    payload
})