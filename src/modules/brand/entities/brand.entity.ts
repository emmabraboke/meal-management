import { Model } from 'objection';

export class Brand extends Model {
  static tableName = 'brands';
  readonly id: string;
  name: string;
  userId: string;
}
