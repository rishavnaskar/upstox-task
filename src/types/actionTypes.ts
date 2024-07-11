import {HoldingsApiResponseType} from '.';
import {HoldingsActionConstants} from '../utils/constants';

export type GetHoldingsActionType = {
  type: typeof HoldingsActionConstants.GET_HOLDINGS_DATA;
  payload: null;
};

export type SetHoldingsDataLoadingActionType = {
  type: typeof HoldingsActionConstants.SET_HOLDINGS_DATA_LOADING;
  payload: boolean;
};

export type SetHoldingsDataSuccessActionType = {
  type: typeof HoldingsActionConstants.SET_HOLDINGS_DATA_SUCCESS;
  payload: HoldingsApiResponseType;
};

export type SetHoldingsDataFailureActionType = {
  type: typeof HoldingsActionConstants.SET_HOLDINGS_DATA_FAILURE;
  payload: Error;
};

export type HoldingsActionTypes =
  | GetHoldingsActionType
  | SetHoldingsDataLoadingActionType
  | SetHoldingsDataSuccessActionType
  | SetHoldingsDataFailureActionType;
