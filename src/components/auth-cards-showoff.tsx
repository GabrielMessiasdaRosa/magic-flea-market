"use client";

import { motion } from "framer-motion";
import React from "react";
export interface LoginCardsShowoffProps {
  cards: any[];
}

export default function AuthCardsShowoff({ cards }: LoginCardsShowoffProps) {
  const [newCards, setNewCards] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const newCardsarr: any[] = cards.map((card, index) => {
      return {
        ...card,
        image_uris: {
          normal: new URL(
            `${window.location.origin}/images/login-cards-images/${
              index + 1
            }-showoff.jpg`,
          ).href satisfies string,
        },
      };
    });
    setNewCards(newCardsarr);
  }, []);

  // split the cards array into 3 arrays
  const cards1 = newCards.slice(0, 8);
  const cards2 = newCards.slice(8, 16);
  const cards3 = newCards.slice(16, 24);
  return (
    <div key={newCards.length} className="absolute rotate-12 ">
      <div className="grid w-[2250px] grid-cols-8 grid-rows-3 gap-2">
        {cards1.map((card: any, index) => (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 0.3 }}
            transition={{
              duration: 8,
            }}
          >
            <motion.div
              key={card.id}
              animate={{ opacity: 1, translateX: [0, -300, 0] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={card?.image_uris?.normal}
                className="h-[380px] w-[270px] rotate-12 rounded-3xl object-cover"
                alt={card.name}
                key={index + card.name}
              />
            </motion.div>
          </motion.div>
        ))}
        {cards2.map((card: any, index) => (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
            }}
          >
            <motion.div
              key={card.id}
              animate={{ opacity: 1, translateX: [0, 300, 0] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={card?.image_uris?.normal}
                className="h-[380px] w-[270px] rotate-12 rounded-3xl object-cover"
                alt={card.name}
                key={index + card.name}
              />
            </motion.div>
          </motion.div>
        ))}
        {cards3.map((card: any, index) => (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 0.3 }}
            transition={{
              duration: 8,
            }}
          >
            <motion.div
              key={card.id}
              animate={{ opacity: 1, translateX: [0, -300, 0] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={card?.image_uris?.normal}
                className="h-[380px] w-[270px] rotate-12 rounded-3xl object-cover"
                alt={card.name}
                key={index + card.name}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
