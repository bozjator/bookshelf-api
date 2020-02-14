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
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiOperation
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthorsService } from "./author.service";
import { Author } from "./author.entity";
import { AuthorCreated } from "./dtos/AuthorCreated.dto";
import { AuthorWithBooks } from "./dtos/AuthorWithBooks.dto";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("authors")
@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: "Get all authors without books." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Author]
  })
  @Get()
  async getAll() {
    return this.authorsService.getAll();
  }

  @ApiOperation({ summary: "Get all authors with books." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [AuthorWithBooks]
  })
  @Get("with-books")
  async getAllWithBooks() {
    return this.authorsService.getAllWithBooks();
  }

  @ApiOperation({ summary: "Get the author, without books, by author id." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Author
  })
  @ApiParam({ name: "authorId" })
  @Get(":authorId")
  async getOne(@Param("authorId") authorId: number) {
    return this.authorsService.getOne(authorId);
  }

  @ApiOperation({ summary: "Get the author, with books, by author id." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthorWithBooks
  })
  @ApiParam({ name: "authorId" })
  @Get("with-books/:authorId")
  async getOneWithBooks(@Param("authorId") authorId: number) {
    return this.authorsService.getOneWithBooks(authorId);
  }

  @ApiOperation({ summary: "Create new author." })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthorCreated
  })
  @Post()
  async create(@Body() author: Author) {
    return this.authorsService.create(author);
  }

  @ApiOperation({ summary: "Update properties of the author." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The author was successfuly updated."
  })
  @ApiParam({ name: "authorId" })
  @Patch(":authorId")
  async update(@Param("authorId") authorId: number, @Body() author: Author) {
    return this.authorsService.update(authorId, author);
  }

  @ApiOperation({ summary: "Assign the book to the author." })
  @ApiResponse({
    status: HttpStatus.CREATED
  })
  @ApiParam({ name: "authorId" })
  @ApiParam({ name: "bookId" })
  @Post("assign-book/:authorId/:bookId")
  async assignBookToAuthor(
    @Param("authorId") authorId: number,
    @Param("bookId") bookId: number
  ) {
    return this.authorsService.assignBookToAuthor(authorId, bookId);
  }
}
