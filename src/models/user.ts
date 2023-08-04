import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model
} from "sequelize-typescript";
import { DataTypes } from "sequelize";


@Table({
  tableName: "users",
  timestamps: true,
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING)
  full_name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING)
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING)
  password!: string;

}
