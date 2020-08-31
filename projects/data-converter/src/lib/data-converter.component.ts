import { Component, AfterViewInit, Input, ViewChild, ViewEncapsulation, NgZone, OnInit } from '@angular/core'
import { DataConverterConfig } from './data-converter.config'

import { MatVerticalStepper } from '@angular/material/stepper'
import { StepperSelectionEvent } from '@angular/cdk/stepper'
import { PreviewResult } from './idata-converter-service'

const DEFAULT_LABELS = {
  selectFile: 'Select file',
  browse: 'Browse..',
  next: 'Next',
  download: 'Download',
  reset: 'Reset',
}

@Component({
  selector: 'lib-data-converter',
  templateUrl: './data-converter.component.html',
  styleUrls: ['./data-converter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataConverterComponent implements OnInit, AfterViewInit {

  @Input() config: DataConverterConfig;

  ngZone: NgZone;
  fileLocation = '';
  sourceFileContents = '';
  destinationFileContents = '';
  progressMode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';
  progressValue = 4;

  sourceError: string;
  currentFile: File;

  columns: string[];
  dataSource: any[];

  @ViewChild('stepper', { static: false }) private stepper: MatVerticalStepper;

  constructor (ngZone: NgZone) {
    this.ngZone = ngZone
  }

  ngOnInit (): void {
    // Add labels from DEFAULT_LABELS if they are not in this.config
    this.config.labels = { ...DEFAULT_LABELS, ...this.config.labels }
  }

  ngAfterViewInit (): void {
    this.stepper.selectionChange.subscribe((event: StepperSelectionEvent) => {
      this.progressValue = 4 + (48 * event.selectedIndex)
    })
  }

  fileInputAccept (): string {
    return this.config.inputFileExtensions.join(',')
  }

  openFile (event) {
    this.currentFile = null
    this.progressMode = 'buffer'
    this.dataSource = null
    this.columns = null

    for (const file of event.target.files) {
      this.processFile(file)
      break // we only support reading one file at a time
    }
  }

  async processFile (file: File) {
    try {
      this.currentFile = file
      const data = await this.config.converterService.convertFileToPreview(file)

      if (data !== null && data !== undefined) {
        this.sourceError = null
        this.progressMode = 'determinate'
        this.showPreview(data)
      }
    } catch (e) {
      this.currentFile = null
      this.progressMode = 'determinate'
      this.sourceError = e
    }
  }

  showPreview (previewResult: PreviewResult) {
    this.dataSource = previewResult.rows
    this.columns = previewResult.columns

    this.ngZone.run(() => {
      this.stepper.selected.completed = true
      this.stepper.selectedIndex = 1
    })
  }

  async downloadFile () {
    const output = await this.config.converterService.convertFileToOutput(this.currentFile)
    this.openSaveFileDialog(output.data, output.filename, output.mimetype)
  }

  openSaveFileDialog (data: any, filename: string, mimetype: string) {
    if (!data) { return }

    const blob = data.constructor !== Blob
      ? new Blob([data], { type: mimetype || 'application/octet-stream' })
      : data

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename)
      return
    }

    const lnk = document.createElement('a')
    const url = window.URL

    if (mimetype) {
      lnk.type = mimetype
    }

    lnk.download = filename || 'untitled'
    lnk.href = url.createObjectURL(blob)
    lnk.dispatchEvent(new MouseEvent('click'))
    setTimeout(url.revokeObjectURL.bind(url, lnk.href))
  }

}
