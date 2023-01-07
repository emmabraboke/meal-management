import { Model } from 'objection';


export class Addon extends Model {
  static tableName = 'addons';
  readonly id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brandId: string
}

