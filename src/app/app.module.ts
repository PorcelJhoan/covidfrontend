import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './ReporteGeneral/view/view.component';
import { ReporteGeneralComponent } from './View/reporte-general/reporte-general.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    ReporteGeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
