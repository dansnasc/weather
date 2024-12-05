import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 400px; width: 100%;"></div>`,
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() city = '';
  private map!: L.Map;

  constructor(private geolocationService: GeolocationService) {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['city'] && this.city) {
      const location = await this.geolocationService.getCoordinates(this.city);
      if (this.map) {
        this.map.setView([location.lat, location.lon], 13);
        this.addMarker(location.lat, location.lon, this.city);
      }
    }
  }

  private async initializeMap() {
    const location = await this.geolocationService.getCoordinates(
      this.city || 'London'
    );

    this.map = L.map('map', {
      center: [location.lat, location.lon],
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  private addMarker(lat: number, lon: number, city: string) {
    const icon = L.icon({
      iconUrl: 'marker-shadow.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    L.marker([lat, lon], { icon: icon })
      .addTo(this.map)
      .bindPopup(`<b>${city}</b>`)
      .openPopup();
  }
}
