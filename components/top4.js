import ant1 from '../assets/ant1.png'
import ant2 from '../assets/ant2.png'
import ant3 from '../assets/ant3.png'
import ant4 from '../assets/ant4.png'
import Cards from './cards'

export default function Top4() {
    const data =[
      {
        image: ant1,
        name: 'Goat MinerAnt',
        zodiac: 'CAPRICORN',
        miningpow: '155x',
        attackpow: 100
      },
  
      {
        image: ant2,
        name: 'Lion MinerAnt',
        zodiac: 'LEO',
        miningpow: '130x',
        attackpow: 600
      },
  
      {
        image: ant3,
        name: 'Twins MinerAnt',
        zodiac: 'GEMINI',
        miningpow: '120x',
        attackpow: 200
      },
  
      {
        image: ant4,
        name: 'Maiden MinerAnt',
        zodiac: 'Virgo',
        miningpow: '135x',
        attackpow: 500
      },
    ]
  
    return (
      <div className='m-8'>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Super Rare MinerAnts</h2>
          <p className="text-lg font-normal text-white py-8">Top 4 MinerAnts with high Hash pow</p>
        </div>
        <div className="cards">
          {
            data.map((item)=>(
            <Cards 
            image={item.image}
            name={item.name} 
            zodiac={item.zodiac} 
            miningpow={item.miningpow} 
            attackpow={item.attackpow} key={item.zodiac} />
            ))
          }
        </div>
      </div>
    )
  }