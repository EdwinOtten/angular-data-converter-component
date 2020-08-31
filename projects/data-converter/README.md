# angular-data-converter-component
An Angular component that allows users to select a file and convert it to another format (you need to pass in your own converter service).

Requires Angular 9.x.x

## How to use

1. Install the component:
```
npm install angular-data-converter-component
```

2. Import the module into your Angular module. Add to `app.module.ts`:
```ts
import { DataConverterModule } from 'angular-data-converter-component'

...

  imports: [
    ...
    DataConverterModule,
  ]
```

3. Implement [IDataConverterService](https://github.com/EdwinOtten/angular-data-converter-component/blob/master/projects/data-converter/lib/idata-converter-service.ts). You need this implementation in the next step (where it is called `MyDataConverter`).

4. Setup the config. Add to `*.component.ts`:
```ts
import { DataConverterConfig } from 'angular-data-converter-component'

...

  config: DataConverterConfig = {
    inputFileExtensions: ['.txt'],
    converterService: new MyDataConverter(),
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
```

5. Add the component to your html template. Add to `*.component.html`:
```html
<lib-data-converter [config]="config"></lib-data-converter>
```

## Example

I have setup a sample project so you can quickly try things out. It is located in the [GitHub repository](https://github.com/EdwinOtten/angular-data-converter-component). The [README](https://github.com/EdwinOtten/angular-data-converter-component/blob/master/README.md) will explain how run the sample project.


