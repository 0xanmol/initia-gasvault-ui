"use client";

import { vaultContractABI, vaultContractAddress } from '@/constants/contracts'
import useVault from '@/hooks/useVault'

export default function Home() {

  const {initDeposit, initWithdraw, readUserDepositedBalance} = useVault()


  return (
    <div>
     
     
    </div>
  )
}
