import { Injectable, Inject } from "@nestjs/common";
import { DatabaseConstants } from "../database/database-constants";
import { Book } from "./book.entity";
import { BookCreated } from "./dtos/BookCreated.dto";

@Injectable()
export class BooksService {
  constructor(
    @Inject(DatabaseConstants.BOOKS_REPOSITORY)
    private readonly booksRepository: typeof Book
  ) {}

  getAll(): Promise<[Book]> {
    return this.booksRepository.findAll();
  }

  getOne(bookId: number): Promise<Book> {
    return this.booksRepository.findByPk(bookId);
  }

  async create(book: Book): Promise<BookCreated> {
    const newBook = await this.booksRepository.create(book);
    const newBookPlain: Book = <Book>newBook.get({ plain: true });
    const bookCreated: BookCreated = { id: newBookPlain.id };
    return bookCreated;
  }

  async update(bookId: number, book: Book) {
    const propsToUpdate = {};
    for (var prop in book) {
      propsToUpdate[prop] = book[prop];
    }
    return await this.booksRepository.update(propsToUpdate, {
      where: {
        id: bookId
      }
    });
  }
}
