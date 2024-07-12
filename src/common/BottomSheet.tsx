import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {RefObject, useContext} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {CommonStateType, ThemeColorsType} from '../types';
import {ThemeContext} from '../containers/ThemeContext';

interface Props {
  bottomSheetRef: RefObject<BottomSheetModal>;
}

const BottomSheet = ({bottomSheetRef}: Props) => {
  const holdingsLoading = useSelector(
    (state: CommonStateType) => state.holdingsLoading,
  );
  const portfolioData = useSelector(
    (state: CommonStateType) => state.portfolioData,
  );
  const holdingsError = useSelector(
    (state: CommonStateType) => state.holdingsError,
  );

  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const renderRow = ({
    key,
    value,
    isLastItem,
  }: {
    key: string;
    value: string;
    isLastItem?: boolean;
  }) => (
    <View style={[styles.rowContainer, isLastItem ? styles.lastRowItem : {}]}>
      <Text style={[styles.textStyle, styles.boldTextStyle]}>{key}</Text>
      <Text style={styles.textStyle}>₹ {(+value).toLocaleString()}</Text>
    </View>
  );

  const renderView = () => {
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorHeading}>Error!</Text>
          <Text>{holdingsError?.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.listContainer}>
        {renderRow({
          key: 'Current Value: ',
          value: portfolioData.totalCurrentValue.toFixed(2),
        })}
        {renderRow({
          key: 'Total Investment: ',
          value: portfolioData.totalInvestment.toFixed(2),
        })}
        {renderRow({
          key: "Today's Profit and Loss: ",
          value: portfolioData.todayProfitAndLoss.toFixed(2),
        })}
        {renderRow({
          key: 'Profit and Loss: ',
          value: portfolioData.totalProfitAndLoss.toFixed(2),
          isLastItem: true,
        })}
      </View>
    );
  };

  const handleIndicatorComponent = () => (
    <Icon
      name="arrow-drop-down"
      color={'white'}
      size={40}
      style={styles.indicatorStyle}
      onPress={() => bottomSheetRef.current?.dismiss()}
    />
  );

  const renderBackDropView = (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        backdropComponent={renderBackDropView}
        handleComponent={handleIndicatorComponent}
        backgroundStyle={styles.container}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          {renderView()}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const useStyles = (theme: ThemeColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryBackgroundColor,
    },
    indicatorStyle: {
      color: theme.primaryAccentColor,
      alignSelf: 'center',
    },
    bottomSheetContainer: {
      flex: Platform.select({ios: 0}),
      paddingBottom: Platform.select({android: 20}),
      minHeight: 20,
      backgroundColor: theme.secondaryBackgroundColor,
    },
    loadingContainer: {
      height: 100,
      backgroundColor: theme.secondaryBackgroundColor,
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.secondaryBackgroundColor,
    },
    errorHeading: {
      color: 'red',
      fontSize: 32,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    textStyle: {
      color: theme.textPrimaryColor,
      fontSize: 16,
    },
    boldTextStyle: {
      fontWeight: 'bold',
    },
    listContainer: {
      padding: 16,
      backgroundColor: theme.secondaryBackgroundColor,
    },
    lastRowItem: {
      marginTop: 40,
    },
  });

export default BottomSheet;
