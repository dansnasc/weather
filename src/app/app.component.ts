import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { WeatherComponent } from './components/weather/weather.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weather-forecast';
  selectedCity = 'Ribeirão Preto';

  updateCity(city: string) {
    this.selectedCity = city;
  }
}
