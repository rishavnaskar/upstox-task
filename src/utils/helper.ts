import {
  HoldingType,
  HoldingTypeWithComputedData,
  PortfolioDataType,
} from '../types';

/**
 *
 * @param item Holding(stock) item
 * @returns computed P/L value of that stock
 */
export const getPandL = (item: HoldingType) => {
  const currentValue = item.ltp * item.quantity;
  const investmentValue = item.avgPrice * item.quantity;
  const PandL = currentValue - investmentValue;
  return PandL.toFixed(2);
};

export const getHoldingsData = (
  userHolding: HoldingType[],
): HoldingTypeWithComputedData[] => {
  return userHolding.map(val => {
    const currentValue = val.ltp * val.quantity;
    const investmentValue = val.avgPrice * val.quantity;
    return {
      ...val,
      currentValue,
      investmentValue,
      profitAndLoss: currentValue - investmentValue,
      todayProfitAndLoss: (val.close - val.ltp) * val.quantity,
    };
  });
};

export const getInitalPortfolioData = (): PortfolioDataType => ({
  totalCurrentValue: 0,
  totalProfitAndLoss: 0,
  todayProfitAndLoss: 0,
  totalInvestment: 0,
});

export const getPortfolioComputedData = (
  holdingsData: HoldingTypeWithComputedData[],
): PortfolioDataType => {
  const totalCurrentValue = holdingsData.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );
  const totalInvestment = holdingsData.reduce(
    (sum, item) => sum + item.investmentValue,
    0,
  );
  const totalProfitAndLoss = totalCurrentValue - totalInvestment;
  const todayProfitAndLoss = holdingsData.reduce(
    (sum, item) => sum + item.todayProfitAndLoss,
    0,
  );
  return {
    totalCurrentValue,
    totalInvestment,
    totalProfitAndLoss,
    todayProfitAndLoss,
  };
};
