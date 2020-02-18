import {
  Table,
  Model,
  ForeignKey,
  AllowNull,
  Column,
  BelongsTo
} from "sequelize-typescript";
import { User } from "../../users/user.entity";
import { Book } from "../../book/book.entity";

@Table
export class UserList extends Model<UserList> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Book)
  @AllowNull(false)
  @Column
  bookId: number;

  @AllowNull(false)
  @Column
  userListTypeId: number;

  @BelongsTo(() => Book)
  book: Book;
}
