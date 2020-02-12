import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { Book } from "../book/book.entity";
import { Author } from "../author/author.entity";

@Table
export class BookAuthor extends Model<BookAuthor> {
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
