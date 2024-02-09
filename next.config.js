/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://dev-magic-flea-market.vercel.app/",
        "https://staging-magic-flea-market.vercel.app/",
        "http://localhost:3000/",
      ],
    },
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "cards.scryfall.io",
      "**magic-flea-market**",
      "i.imgur.com",
    ],
  },
};

module.exports = nextConfig;
