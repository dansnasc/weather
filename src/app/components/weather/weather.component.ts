import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class WeatherComponent implements OnInit {
  @Output() cityChange = new EventEmitter<string>();
  city = 'Ribeirão Preto';
  weatherData: any;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.searchWeather();
  }

  toggleSearch() {
    const input = document.querySelector('.city-input') as HTMLInputElement;
    input.classList.toggle('active');
  }

  async searchWeather() {
    this.loading = true;
    this.error = '';

    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      this.cityChange.emit(this.city);
    } catch (err) {
      this.error = 'Cidade não encontrada ou erro na API.';
      console.error(err);
    }

    this.loading = false;
  }
}
