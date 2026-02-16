import { Injectable } from '@angular/core';

export type Lang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LangService {
  private key = 'app_lang';
  lang: Lang = (localStorage.getItem(this.key) as Lang) || 'en';

  setLang(l: Lang) {
    this.lang = l;
    localStorage.setItem(this.key, l);

    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }

  toggle() {
    this.setLang(this.lang === 'en' ? 'ar' : 'en');
  }

  t(en: string, ar: string) {
    return this.lang === 'ar' ? ar : en;
  }
}
