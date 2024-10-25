import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class AppComponent {
  title = 'knotandstitchcrochet';
}
