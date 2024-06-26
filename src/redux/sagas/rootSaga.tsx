import { all, call } from 'redux-saga/effects';
import userSaga from './handlers/userHandlers';
import appointmentSaga from './handlers/appointmentHandlers';
import chatSaga from './handlers/chatHandlers';
import companySaga from './handlers/companyHandlers';
import fundManagementSaga from './handlers/fundManagementHandlers';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(appointmentSaga),
        call(chatSaga),
        call(companySaga),
        call(fundManagementSaga),
    ]);
}
