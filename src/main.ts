import * as helmet from "helmet";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from "./common/logger/custom-logger.service";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["production", "staging"].includes(process.env.NODE_ENV) ? new CustomLogger() : ["log", "error", "debug"],
  });

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(3000);
}
bootstrap();
