import { Injectable, Inject } from "@nestjs/common";
import { DatabaseConstants } from "../database/database-constants";
import { Author } from "./author.entity";
import { AuthorCreated } from "./dtos/AuthorCreated.dto";
import { BookAuthor } from "../entities/book-author.entity";
import { Book } from "../book/book.entity";

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(DatabaseConstants.AUTHORS_REPOSITORY)
    private readonly authorsRepository: typeof Author,
    @Inject(DatabaseConstants.BOOKSAUTHORS_REPOSITORY)
    private readonly booksAuthorsRepository: typeof BookAuthor
  ) {}

  getAll(): Promise<[Author]> {
    return this.authorsRepository.findAll();
  }

  getOne(authorId: number): Promise<Author> {
    return this.authorsRepository.findByPk(authorId);
  }

  getOneWithBooks(authorId: number): Promise<Author> {
    return this.authorsRepository.findByPk(authorId, { include: [Book] });
  }

  async create(author: Author): Promise<AuthorCreated> {
    const newAuthor = await this.authorsRepository.create(author);
    const newAuthorPlain: Author = <Author>newAuthor.get({ plain: true });
    const authorCreated: AuthorCreated = { id: newAuthorPlain.id };
    return authorCreated;
  }

  async update(authorId: number, author: Author) {
    const propsToUpdate = {};
    for (var prop in author) {
      propsToUpdate[prop] = author[prop];
    }
    return await this.authorsRepository.update(propsToUpdate, {
      where: {
        id: authorId
      }
    });
  }

  assignBookToAuthor(authorId: number, bookId: number) {
    const bookAuthor = {
      bookId,
      authorId
    };
    return this.booksAuthorsRepository.create(bookAuthor);
  }
}
