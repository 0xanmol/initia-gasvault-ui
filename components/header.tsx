"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Heading } from "degen";

export default function Header() {
  return (
    <div className="mx-10 my-5 flex flex-row items-center justify-between ">
      <Heading level="1" color={"white"}>
       <span className="font-thin font-sans "> $GAS</span>  Vault
      </Heading>
      <ConnectButton />
    </div>
  );
}
