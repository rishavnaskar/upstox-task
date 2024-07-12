import {CommonStateType, HoldingsApiResponseType} from '../../types';
import {HoldingsActionTypes} from '../../types/actionTypes';
import {HoldingsActionConstants} from '../../utils/constants';
import {
  getHoldingsData,
  getInitalPortfolioData,
  getPortfolioComputedData,
} from '../../utils/helper';
import {initialState} from '../state';

const setHoldingsDataLoading = (
  state: CommonStateType,
  payload: boolean,
): CommonStateType => {
  return {
    ...state,
    holdingsLoading: payload,
    holdings: [],
    portfolioData: getInitalPortfolioData(),
    holdingsError: null,
  };
};

const setHoldingsDataSuccess = (
  state: CommonStateType,
  payload: HoldingsApiResponseType,
): CommonStateType => {
  const holdings = getHoldingsData(payload.data.userHolding);
  const portfolioData = getPortfolioComputedData(holdings);
  return {
    ...state,
    holdingsLoading: false,
    holdings,
    portfolioData,
    holdingsError: null,
  };
};

const setHoldingsDataFailure = (
  state: CommonStateType,
  payload: Error,
): CommonStateType => {
  return {
    ...state,
    holdingsLoading: false,
    holdings: [],
    portfolioData: getInitalPortfolioData(),
    holdingsError: payload,
  };
};

export const reducer = (state = initialState, action: HoldingsActionTypes) => {
  switch (action.type) {
    case HoldingsActionConstants.SET_HOLDINGS_DATA_LOADING:
      return setHoldingsDataLoading(state, action.payload as boolean);
    case HoldingsActionConstants.SET_HOLDINGS_DATA_SUCCESS:
      return setHoldingsDataSuccess(
        state,
        action.payload as HoldingsApiResponseType,
      );
    case HoldingsActionConstants.SET_HOLDINGS_DATA_FAILURE:
      return setHoldingsDataFailure(state, action.payload as Error);
    default:
      return state;
  }
};
