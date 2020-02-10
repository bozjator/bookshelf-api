import { Table, Column, Model, AllowNull } from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
