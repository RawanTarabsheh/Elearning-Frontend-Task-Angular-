import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api';
import { LangService } from '../../services/lang';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
lang = inject(LangService);

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
  formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

}
