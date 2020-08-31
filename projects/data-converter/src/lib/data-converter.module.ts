import { NgModule } from '@angular/core'
import { DataConverterComponent } from './data-converter.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { TextFieldModule } from '@angular/cdk/text-field'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [DataConverterComponent],
  imports: [
    BrowserAnimationsModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DataConverterComponent],
})
export class DataConverterModule { }
