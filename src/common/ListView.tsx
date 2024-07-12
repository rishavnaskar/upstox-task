import {FlashList} from '@shopify/flash-list';
import React, {useContext, useEffect} from 'react';
import {
  CommonStateType,
  HoldingTypeWithComputedData,
  ThemeColorsType,
} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {HoldingsActions} from '../redux/actions';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {ThemeContext} from '../containers/ThemeContext';

const ListView = () => {
  const holdingsLoading = useSelector(
    (state: CommonStateType) => state.holdingsLoading,
  );
  const holdings = useSelector((state: CommonStateType) => state.holdings);
  const holdingsError = useSelector(
    (state: CommonStateType) => state.holdingsError,
  );

  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);
  const dispatch = useDispatch();

  const renderSeparatorComponent = () => {
    return <View style={styles.divider} />;
  };

  const renderListRow = ({
    leftText,
    rightText,
  }: {
    leftText: {text: string; style: StyleProp<TextStyle>};
    rightText: {key: string; value: string};
  }) => {
    return (
      <View style={styles.listRow}>
        <Text style={leftText.style}>{leftText.text}</Text>
        <View style={styles.listAmountRow}>
          <Text style={styles.textStyle}>{rightText.key}</Text>
          <Text style={styles.boldTextStyle}>
            ₹ {(+rightText.value).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item}: {item: HoldingTypeWithComputedData}) => {
    return (
      <View style={styles.container}>
        {renderListRow({
          leftText: {text: item.symbol, style: styles.boldTextStyle},
          rightText: {key: 'LTP: ', value: item.ltp.toString()},
        })}
        {renderListRow({
          leftText: {text: item.quantity.toString(), style: styles.textStyle},
          rightText: {key: 'P/L: ', value: item.profitAndLoss.toFixed(2)},
        })}
      </View>
    );
  };

  useEffect(() => {
    dispatch(HoldingsActions.GetHoldingsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (holdingsLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingContainer}
        size="large"
        color={theme.primaryAccentColor}
      />
    );
  }

  if (holdingsError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={[styles.textStyle, styles.errorHeading]}>Error!</Text>
        <Text>{holdingsError?.message}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={holdings}
      estimatedItemSize={40}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparatorComponent}
      keyExtractor={item => item.symbol}
      extraData={theme}
    />
  );
};

const useStyles = (theme: ThemeColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.secondaryBackgroundColor,
    },
    listRow: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: 4,
    },
    listAmountRow: {
      flexDirection: 'row',
    },
    divider: {
      height: 1,
      color: theme.primaryBackgroundColor,
    },
    textStyle: {
      color: theme.textPrimaryColor,
    },
    boldTextStyle: {
      fontWeight: 'bold',
      color: theme.textPrimaryColor,
    },
    loadingContainer: {
      flex: 1,
    },
    errorHeading: {
      color: 'red',
      fontSize: 32,
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ListView;
