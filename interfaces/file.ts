export type LoadedFile = {
  fileName: string;
  type: string;
  mimeType: string;
  size: number;
  uri: string;
  
  base64?: string;
  id?: string;
};

export type UploaderResult = {
  onResult: (result: LoadedFile) => void;
};

export type FileItemDb = {
  id: string;
  key: string;
  name: string;
  type: string;
  url: string;
  size: number;
};

