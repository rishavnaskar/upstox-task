import {call, put} from 'redux-saga/effects';
import {HoldingsActions} from '../actions';
import {HoldingsApiResponseType} from '../../types';
import {fetchHoldingsDataService} from '../../api';
import Snackbar from 'react-native-snackbar';

export function* getAllHoldingsDataSaga() {
  try {
    yield put(HoldingsActions.SetHoldingsDataLoading(true));
    const response: Response = yield call(fetchHoldingsDataService);
    if (response.ok) {
      const jsonResponse: HoldingsApiResponseType = yield response.json();
      yield put(HoldingsActions.SetHoldingsDataSuccess(jsonResponse));
    } else {
      throw new Error('API response not 200');
    }
  } catch (error: any) {
    const errorMessage = error?.message
      ? error.message
      : 'Failed to fetch API data';
    console.error('API error: ', error);
    Snackbar.show({text: errorMessage});
    yield put(HoldingsActions.SetHoldingsDataError(new Error(errorMessage)));
  }
}
