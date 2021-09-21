import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  map!: mapboxgl.Map;
  constructor() { }

  ngOnInit(): void {

    (mapboxgl as any).accessToken =environment.mapboxkey;
  
  this.map= new mapboxgl.Map({
  container: 'mapa-mapbox', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position
  zoom: 9 // starting zoom
  });
   
  // Add zoom and rotation controls to the map.
  this.map.addControl(new mapboxgl.NavigationControl());
  
 this.CrearMrcador(-74.5, 40);
  }

  CrearMrcador(lng:number, lat:number){
    const marker = new mapboxgl.Marker({
      draggable:true
    })
    .setLngLat([lng,lat])
    .addTo(this.map)
  }
}
