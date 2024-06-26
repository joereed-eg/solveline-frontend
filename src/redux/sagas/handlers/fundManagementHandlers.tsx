
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import router from 'next/router';
import { FundManagementActions, FundManagementActionsTypes } from '@/redux/action-types/fundManagementTypes';
import { addFundApi, fundallocationApi, getEmployeeListFroFundAllocationsApi, verifyFundApi } from '../requests/fundManagementRequest';
import { addFundLader, allocateFundSuccess, getEmloyeeListForFundAllocations, setEmloyeeListForFundAllocations, setEmloyeeListForFundAllocationsLoader } from '@/redux/actions/fundManagementActions';
import { orderStatus, orderStatusUpdateLoader } from '@/redux/actions/chatActions';
import { IOrderStatus } from '@/types/chatInterface';
import { toast } from 'react-toastify';
import { getProfileData } from '@/redux/actions/userActionTypes';



function* getEmployeeListFroFundAllocationsHandler() {
    yield put(setEmloyeeListForFundAllocationsLoader(true))
    try {
        const { data } = yield call(getEmployeeListFroFundAllocationsApi);
        if (data.status) {
            yield put(setEmloyeeListForFundAllocations(data?.data))
        }
    } catch (error: any) {

    } finally {

        yield put(setEmloyeeListForFundAllocationsLoader(false))
    }
}

function* fundAllocationsHandler(action: FundManagementActionsTypes) {
    yield put(addFundLader(true))
    try {
        const { data } = yield call(fundallocationApi, action.payload);
        if (data.status) {
            yield put(setEmloyeeListForFundAllocations(data?.data))
            // yield put({ type: FundManagementActions.ALLOCATE_FUND_SUCCESS, payload: true });
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {

    } finally {
        yield put(addFundLader(false))
    }
}
function* addFundHandler(action: FundManagementActionsTypes) {
    yield put(addFundLader(true))

    try {
        const { data } = yield call(addFundApi, action.payload);
        if (data.status) {
            router.push(data?.meta_params?.checkout_url);
        }else{
            toast.error(data?.errors.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } catch (error: any) {
        toast.error(error?.response.data.errors.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(addFundLader(false))
    }
}
function* verifyFundHandler(action: FundManagementActionsTypes) {
    yield put(orderStatusUpdateLoader(true))
    try {
        const { data } = yield call(verifyFundApi, action.payload);
        if (data.status) {
            let orderStatusPaylod: IOrderStatus = {
                status: data.status,
            }
            yield put(orderStatus(orderStatusPaylod))
            yield put(getEmloyeeListForFundAllocations())
            yield put(getProfileData())
        }
    } catch (error: any) {
        toast.error(error?.response.data.errors.form_errors.id, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } finally {
        yield put(orderStatusUpdateLoader(false))
    }
}
export default function* fundManagementSaga() {
    yield takeLatest(FundManagementActions.GET_EMPLOYEE_LIST_FOR_FUND_ALLOCATIONS, getEmployeeListFroFundAllocationsHandler);
    yield takeLatest(FundManagementActions.ALLOCATE_FUND, fundAllocationsHandler);
    yield takeLatest(FundManagementActions.ADD_FUND, addFundHandler);
    yield takeLatest(FundManagementActions.VERIFY_FUND, verifyFundHandler);
}