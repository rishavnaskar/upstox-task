import {takeEvery} from 'redux-saga/effects';
import {HoldingsActionConstants} from '../../utils/constants';
import {getAllHoldingsDataSaga} from '.';

export function* handler() {
  yield takeEvery(
    HoldingsActionConstants.GET_HOLDINGS_DATA,
    getAllHoldingsDataSaga,
  );
}
