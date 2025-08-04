import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppColor} from '../../const/app-color';
import {AppFontSize} from '../../const/app-font-size';
import {AppImages} from '../../const/app-images';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {AppScreen} from '../../const/app-screen';

interface ILoginForm {
  userName: string;
  password: string;
}

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<ILoginForm>({
    defaultValues: {},
  });

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColor.primary,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Image
          style={{
            width: 100,
            height: undefined,
            aspectRatio: 1,
            marginBottom: 10,
          }}
          resizeMode="contain"
          source={AppImages.logo}
        />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="userName"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên đăng nhập</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                  }}
                  placeholderTextColor={AppColor.gray}
                  placeholder="Nhập tên đăng nhập"
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{required: true, minLength: 6}}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                  }}
                  placeholderTextColor={AppColor.gray}
                  placeholder="Nhập mật khẩu"
                />
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          disabled={!isValid}
          style={[
            {
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 8,
              width: '100%',
              alignItems: 'center',
            },
            {
              backgroundColor: isValid ? AppColor.white : AppColor.gray,
            },
          ]}
          onPress={() => {
            navigation.navigate(AppScreen.InputScreen as never);
          }}>
          <Text
            style={{
              color: AppColor.black,
              fontSize: AppFontSize.s18,
              fontWeight: 'bold',
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: AppColor.gray,
    backgroundColor: AppColor.white,
    borderRadius: 8,
    padding: 12,
    fontSize: AppFontSize.s16,
    color: AppColor.black,
  },
  label: {
    fontSize: AppFontSize.s16,
    marginBottom: 8,
    color: AppColor.black,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
});
