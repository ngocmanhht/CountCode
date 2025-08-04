import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppColor} from '../../const/app-color';
import {AppImages} from '../../const/app-images';
import {useNavigation} from '@react-navigation/native';
import {AppScreen} from '../../const/app-screen';

const SplashScreen = () => {
  const deviceWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(AppScreen.InputScreen as never);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={{
            width: deviceWidth * 0.5,
            height: undefined,
            aspectRatio: 1,
            marginBottom: 10,
          }}
          resizeMode="contain"
          source={AppImages.logo}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
