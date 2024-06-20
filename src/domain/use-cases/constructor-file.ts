import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists
} from "@/domain/contracts";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import { FormatDocument, CreateFile } from "@/domain/entities";
import { ReadFileAndGetString } from "./read-file-and-get-string";

interface MountFile {
  UpperCase: string;
  properites: object;
  pathFull: string;
  path: string;
  titleFormated: string;
  fullPathFolder: string;
  pathfileString: string;
}
export class ConstructorFile {
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

  mountFile({ UpperCase, properites, pathFull, path, titleFormated, fullPathFolder, pathfileString }: MountFile) {
    const stringFile = new ReadFileAndGetString(
      this.fileStorage,
      this.pathResolver
    ).getFileString(pathfileString);

    const replacedFileString = new FormatDocument(
      stringFile,
      UpperCase,
      properites
    ).formatDocument();
    const pathFolder = `${pathFull}/src/${fullPathFolder}`;

    const createFile = new CreateFile(this.fileStorage, this.pathResolver);
    const pathToWrite = createFile.createFile(
      `${pathFolder}/${path}`,
      replacedFileString,
      titleFormated
    );

    this.logger.log({ message: `\n diretorio de hooks quers ${pathToWrite}` });

    createFile.createIndex(path, pathFolder, titleFormated);
  }
}
