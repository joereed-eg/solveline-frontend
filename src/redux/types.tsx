
import { ICompanyInitialState } from "@/types/companyInterface";
import { IAppointmentInitialState } from "../types/appointmentInterface";
import { IChatInitialState } from "../types/chatInterface";
import { IUser } from "../types/userInterface";
import { IFundManagementInitialState } from "@/types/fundManagementInterface";

export interface AppState {
  userData: IUser,
  appointmentData: IAppointmentInitialState,
  chatData: IChatInitialState,
  company: ICompanyInitialState,
  fundManagement: IFundManagementInitialState,

}
