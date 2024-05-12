import Image from "next/image";
import Hero from "./_Components/herosection/Hero/page";
import Navbar from "./_Components/herosection/Navbar/page";

export default function Home() {
  return (
    <>
      <div className=" relative h-full w-full bg-gray-700">
        <Hero />
        <Hero />
        <Hero />
      </div>
    </>
  );
}
