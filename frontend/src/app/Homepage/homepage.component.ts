import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  randomListings: any[] = [];
  private apiUrl = 'http://localhost:5000/products/random';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRandomListings();
  }

  fetchRandomListings(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (listings) => {
        this.randomListings = listings;
      },
      (error) => {
        console.error('Error fetching random listings:', error);
      },
    );
  }
}
