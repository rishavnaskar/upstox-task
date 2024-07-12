import React, {useContext, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Header from '../common/Header';
import ListView from '../common/ListView';
import BottomSheet from '../common/BottomSheet';
import {ThemeContext} from './ThemeContext';
import {ThemeColorsType} from '../types';

const HoldingsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Header bottomSheetRef={bottomSheetRef} />
      <ListView />
      <BottomSheet bottomSheetRef={bottomSheetRef} />
    </SafeAreaView>
  );
};

const useStyles = (theme: ThemeColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
    },
  });

export default HoldingsScreen;
