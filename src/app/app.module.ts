import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReporteGeneralComponent } from './View/reporte-general/reporte-general.component';
import { MapComponent } from './View/map/map.component';
import{HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NewsComponent } from './View/news/news.component';
import { InformationComponent } from './View/information/information.component';
import { BoliviaComponent } from './View/bolivia/bolivia.component';


@NgModule({
  declarations: [
    AppComponent,
    ReporteGeneralComponent,
    MapComponent,
    SidebarComponent,
    NewsComponent,
    InformationComponent,
    BoliviaComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
