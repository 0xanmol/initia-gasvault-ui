import { config } from "@/app/providers";
import { useMemo } from "react";
import { useSwitchChain, useAccount } from "wagmi";
import { getBalance } from "wagmi/actions";

/**
 * @description All the functionalities related to wallet such as connecting, switching network, etc
 */
export default function useWallet() {
    const { switchChainAsync } = useSwitchChain();
    const { chainId, address, isConnected } = useAccount();

    const switchNetwork =
        async (chainId: number) => {
            await switchChainAsync({ chainId: chainId })
        }

    const activeUserAddress = useMemo(
        () => {
            if(!isConnected) {
                return null
            }
            
            return address
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId],
    );

    const activeNetworkId =
        async () => {
            return chainId
        }

    const showBalance = async () => {
        if(!address) {
            return null
        }
        const balance = await getBalance(config, { address: address })
        return balance.formatted
    }

    return {
        activeUserAddress,
        activeNetworkId,
        switchNetwork, 
        showBalance
    };
}
