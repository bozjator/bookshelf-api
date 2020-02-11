import { DatabaseConstants } from "./database-constants";
import { User } from "../users/user.entity";
import { Author } from "../author/author.entity";
import { Book } from "../book/book.entity";

export const EntitiesProviders_Users = [
  {
    provide: DatabaseConstants.USERS_REPOSITORY,
    useValue: User
  }
];

export const EntitiesProviders_Authors = [
  {
    provide: DatabaseConstants.AUTHORS_REPOSITORY,
    useValue: Author
  }
];

export const EntitiesProviders_Books = [
  {
    provide: DatabaseConstants.BOOKS_REPOSITORY,
    useValue: Book
  }
];
