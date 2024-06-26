import { api } from "@/api-config/api";
import { IFirstMsgSend, IQuationUpdatePayload } from "@/types/chatInterface";

export const quotationUpdateApi = async (data: IQuationUpdatePayload) => {
    const payloadQuation = {
        status: data.status,
        type: data?.type
    }
    return await api.put(`quotation/update-status/${data.id}`, payloadQuation);
};
export const orderStatusUpdateApi = async (id: number) => {
    return await api.put(`order/update-status/${id}`);
};


export const createChannelApi = async (id: number) => {
    let userId = {
        user_id: id
    }
    return await api.post(`start-chat`, userId);
};
export const sendFirstMsgApi = async (data: IFirstMsgSend) => {
    return await api.post(`auth/notify-provider`, data);
};