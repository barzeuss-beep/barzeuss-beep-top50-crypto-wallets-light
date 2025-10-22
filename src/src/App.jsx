import React, { useEffect, useState } from 'react';
import WalletList from './Top50Wallets.jsx';

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/data/top50_wallets.json')
      .then(r => r.json())
      .then(setData);
  }, []);
  return (
    <div className="min-h-screen p-6 bg-white text-slate-900">
      <h1 className="text-2xl font-bold mb-4">Top 50 Crypto Wallets</h1>
      <WalletList initialData={data} />
    </div>
  );
}
