import React,{useState,useMemo} from 'react';
const CHAINS=['All','Bitcoin','Ethereum','Solana','Polygon','BSC','Avalanche','Tron','Cosmos','Arbitrum','Optimism','Base'];
export default function WalletList({initialData=[]}){
  const [query,setQuery]=useState(''),[chain,setChain]=useState('All'),[sortBy,setSortBy]=useState('rating'),[onlyBonus,setOnlyBonus]=useState(false);
  const filtered=useMemo(()=>initialData.filter(w=>{if(onlyBonus&&!w.bonus_has) return false;if(chain!=='All'&&!(w.chains||'').split('|').includes(chain)) return false;if(query&&!((w.name||'')+' '+(w.type||'')+' '+(w.chains||'')).toLowerCase().includes(query.toLowerCase())) return false;return true}).sort((a,b)=>sortBy==='rating'?(b.rating||0)-(a.rating||0):(a.name||'').localeCompare(b.name||'')),[initialData,query,chain,sortBy,onlyBonus]);
  return (<div>
    <div className="flex gap-2 mb-4 flex-wrap">
      <input placeholder="Search wallets" value={query} onChange={e=>setQuery(e.target.value)} className="p-2 border rounded flex-1"/>
      <select value={chain} onChange={e=>setChain(e.target.value)} className="p-2 border rounded">{CHAINS.map(c=><option key={c} value={c}>{c}</option>)}</select>
      <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="p-2 border rounded"><option value="rating">Rating</option><option value="name">Name</option></select>
      <label className="inline-flex items-center gap-2 p-2 border rounded"><input type="checkbox" checked={onlyBonus} onChange={e=>setOnlyBonus(e.target.checked)}/>Only bonuses</label>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(w=>(<article key={w.id} className="p-4 border rounded"><h2 className="font-semibold">{w.name}</h2><div className="text-xs">{w.type} • {(w.chains||'').split('|').join(', ')}</div><div className="mt-2 flex gap-2"><a href={w.affiliate_url||w.website} target="_blank" className="p-1 border rounded flex-1 text-center">Visit</a></div></article>))}
    </div>
  </div>);
}
