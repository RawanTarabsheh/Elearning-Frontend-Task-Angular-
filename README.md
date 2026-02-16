# Elearning-Frontend-Task-Angular-
Angular App
# E-Learning Task – Frontend (Angular)

This project is the **Angular frontend** for the E-Learning task.  
It connects to the Laravel API backend and provides:

- Home page (News & Testimonials)
- Careers submission form with CV upload
- Responsive UI


## Requirements

- Node.js
- npm
- Running Laravel backend

---

## Installation Steps

### 1. Install dependencies
```bash
npm install
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

# 2. Create proxy configuration

Create a file named:proxy.conf.json

{
  "/api": {
    "target": "http://127.0.0.1:8000",
    "secure": false,
    "changeOrigin": true
  }
}

# 3. Run Angular development server
ng serve --proxy-config proxy.conf.json --live-reload=false


# Features
Home Page

Fetches News and Testimonials from API

Careers Page

Submit application form

Upload CV file

Data stored and visible in Admin panel

# Related Backend Repository
# Laravel backend project:
https://github.com/RawanTarabsheh/Elearning-Backend-Task-Admin.git

