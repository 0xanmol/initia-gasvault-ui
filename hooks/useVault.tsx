import { useCallback } from "react";
import useWallet from "./useWallet";
import { readContract, simulateContract, waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { ethConfig, stoneevm } from "@/constants/wagmi";
import { vaultContractABI, vaultContractAddress } from "@/constants/contracts";
import { parseUnits } from "viem";

export default function useVault() {
  const { switchNetwork, activeUserAddress, activeNetworkId, showBalance } = useWallet();

  /**
   * TODO
   *
   * 1. function that reads the user's deposited balance from the vault contract deps: [address]
   * 2. function that deposits x amount into the vault contract deps: [address, amount]
   * 3. function that withdraws x amount from the vault contract deps: [address, amount]
   */

  const readUserDepositedBalance = useCallback(async () => {
    if (!activeUserAddress) {
    throw new Error("User is not connected");
    }
    const result = await readContract(ethConfig, {
      abi: vaultContractABI,
      address: vaultContractAddress,
      functionName: "balances",
      args: [activeUserAddress],
    });
    return result;
  }, [activeUserAddress]);

  const initDeposit = async ({
    amount
  }: {amount : number}) => {
    /**
     * STEPS:
     * 
     * 1. Check if the user is connected to the right chain
     * 2. Compare amount entered and balance, leave some for gas, else error out accrodingly
     * 3. writeCall to the vault contract to deposit the amount
     * 
     */

    try {
        //we can move this into a function called sanityChecks later to prevent code duplication
        if (!activeUserAddress) throw new Error("User not connected, Did you forget to connect?");
        if (amount <= 0) throw new Error("Beep Boop, that amount looks wrong");
        if (await activeNetworkId() !== stoneevm.id) {
            await switchNetwork(stoneevm.id);
        }

        if((await showBalance())! <= amount.toString()) throw new Error("Oopsie, you don't have enough balance to deposit");

        const { request } = await simulateContract(ethConfig, {
            abi: vaultContractABI,
            address: vaultContractAddress,
            functionName: "deposit",
            value: parseUnits(amount.toString(), 18)
        });

        const hash = await writeContract(ethConfig, request);
        const receipt = await waitForTransactionReceipt(ethConfig, { hash });
        if (receipt.status == "reverted") throw Error("DEPOSIT_ERROR: Transaction reverted");
       
    } catch (error) {
        console.error(error);
     }
  };

  const initWithdraw = async ({amount}:{amount: number}) => {
    /**
     * STEPS:
     * 
     * 1. Check if the user is connected to the right chain
     * 2. writeCall to the vault contract to withdraw the amount
     * 
     */

    try {
        if (!activeUserAddress) throw new Error("User not connected, Did you forget to connect?");
        if (await activeNetworkId() !== stoneevm.id) {
            await switchNetwork(stoneevm.id);
        }

        if (amount <= 0) throw new Error("Beep Boop, that amount looks wrong");
        if(await readUserDepositedBalance() <= amount) throw new Error("Oopsie, you don't have enough balance to withdraw");

        const { request } = await simulateContract(ethConfig, {
            abi: vaultContractABI,
            address: vaultContractAddress,
            functionName: "withdraw",
            args: [parseUnits(amount.toString(), 18)]
        });

        const hash = await writeContract(ethConfig, request);
        const receipt = await waitForTransactionReceipt(ethConfig, { hash });
        if (receipt.status == "reverted") throw Error("WITHDRAW_ERROR: Transaction reverted");
       
    } catch (error) {
        console.error(error);
     }
  };

  return {
    readUserDepositedBalance,
    initDeposit,
    initWithdraw,
  };
}
