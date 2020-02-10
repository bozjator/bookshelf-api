import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EntitiesProviders_Authors } from "../database/entities.providers";
import { AuthorsController } from "./author.controller";
import { AuthorsService } from "./author.service";

@Module({
  imports: [DatabaseModule],
  exports: [AuthorsService],
  controllers: [AuthorsController],
  providers: [AuthorsService, ...EntitiesProviders_Authors]
})
export class AuthorsModule {}
