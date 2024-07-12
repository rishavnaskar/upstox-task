export type HoldingType = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
};

export type HoldingTypeWithComputedData = HoldingType & {
  profitAndLoss: number;
  currentValue: number;
  investmentValue: number;
  todayProfitAndLoss: number;
};

export type PortfolioDataType = {
  totalCurrentValue: number;
  totalInvestment: number;
  todayProfitAndLoss: number;
  totalProfitAndLoss: number;
};

export type CommonStateType = {
  holdings: HoldingTypeWithComputedData[];
  holdingsLoading: boolean;
  holdingsError: Error | null;
  portfolioData: PortfolioDataType;
};

export type HoldingsApiResponseType = {
  data: {
    userHolding: HoldingType[];
  };
};

export type ThemeColorsType = {
  primaryAccentColor: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  textPrimaryColor: string;
};

export type ThemeContextType = {
  isDarkModeOn: boolean;
  theme: ThemeColorsType;
  toggleDarkMode: () => void;
};
