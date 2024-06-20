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
    const titleConversion = new TitleConversion(name);
    const UpperCase = titleConversion.GetCamelCaseName();
    const titleFormated = titleConversion.GetFormatedTitleFileName();
    const path = titleConversion.getPathFromTitle();
    if (!onlyTest) {

      new ConstructorFile(
        this.fileStorage,
        this.pathResolver,
        this.logger
      )
      .mountFile({
        UpperCase,
        pathfileString: PATH_HOOKS_QUERYS,
        fullPathFolder: PATH_HOOKS_QUERYS_APPLICATION,
        path,
        pathFull,
        properites,
        titleFormated
      })
      // start
      // const fileInString = this.fileStorage.readFileString({
      //   path: this.pathResolver.pathresolve(__dirname, PATH_HOOKS_QUERYS),
      // });

      // if (fileInString == null) {
      //   throw new FileNotFound();
      // }

      // const replacedFileString = new FormatDocument(
      //   fileInString,
      //   UpperCase,
      //   properites
      // ).formatDocument();
      // const pathFolder = `${pathFull}/src/${PATH_HOOKS_QUERYS_APPLICATION}`;

      // const createFile = new CreateFile(this.fileStorage, this.pathResolver);
      // const pathToWrite = createFile.createFile(
      //   `${pathFolder}/${path}`,
      //   replacedFileString,
      //   titleFormated
      // );

      // this.logger.log({
      //   message: `\n diretorio de hooks quers ${pathToWrite}`,
      // });

      // createFile.createIndex(path, pathFolder, titleFormated);

      // end

      new ConstructorFile(
        this.fileStorage,
        this.pathResolver,
        this.logger
      )
      .mountFile({
        UpperCase,
        pathfileString: PATH_FACTORY_USE_CASES,
        fullPathFolder: PATH_FACTORY_USE_CASES_APPLICATION,
        path,
        pathFull,
        properites,
        titleFormated
      })

      // const fileFactoryInString = this.fileStorage.readFileString({
      //   path: this.pathResolver.pathresolve(__dirname, PATH_FACTORY_USE_CASES),
      // });

      // const replacedFactoryFileString = new FormatDocument(
      //   fileFactoryInString,
      //   UpperCase,
      //   properites
      // ).formatDocument();
      // const pathFactoryFolder = `${pathFull}/src/${PATH_FACTORY_USE_CASES_APPLICATION}`;
      // const createFactoryFile = new CreateFile(
      //   this.fileStorage,
      //   this.pathResolver
      // );

      // const pathToFactoryWrite = createFactoryFile.createFile(
      //   `${pathFactoryFolder}/${path}`,
      //   replacedFactoryFileString,
      //   titleFormated
      // );

      // this.logger.log({
      //   message: `\n diretorio do factory use cases factory ${pathToFactoryWrite}`,
      // });

      // createFile.createIndex(path, pathFactoryFolder, titleFormated);
    }

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_HOOKS_QUERYS_TEST),
    });

    if (fileInTestString === "") {
      throw new CouldNotWrite();
    }

    // if (onlyTest || test) {
    //   const createFile = new CreateFile(this.fileStorage, this.pathResolver);
    //   const pathTestFolder = `${pathFull}/tests/${PATH_HOOKS_QUERYS_APPLICATION}/${path}`;
    //   const replacedFactoryTestFileString = new FormatDocument(
    //     fileInTestString,
    //     UpperCase,
    //     properites
    //   ).formatDocument();
    //   const pathToWriteTest = createFile.createFile(
    //     pathTestFolder,
    //     replacedFactoryTestFileString,
    //     titleFormated.replace(".ts", ".spec.ts")
    //   );
    //   this.logger.log({
    //     message: `\n diretorio da controller test ${pathToWriteTest}`,
    //   });
    // }

    return fileInTestString;
  }
}


