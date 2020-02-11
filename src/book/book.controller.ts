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
import { BooksService } from "./book.service";
import { BookCreated } from "./dtos/BookCreated.dto";
import { Book } from "./book.entity";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll() {
    return this.booksService.getAll();
  }

  @ApiParam({ name: "bookId" })
  @Get(":bookId")
  async getOne(@Param("bookId") bookId: number) {
    return this.booksService.getOne(bookId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BookCreated
  })
  @Post()
  async create(@Body() book: Book) {
    return this.booksService.create(book);
  }

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
