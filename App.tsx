import React from 'react';
import HoldingsScreen from './src/containers/HoldingsScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeProvider from './src/containers/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <Provider store={store}>
          <HoldingsScreen />
        </Provider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default App;
