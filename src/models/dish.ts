import { Model, Column, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Category from "./category";

@Table({ tableName: "dishes", timestamps: true })
export default class Dish extends Model<Dish> {
    @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
    id?: number;

    @Column(DataTypes.STRING)
    name?: string;

    @Column(DataTypes.TEXT)
    description?: string;

    @Column(DataTypes.FLOAT)
    price?: number;

    @Column(DataTypes.STRING)
    image?: string;

    // Define the foreign key for the association with Category
    @ForeignKey(() => Category)
    @Column(DataTypes.INTEGER)
    category_id?: number;

    // Define the BelongsTo association with Category
    @BelongsTo(() => Category)
    category?: Category;
}
