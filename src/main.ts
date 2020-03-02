import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as helmet from "helmet";
import envConfig from "./environment.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  if (envConfig.evironment === "development") {
    // In development environment allow all origins.
    app.enableCors({ origin: "*" });
  }

  // This way we add posibility to authenticate through swagger.
  const securitySchemeObject: any = {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
  };

  const options = new DocumentBuilder()
    .setTitle("Bookshelf API")
    .setDescription("Bookshelf API end points")
    .setVersion("1.0")
    .addBearerAuth(securitySchemeObject)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(envConfig.app_port);
}
bootstrap();
