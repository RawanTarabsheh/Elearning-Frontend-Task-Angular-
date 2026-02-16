import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ApiService, Major } from '../../services/api';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './careers.html',
  styleUrls: ['./careers.css'],
})
export class CareersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  majors: Major[] = [];
  loadingMajors = true;
  submitting = false;

  selectedFile: File | null = null;

  successMsg = '';
  errorMsg = '';

  // عدّلي القيم حسب متطلبات الواجب إذا كانت محددة
  jobs = ['Developer', 'Designer', 'QA', 'Project Manager'];
  experienceOptions = ['0-1', '1-3', '3-5', '5+'];

  form = this.fb.group({
    job: ['', [Validators.required]],
    years_of_experience: ['', [Validators.required]],
    major_id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    phone: ['', [Validators.required, Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    this.api.getMajors().subscribe({
      next: (res) => {
        this.majors = res.data ?? [];
        this.loadingMajors = false;
      },
      error: () => {
        this.loadingMajors = false;
        this.errorMsg = 'Failed to load majors. Please try again.';
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;

    this.selectedFile = file;
    this.successMsg = '';
    this.errorMsg = '';
  }

  submit(): void {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg = 'Please fill all required fields.';
      return;
    }

    if (!this.selectedFile) {
      this.errorMsg = 'Please attach your CV (PDF/DOC/DOCX).';
      return;
    }

    // (اختياري) تحقق نوع الملف من جهة العميل
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (this.selectedFile.type && !allowedTypes.includes(this.selectedFile.type)) {
      this.errorMsg = 'CV must be PDF, DOC, or DOCX.';
      return;
    }

    const fd = new FormData();
    fd.append('job', this.form.value.job!);
    fd.append('years_of_experience', this.form.value.years_of_experience!);
    fd.append('major_id', String(this.form.value.major_id!));
    fd.append('name', this.form.value.name!);
    fd.append('phone', this.form.value.phone!);
    fd.append('cv', this.selectedFile);

    this.submitting = true;

    this.api.submitCareer(fd).subscribe({
      next: (res) => {
        this.submitting = false;
        this.successMsg = res?.message || 'Application submitted successfully.';
        this.form.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        this.submitting = false;

        // Laravel validation عادة ترجع 422 مع errors
        const msg =
          err?.error?.message ||
          (err?.error?.errors ? this.flattenErrors(err.error.errors) : null) ||
          'Submission failed. Please try again.';

        this.errorMsg = msg;
      },
    });
  }

  // تستخدمها في HTML: isInvalid('phone') ...
  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  private flattenErrors(errors: Record<string, string[]>): string {
    return Object.values(errors).flat().join(' ');
  }
}
