/** @type {import('next').NextConfig} */
const nextConfig = {
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
