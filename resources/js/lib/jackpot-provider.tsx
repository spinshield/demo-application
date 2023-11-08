'use client';

import React from 'react';

const JackpotContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>] | undefined
>(undefined);

export function JackpotProvider({ children }: { children: React.ReactNode }) {
  const [jackpotData, setJackpotData] = React.useState([]);

  return (
    <JackpotContext.Provider value={[jackpotData, setJackpotData]}>
        {children}
    </JackpotContext.Provider>
  );
}

export function useJackpotProvider() {
  const context = React.useContext(JackpotContext);
  if (context === undefined) {
    throw new Error('useJackpotProvider must be used within a JackpotProvider');
  }
  return context;
}