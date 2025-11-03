# Anima International Thank You Card Generator

This is a simple thank you card generator app with custom PDF download for Anima International.

## Run locally

First, clone this repository and install dependencies before running the development server:

```bash
git clone https://github.com/yvonnelutrinh/anima-thankyou.git

npm install

npm run dev
```

Open [http://localhost:3000/anima-thankyou](http://localhost:3000/anima-thankyou) in your browser to see the app.

## App Structure
- The root of the app is in `src/app/page.tsx`
- `ThankYouForm` handles the key logic of the application, including:
  - form logic
  - PDF generation
  - rendering `PDFPreview` for a live preview of the card

## Deploy on Github

A live demo of this app is deployed using GitHub Actions and Pages. Deployment happens automatically through `.github/workflows/deploy.yml` each time a commit is made to the main branch.
