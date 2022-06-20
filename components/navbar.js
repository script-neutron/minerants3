import { Transition } from "@headlessui/react";
import Link from "next/link";
import logo from "../assets/logo.svg";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* main nav cointainer*/}
      <nav className="shadow-sm  w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            {/* first block section outer part*/}
            <div className=" flex items items-center mx-20 justify-between w-full ">
              <div className="flex justify-center items-center flex-shrink-0 py-3">
                <Image src={logo} alt="logo" width="70px" height="50px" />
                <h1 className="font-bold text-xl cursor pointer text-white">
                  Miner <span className="text-blue-500">Ants</span>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex item-baseline space-x-4 ">
                  <ul className="flex text-white">
                    <li className="navbtn cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black">
                      <Link href="/"> Home </Link>
                    </li>

                    <li className="navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/nest"> Ant Nest </Link>
                    </li>

                    <li className="navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/guide"> Guide </Link>
                    </li>

                    <li className="navbtn active:bg-orange-700 cursor-pointer hover:bg-black  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/dapp"> Dapp </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* mobile responsive section */}
            <div className="flex md:hidden w-[100%]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="w-full bg-blue-600 inline-flex items-center justify-center rounded-md text-white hover:bg-blue-600 focus: outline-none focus: ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="text-lg font-semibold"> Open Menu </span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16 "
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 18L18 6M6 6l12 12 "
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform "
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
            {(ref) =>(
                <div className="md:hidden id=mobile-menu m-6">
                    <div ref={ref} className="bg-white px-2 pt-2 pb-2 space-y-1 sm:px-3">
                    <ul className="flex justify-center">
                    <li className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black">
                      <Link href="/"> Home </Link>
                    </li>

                    <li className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/nest"> Ant Nest </Link>
                    </li>

                    <li className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/guide"> Guide </Link>
                    </li>

                    <li className="cursor-pointer hover:bg-black text-black hover:text-white px-3 py-2 rounded-md text-md font-semibold">
                      <Link href="/dapp"> Dapp </Link>
                    </li>
                  </ul>
                    </div>
                </div>
            )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
