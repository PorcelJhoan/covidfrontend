import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { MapComponent } from './View/map/map.component';
import { ReporteGeneralComponent } from './View/reporte-general/reporte-general.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: "mapa",component: MapComponent 
      },
      {
        path: "report",component: ReporteGeneralComponent
      }
    ]
  }, 
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
