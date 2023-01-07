import { Model } from 'objection';

export class AddonCategory extends Model {
  static tableName = 'addonCategories';
  readonly id: string;
  name: string;
  brandId: string
}
