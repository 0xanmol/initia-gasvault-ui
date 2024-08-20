import { vaultContractABI, vaultContractAddress } from '@/constants/contracts'
import { ethConfig } from '@/constants/wagmi'
import useVault from '@/hooks/useVault'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { readContract } from 'wagmi/actions'

export default function Home() {

  const {initDeposit, initWithdraw, readUserDepositedBalance} = useVault()


  return (
    <div>
      <Image src="/logo.png" alt="logo" width={500} height={500} />
      <h1 className='font-bold text-4xl'>Vault UI</h1>
      <ConnectButton />
      <button onClick={async () => {
        const a = await readUserDepositedBalance()
        console.log('User Deposited Balance:', a)
      } }>Show Balance</button>
    </div>
  )
}
