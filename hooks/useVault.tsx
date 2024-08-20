import { useCallback } from "react";
import useWallet from "./useWallet";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { stoneevm } from "@/constants/wagmi";
import { vaultContractABI, vaultContractAddress } from "@/constants/contracts";
import { parseUnits } from "viem";
import { config } from "@/app/providers";
import { ethers } from "ethers";
import { useEthersSigner } from "./useEthersSigner";
import { showFailedMessage, showSuccessMessage } from "@/utils/toasts";
import { parseError } from "@/utils/parseError";

export default function useVault() {
  const { switchNetwork, activeUserAddress, activeNetworkId, showBalance } =
    useWallet();
  const signer = useEthersSigner();
  const vault = new ethers.Contract(
    vaultContractAddress,
    vaultContractABI,
    signer
  );

  /**
   * TODO
   *
   * 1. function that reads the user's deposited balance from the vault contract deps: [address]
   * 2. function that deposits x amount into the vault contract deps: [address, amount]
   * 3. function that withdraws x amount from the vault contract deps: [address, amount]
   * 4. function that reads the total deposited balance in the vault contract deps: []
   */

  const readUserDepositedBalance = useCallback(async () => {
    if (!activeUserAddress) {
      throw new Error("User is not connected");
    }
    const result = await readContract(config, {
      abi: vaultContractABI,
      address: vaultContractAddress,
      functionName: "balances",
      args: [activeUserAddress],
    });
    return result;
  }, [activeUserAddress]);

  const initDeposit = async ({ amount }: { amount: number }) => {
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
      if (!activeUserAddress)
        throw new Error("User not connected, Did you forget to connect?");

      if (amount <= 0 || !amount) throw new Error("Beep Boop, that amount looks wrong");
      if ((await activeNetworkId()) !== stoneevm.id) {
        await switchNetwork(stoneevm.id);
      }

      if (Number((await showBalance())!) <= amount) throw new Error("Oopsie, you don't have enough balance to deposit");

      const valToDeposit = ethers.parseEther(amount.toString());
      const tx = await vault.deposit({ value: valToDeposit });
      console.log("Deposited!", (await tx).hash);
  
      /**  WAGMI IMPLEMENTATION ERRORS OUT FOR SOME REASON
         * 
        const { request } = await simulateContract(config, {
            abi: vaultContractABI,
            address: vaultContractAddress,
            functionName: "deposit",
            value: parseUnits(amount.toString(), 18)
        });

        const hash = await writeContract(config, request);
        const receipt = await waitForTransactionReceipt(config, { hash });
        if (receipt.status == "reverted") throw Error("DEPOSIT_ERROR: Transaction reverted");

        return receipt;
        */
      if ((await tx).hash) {showSuccessMessage({title: "Your Transaction was submitted successfully"})}
      return (await tx).hash

    } catch (error: any) {
      console.error(error);
      showFailedMessage({title: parseError(error)})
    }
  };

  const initWithdraw = async ({ amount }: { amount: number }) => {
    /**
     * STEPS:
     *
     * 1. Check if the user is connected to the right chain
     * 2. check user's deposited amount against the amount it wants to withdraw.
     * 2. writeCall to the vault contract to withdraw the amount
     *
     */

    try {
      if (!activeUserAddress)
        throw new Error("User not connected, Did you forget to connect?");
      if ((await activeNetworkId()) !== stoneevm.id) {
        await switchNetwork(stoneevm.id);
      }

      if (amount <= 0) throw new Error("Beep Boop, that amount looks wrong");
      if ((await readUserDepositedBalance()) <= amount)
        throw new Error("Oopsie, you don't have enough balance to withdraw");

      const { request } = await simulateContract(config, {
        abi: vaultContractABI,
        address: vaultContractAddress,
        functionName: "withdraw",
        args: [parseUnits(amount.toString(), 18)],
      });

      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      if (receipt.status == "reverted")
        throw Error("WITHDRAW_ERROR: Transaction reverted");

      if(receipt.status == "success") {
        showSuccessMessage({title: "Your Transaction was submitted successfully"})
        return receipt.transactionHash
      }
    } catch (error) {
      console.error(error);
      showFailedMessage({title: parseError(error)})
    }
  };

  const readTotalDepositedBalance = useCallback(async () => {
    const result = await readContract(config, {
      abi: vaultContractABI,
      address: vaultContractAddress,
      functionName: "totalGas",
    });
    return result;
  }, []);

  return {
    readUserDepositedBalance,
    readTotalDepositedBalance,
    initDeposit,
    initWithdraw,
  };
}