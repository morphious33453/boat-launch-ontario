export interface ShopifyProduct {
  id: string
  title: string
  description: string
  price: string
  image?: string
}

export const SHOPIFY_PRODUCTS = {
  REG_NUMBER: {
    id: process.env.NEXT_PUBLIC_REG_NUMBER_ID || '123456789',
    title: 'Boat Registration Numbers',
    description: 'Professional vinyl boat registration numbers. Meets Transport Canada requirements.',
    price: '$39.99',
    image: '/images/reg-numbers.jpg',
  },
  BOAT_NAME: {
    id: process.env.NEXT_PUBLIC_BOAT_NAME_ID || '987654321',
    title: 'Custom Boat Name Decal',
    description: 'Personalized vinyl boat name decals. Weather-resistant and marine-grade.',
    price: '$49.99',
    image: '/images/boat-name.jpg',
  },
  STICKER_PACK: {
    id: process.env.NEXT_PUBLIC_STICKER_PACK_ID || '111222333',
    title: 'Ramp Rat Sticker Pack',
    description: 'Fun sticker pack for boat enthusiasts. Set of 5 waterproof stickers.',
    price: '$12.99',
    image: '/images/stickers.jpg',
  },
}

export function getShopifyBuyButtonScript(): string {
  const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE || 'your-store.myshopify.com'
  return `https://${store}/cart/add.js`
}

export function getShopifyProductUrl(productId: string): string {
  const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE || 'your-store.myshopify.com'
  return `https://${store}/products/${productId}`
}
