"use client";
import { MouseEventHandler } from "react";
import React, { useState, useEffect } from "react";
import { RandomFox } from "@/components/RamdomFox";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const random = Math.floor(Math.random() * 123) + 1;


  useEffect(() => {
    const newImages = Array.from({ length: 0 }, () => {
      return `https://randomfox.ca/images/${random}.jpg`;
    });
    setImages(newImages);
  }, []);

  const newFox: MouseEventHandler<HTMLButtonElement>  = (event) => {
    event.preventDefault();
    
    const newImage = `https://randomfox.ca/images/${random}.jpg`;

    setImages((beforeImages) => [...beforeImages, newImage]);
  };

  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline">Hola, mundo</h1>
        <h2>Mi primer proyecto con Next.js y TypeScript</h2>

        <button onClick={newFox}>New fox</button>

        {images.length === 0 ? (
          <p>Preciona para cargar imagen...</p>
        ) : (
          images.map((image, index) => (
            <div key={index} className="p-4">
              <RandomFox image={image} />
            </div>
          ))
        )}
      </main>
    </div>
  );
}
