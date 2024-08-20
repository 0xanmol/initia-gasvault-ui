'use client';

import * as React from 'react';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { stoneevm } from '@/constants/wagmi';
import { ThemeProvider } from 'degen'
import 'degen/styles'


const queryClient = new QueryClient();

export const config = getDefaultConfig({
  appName: 'Vault UI',
  projectId: 'ff3e7e095aae4b0550ed934c1539ed07',
  chains: [
    stoneevm
  ],
  ssr: true,
});


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider forcedMode='dark' defaultAccent='orange' defaultMode='dark'>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ThemeProvider>
  );
}
