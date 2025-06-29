# Web Image Upload App (PCG Pentest Challenge Task 1)

This is a [Next.js](https://nextjs.org) application that allows users to upload and delete images. Access to the application is restricted to a specific whitelisted IP.

Live URL: [https://task1-zeta-nine.vercel.app](https://task1-zeta-nine.vercel.app) *(VPN IP access only)*

---

## 🚀 Features

- Upload and delete images via a clean UI
- Backend image handling via [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- Deployed using [Vercel Hosting Platform](https://vercel.com)
- IP whitelisting middleware (`20.218.226.24` only)
- Tailwind CSS for styling
- React Query for efficient data fetching

---

## 🧪 Getting Started

Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```


---

## 📁 Important Files

- `app/page.tsx` – Main UI
- `components/ImageUploader.tsx` – Upload form component
- `middleware.ts` – IP restriction middleware
- `route.ts` – Handles GET/POST/DELETE image requests securely
- `Providers.tsx` – React Query and Session providers

---

## 🔐 Access Control
This app is restricted to:
- VPN IP: `20.218.226.24`
- All other IPs will receive `403 Forbidden`

---

## 📦 Deployment

The app is deployed to Vercel:
[https://task1-zeta-nine.vercel.app](https://task1-zeta-nine.vercel.app)

To deploy:
- Commit to GitHub
- Connect repository to [Vercel](https://vercel.com)
- Deploy automatically

---

## 🛡️ Challenge Submission
This app fulfills **Challenge 1** of the PCG Pentest Squad trainee assignment:
- ✅ Upload & delete image functionality
- ✅ GitHub repo shared
- ✅ IP whitelist middleware implemented
- ✅ Accessible live link using Vercel + Vercel Blob Storage
