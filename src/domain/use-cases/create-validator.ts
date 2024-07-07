import { CouldNotWrite } from "@/domain/entities/errors";
import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists,
} from "@/domain/contracts";
import {
  PATH_VALIDATION,PATH_VALIDATION_TEST,VALIDATION_PATH
} from "@/constants";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import { TitleConversion } from "@/domain/entities";
import { ConstructorFile } from "../entities/constructor-file";

export class CreateValidator {
  constructor(
    private readonly fileStorage: ReadFile &
      WriteFile &
      FolderExists &
      MakeDir &
      AppendFile &
      FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(
    pathFull: string,
    name = "Validator",
    test = true,
    properites = undefined,
    onlyTest = false
  ): string {
    const { UpperCase, titleFormated, path } = new TitleConversion(name).getFormatedFields();

    const constructorFile = new ConstructorFile(
      this.fileStorage,
      this.pathResolver,
      this.logger,
      {
        UpperCase,
        properites,
        pathFull,
        path,
        titleFormated
      }
    )

    if (!onlyTest) {
      constructorFile
        .mountFile({
          pathfileString: PATH_VALIDATION,
          fullPathFolder: VALIDATION_PATH,
        })

    }

    if (onlyTest || test) {
      constructorFile.mountFileTest({
        fullPathFolder: VALIDATION_PATH,
        pathfileString: PATH_VALIDATION_TEST
      })
    }

    return '';
  }
}


