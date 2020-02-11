import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BooksController } from "./book.controller";
import { BooksService } from "./book.service";
import { EntitiesProviders_Books } from "../database/entities.providers";

@Module({
  imports: [DatabaseModule],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService, ...EntitiesProviders_Books]
})
export class BooksModule {}
