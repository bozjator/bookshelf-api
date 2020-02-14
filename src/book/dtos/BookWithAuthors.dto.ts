import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../../author/author.entity";

export class BookWithAuthors {
  @ApiProperty()
  title: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  isbn13: string;

  @ApiProperty()
  isbn10: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  genre: string;

  @ApiProperty({ type: [Author] })
  authors: Author[];
}
