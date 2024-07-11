import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Header from '../common/Header';
import {Colors} from '../utils/colors';
import ListView from '../common/ListView';
import BottomSheet from '../common/BottomSheet';

const HoldingsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const onChangeBottomSheetState = (index: number) => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isBottomSheetOpen={isBottomSheetOpen}
        bottomSheetRef={bottomSheetRef}
      />
      <ListView />
      <BottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        bottomSheetRef={bottomSheetRef}
        onChangeBottomSheetState={onChangeBottomSheetState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackgroundColor,
  },
});

export default HoldingsScreen;
