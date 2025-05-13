import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppColor} from '../../const/app-color';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppFontSize} from '../../const/app-font-size';
import {AppScreen} from '../../const/app-screen';
import {ScannedItem} from '../../types/item';

export const ResultScreen = () => {
  const route = useRoute();
  const params = route.params as {
    scannedData?: string[];
    startValue?: string;
    endValue?: string;
  };
  const scannedData = params?.scannedData;
  const startValue = params?.startValue;
  const endValue = params?.endValue;

  const navigation = useNavigation();
  const handleNewData = () => {
    navigation.navigate(AppScreen.InputScreen as never);
  };

  const list: Array<ScannedItem> = useMemo(() => {
    if (scannedData && startValue && endValue) {
      const startValueNum = parseInt(startValue, 10);
      const endValueNum = parseInt(endValue, 10);
      const arrayLength = endValueNum - startValueNum + 1;
      const result: Array<ScannedItem> = [];
      for (let i = 0; i < arrayLength; i++) {
        const value = startValueNum + i;
        const valueString = `${value}`;
        const numberScannedData = scannedData.map(i => parseInt(i, 10));
        const set = new Set(numberScannedData);
        if (set.has(value)) {
          result.push({
            value: valueString,
            isScanned: true,
            id: i,
          });
        } else {
          result.push({id: i, value: valueString, isScanned: false});
        }
      }
      return result;
    }
    return [];
  }, [scannedData, startValue, endValue]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.table}>
          {list?.map(i => (
            <View
              key={`cell-${i.id}`}
              style={[
                styles.cell,
                {
                  borderWidth: 1,
                  backgroundColor: i.isScanned ? AppColor.white : AppColor.gray,
                  borderRadius: 8,
                  borderColor: AppColor.gray,
                },
              ]}>
              <Text style={styles.cellText}>{i.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.newDataButton} onPress={handleNewData}>
        <Text style={styles.newDataButtonText}>Nhập dữ liệu mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.primary,
  },
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
    marginBottom: 20,
  },
  newDataButtonText: {
    color: AppColor.black,
    fontSize: AppFontSize.s16,
    fontWeight: 'bold',
  },
});
