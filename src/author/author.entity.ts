import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table
export class Author extends Model<Author> {
  @ApiProperty()
  @AllowNull(false)
  @Column
  firstName: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  middleName: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  lastName: string;

  @ApiProperty({ example: "1967-01-28" })
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  bornDate: Date;

  @ApiProperty({ example: "2020-01-28" })
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  diedDate: Date;

  @ApiProperty()
  @AllowNull(false)
  @Column
  shortInfo: string;
}
