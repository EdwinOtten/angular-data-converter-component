import { Component } from '@angular/core'
import { DataConverterConfig } from 'dist/data-converter'
import { AddQuotesDataConverter } from './add-quotes-data-converter'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  config: DataConverterConfig = {
    inputFileExtensions: ['.txt'],
    converterService: new AddQuotesDataConverter(),
    labels: {
      sourceStep: {
        title: 'Text source',
        description: '',
      },
      previewStep: {
        title: 'Result preview',
        description: 'Check out your text, it now has quotes around it!',
      },
      outputStep: {
        title: 'Text output',
        description: 'Download your text with quotes around it below.',
      },

      selectFile: 'Select a .txt file',
    },
  }

}
