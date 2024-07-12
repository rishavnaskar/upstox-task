import {CommonStateType} from '../../types';
import {getInitalPortfolioData} from '../../utils/helper';

export const initialState: CommonStateType = {
  holdings: [],
  holdingsLoading: false,
  holdingsError: null,
  portfolioData: getInitalPortfolioData(),
};
