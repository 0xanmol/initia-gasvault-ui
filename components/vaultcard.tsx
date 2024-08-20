import useVault from "@/hooks/useVault";
import { Button, Input, Tag } from "degen";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import useWallet from "@/hooks/useWallet";

export default function VaultCard() {
  const [amount, setAmount] = useState<string>("");
  const [depositedBalance, setDepositedBalance] = useState<string>("...");
  const [totalDepositedBalance, setTotalDepositedBalance] = useState<string>("...");
  const [loading, setLoading] = useState<boolean>(false);
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");

  const { initDeposit, initWithdraw, readUserDepositedBalance, readTotalDepositedBalance } = useVault();
  const { showBalance } = useWallet();
  const { isConnected, address } = useAccount();


  useEffect(() => {
    if (!isConnected) return setDepositedBalance("...");
    const fetchDepositedBalance = async () => {
      const balance = await readUserDepositedBalance();
      setDepositedBalance(parseFloat(formatUnits(balance, 18)).toFixed(2));
    };
    const fetchTotalDepositedBalance = async () => {
      const totalDepositedBalance = await readTotalDepositedBalance();
      setTotalDepositedBalance(parseFloat(formatUnits(totalDepositedBalance, 18)).toFixed(2));
    }
    const fetchBalance = async () => {
      const balance = await showBalance();
      setBalance(balance!);
    }
    fetchBalance();
    fetchDepositedBalance();
    fetchTotalDepositedBalance();
  }, [isConnected, readTotalDepositedBalance, readUserDepositedBalance, showBalance]);

  return (
    <>
      <div className="bg-[#1D1D1D] rounded-2xl p-6 mx-auto text-white w-[70vw] space-y-4 flex flex-col items-center justify-center">
        <h1 className="font-mono text-7xl font-bold">{depositedBalance} GAS</h1>
        <h1 className="font-mono text-2xl font-extralight text-white text-opacity-60">
         YOU DEPOSITED IN THE VAULT
        </h1>
      </div>
      <div className="bg-[#1D1D1D]  rounded-2xl p-6 mx-auto text-white w-[70vw] space-y-4 space-x-3 flex flex-row items-end justify-end">
        <Input
          label="Amount"
          labelSecondary={<Tag>{(parseFloat(balance) - 1).toFixed(2)} GAS max</Tag>}
          max={Number(balance) - 1}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10.34"
          type="number"
          units="GAS"
        />
        <div className="mb-1 flex flex-row space-x-2 items-center justify-center">
        <Button
        size="small"
        loading={loading}
        variant="secondary"
          onClick={async () => {
            setLoading(true);
            try {
              await initDeposit({ amount: parseFloat(amount) });
              await readUserDepositedBalance();

            } catch (error: any) {
              console.error(error, "sad");
            } finally {
              setLoading(false)
            }
           
          }}
        >
          Deposit
        </Button>
        <Button
        size="small"
        loading={withdrawLoading}
        variant="tertiary"
          onClick={async () => {
            setWithdrawLoading(true);
            try {
              if (address) {
                await initWithdraw({ amount: parseFloat(amount), address: address });
                await readUserDepositedBalance();
              }
            } catch (error) {
              console.error(error);
            } finally {
              setWithdrawLoading(false)
            }
          }}
        >
          Withdraw
        </Button>
        </div> 
      </div>
      <h2 className="text-center font-mono italic text-lg font-extralight text-white text-opacity-60 pt-4">Total GAS deposited in contract --- <span className="text-white text-bold">{totalDepositedBalance} GAS</span></h2>
    </>
  );
}