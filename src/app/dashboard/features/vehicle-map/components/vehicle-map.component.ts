import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet.markercluster'; // Import MarkerCluster plugin
import 'leaflet.markercluster/dist/MarkerCluster.css'; // Import MarkerCluster CSS
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Import MarkerCluster default theme CSS
import { VehicleService } from '../../../../core/services/vehicle.service';

// Import the MarkerClusterGroup type from leaflet.markercluster
import 'leaflet.markercluster';
import { MarkerClusterGroup } from 'leaflet';

@Component({
  selector: 'app-vehicle-map',
  standalone: false,
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.css'],
})
export class VehicleMapComponent implements AfterViewInit, OnChanges {
  private map: L.Map | undefined;
  private markerClusterGroup: MarkerClusterGroup | undefined; // Use the correct type

  constructor(private vehicleService: VehicleService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  private initMap(): void {
    // Initialize the map with Los Angeles as the default location
    this.map = L.map('map').setView([34.0522, -118.2437], 10); // LA coordinates

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Initialize the MarkerClusterGroup
    this.markerClusterGroup = new MarkerClusterGroup(); // Use the correct constructor
    this.map.addLayer(this.markerClusterGroup); // Add the cluster group to the map

    // Force tile reload after a short delay
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    // Load vehicles after the map is initialized
    this.loadVehicles();
  }

  private loadVehicles(): void {
    // Fetch bikes, cars, and scooters
    this.vehicleService.getBikes().subscribe((bikes) => this.addMarkers(bikes, 'Bike'));
    this.vehicleService.getCars().subscribe((cars) => this.addMarkers(cars, 'Car'));
    this.vehicleService.getScooters().subscribe((scooters) => this.addMarkers(scooters, 'Scooter'));
  }

  private addMarkers(vehicles: any[], vehicleType: string): void {
    vehicles.forEach((vehicle) => {
      if (vehicle.location?.latitude && vehicle.location?.longitude && this.markerClusterGroup) {
        // Create a marker for each vehicle
        const marker = L.marker([vehicle.location.latitude, vehicle.location.longitude]).bindPopup(
          `<b>${vehicle.model}</b><br>${vehicle.manufacturer.name}<br>Type: ${vehicleType}<br>Status: ${
            vehicle.isBroken ? 'Broken' : 'Working'
          }`
        );

        // Add the marker to the MarkerClusterGroup
        this.markerClusterGroup.addLayer(marker);
      }
    });
  }
}
