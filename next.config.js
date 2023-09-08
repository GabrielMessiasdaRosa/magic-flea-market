/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "cards.scryfall.io",
      "**magic-flea-market**",
    ],
  },
};

module.exports = nextConfig;
