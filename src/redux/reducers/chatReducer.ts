import { ChatActions } from "../action-types/chatActionTypes";
import { ChatActionTypes } from "../action-types/chatActionTypes";
import { IChatInitialState } from "@/types/chatInterface";

const initialState: IChatInitialState = {
    acceptQuotationLoader: false,
    rejectQuotationLoader: false,
    orderStatusUpdateLoader: false,
    createChannelLoading:false,
    orderStatus:{
        chat_id:'',
        status:false,
    },
}

export default function chatReducer(state = initialState, action: ChatActionTypes): IChatInitialState {
    switch (action.type) {
        case ChatActions.ACCEPT_QUOTATION_LOADER: {
            return {
                ...state,
                acceptQuotationLoader: action.payload
            };
        }
        case ChatActions.REJECT_QUOTATION_LOADER: {
            return {
                ...state,
                rejectQuotationLoader: action.payload
            };
        }
        case ChatActions.ORDER_STATUS_UPDATE_LOADER: {
            return {
                ...state,
                orderStatusUpdateLoader: action.payload
            };
        }
        case ChatActions.CREATE_CHANNEL_LOADING: {
            return {
                ...state,
                createChannelLoading: action.payload
            };
        }
        case ChatActions.SET_ORDER_STATUS: {
            return {
                ...state,
                orderStatus: action.payload
            };
        }
        default:
            return state;
    }
}