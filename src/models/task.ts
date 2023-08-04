import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';
import { DataTypes } from "sequelize";


@Table({
    tableName: 'tasks',
    timestamps: true,
})
export default class Task extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    title!: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    status!: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    priority!: string;

    @AllowNull(false)
    @Column(DataTypes.DATEONLY)
    due_date!: Date;
}
