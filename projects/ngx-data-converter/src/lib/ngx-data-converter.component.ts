import { AfterViewInit, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { DataConverterConfig } from './ngx-data-converter.config';
import { PreviewResult } from './ngx-data-converter.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

const DEFAULT_LABELS = {
  selectFile: 'Select file',
  browse: 'Browse..',
  next: 'Next',
  download: 'Download',
  reset: 'Reset',
}

@Component({
  selector: 'ngx-data-converter',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ngx-data-converter.component.html',
  styleUrls: ['./ngx-data-converter.component.scss'],
})
export class NgxDataConverterComponent implements OnInit, AfterViewInit {

  @Input() config!: DataConverterConfig;

  ngZone: NgZone;
  fileLocation = '';
  sourceFileContents = '';
  destinationFileContents = '';
  progressMode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';
  progressValue = 4;

  sourceError?: string;
  currentFile?: File;

  columns?: string[];
  dataSource?: any[];

  @ViewChild('stepper', { static: false }) private stepper?: MatStepper;

  constructor(ngZone: NgZone) {
    this.ngZone = ngZone
  }

  ngOnInit(): void {
    // Add labels from DEFAULT_LABELS if they are not in this.config
    this.config.labels = { ...DEFAULT_LABELS, ...this.config.labels }
  }

  ngAfterViewInit(): void {
    if (this.stepper) {
      this.stepper.selectionChange.subscribe((event: StepperSelectionEvent) => {
        this.progressValue = 4 + (48 * event.selectedIndex)
      })
    }
  }

  fileInputAccept(): string {
    return this.config.inputFileExtensions.join(',')
  }

  openFile(event: any) {
    this.currentFile = undefined
    this.progressMode = 'buffer'
    this.dataSource = undefined
    this.columns = undefined

    for (const file of event.target.files) {
      this.processFile(file)
      break // we only support reading one file at a time
    }
  }

  async processFile(file: File) {
    try {
      this.currentFile = file
      const data = await this.config.converterService.convertFileToPreview(file)

      if (data !== null && data !== undefined) {
        this.sourceError = undefined
        this.progressMode = 'determinate'
        this.showPreview(data)
      }
    } catch (e: any) {
      this.currentFile = undefined
      this.progressMode = 'determinate'
      this.sourceError = `${e}`
    }
  }

  showPreview(previewResult: PreviewResult) {
    this.dataSource = previewResult.rows
    this.columns = previewResult.columns

    this.ngZone.run(() => {
      if (this.stepper) {
        if (this.stepper.selected) {
          this.stepper.selected.completed = true
        }
        this.stepper.selectedIndex = 1
      }
    })
  }

  async downloadFile() {
    if (!this.currentFile) {
      alert('No file selected!')
      return
    }
    const output = await this.config.converterService.convertFileToOutput(this.currentFile)
    this.openSaveFileDialog(output.data, output.filename, output.mimetype)
  }

  openSaveFileDialog(data: any, filename: string, mimetype: string) {
    if (!data) { return }

    const blob = data.constructor !== Blob
      ? new Blob([data], { type: mimetype || 'application/octet-stream' })
      : data

    if ((window.navigator as any).msSaveBlob) {
      (window.navigator as any).msSaveBlob(blob, filename)
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

