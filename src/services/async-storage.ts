import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRecord} from '../types/record';

class AsyncStorageService {
  getRecords = async (): Promise<IRecord[]> => {
    try {
      const value = await AsyncStorage.getItem('records');
      if (value !== null) {
        return JSON.parse(value) as IRecord[];
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  saveRecord = async (record: IRecord) => {
    const records = await this.getRecords();
    const newRecord = [...records, record];
    await AsyncStorage.setItem('records', JSON.stringify(newRecord));
  };

  deleteRecord = async (id: string) => {
    const records = await this.getRecords();
    const newRecord = records.filter(record => record.id !== id);
    await AsyncStorage.setItem('records', JSON.stringify(newRecord));
  };

  clear = async () => {
    await AsyncStorage.clear();
  };
}

export const asyncStorageService = new AsyncStorageService();
