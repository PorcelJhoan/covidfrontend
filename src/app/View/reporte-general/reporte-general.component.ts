import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/Service/hospital.service';
import { Hospital } from 'src/app/Models/Hospital';
@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {
  lat:number=0;
  lon:number=0;
  hosp:Array<Hospital>=[];
  map!: mapboxgl.Map;
 

  

   

    
  constructor(private hos: HospitalService, private router: Router) { }
 
  ngOnInit(): void {
    this.hospitales();
    (mapboxgl as any).accessToken =environment.mapboxkey;
  
  this.map= new mapboxgl.Map({
  container: 'mapa-mapbox', // container ID
  style: 'mapbox://styles/porceljhoan/ckund5chf15l117pkjr30so2i', // style URL
  center: [-64.2004849, -16.0283115], // starting position
  zoom: 4.3 // starting zoom
  });
  
    
  
  
  
  
  // Add zoom and rotation controls to the map.
  this.map.addControl(new mapboxgl.NavigationControl());
  
 this.CrearMrcador(-74.5, 40);
  }


 
  clusters(){

    var dat=JSON.parse(JSON.stringify({
      "type": "FeatureCollection",
      features: [
        {
          "type": "Feature",
          "properties": {"message": "Null Island",'iconSize': [25, 25]},
          "geometry": {
            "type": "Point",
              "coordinates": [
                -64.2004849, -16.0283115
              ]
            }
        }
       
    ]
    
      }));
    var vv=0;
    for(let i=0;i<this.hosp.length;i++){
   
     dat.features.push(JSON.parse(JSON.stringify({
      "type":"Feature",
      "properties":{"message":this.hosp[i].nameHospital,'iconSize': [25, 25]},
       "geometry":{"type":"Point", "coordinates":[this.hosp[i].longitude,this.hosp[i].latitude]}
    })))
      
    }
 
   

    this.map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      
      this.map.addSource('earthquakes', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
  
      data:JSON.parse(JSON.stringify(dat)),
      
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
       
     
      for (const marker of dat.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(https://www.shareicon.net/data/128x128/2016/08/04/806609_medical_512x512.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
         
        el.addEventListener('click', () => {
        console.log(marker.geometry.coordinates);
        });
        
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML (
          'Ciudad : '+ marker.properties.message +'<br> nombre : '+marker.properties.message
          );


        // Add markers to the map.
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(this.map);
        }
      
     
     
    
     });
  }

  
  marcadores(){
    
  console.log("cantidad"+this.hosp.length)
  for(let i=0;i<this.hosp.length ;i++){
  
      
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML (
      'Ciudad : '+this.hosp[i].nameCity+'<br> nombre : '+this.hosp[i].nameHospital
      );

    const marker2 = new mapboxgl.Marker({ color: 'yellow', rotation: 25 })
    .setLngLat([this.hosp[i].longitude,this.hosp[i].latitude])
    .setPopup(popup)
    
    .addTo(this.map);

    
  }


  }
  hospitales(){
    this.hos.all().subscribe(
      data => {
        this.hosp = data;
       //this.marcadores();
       this.clusters();
        console.log(this.hosp);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  CrearMrcador(lng:number, lat:number){
    const marker = new mapboxgl.Marker({
      draggable:true
    })
    .setLngLat([lng,lat])
    
    .addTo(this.map)

  }
}
