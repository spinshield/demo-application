// @ts-nocheck
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CasinoPageProps } from '@/types';
import CasinoGames from "@/Components/CasinoGames";
import { useJackpotProvider } from "@/lib/jackpot-provider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Casino({ auth, games, activeJackpots, images }: CasinoPageProps) {
  const [jackpotData, setJackpotData] = useJackpotProvider();
  const [smallJackpotAmount, setSmallJackpotAmount] = useState("0.00");
  const [mediumJackpotAmount, setMediumJackpotAmount] = useState("0.00");
  const [shineEffect, setShineEffect] = useState(false);

  useEffect(() => {
    setJackpotData(activeJackpots);
  }, []);

  useEffect(() => {
    if (jackpotData.small) {
      if(jackpotData.small.amount !== smallJackpotAmount) {
      setSmallJackpotAmount(jackpotData.small.amount);
      setMediumJackpotAmount(jackpotData.medium.amount);
      setShineEffect(true);
      setTimeout(() => {
        setShineEffect(false);
      }, 3000);

      }
    }
  }, [jackpotData]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h3 className="font-semibold text-xs text-theme-100 leading-tight">
          Small Jackpot:{" "}
          <span className={`shine-effect ${shineEffect ? '' : 'shine'}`}>{smallJackpotAmount}</span>{" "}
          || Medium Jackpot:{" "}
          <span className={`shine-effect ${shineEffect ? '' : 'shine'}`}>{mediumJackpotAmount}</span>
        </h3>
      }
    >
      <Head title="Casino" />
      <div className="max-h-[500px]">
        <Carousel autoPlay interval={10000} infiniteLoop showStatus={false} showThumbs={false}>
          {images.map((image, index) => (
            <div key={index} className="max-h-72">
              <img src={image.url} className="object-cover object-center h-auto" />
              <p className="legend">{image.desc}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <CasinoGames games={games} />
    </AuthenticatedLayout>
  );
}