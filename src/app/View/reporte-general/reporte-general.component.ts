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
  dat={
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {"name": "Null Island"},
        "geometry": {
        "type": "Point",
        "coordinates": [
          -64.2004849, -16.0283115
        ]
        }
        }
  ]
    };
  constructor(private hos: HospitalService, private router: Router) { }
 
  ngOnInit(): void {
    
    (mapboxgl as any).accessToken =environment.mapboxkey;
  
  this.map= new mapboxgl.Map({
  container: 'mapa-mapbox', // container ID
  style: 'mapbox://styles/porceljhoan/cktzgqxzc1dm717psiuw70519', // style URL
  center: [-64.2004849, -16.0283115], // starting position
  zoom: 5 // starting zoom
  });
  this.hospitales();
    
  
  
  
  this.map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    
    this.map.addSource('earthquakes', {
    type: 'geojson',
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.

    data: {
      "type": "FeatureCollection",
      "features": []
    },
    
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
     
    this.map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'point_count'],
    '#51b000',
    100,
    '#f1f000',
    750,
    '#f28cb1'
    ],
    'circle-radius': [
    'step',
    ['get', 'point_count'],
    20,
    100,
    30,
    750,
    40
    ]
    }
    });
     
    this.map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 15
    }
    });
     
    this.map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
    }
    });
     
    // inspect a cluster on click
    this.map.on('click', 'clusters', (e) => {
    const features = this.map.queryRenderedFeatures(e.point, {
    layers: ['clusters']
    });
    const clusterId = (features[0] as any).properties.cluster_id;
    (this.map.getSource('earthquakes') as any).getClusterExpansionZoom(
    clusterId,
    (err: any, zoom: any) => {
    if (err) return;
     
    this.map.easeTo({
    center: (features[0]  as any).geometry.coordinates,
    zoom: zoom
    });
    }
    );
    });
     
    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
  
    this.map.on('mouseenter', 'clusters', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'clusters', () => {
    this.map.getCanvas().style.cursor = '';
    });
    });

  // Add zoom and rotation controls to the map.
  this.map.addControl(new mapboxgl.NavigationControl());
  
 this.CrearMrcador(-74.5, 40);
  }

  marcadores(){
    console.log(" hospitales : "+this.hosp);
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
       this.marcadores();
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
