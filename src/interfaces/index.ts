import type { ReactNode } from 'react';
import { sporranSDK } from '../index';

export interface ContextType {
  isInstalled: boolean;
  identity: {
    did?: string;
    web3Name?: string;
    walletAddress?: string;
    email?: string;
    name?: string;
  };
}

export interface ContextProviderProps {
  appId?: string;
  children: ReactNode;
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        sporranSDK?: {
          postMessage?: (payload: string) => void;
        };
      };
    };
    Android?: {
      postMessage?: (payload: string) => void;
    };
    ReactNativeWebView?: {
      postMessage?: (payload: string) => void;
    };
    SporranApp?: {
      device_os: string;
      version: number;
      is_optional_analytics?: boolean;
    };
    sporranSDK?: sporranSDK;
  }
}