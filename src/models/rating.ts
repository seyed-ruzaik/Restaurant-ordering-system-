import {
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Table, ForeignKey, BelongsTo,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Dish from "./dish";
import User from "./user";

@Table({
  tableName: "ratings",
  timestamps: true,
})
export default class Rating extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id?: number;

  @ForeignKey(() => Dish)
  @Column(DataTypes.INTEGER)
  dish_id?: number;

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  user_id?: number;

  @Column(DataTypes.INTEGER)
  rating?: number;

  @BelongsTo(() => Dish)
  dish?: Dish;
}
