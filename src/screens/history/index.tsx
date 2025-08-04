import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor} from '../../const/app-color';
import {IRecord} from '../../types/record';
import {asyncStorageService} from '../../services/async-storage';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppScreen} from '../../const/app-screen';

const HistoryScreen = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const navigation = useNavigation<
    NavigationProp<{
      [AppScreen.RecordDetailScreen]: {
        record: IRecord;
      };
    }>
  >();
  const getRecords = async () => {
    const records = await asyncStorageService.getRecords();
    setRecords(records);
  };

  const onDeleteRecord = async (record: IRecord) => {
    Alert.alert(
      'Xóa bản ghi',
      'Bạn có chắc chắn muốn xóa bản ghi này hay không?',
      [
        {
          text: 'Không',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            await asyncStorageService.deleteRecord(record.id);
            await getRecords();
          },
        },
      ],
    );
  };

  const onViewDetail = (record: IRecord) => {
    navigation.navigate(AppScreen.RecordDetailScreen, {
      record,
    });
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColor.primary}}>
      <FlatList
        data={records}
        style={{flex: 1}}
        contentContainerStyle={{
          padding: 16,
          gap: 20,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: AppColor.white}}>
              Không có bản ghi nào
            </Text>
          </View>
        )}
        renderItem={({item}) => (
          <View
            style={{
              padding: 12,
              backgroundColor: AppColor.white,
              borderRadius: 12,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1}}>
              {moment(new Date(item.createdDate)).format('HH:mm DD/MM/YYYY')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                onViewDetail(item);
              }}
              style={{
                padding: 12,
                backgroundColor: AppColor.primary,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: AppColor.white,
                  fontSize: 14,
                }}>
                Xem
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onDeleteRecord(item);
              }}
              style={{
                padding: 12,
                backgroundColor: AppColor.white,
                borderRadius: 8,
              }}>
              <Text style={{color: AppColor.primary, fontSize: 14}}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
