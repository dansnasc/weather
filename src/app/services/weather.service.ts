import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6b0ad67e0191059847dbc87c0d34cf6f';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  async getWeather(city: string): Promise<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`;
    const response = await axios.get(url);
    return response.data;
  }
}
