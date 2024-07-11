import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../utils/colors';
import {Copy} from '../utils/copy';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface Props {
  isBottomSheetOpen: boolean;
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

const Header = ({isBottomSheetOpen, bottomSheetRef}: Props) => {
  const onPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{Copy.headerTitle}</Text>
      <Icon
        name={isBottomSheetOpen ? 'arrow-drop-down' : 'arrow-drop-up'}
        color={'white'}
        size={30}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryAccentColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
  },
});

export default Header;
