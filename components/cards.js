import Image from "next/image";

export default function Cards(props) {
  return (
    <div className="card">
      <Image src={props.image} alt="logo" className="rounded-2xl"/>
      <div className="card-contents text-lg font-medium">
        <div className="flex justify-evenly">
          <h1> Zodiac: </h1>
          <h2> {props.zodiac}</h2>
        </div>
        <div className="flex justify-evenly">
          <h1> Hash Power: </h1>
          <h2> {props.miningpow}</h2>
        </div>
        <div className="flex justify-evenly">
          <h1> Attack Power: </h1>
          <h2> {props.attackpow}</h2>
        </div>
      </div>
    </div>
  );
}
