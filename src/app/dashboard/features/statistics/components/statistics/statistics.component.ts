import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { RevenueByVehicleType } from '../../../../../core/models/revenue-by-vehicle-type.model';
import { RevenueByDay } from '../../../../../core/models/revenue-by-day.model';
import { StatisticsService } from '../../../../../core/services/statistics.service';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, LineElement, LineController, PointElement } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  // Data for daily revenue chart
  dailyRevenueData: ChartDataset[] = [];
  dailyRevenueLabels: string[] = [];

  // Data for faults per vehicle chart
  faultsPerVehicleData: number[] = [];
  faultsPerVehicleLabels: string[] = [];

  // Data for revenue by vehicle type chart
  revenueByVehicleTypeData: number[] = [];
  revenueByVehicleTypeLabels: string[] = [];

  // Selected month for the daily revenue chart
  selectedMonth: string = '2025-01'; // Default to January 2025

  // Chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
      },
      x: {
        type: 'category',
      },
    },
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
      },
      x: {
        type: 'category',
      },
    },
  };

  constructor(private statisticsService: StatisticsService) {
    // Register the required scales and controllers
    Chart.register(CategoryScale, LinearScale, BarElement, BarController, LineElement, LineController, PointElement);
  }

  ngOnInit(): void {
    this.loadDailyRevenue(this.selectedMonth); // Load data for the default month
    this.loadFaultsPerVehicle();
    this.loadRevenueByVehicleType();
  }

  // Fetch daily revenue data
  loadDailyRevenue(month: string): void {
    this.statisticsService.getDailyRevenue(month).subscribe((data) => {
      this.dailyRevenueLabels = data.map((item) => item.day);
      this.dailyRevenueData = [
        {
          label: 'Daily Revenue',
          data: data.map((item) => item.revenue),
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
        },
      ];
    });
  }

  // Fetch faults per vehicle data
  loadFaultsPerVehicle(): void {
    this.statisticsService.getFaultsPerVehicle().subscribe((data) => {
      this.faultsPerVehicleLabels = Object.keys(data); // Vehicle models
      this.faultsPerVehicleData = Object.values(data); // Number of faults
    });
  }

  // Fetch revenue by vehicle type data
  loadRevenueByVehicleType(): void {
    this.statisticsService.getRevenueByVehicleType().subscribe((data) => {
      this.revenueByVehicleTypeLabels = data.map((item) => item.vehicleType);
      this.revenueByVehicleTypeData = data.map((item) => item.totalRevenue);
    });
  }

  // Handle month selection change
  onMonthChange(month: string): void {
    this.selectedMonth = month;
    this.loadDailyRevenue(month); // Reload data for the selected month
  }
}
