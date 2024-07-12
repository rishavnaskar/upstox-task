import React, {createContext, useState} from 'react';
import {darkThemeColors, lightThemeColors} from '../utils/colors';
import {ThemeContextType} from '../types';
import Snackbar from 'react-native-snackbar';

export const ThemeContext = createContext<ThemeContextType>({
  isDarkModeOn: false,
  theme: lightThemeColors,
  toggleDarkMode: () => {},
});

const ThemeProvider = ({children}: {children: React.ReactElement}) => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  const handleToggleDarkMode = (previousValue: boolean) => {
    setIsDarkModeOn(!previousValue);
    Snackbar.show({text: previousValue ? 'Dark mode off' : 'Dark mode on'});
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDarkModeOn ? darkThemeColors : lightThemeColors,
        isDarkModeOn,
        toggleDarkMode: () => handleToggleDarkMode(isDarkModeOn),
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
