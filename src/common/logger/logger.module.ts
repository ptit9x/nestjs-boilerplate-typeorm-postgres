import { Module, Global } from "@nestjs/common";
import { CustomLogger } from "./custom-logger.service";

@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
