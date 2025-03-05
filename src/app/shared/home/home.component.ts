import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTime: string = '';

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Format time as HH:MM:SS
  }
}
