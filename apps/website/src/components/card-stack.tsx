"use client";

import { AdaptiveImage } from "@/components/adaptive-image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    // startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  // TODO: Get screen width
  return (
    <div className="relative h-[220px] md:h-[670px] w-[331px] md:w-[1031px] z-10">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-[220px] md:h-[670px] w-[331px] md:w-[1031px] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <AdaptiveImage
              priority={index === 0}
              alt="Dashboard - Overview"
              darkSrc={require("public/screen-1.png")}
              lightSrc={require("public/screen-1-light.png")}
              width={1031}
              height={670}
            />
          </motion.div>
        );
      })}
    </div>
  );
};