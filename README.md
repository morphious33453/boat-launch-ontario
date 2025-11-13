# 🚤 Canadian Boat Ramp Locator

A production-ready, SEO-optimized website for finding boat launches across Canada. Built with Next.js 14, TypeScript, and Tailwind CSS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/morphious33453/boat-launch-ontario)

## 🌟 Features

- **Interactive Map**: Leaflet.js powered map with 500+ boat ramp locations
- **Search & Filters**: Filter by province, ramp type, fees, and amenities
- **SEO Optimized**: Dynamic metadata, JSON-LD schema, sitemap generation
- **Shopify Integration**: Headless e-commerce with Buy Buttons
- **Mobile Responsive**: Beautiful UI on all devices
- **Fast Performance**: Optimized for Core Web Vitals
- **Type Safe**: Built with TypeScript
- **Database**: SQLite with Prisma ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/morphious33453/boat-launch-ontario.git
   cd boat-launch-ontario
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Shopify store details:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_SHOPIFY_STORE="your-store.myshopify.com"
   NEXT_PUBLIC_REG_NUMBER_ID="your-product-id"
   NEXT_PUBLIC_BOAT_NAME_ID="your-product-id"
   NEXT_PUBLIC_STICKER_PACK_ID="your-product-id"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
boat-ramp-locator/
├── app/
│   ├── api/                  # API routes
│   │   ├── ramps/           # GET /api/ramps
│   │   └── submit-ramp/     # POST /api/submit-ramp
│   ├── ontario/             # Province hub pages
│   ├── bc/
│   ├── ramp/[id]/           # Dynamic ramp detail pages
│   ├── shop/                # Shopify products page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── Map.tsx              # Interactive Leaflet map
│   ├── RampCard.tsx         # Ramp card component
│   ├── SearchBar.tsx        # Search component
│   ├── ProvinceFilter.tsx   # Filter dropdown
│   └── ShopifyBuyButton.tsx # Buy button component
├── lib/
│   ├── prisma.ts            # Prisma client
│   └── shopify.ts           # Shopify configuration
├── prisma/
│   └── schema.prisma        # Database schema
├── public/
│   └── ramps/               # Sample CSV data
├── scripts/
│   └── seed.ts              # Database seeding script
└── package.json
```

## 🗄️ Database Schema

### Ramp Model
- `id`: Unique identifier
- `name`: Ramp name
- `lat`, `lng`: Coordinates
- `province`: Province/territory
- `type`: trailer, hand, or dock
- `fee`: Launch fee (or null for free)
- `parking`, `toilets`, `fourWD`: Boolean amenities
- `photo`: Optional image URL
- `address`, `description`: Optional details
- `source`: Data source (ontario-gov, bc-gov, osm, user-submitted)
- `approved`: Moderation status

### Submission Model
Similar to Ramp, but for user-submitted ramps pending approval.

## 🛒 Shopify Integration

### Setting Up Shopify Buy Buttons

1. **Create Products in Shopify**
   - Boat Registration Numbers
   - Custom Boat Name Decals
   - Sticker Packs

2. **Get Product IDs**
   - In Shopify Admin, go to Products
   - Click on a product
   - Copy the ID from the URL: `admin.shopify.com/store/YOUR-STORE/products/[ID]`

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE="your-store.myshopify.com"
   NEXT_PUBLIC_REG_NUMBER_ID="123456789"
   NEXT_PUBLIC_BOAT_NAME_ID="987654321"
   NEXT_PUBLIC_STICKER_PACK_ID="111222333"
   ```

4. **Test Buy Buttons**
   - Visit `/shop` page
   - Click "Buy Now" buttons
   - Should redirect to Shopify cart

## 🔍 SEO Checklist

### ✅ Technical SEO
- [x] Dynamic metadata with Next.js Metadata API
- [x] Semantic HTML structure
- [x] Mobile-responsive design
- [x] Fast page loads (optimized images, code splitting)
- [x] XML sitemap at `/sitemap.xml`
- [x] Robots.txt at `/robots.txt`
- [x] OpenGraph tags for social sharing

### ✅ On-Page SEO
- [x] Unique H1 tags on every page
- [x] Descriptive meta descriptions
- [x] Internal linking structure
- [x] Alt text for images
- [x] Schema.org structured data (coming soon)

### ✅ Content SEO
- [x] Province-specific hub pages (Ontario, BC)
- [x] Individual ramp detail pages
- [x] Rich descriptive content
- [x] Location-based keywords

### 🎯 Target Keywords
- "boat launches ontario"
- "boat ramps bc"
- "ontario boat launch locations"
- "canadian boat ramps"
- "find boat launch near me"

## 📊 Data Sources

### Government Sources
1. **Ontario**: [data.ontario.ca](https://data.ontario.ca/dataset/fishing-access-points)
2. **BC**: [open.canada.ca](https://open.canada.ca/data/en/dataset/d5f9003d-a8f2-4065-ae5b-abe6f36d611b)
3. **OpenStreetMap**: Overpass API queries

### Adding New Data

**From CSV:**
```typescript
// Add CSV file to public/ramps/
// Update scripts/seed.ts to parse and import
npm run seed
```

**Manual Entry:**
```bash
# Use the submission API
POST /api/submit-ramp
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **One-Click Deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/morphious33453/boat-launch-ontario)

2. **Or Manual Deploy**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Connect Custom Domain**
   - Settings → Domains → Add Domain
   - Point DNS to Vercel

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Upload .next folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
```

### Adding a New Province

1. **Create Page**: `app/[province]/page.tsx`
2. **Add Navigation**: Update `app/layout.tsx`
3. **Add Data**: Create CSV in `public/ramps/[province].csv`
4. **Seed Data**: Update `scripts/seed.ts`
5. **Update Sitemap**: Add to `app/sitemap.ts`

## 🐛 Troubleshooting

### Map Not Loading
- Check browser console for errors
- Verify Leaflet CSS is loaded
- Ensure `"use client"` directive is present

### Database Errors
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npm run seed
```

### Build Errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

## 📝 License

MIT License - feel free to use this project for commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@boatramplocator.ca

## 🎉 Acknowledgments

- Data from [Ontario.ca](https://data.ontario.ca)
- Data from [Open Canada](https://open.canada.ca)
- Maps by [OpenStreetMap](https://www.openstreetmap.org) contributors
- Built with [Next.js](https://nextjs.org)

---

**Made with ⚓ for Canadian boaters**
