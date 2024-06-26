import { IFirstMsgSend, IOrderStatus, IQuationUpdatePayload } from "../../types/chatInterface";
import { ChatActionTypes, ChatActions } from "../action-types/chatActionTypes";

export const updateQuotationStatus = (payload:IQuationUpdatePayload): ChatActionTypes => ({
    type: ChatActions.QUOTATION_UPDATE_STATUS,
    payload
})
export const acceptQuotationLoader = (payload:boolean): ChatActionTypes => ({
    type: ChatActions.ACCEPT_QUOTATION_LOADER,
    payload
})
export const rejectQuotationLoader = (payload:boolean): ChatActionTypes => ({
    type: ChatActions.REJECT_QUOTATION_LOADER,
    payload
})
export const orderStatusUpdate = (payload:number): ChatActionTypes => ({
    type: ChatActions.ORDER_STATUS_UPDATE,
    payload
})
export const orderStatus = (payload:IOrderStatus): ChatActionTypes => ({
    type: ChatActions.SET_ORDER_STATUS,
    payload
})
export const orderStatusUpdateLoader = (payload:boolean): ChatActionTypes => ({
    type: ChatActions.ORDER_STATUS_UPDATE_LOADER,
    payload
})
export const createChannel = (payload:number): ChatActionTypes => ({
    type: ChatActions.CREATE_CHANNEL,
    payload
})
export const createChannelLoading = (payload:boolean): ChatActionTypes => ({
    type: ChatActions.CREATE_CHANNEL_LOADING,
    payload
})
export const sendFirstMsgNotification = (payload:IFirstMsgSend): ChatActionTypes => ({
    type: ChatActions.SEND_FIRST_MSG_NOTIFICATION,
    payload
})