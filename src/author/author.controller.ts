import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Post,
  Body,
  Patch,
  Param
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthorsService } from "./author.service";
import { Author } from "./author.entity";
import { AuthorCreated } from "./dtos/AuthorCreated.dto";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("authors")
@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAll() {
    return this.authorsService.getAll();
  }

  @ApiParam({ name: "authorId" })
  @Get(":authorId")
  async getOne(@Param("authorId") authorId: number) {
    return this.authorsService.getOne(authorId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthorCreated
  })
  @Post()
  async create(@Body() author: Author) {
    return this.authorsService.create(author);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "The author was successfuly updated."
  })
  @ApiParam({ name: "authorId" })
  @Patch(":authorId")
  async update(@Param("authorId") authorId: number, @Body() author: Author) {
    return this.authorsService.update(authorId, author);
  }
}
