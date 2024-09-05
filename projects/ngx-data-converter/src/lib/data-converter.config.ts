import { IDataConverterService } from './idata-converter-service'

export interface DataConverterConfig {

    converterService: IDataConverterService;
    inputFileExtensions: string[];

    labels: {
      sourceStep: {
        title: string,
        description: string,
      },
      previewStep: {
        title: string,
        description: string
      },
      outputStep: {
        title: string,
        description: string
      },

      // Optional labels (data-converter.component.ts defines default values for these)
      selectFile?: string,
      browse?: string,
      next?: string,
      download?: string,
      reset?: string,
    };
  }
