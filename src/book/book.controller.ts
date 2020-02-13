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
import { BooksService } from "./book.service";
import { BookCreated } from "./dtos/BookCreated.dto";
import { Book } from "./book.entity";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: "Get all books without authors." })
  @Get()
  async getAll() {
    return this.booksService.getAll();
  }

  @ApiOperation({ summary: "Get all books with authors." })
  @Get("with-authors")
  async getAllWithAuthors() {
    return this.booksService.getAllWithAuthors();
  }

  @ApiOperation({ summary: "Get the book, without authors, by book id." })
  @ApiParam({ name: "bookId" })
  @Get(":bookId")
  async getOne(@Param("bookId") bookId: number) {
    return this.booksService.getOne(bookId);
  }

  @ApiOperation({ summary: "Get the book, with authors, by book id." })
  @ApiParam({ name: "bookId" })
  @Get("with-authors/:bookId")
  async getOneWithAuthors(@Param("bookId") bookId: number) {
    return this.booksService.getOneWithAuthors(bookId);
  }

  @ApiOperation({ summary: "Create new book." })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BookCreated
  })
  @Post()
  async create(@Body() book: Book) {
    return this.booksService.create(book);
  }

  @ApiOperation({ summary: "Update properties of the book." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The book was successfuly updated."
  })
  @ApiParam({ name: "bookId" })
  @Patch(":bookId")
  async update(@Param("bookId") bookId: number, @Body() book: Book) {
    return this.booksService.update(bookId, book);
  }
}
