
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { createChannelApi, orderStatusUpdateApi, quotationUpdateApi, sendFirstMsgApi } from '../requests/chatRequest';
import router from 'next/router';
 import { toast } from 'react-toastify';
import { ChatActionTypes, ChatActions } from '../../action-types/chatActionTypes';
import { acceptQuotationLoader, createChannelLoading, orderStatus, orderStatusUpdateLoader, rejectQuotationLoader } from '../../actions/chatActions';
import { IOrderStatus } from '../../../types/chatInterface';
import { getProfileData } from '@/redux/actions/userActionTypes';


function* updateQuotationStatusHandler(action: ChatActionTypes) {
    const { payload } = action;
    // Start loading state based on action type
    yield put(payload.status === "accept" ? acceptQuotationLoader(true) : rejectQuotationLoader(true));
    try {
        const { data } = yield call(quotationUpdateApi, action.payload);
        if (data.status) {
            //   yield put(setAppointmentList(data.data));
             yield put(getProfileData())
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            router.push(data?.data?.checkout_url);
           yield put(getProfileData())
        } else {
            // yield put(setAppointmentList(data.data));
            toast.error(data?.errors.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {

        // yield put(setAppointmentList((error?.response?.data)))
    } finally {
        yield put(acceptQuotationLoader(false))
        yield put(rejectQuotationLoader(false))
    }
}

function* orderStatusUpdateHandler(action: ChatActionTypes) {
    yield put(orderStatusUpdateLoader(true))
    try {
        const { data } = yield call(orderStatusUpdateApi, action.payload);
        if (data.status) {
            let orderStatusPaylod:IOrderStatus = {
                status: true,
                chat_id:data?.data?.chat_id,
            }
            yield put(orderStatus(orderStatusPaylod))
        } else {
            toast.error(data?.errors.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            let orderStatusPaylod = {
                status: false,
                chat_id:data?.meta_params?.chat_id,
            }
            yield put(orderStatus(orderStatusPaylod))
        }
    } catch (error: any) {
        console.log(error, "error")
        toast.error(error?.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(orderStatusUpdateLoader(false))
    }
}


function* createChanelHandler(action: ChatActionTypes) {
    yield put(createChannelLoading(true));
    try {
        const { data } = yield call(createChannelApi, action.payload);
        if (data.status) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            router.push(`/chat?${data?.data?.channelType}:${data?.data?.id}`);
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.error(error?.response?.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        yield put(createChannelLoading(false));
    }
}

function* sendFirstMsgHandler(action: ChatActionTypes) {
    // yield put(createChannelLoading(true));
    try {
        const { data } = yield call(sendFirstMsgApi, action.payload);
        if (data.status) {
             toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.error(error?.response?.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        // alert("Sorry. We encountered an error. Please try again.");
    } finally {
        // yield put(createChannelLoading(false));
    }
}


export default function* chatSaga() {
    yield takeLatest(ChatActions.QUOTATION_UPDATE_STATUS, updateQuotationStatusHandler);
    yield takeLatest(ChatActions.ORDER_STATUS_UPDATE, orderStatusUpdateHandler);
    yield takeLatest(ChatActions.CREATE_CHANNEL, createChanelHandler);
    yield takeLatest(ChatActions.SEND_FIRST_MSG_NOTIFICATION, sendFirstMsgHandler);

}