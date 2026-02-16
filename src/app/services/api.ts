import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Major {
  id: number;
  name_en: string;
  name_ar: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getMajors(): Observable<{ data: Major[] }> {
    return this.http.get<{ data: Major[] }>('/api/v1/majors');
  }

  submitCareer(formData: FormData): Observable<any> {
    return this.http.post('/api/v1/careers/submit', formData);
  }

  getNews(): Observable<any> {
    return this.http.get('/api/v1/news');
  }

  getTestimonials(): Observable<any> {
    return this.http.get('/api/v1/testimonials');
  }
}
