/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InputScreen from './src/screens/input-screen';
import ScannerScreen from './src/screens/scanner';
import {ResultScreen} from './src/screens/results';
import {AppColor} from './src/const/app-color';
import {AppScreen} from './src/const/app-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name={AppScreen.InputScreen}
              component={InputScreen}
            />
            <Stack.Screen
              options={{
                headerTitle: 'Quét mã vạch',
                headerTitleAlign: 'center',
                headerTintColor: AppColor.white,
                headerBackTitle: 'Quay lại',
                headerStyle: {
                  backgroundColor: AppColor.c1e1e1e,
                },
              }}
              name={AppScreen.ScannerScreen}
              component={ScannerScreen}
            />
            <Stack.Screen
              name={AppScreen.ResultScreen}
              component={ResultScreen}
              options={{
                headerTitle: 'Thông số đã quét',
                headerTitleAlign: 'center',
                headerTintColor: AppColor.white,
                headerBackTitle: 'Quay lại',
                headerStyle: {
                  backgroundColor: AppColor.primary,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
