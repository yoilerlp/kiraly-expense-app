export type LoadedFile = {
  fileName: string;
  type: string;
  mimeType: string;
  size: number;
  uri: string;

  base64?: string;
  id?: string;
  isNew?: boolean;
};

export type UploaderResult = {
  onResult: (result: LoadedFile) => void;
  renderComponent?: (onPress: () => void) => React.ReactNode;
};

export type FileItemDb = {
  id: string;
  key: string;
  name: string;
  type: string;
  url: string;
  size: number;
};
