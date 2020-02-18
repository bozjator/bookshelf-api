import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../book/book.entity";

export class UserListEntry {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userListTypeId: number;

  @ApiProperty()
  book: Book;
}
