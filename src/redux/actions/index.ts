import {HoldingsApiResponseType} from '../../types';
import {
  GetHoldingsActionType,
  SetHoldingsDataFailureActionType,
  SetHoldingsDataLoadingActionType,
  SetHoldingsDataSuccessActionType,
} from '../../types/actionTypes';
import {HoldingsActionConstants} from '../../utils/constants';

const GetHoldingsData = (): GetHoldingsActionType => {
  return {
    type: HoldingsActionConstants.GET_HOLDINGS_DATA,
    payload: null,
  };
};

const SetHoldingsDataLoading = (
  val: boolean,
): SetHoldingsDataLoadingActionType => {
  return {
    type: HoldingsActionConstants.SET_HOLDINGS_DATA_LOADING,
    payload: val,
  };
};

const SetHoldingsDataSuccess = (
  val: HoldingsApiResponseType,
): SetHoldingsDataSuccessActionType => {
  return {
    type: HoldingsActionConstants.SET_HOLDINGS_DATA_SUCCESS,
    payload: val,
  };
};

const SetHoldingsDataError = (val: Error): SetHoldingsDataFailureActionType => {
  return {
    type: HoldingsActionConstants.SET_HOLDINGS_DATA_FAILURE,
    payload: val,
  };
};

export const HoldingsActions = {
  GetHoldingsData,
  SetHoldingsDataLoading,
  SetHoldingsDataSuccess,
  SetHoldingsDataError,
};
