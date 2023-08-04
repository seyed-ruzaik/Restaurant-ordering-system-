import {Model, Column, Table, BelongsTo, ForeignKey, HasMany, AutoIncrement, PrimaryKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import User from "./user";
import OrderItem from "./orderItem";

@Table(
    { tableName: "orders",
        timestamps: true
})
export default class Order extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id?: number;

    @ForeignKey(() => User)
    @Column(DataTypes.INTEGER)
    user_id?: number;

    @Column(DataTypes.FLOAT)
    total_amount?: number;

    @Column(DataTypes.STRING)
    status?: string;

    @BelongsTo(() => User)
    user?: User;

    @HasMany(() => OrderItem)
    order_items?: OrderItem[];
}
