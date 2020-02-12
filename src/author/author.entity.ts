import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../book/book.entity";
import { BookAuthor } from "../entities/book-author.entity";

@Table
export class Author extends Model<Author> {
  @ApiProperty()
  @AllowNull(false)
  @Column
  firstName: string;

  @ApiProperty()
  @AllowNull(true)
  @Column
  middleName: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  lastName: string;

  @ApiProperty({ example: "1967-01-28" })
  @AllowNull(true)
  @Column(DataType.DATEONLY)
  bornDate: Date;

  @ApiProperty({ example: "2020-01-28" })
  @AllowNull(true)
  @Column(DataType.DATEONLY)
  diedDate: Date;

  @ApiProperty()
  @AllowNull(true)
  @Column
  shortInfo: string;

  @BelongsToMany(() => Book, () => BookAuthor)
  books: Array<Book & { BookAuthor: BookAuthor }>;
}
