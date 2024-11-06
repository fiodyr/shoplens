# ShopLens 

ShopLens it's frontend for AtroCore based on Next.js #atrocore #nextjs #frontend

For quick start this project you need installed AtroCore with demo data, and change hostame in next.config.mjs to you instaled AtroCore and 

```javascript
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: your AtroCore url,
        port: '',
        pathname: '/**',
      },
    ],
  },
}
```

and update your `/config/api.ts`

```javascript
export const API_CONFIG = {
  baseURL: your AtroCore url,
  headers: {
    'Authorization': your token
  },
}
```

and make come changes in admin panel Atrocore:

1. Add some Entities:
   - Pages with fields:
     - products	          	Multiple link	
     - promotionalBanners		Multiple link	
     - slides	              Multiple link 
   - Pages Relationships:
     - Page	page	One-to-Many	products	
     - Page	page	One-to-Many	promotionalBanners	
     - Page	page	One-to-Many	slides	
2. Slides with fields:
   - imageUrl	imageUrl	String
   - linkText	linkText	String
   - linkUrl	  linkUrl	  String
3. PromotionalBanner with fields:
   - imageUrl	imageUrl	String	
   - isActive	Active	  Boolean	
   - linkUrl	  linkUrl	  String

After that do `npm run dev` and you can see result in `http:\\localhost:3000`

//*** 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
