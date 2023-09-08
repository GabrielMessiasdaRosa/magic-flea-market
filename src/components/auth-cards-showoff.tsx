"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export interface LoginCardsShowoffProps {
  cards: any[];
}

export default function AuthCardsShowoff({ cards }: LoginCardsShowoffProps) {
  const origin = window.location.origin;
  const newCards = cards.map((card, index) => {
    return {
      ...card,
      image_uris: {
        normal: new URL(
          `${origin}/images/login-cards-images/${index + 1}-showoff.jpg`
        ).href satisfies string,
      },
    };
  });
  console.log(newCards);
  // split the cards array into 3 arrays
  const cards1 = newCards.slice(0, 8);
  const cards2 = newCards.slice(8, 16);
  const cards3 = newCards.slice(16, 24);
  return (
    <div className="rotate-12 absolute ">
      <div className="grid grid-cols-8 w-[2250px] grid-rows-3 gap-2">
        {cards1.map((card: any, index) => (
          <motion.div
            key={card.id}
            animate={{ translateX: [0, 300, 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl object-cover max-h-[380px] rotate-12 min-w-[270px] shadow-2xl"
              alt={card.name}
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
              ease: "easeInOut",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl  object-cover max-h-[380px] rotate-12 min-w-[270px]"
              alt={card.name}
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
              ease: "easeInOut",
            }}
          >
            <Image
              width={270}
              height={380}
              src={card?.image_uris?.normal}
              className="rounded-3xl object-cover max-h-[380px] rotate-12 min-w-[270px]"
              alt={card.name}
              quality={90}
              key={index + card.name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
