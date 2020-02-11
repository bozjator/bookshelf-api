import { ApiProperty } from "@nestjs/swagger";

export class BookCreated {
  @ApiProperty()
  id: number;
}
