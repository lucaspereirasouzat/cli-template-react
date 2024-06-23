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
  PATH_HOOKS_QUERYS,
  PATH_HOOKS_QUERYS_TEST,
  PATH_HOOKS_QUERYS_APPLICATION,
  PATH_FACTORY_CONTROLLER,
  PATH_FACTORY_USE_CASES_APPLICATION,
  PATH_USE_CASE_GATEWAY,
  PATH_USE_CASE,
  PATH_USE_CASE_TEST,
  PATH_USE_CASE_FACTORY,
  CONTROLLER_FACTORY_PATH,
  PATH_FACTORY_USE_CASES,
  PATH_DATA_USE_CASES,
} from "@/constants";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";
import { ConstructorFile } from "./constructor-file";

export class CreateRequest {
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
    name = "Request",
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
        pathfileString: PATH_HOOKS_QUERYS,
        fullPathFolder: PATH_HOOKS_QUERYS_APPLICATION,
      })
      .mountFile({
        pathfileString: PATH_FACTORY_USE_CASES,
        fullPathFolder: PATH_FACTORY_USE_CASES_APPLICATION,
      })
      .mountFile({
        pathfileString: PATH_USE_CASE,
        fullPathFolder: PATH_DATA_USE_CASES,
      })
    }

    if (onlyTest || test) {
      constructorFile.mountFileTest({
        fullPathFolder: PATH_USE_CASE_TEST,
        pathfileString: PATH_DATA_USE_CASES
      })
    }

    return '';
  }
}


