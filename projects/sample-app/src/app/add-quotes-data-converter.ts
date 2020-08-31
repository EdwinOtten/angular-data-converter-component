import { PreviewResult, OutputResult } from 'dist/data-converter/public-api'

export class AddQuotesDataConverter {

  async convertFileToPreview (file: File): Promise<PreviewResult> {
    const fileContents = await this.readFileAsync(file)

    return {
      columns: ['text'],
      rows: [{
        text: this.textWithQuotes(fileContents),
      }],
    }
  }

  async convertFileToOutput (file: File): Promise<OutputResult> {
    const fileContents = await this.readFileAsync(file)
    const originalFilename = file.name.substring(0, file.name.lastIndexOf('.'))

    return {
      mimetype: 'text/plain;charset=utf-8;',
      filename: originalFilename + '_with_quotes.txt',
      data: this.textWithQuotes(fileContents),
    }
  }

  private readFileAsync (file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        }
        reject(Error('result is not a string'))
      }

      reader.onerror = reject
      reader.readAsBinaryString(file)
    })
  }

  private textWithQuotes (text: string) {
    return `"${text}"`
  }

}
