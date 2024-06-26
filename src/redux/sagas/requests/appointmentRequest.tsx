import { api } from "@/api-config/api";
import { IAppointmentPaylod, IFeedbackListPaylod, IGivFeedback, IRaiseDispute, IRescheduleAppontment } from "@/types/appointmentInterface";
import moment from "moment";

export const getAppointmentApi = async (data: IAppointmentPaylod) => {

    const firstDateMoment = moment(data?.date_range?.[0], 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    let firstDate = firstDateMoment.format('YYYY-MM-DD');
    const secondDateMoment = moment(data?.date_range?.[1], 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    let secondDate = secondDateMoment.format('YYYY-MM-DD');

    const date_range = `${firstDate} - ${secondDate}`;

    const isFirstDateInvalid = firstDate === "Invalid date";
    const isSecondDateAvailable = secondDate === "Invalid date";

    const dateRangeParam = isFirstDateInvalid || isSecondDateAvailable ? "" : date_range;

    return await api.get(`appointment?search=${data?.search}&page=${data?.page}&date_range=${`${dateRangeParam}`}`);

};

export const viewAppointmentApi = async (id: number) => {
    return await api.get(`appointment/${id}`);
};
export const rescheduleAppontmentApi = async (data: IRescheduleAppontment) => {
    const originalDateTime = moment(data.appointment_datetime);
    // Format the date and time in the desired format
    const formattedDateTimeStr = originalDateTime.format('YYYY-MM-DD HH:mm:ss');
    const rescheduleAppontmentPayload = {
        appointment_datetime: formattedDateTimeStr

    }
    return await api.put(`appointment/${data.id}/reschedule`, rescheduleAppontmentPayload);
};
export const raiseDisputeApi = async (data: IRaiseDispute) => {
    return await api.post(`dispute`, data);
};

export const givFeedbackApi = async (data: IGivFeedback) => {
    return await api.post(`rating`, data);
};
export const getFeedbackListApi = async (data: IFeedbackListPaylod) => {
    return await api.get(`rating/list?id=${data.id}&page=${data.page}`);
};

