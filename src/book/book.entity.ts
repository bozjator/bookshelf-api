import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../author/author.entity";
import { BookAuthor } from "../entities/book-author.entity";

@Table
export class Book extends Model<Book> {
  @ApiProperty()
  @AllowNull(false)
  @Column
  title: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  year: number;

  @ApiProperty()
  @AllowNull(false)
  @Column
  isbn13: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  isbn10: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  summary: string;

  @ApiProperty()
  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @ApiProperty()
  @AllowNull(false)
  @Column
  genre: string;

  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Array<Author & { BookAuthor: BookAuthor }>;
}
