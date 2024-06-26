import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { getAppointmentApi, getFeedbackListApi, givFeedbackApi, raiseDisputeApi, rescheduleAppontmentApi, viewAppointmentApi } from '../requests/appointmentRequest';
import { AppointmentActionTypes, AppointmentActions } from '@/redux/action-types/appointmentActionTypes';
import { UdateFeedbackList, appointmentListLoader, getAppointmentList, givFeedbackLoader, rescheduleAppontment, rescheduleAppontmentLoader, resetAppointmentList, setAppointmentList, setFeedbackList, setFeedbackListLoader, setViewAppointment, viewAppointmentLoader } from '@/redux/actions/appointmentActions';
import { toast } from 'react-toastify';
import { IAppointmentData } from '@/types/appointmentInterface';
import { IReviewsRatingList, IReviewsRatingUpdate } from '@/types/providerServicesInterface';


function* getAppointmentHandler(action: AppointmentActionTypes) {
    yield put(appointmentListLoader(true));
    try {
        const { data } = yield call(getAppointmentApi, action.payload);
        if (data.status) {
            const setDataAppointement: IAppointmentData = {
                data: data.data,
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setAppointmentList(setDataAppointement));
        } else {
            const setDataAppointement: IAppointmentData = {
                data: data?.data,
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
            yield put(setAppointmentList(setDataAppointement));
        }
    } catch (error: any) {

        // yield put(setAppointmentList((error?.response?.data)))
    } finally {
        yield put(appointmentListLoader(false));
    }
}
function* viewAppointmentHandler(action: AppointmentActionTypes) {
    yield put(viewAppointmentLoader(true));
    try {
        const { data } = yield call(viewAppointmentApi, action.payload);
        if (data.status) {
            yield put(setViewAppointment(data.data));
        }
    } catch (error: any) {

    } finally {
        yield put(viewAppointmentLoader(false));
    }
}

function* rescheduleAppontmentHandler(action: AppointmentActionTypes) {
    yield put(rescheduleAppontmentLoader(true));
    try {
        const { data } = yield call(rescheduleAppontmentApi, action.payload);
        if (data.status) {
            yield put({ type: AppointmentActions.RESCHEDULE_APPONTMENT_SUCCESS, payload: true });
            const reqObj = {
                search: '',
                page: 1,
            }
            yield put(getAppointmentList(reqObj));
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.error(error.response.data.errors.form_errors.appointment_datetime, {
            position: toast.POSITION.TOP_RIGHT,
        });
        const appointmentPaylod = {
            search: '',
            page: 0,
        }
        yield put(getAppointmentList(appointmentPaylod))
    } finally {
        yield put(rescheduleAppontmentLoader(false));
    }
}


function* raiseDisputeHandler(action: AppointmentActionTypes) {
    yield put(appointmentListLoader(true));
    try {
        const { data } = yield call(raiseDisputeApi, action.payload);
        if (data.status) {
            const reqObj = {
                search: '',
                page: 1,
            }
            yield put(getAppointmentList(reqObj));
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
        }
    } catch (error: any) {
        toast.error(error.response.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield delay(1000)
        yield put(appointmentListLoader(false));
    }
}



function* givFeedbackHandler(action: AppointmentActionTypes) {
    yield put(givFeedbackLoader(true));
    try {
        const { data } = yield call(givFeedbackApi, action.payload);
        if (data.status) {
            const ratingPaylod:IReviewsRatingUpdate ={
                appointments_id:data?.data?.appointments_id,
                is_rating_allowed:false,
            }
            yield put(UdateFeedbackList(ratingPaylod))
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
        }
    } catch (error: any) {
        toast.error(error.response.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(givFeedbackLoader(false));
    }
}

function* getFeedbackListHandler(action: AppointmentActionTypes) {
    yield put(setFeedbackListLoader(true));
    try {
        const { data } = yield call(getFeedbackListApi, action.payload);
        if (data.status) {
            const ratingListData: IReviewsRatingList = {
                data: data?.data,
                meta_params: {
                    current_page: data.meta_params.pagination.current_page,
                    last_page: data.meta_params.pagination.last_page,
                    path: data.meta_params.pagination.path,
                    per_page: data.meta_params.pagination.per_page,
                    total_count: data.meta_params.pagination.total_count,
                    nextPage: data.meta_params.pagination?.current_page + 1,
                    hasMorePage: (data?.meta_params?.pagination?.current_page < data?.meta_params?.pagination?.last_page) ? true : false,
                }
            }
           yield put(setFeedbackList(ratingListData))
        } 
    } catch (error: any) {
        toast.error(error.response.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(setFeedbackListLoader(false));
    }
}

export default function* appointmentSaga() {
    yield takeLatest(AppointmentActions.GET_APPOINTMENT_LIST, getAppointmentHandler);
    yield takeLatest(AppointmentActions.GET_VIEW_APPONTMENT, viewAppointmentHandler);
    yield takeLatest(AppointmentActions.RESCHEDULE_APPONTMENT, rescheduleAppontmentHandler);
    yield takeLatest(AppointmentActions.RAISE_DISPUTE, raiseDisputeHandler);
    yield takeLatest(AppointmentActions.GIV_FEEDBACK, givFeedbackHandler);
    yield takeLatest(AppointmentActions.GET_FEEDBACK_LIST,  getFeedbackListHandler);
}