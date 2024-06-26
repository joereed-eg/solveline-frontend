export interface IFundManagementInitialState {
  employeeListFrofundAllocations: IEmployeeListForFundAllocationsData;
  employeeListFrofundAllocationsLoader: boolean;
  addFundLoader: boolean;
  addFundSuccess: boolean;
}

export interface IEmployeeListForFundAllocations {
  id?: number;
  name: string;
  email: string;
  image?: string;
  available_amount: number;
  distributed_fund: number;
}

export interface IEmployeeListForFundAllocationsData {
  employees: IEmployeeListForFundAllocations[];
  available_amount: number;
}
export interface IAddFund {
  amount: number;
}
export interface IWalletLedger {
  id: number;
  user_id: number;
  amount: string;
  name:string;
  email:string;
  status:string;
  type:string;
  reason:string;
  description:string;
  created_at:string;
  reference_id:number;
  image:string;
}
 
