import {Model, Column, Table, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Dish from "./dish";
import Order from "./order";

@Table({
    tableName: "orderitems",
    timestamps: true
})
export default class OrderItem extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id?: number;

    @ForeignKey(() => Order)
    @Column(DataTypes.INTEGER)
    order_id?: number;

    @ForeignKey(() => Dish)
    @Column(DataTypes.INTEGER)
    dish_id?: number;

    @Column(DataTypes.INTEGER)
    quantity?: number;

    @Column(DataTypes.FLOAT)
    price?: number;

    @BelongsTo(() => Order)
    order?: Order;

    @BelongsTo(() => Dish)
    dish?: Dish;
}
