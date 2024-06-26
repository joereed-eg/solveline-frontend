import { IAppointmentData, IAppointmentList, IAppointmentPaylod, IFeedbackListPaylod, IGivFeedback, IRaiseDispute, IRescheduleAppontment } from "@/types/appointmentInterface";
import { AppointmentActionTypes, AppointmentActions } from "../action-types/appointmentActionTypes";
import { IRatingsList, IReviewsRatingList, IReviewsRatingUpdate } from "@/types/providerServicesInterface";


export const getAppointmentList = (payload:IAppointmentPaylod): AppointmentActionTypes => ({
    type: AppointmentActions.GET_APPOINTMENT_LIST,
    payload
})
export const setAppointmentList = (payload:IAppointmentData): AppointmentActionTypes => ({
    type: AppointmentActions.SET_APPOINTMENT_LIST,
    payload
})
export const resetAppointmentList = (payload:IAppointmentData): AppointmentActionTypes => ({
    type: AppointmentActions.RESET_APPOINTMENT_LIST,
    payload
})
export const appointmentListLoader = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.APPOINTMENT_LIST_LOADER,
    payload
})
export const getViewAppointment = (payload:number): AppointmentActionTypes => ({
    type: AppointmentActions.GET_VIEW_APPONTMENT,
    payload
})
export const setViewAppointment = (payload:IAppointmentList): AppointmentActionTypes => ({
    type: AppointmentActions.SET_VIEW_APPONTMENT,
    payload
})
export const viewAppointmentLoader = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.VIEW_APPONTMENT_LOADER,
    payload
})
export const rescheduleAppontment = (payload:IRescheduleAppontment): AppointmentActionTypes => ({
    type: AppointmentActions.RESCHEDULE_APPONTMENT,
    payload
})
export const rescheduleAppontmentLoader = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.RESCHEDULE_APPONTMENT_LOADER,
    payload
})
export const rescheduleAppontmentSuccess = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.RESCHEDULE_APPONTMENT_SUCCESS,
    payload
})
export const raiseDispute = (payload:IRaiseDispute): AppointmentActionTypes => ({
    type: AppointmentActions.RAISE_DISPUTE,
    payload
})
export const givFeedback = (payload:IGivFeedback): AppointmentActionTypes => ({
    type: AppointmentActions.GIV_FEEDBACK,
    payload
})
export const UdateFeedbackList = (payload:IReviewsRatingUpdate): AppointmentActionTypes => ({
    type: AppointmentActions.UPDATE_FEEDBACK,
    payload
})
export const getFeedbackList = (payload:IFeedbackListPaylod): AppointmentActionTypes => ({
    type: AppointmentActions.GET_FEEDBACK_LIST,
    payload
})
export const setFeedbackList = (payload:IReviewsRatingList): AppointmentActionTypes => ({
    type: AppointmentActions.SET_FEEDBACK_LIST,
    payload
})
export const setFeedbackListLoader = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.SET_FEEDBACK_LIST_LOADER,
    payload
})
export const resetFeedbackList = (payload:IReviewsRatingList): AppointmentActionTypes => ({
    type: AppointmentActions.RESET_FEEDBACK_LIST,
    payload
})
 
export const givFeedbackLoader = (payload:boolean): AppointmentActionTypes => ({
    type: AppointmentActions.SET_FEEDBACK_LOADER,
    payload
})
