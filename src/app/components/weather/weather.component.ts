import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city = '';
  weatherData: any;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  async searchWeather() {
    this.loading = true;
    this.error = '';
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
    } catch (err) {
      this.error = 'Cidade não encontrada ou erro na API.';
    }
    this.loading = false;
  }
}
