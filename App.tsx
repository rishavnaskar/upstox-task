import React from 'react';
import HoldingsScreen from './src/containers/HoldingsScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <HoldingsScreen />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
