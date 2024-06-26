import { api } from "@/api-config/api";
import { IAddFund, IEmployeeListForFundAllocations } from "@/types/fundManagementInterface";

export const addFundApi = async (amount:IAddFund) => {
    return await api.post(`company/add-fund`, amount);
};
export const verifyFundApi = async (id:number) => {
    return await api.put(`company/verify-fund?id=${id}`);
};
export const getEmployeeListFroFundAllocationsApi = async () => {
    return await api.get(`company/employee-list-for-fund-allocations`);
};
export const fundallocationApi = async (data:IEmployeeListForFundAllocations[]) => {
    return await api.post(`company/employee-fund-allocation`,data);
};
 