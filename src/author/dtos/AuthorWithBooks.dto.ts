import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../book/book.entity";

export class AuthorWithBooks {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ example: "1967-01-28" })
  bornDate: Date;

  @ApiProperty({ example: "2020-01-28" })
  diedDate: Date;

  @ApiProperty()
  shortInfo: string;

  @ApiProperty({ type: [Book] })
  books: Book[];
}
