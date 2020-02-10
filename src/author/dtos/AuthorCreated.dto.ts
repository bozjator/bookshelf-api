import { ApiProperty } from "@nestjs/swagger";

export class AuthorCreated {
  @ApiProperty()
  id: number;
}
