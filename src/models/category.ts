import {
  ForeignKey,
  NotEmpty,
  AllowNull,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  Table,
  BelongsTo, HasMany
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Dish from "./dish";

@Table({
  tableName: "categories",
  timestamps: true,
})
export default class Category extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING)
  name!: string;

  @Column(DataTypes.STRING)
  image?: string;

  @HasMany(() => Dish)
  dishes?: Dish[];
}
