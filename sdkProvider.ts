import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { sporranSDK } from './index';
import { ContextProviderProps, ContextType } from './interfaces/index'; 

const sporranSdkContext = createContext<ContextType>({ isInstalled: false , identity: {} });

export const useSporranSdk = () => useContext(sporranSdkContext);

export function SporranSdkProvider(props: ContextProviderProps): React.ReactElement {
  const [isInstalled, setIsInstalled] = useState(false);
  const [identity, setIdentity ]  = useState({});

  useEffect(() => {
    const install_sporranSdk = async () => {
      const result = await sporranSDK.install(props.appId ?? 'unknown-app-id');
      if (result.success) {
        const { did, web3Name, walletAddress, email, name } = result.initResult || {};
        const identity = {
          did: did || '',
          web3Name: web3Name || '',
          walletAddress: walletAddress || '',
          email: email || '',
          name: name || '',
        };
        setIdentity(identity);
        setIsInstalled(true);
      } else {
        console.log('sporranSdk installation failed.');
      }
    };
    install_sporranSdk();
  }, [props.appId]);

  return React.createElement(
    sporranSdkContext.Provider,
    { value: { isInstalled, identity } },
    props.children
  );
}
