import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);

  news: any[] = [];
  testimonials: any[] = [];

  loading = true;
  errorMsg = '';

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.errorMsg = '';

    try {
      const [newsRes, testiRes] = await Promise.all([
        firstValueFrom(this.api.getNews()),
        firstValueFrom(this.api.getTestimonials()),
      ]);

      this.news = (newsRes as any)?.data ?? [];
      this.testimonials = (testiRes as any)?.data ?? [];
    } catch (err) {
      console.log('HOME LOAD ERROR:', err);
      this.errorMsg = 'Failed to load home data.';
    } finally {
      this.loading = false;
      console.log('LOADING FALSE ✅', { news: this.news.length, testimonials: this.testimonials.length });
    }
  }
}
