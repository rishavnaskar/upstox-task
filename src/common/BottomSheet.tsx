import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {RefObject} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../types';

interface Props {
  isBottomSheetOpen: boolean;
  bottomSheetRef: RefObject<BottomSheetModal>;
  onChangeBottomSheetState: (index: number) => void;
}

const BottomSheet = ({
  isBottomSheetOpen,
  bottomSheetRef,
  onChangeBottomSheetState,
}: Props) => {
  const holdingsLoading = useSelector(
    (state: CommonStateType) => state.holdingsLoading,
  );
  const portfolioData = useSelector(
    (state: CommonStateType) => state.portfolioData,
  );
  const holdingsError = useSelector(
    (state: CommonStateType) => state.holdingsError,
  );

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
      <Text style={styles.textStyle}>₹ {value}</Text>
    </View>
  );

  const renderView = () => {
    if (holdingsLoading) {
      return (
        <ActivityIndicator
          style={styles.loadingContainer}
          size="large"
          color={Colors.primaryAccentColor}
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
      name={isBottomSheetOpen ? 'arrow-drop-down' : 'arrow-drop-up'}
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
        backgroundStyle={styles.container}
        onChange={onChangeBottomSheetState}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          {renderView()}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackgroundColor,
  },
  indicatorStyle: {
    color: Colors.primaryAccentColor,
    alignSelf: 'center',
  },
  bottomSheetContainer: {
    flex: Platform.select({ios: 0}),
    paddingBottom: Platform.select({android: 20}),
    minHeight: 20,
  },
  loadingContainer: {
    height: 100,
    backgroundColor: Colors.primaryBackgroundColor,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackgroundColor,
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
    color: Colors.textPrimaryColor,
    fontSize: 16,
  },
  boldTextStyle: {
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    backgroundColor: Colors.primaryBackgroundColor,
  },
  lastRowItem: {
    marginTop: 40,
  },
});

export default BottomSheet;
