"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export interface LoginCardsShowoffProps {
  cards: any[];
}

export default function AuthCardsShowoff({ cards }: LoginCardsShowoffProps) {
  // split the cards array into 3 arrays
  const cards1 = cards.slice(0, 8);
  const cards2 = cards.slice(8, 16);
  const cards3 = cards.slice(16, 24);
  return (
    <div className="rotate-12 absolute">
      <div className="grid grid-cols-8 w-[2250px] grid-rows-3 gap-2">
        {cards1.map((card: any, index) => (
          <motion.div
            key={card.id}
            animate={{ translateX: [0, 300, 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl max-h-[380px] rotate-12 min-w-[270px] shadow-2xl"
              alt={card.name}
              objectFit="cover"
              quality={90}
              key={index + card.name}
            />
          </motion.div>
        ))}
        {cards2.map((card: any, index) => (
          <motion.div
            key={card.id}
            animate={{ translateX: [0, -300, 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl max-h-[380px] rotate-12 min-w-[270px]"
              alt={card.name}
              objectFit="cover"
              quality={90}
              key={index + card.name}
            />
          </motion.div>
        ))}
        {cards3.map((card: any, index) => (
          <motion.div
            key={card.id}
            animate={{ translateX: [0, 300, 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl max-h-[380px] rotate-12 min-w-[270px]"
              alt={card.name}
              objectFit="cover"
              quality={90}
              key={index + card.name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
