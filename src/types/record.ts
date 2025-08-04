import {ScannedItem} from './item';

export type IRecord = {
  id: string;
  createdDate: string;
  createdName: string;
  data: ScannedItem[];
};
