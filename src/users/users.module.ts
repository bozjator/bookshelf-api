import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EntitiesProviders_Users } from "../database/entities.providers";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [DatabaseModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, ...EntitiesProviders_Users]
})
export class UsersModule {}
