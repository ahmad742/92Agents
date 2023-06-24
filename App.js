import "react-native-gesture-handler"
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Navigator from "./src/Navigation/MainStack";
import { LogBox } from 'react-native';
import { Provider } from "react-redux";
import { store } from './src/Redux'

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {



  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

export default App

