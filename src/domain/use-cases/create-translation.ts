import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists,
} from "@/domain/contracts";
import {
  TRANSLATION_MAIN_PATH,
  PATH_MAIN_TRANSLATION,
  PATH_MAIN_TRANSLATION_TEST,
} from "@/constants";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import { TitleConversion } from "@/domain/entities";
import { ConstructorFile } from "../entities/constructor-file";

export class CreateTranslation {
  constructor(
    private readonly fileStorage: ReadFile &
      WriteFile &
      FolderExists &
      MakeDir &
      AppendFile &
      FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) {}

  handle(
    pathFull: string,
    name = "Translation",
    test = true,
    properites = undefined,
    onlyTest = false
  ): string {
    const { UpperCase, titleFormated, path } = new TitleConversion(
      name
    ).getFormatedFields();

    const constructorFile = new ConstructorFile(
      this.fileStorage,
      this.pathResolver,
      this.logger,
      {
        UpperCase,
        properites,
        pathFull,
        path,
        titleFormated,
      }
    );

    if (!onlyTest) {
      constructorFile.mountFile({
        pathfileString: PATH_MAIN_TRANSLATION,
        fullPathFolder: TRANSLATION_MAIN_PATH,
      });
    }

    if (onlyTest || test) {
      constructorFile.mountFileTest({
        fullPathFolder: TRANSLATION_MAIN_PATH,
        pathfileString: PATH_MAIN_TRANSLATION_TEST,
      });
    }

    return "";
  }
}
