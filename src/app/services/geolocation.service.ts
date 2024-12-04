import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  async getCoordinates(city: string): Promise<any> {
    const url = `${this.baseUrl}?q=${city}&format=json`;
    const response = await axios.get(url);
    return response.data[0];
  }
}
