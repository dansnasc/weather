import { Component, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 400px;"></div>`,
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() city = '';
  map: any;

  constructor(private geolocationService: GeolocationService) {}

  async ngOnChanges() {
    if (this.city) {
      const location = await this.geolocationService.getCoordinates(this.city);

      if (this.map) {
        this.map.setView([location.lat, location.lon], 10);
      } else {
        this.map = L.map('map').setView([location.lat, location.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
          this.map
        );
        L.marker([location.lat, location.lon])
          .addTo(this.map)
          .bindPopup(this.city)
          .openPopup();
      }
    }
  }
}
