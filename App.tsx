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
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/splash';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HistoryScreen from './src/screens/history';
import RecordDetailScreen from './src/screens/record-details';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name={AppScreen.SplashScreen}
              component={SplashScreen}
            />
            {/* <Stack.Screen
              options={{headerShown: false}}
              name={AppScreen.LoginScreen}
              component={LoginScreen}
            /> */}
            <Stack.Screen
              options={{headerShown: false}}
              name={AppScreen.RegisterScreen}
              component={RegisterScreen}
            />
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

            <Stack.Screen
              name={AppScreen.HistoryScreen}
              component={HistoryScreen}
              options={{
                headerTitle: 'Lịch sử quét',
                headerTitleAlign: 'center',
                headerTintColor: AppColor.white,
                headerBackTitle: 'Quay lại',
                headerStyle: {
                  backgroundColor: AppColor.primary,
                },
              }}
            />

            <Stack.Screen
              name={AppScreen.RecordDetailScreen}
              component={RecordDetailScreen}
              options={{
                headerTitle: 'Chi tiết',
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
      <Toast />
    </>
  );
}

export default App;
