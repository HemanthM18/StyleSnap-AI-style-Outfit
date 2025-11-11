import React from 'react';

function hexDistance(a,b){
  const pa = a.replace('#','');
  const pb = b.replace('#','');
  const ra = parseInt(pa.substring(0,2),16);
  const ga = parseInt(pa.substring(2,4),16);
  const ba = parseInt(pa.substring(4,6),16);
  const rb = parseInt(pb.substring(0,2),16);
  const gb = parseInt(pb.substring(2,4),16);
  const bb = parseInt(pb.substring(4,6),16);
  return Math.sqrt((ra-rb)**2 + (ga-gb)**2 + (ba-bb)**2);
}

export default function Recommendations({ dominantColor, products }) {
  if (!dominantColor) return null;
  const ranked = products
    .map(p => ({...p, score: hexDistance(dominantColor, p.color)}))
    .sort((a,b)=>a.score-b.score)
    .slice(0,4);
  return (
    <div style={{marginTop:20}}>
      <h3>Recommendations (based on dominant color <span style={{fontWeight:700}}>{dominantColor}</span>)</h3>
      <div style={{display:'flex', gap:12, marginTop:12, flexWrap:'wrap'}}>
        {ranked.map(p=>(
          <div key={p.id} style={{width:160, border:'1px solid #eee', borderRadius:8, padding:8}}>
            <img src={p.img} alt={p.title} style={{width:'100%', borderRadius:6}}/>
            <div style={{marginTop:8, fontSize:14}}>{p.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
