import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppColor} from '../../const/app-color';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IRecord} from '../../types/record';
import moment from 'moment';
const {height} = Dimensions.get('window');
const RecordDetailScreen = () => {
  const route = useRoute();
  const {record} = route.params as {
    record: IRecord;
  };
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Chi tiết bản ghi ${moment(
        new Date(record?.createdDate),
      ).format('HH:mm DD/MM/YYYY')}`,
    });
  }, [record]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColor.primary}}>
      <ScrollView scrollEnabled contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Những giá trị thiếu:</Text>
        <View style={styles.table}>
          {record.data
            ?.filter(i => i.isScanned == false)
            ?.map(i => (
              <View
                key={`cell-${i.id}`}
                style={[
                  styles.cell,
                  {
                    borderWidth: 1,
                    backgroundColor: i.isScanned
                      ? AppColor.white
                      : AppColor.gray,
                    borderRadius: 8,
                    borderColor: AppColor.gray,
                  },
                ]}>
                <Text style={styles.cellText}>{i.value}</Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  table: {
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 16,
    color: '#333',
  },
  newDataButton: {
    backgroundColor: AppColor.white,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
    marginBottom: 20,
  },
});
