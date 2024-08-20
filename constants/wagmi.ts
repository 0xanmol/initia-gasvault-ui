

import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';

export const stoneevm = {
    id: 2594729740794688,
    name: 'stoneevm-16',
    iconBackground: '#fff',
    nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://json-rpc.stoneevm-16.initia.xyz'] },
    },
    
  } as const satisfies Chain;


// export const ethConfig = createConfig({
//   chains:[
//     stoneevm
//   ],
//   transports: {
//     [stoneevm.id]: http('https://json-rpc.stoneevm-16.initia.xyz'),
//   },
//   ssr: true,
  
// })