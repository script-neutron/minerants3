import AQUARIUS from '../../assets/ants/AQUARIUS.gif';
import ARIES from '../../assets/ants/ARIES.gif';
import CANCER from '../../assets/ants/CANCER.gif';
import Capricorn from '../../assets/ants/Capricorn.gif';
import gemini from '../../assets/ants/gemini.gif';
import LEO from '../../assets/ants/LEO.gif';
import libra from '../../assets/ants/libra.gif';
import PISCES from '../../assets/ants/PISCES.gif';
import SAGITTARIUS from '../../assets/ants/SAGITTARIUS.gif';
import SCORPIO from '../../assets/ants/SCORPIO.gif';
import TAURUS from '../../assets/ants/TAURUS.gif';
import VIRGO from '../../assets/ants/VIRGO.gif';
import AQUARIUS_egg from '../../assets/eggs/AQUARIUS_egg.gif';
import aries_egg from '../../assets/eggs/aries_egg.gif';
import cancer_egg from '../../assets/eggs/cancer_egg.gif';
import Capricorn_egg from '../../assets/eggs/Capricorn_egg.gif';
import gemini_egg from '../../assets/eggs/gemini_egg.gif';
import leo_egg from '../../assets/eggs/leo_egg.gif';
import libra_egg from '../../assets/eggs/libra_egg.gif';
import PISCES_egg from '../../assets/eggs/PISCES_egg.gif';
import Sagittarius_egg from '../../assets/eggs/Sagittarius_egg.gif';
import scorpio_egg from '../../assets/eggs/scorpio_egg.gif';
import TAURUS_egg from '../../assets/eggs/TAURUS_egg.gif';
import VIRGO_egg from '../../assets/eggs/VIRGO_egg.gif';
import Image from 'next/image';
import { BsArrowsFullscreen } from 'react-icons/bs';

function NestPage() {
  const data = [
    {
      image: AQUARIUS,
      egg: AQUARIUS_egg,
      zodiac: 'AQUARIUS',
      hash: 100,
      attack: 600,
    },
    {
      image: ARIES,
      egg: aries_egg,
      zodiac: 'ARIES',
      hash: 110,
      attack: 400,
    },
    {
      image: CANCER,
      egg: cancer_egg,
      zodiac: 'CANCER',
      hash: 125,
      attack: 100,
    },
    {
      image: Capricorn,
      egg: Capricorn_egg,
      zodiac: 'CAPRICORN',
      hash: 155,
      attack: 100,
    },
    {
      image: gemini,
      egg: gemini_egg,
      zodiac: 'GEMINI',
      hash: 120,
      attack: 200,
    },
    {
      image: LEO,
      egg: leo_egg,
      zodiac: 'LEO',
      hash: 130,
      attack: 600,
    },
    {
      image: libra,
      egg: libra_egg,
      zodiac: 'LIBRA',
      hash: 140,
      attack: 400,
    },
    {
      image: PISCES,
      egg: PISCES_egg,
      zodiac: 'PISCES',
      hash: 105,
      attack: 500,
    },
    {
      image: SAGITTARIUS,
      egg: Sagittarius_egg,
      zodiac: 'SAGITTARIUS',
      hash: 150,
      attack: 200,
    },
    {
      image: SCORPIO,
      egg: scorpio_egg,
      zodiac: 'SCORPIO',
      hash: 145,
      attack: 300,
    },
    {
      image: TAURUS,
      egg: TAURUS_egg,
      zodiac: 'TAURUS',
      hash: 115,
      attack: 300,
    },
    {
      image: VIRGO,
      egg: VIRGO_egg,
      zodiac: 'VIRGO',
      hash: 135,
      attack: 500,
    },
  ];
  return (
    <>
      {data.map((item) => (
        <div
          className="flex text-center justify-around p-8 m-8 border-2 border-rose-500 rounded-2xl"
          key={item.zodiac}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 m-4">
              <h3 className="btn text-lg font-bold p-4 m-4 text-white">
                Hash: {item.hash}
              </h3>
              <h1 className="btn text-lg font-bold p-4 m-4 text-white">
                {item.zodiac}
              </h1>
              <h3 className="btn text-lg font-bold p-4 m-4 text-white">
                ATK: {item.attack}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 m-4">
              <Image src={item.egg} alt="logo" className="rounded-2xl" />
              <h1 className="text-lg font-bold text-orange-700 py-4 mt-8">
                ---------------------------
              </h1>
              <Image src={item.image} alt="logo" className="rounded-2xl" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default NestPage;
