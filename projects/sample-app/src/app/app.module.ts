import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { DataConverterModule } from 'dist/data-converter'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DataConverterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
