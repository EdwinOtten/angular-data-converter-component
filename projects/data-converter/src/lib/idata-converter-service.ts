export interface IDataConverterService {
  convertFileToPreview(file: File): Promise<PreviewResult>;
  convertFileToOutput(file: File): Promise<OutputResult>;
}

export interface PreviewResult {
  columns: string[];
  rows: { [key:string]: string }[];
}

export interface OutputResult {
  data: any;
  filename: string;
  mimetype: string;
}
