import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Copy} from '../utils/copy';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../containers/ThemeContext';
import {ThemeColorsType} from '../types';

interface Props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

const Header = ({bottomSheetRef}: Props) => {
  const {isDarkModeOn, theme, toggleDarkMode} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const onPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{Copy.headerTitle}</Text>
      <View style={styles.iconRow}>
        <Icon
          name="keyboard-double-arrow-up"
          size={24}
          color="#FFF"
          style={styles.themeIcon}
          onPress={onPress}
        />
        <Icon
          name={isDarkModeOn ? 'light-mode' : 'dark-mode'}
          size={22}
          color="#FFF"
          style={styles.themeIcon}
          onPress={toggleDarkMode}
        />
      </View>
    </View>
  );
};

const useStyles = (theme: ThemeColorsType) =>
  StyleSheet.create({
    headerContainer: {
      height: 64,
      paddingHorizontal: 16,
      backgroundColor: theme.primaryAccentColor,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 18,
      color: '#FFF',
    },
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeIcon: {
      marginLeft: 12,
    },
  });

export default Header;
