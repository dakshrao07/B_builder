// ===== Flower, greenery & bouquet drawing (pure SVG strings) =====
const R=(n,f)=>Array.from({length:n},(_,i)=>f(i*360/n,i)).join('');
const RG=(id,a,b)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const LG=(id,a,b)=>`<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const ring=(u,n,d,rx,ry,off,s)=>R(n,r=>`<ellipse cy="${-d}" rx="${rx}" ry="${ry}" transform="rotate(${r+off})" fill="url(#${u}a)" stroke="${s}" stroke-width=".8"/>`);
const rosy=(l,d,s,big)=>u=>RG(u+'a',l,d)+(big?ring(u,8,24,16,17,0,s)+ring(u,7,17,13,14,15,s)+ring(u,6,11,10,11,5,s)+ring(u,5,6,7,8,20,s):ring(u,7,21,14,16,0,s)+ring(u,6,14,11,12,20,s)+ring(u,5,8,8,9,10,s))+`<circle r="5" fill="${d}" stroke="${s}"/><path d="M-4 0a4 4 0 1 1 5 3" fill="none" stroke="${s}" stroke-width="1.4"/>`;
const seeds=Array.from({length:50},(_,i)=>{const r=2.2*Math.sqrt(i+1),a=(i+1)*2.39996;return `<circle cx="${(r*Math.cos(a)).toFixed(1)}" cy="${(r*Math.sin(a)).toFixed(1)}" r="1.1" fill="#e6b878" opacity=".75"/>`}).join('');
const spike=`<path d="M0 40Q3 0 0 -42" stroke="#6aa86f" stroke-width="2" fill="none"/>`+Array.from({length:14},(_,i)=>{const y=-40+i*5.2,c=['#8a63e8','#a98bff','#7a52d8'][i%3];return `<ellipse cx="-2.6" cy="${y}" rx="3" ry="4.4" fill="${c}" transform="rotate(-25 -2.6 ${y})"/><ellipse cx="2.6" cy="${y+1.5}" rx="3" ry="4.4" fill="${c}" opacity=".92" transform="rotate(25 2.6 ${y+1.5})"/>`}).join('');
const hp=[[0,0],...Array.from({length:6},(_,k)=>[13*Math.sin(k*Math.PI/3),-13*Math.cos(k*Math.PI/3)]),...Array.from({length:12},(_,k)=>[25*Math.sin((k*30+15)*Math.PI/180),-25*Math.cos((k*30+15)*Math.PI/180)])];
const hcol=['#7da2ff','#9a8cff','#b6c4ff','#8fb0ff'];
const FL=[
 {k:'pink',n:'Pink Rose',t:'soft & sweet',z:1,f:rosy('#ffb6cf','#e0407f','#c42a66')},
 {k:'white',n:'White Rose',t:'pure & calm',z:1,f:rosy('#ffffff','#e6dbee','#cbbdd8')},
 {k:'tulip',n:'Pink Tulip',t:'cheerful & fresh',z:.95,up:1,f:u=>LG(u+'a','#ec4a8a','#ffd0e2')+`<g transform="translate(0 14)"><path d="M-18-2C-22-26-8-36-4-46C-2-38 0-36 0-34C0-36 2-38 4-46C8-36 22-26 18-2C14 14-14 14-18-2Z" fill="url(#${u}a)" stroke="#d2386f"/><path d="M-7 8C-16-18-6-34 0-40C6-34 16-18 7 8Z" fill="#ffc2da" opacity=".9"/><path d="M0-40V8" stroke="#d2386f" stroke-width=".6" opacity=".4"/></g>`},
 {k:'lily',n:'Pink Lily',t:'graceful & bold',z:.78,f:u=>LG(u+'a','#c72872','#ffe4f0')+R(3,r=>`<path d="M0 0C-15-14-11-38 0-52C11-38 15-14 0 0Z" transform="rotate(${r+60})" fill="url(#${u}a)" stroke="#b81e66" stroke-width=".5" opacity=".9"/>`)+R(3,r=>`<path d="M0 0C-15-14-11-38 0-52C11-38 15-14 0 0Z" transform="rotate(${r})" fill="url(#${u}a)" stroke="#b81e66" stroke-width=".5"/>`)+R(6,r=>`<path d="M0-4V-38" stroke="#a31858" stroke-width="1" opacity=".3" transform="rotate(${r})"/><circle cy="-15" r="1.5" fill="#8e1650" transform="rotate(${r+8})"/><circle cy="-24" r="1.3" fill="#8e1650" transform="rotate(${r-8})"/>`)+R(5,r=>`<path d="M0 0L0-22" stroke="#7a9b3a" stroke-width="1" transform="rotate(${r+15})"/><ellipse cy="-24" rx="1.8" ry="4" fill="#d9781a" transform="rotate(${r+15})"/>`)},
 {k:'sun',n:'Sunflower',t:'pure sunshine',z:.8,f:u=>LG(u+'a','#f08c00','#ffd43b')+RG(u+'b','#8b5a2b','#3b1f0c')+R(16,r=>`<ellipse cy="-28" rx="6.5" ry="17" transform="rotate(${r+11})" fill="url(#${u}a)"/>`)+R(16,r=>`<ellipse cy="-25" rx="5.6" ry="15" transform="rotate(${r})" fill="url(#${u}a)" stroke="#e08a00" stroke-width=".5"/>`)+`<circle r="17" fill="url(#${u}b)"/>`+seeds},
 {k:'daisy',n:'Daisy',t:'happy & simple',z:1.1,f:u=>RG(u+'a','#ffe066','#f2a900')+R(16,r=>`<ellipse cy="-18" rx="4.3" ry="14" transform="rotate(${r+11})" fill="#f2ebf8"/>`)+R(16,r=>`<ellipse cy="-17" rx="4.2" ry="14" transform="rotate(${r})" fill="#fff" stroke="#e2d8ee" stroke-width=".6"/>`)+`<circle r="8.5" fill="url(#${u}a)"/>`+R(7,r=>`<circle cy="-4" r=".9" fill="#b97a00" transform="rotate(${r})"/>`)},
 {k:'peony',n:'Peach Peony',t:'lush & dreamy',z:.95,f:rosy('#ffe6dc','#ff8fa3','#e86c85',1)},
 {k:'lav',n:'Lavender',t:'calm & fragrant',z:1,up:1,f:()=>spike+`<g transform="rotate(-16 0 40) scale(.88)" style="transform-origin:0 40px">${spike}</g><g transform="rotate(16 0 40) scale(.88)" style="transform-origin:0 40px">${spike}</g>`},
 {k:'cherry',n:'Cherry Blossom',t:'tender & pretty',z:1.12,f:u=>RG(u+'a','#fffafc','#ffb1cd')+R(5,r=>`<path d="M0 0C-15-6-17-26-8-33L0-26L8-33C17-26 15-6 0 0Z" transform="rotate(${r})" fill="url(#${u}a)" stroke="#f08db0" stroke-width=".6"/>`)+`<circle r="4" fill="#e0407f"/>`+R(10,r=>`<path d="M0 0L0-10" stroke="#e0407f" stroke-width=".7" transform="rotate(${r})"/><circle cy="-10.5" r="1.3" fill="#a3174f" transform="rotate(${r})"/>`)},
 {k:'hydra',n:'Blue Hydrangea',t:'cloudy & gentle',z:1,f:()=>hp.map((p,i)=>`<g transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${i*17})">`+R(4,r=>`<ellipse cy="-4.2" rx="3.7" ry="5" transform="rotate(${r+45})" fill="${hcol[i%4]}" stroke="#fff" stroke-width=".3"/>`)+`<circle r="1.2" fill="#e8ecff"/></g>`).join('')}
];
const GREEN=[{k:'euc',n:'Eucalyptus',t:'silvery & soft'},{k:'fern',n:'Fern',t:'fresh & feathery'},{k:'baby',n:"Baby's Breath",t:'light & dreamy'},{k:'olive',n:'Olive Leaves',t:'gentle & elegant'},{k:'ivy',n:'Ivy',t:'lush & green'}];
const PAPER=[{k:'blush',n:'Blush',c:'#ffd0e1'},{k:'cream',n:'Cream',c:'#fff0cf'},{k:'lilac',n:'Lilac',c:'#e0d2ff'},{k:'sage',n:'Sage',c:'#cde6d2'},{k:'kraft',n:'Kraft',c:'#dfc197'},{k:'sky',n:'Sky',c:'#cfe5ff'}];
const RIB=[{k:'rose',n:'Rose',c:'#ff5d9c'},{k:'gold',n:'Gold',c:'#e6b422'},{k:'white',n:'White',c:'#ffffff'},{k:'lilac',n:'Lilac',c:'#9b7bff'},{k:'red',n:'Red',c:'#e0334f'}];
const SLOTS=[[160,118,1.12],[103,152,1.04],[217,152,1.04],[160,196,1],[66,202,.9],[254,202,.9]];
let UID=0;const uid=()=>'g'+(UID++)+'_';
function leaf(t,px,py,deg,side,k){const T=`transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${deg+side*(t==='ivy'?50:t==='euc'?55:60)})`;
 if(t==='euc')return `<ellipse rx="7" ry="8" fill="${k%2?'#9cc3ad':'#b4d6c0'}" stroke="#7aa88f" stroke-width=".5" ${T} translate(0 -7)"/>`;
 if(t==='fern')return `<ellipse rx="3.2" ry="11" fill="#58a868" ${T} translate(0 -9)"/>`;
 if(t==='olive')return `<ellipse rx="3.4" ry="12" fill="#8aa56e" stroke="#6d8a54" stroke-width=".4" ${T} translate(0 -10)"/>`;
 if(t==='ivy')return `<path d="M0 0C-9-6-12 7 0 15C12 7 9-6 0 0Z" fill="${k%2?'#3f9a5a':'#52ad6a'}" ${T} scale(1.1) translate(0 -14)"/>`;
 return `<circle cx="${(px+side*5).toFixed(1)}" cy="${(py-3).toFixed(1)}" r="3.2" fill="#fff"/><circle cx="${(px+side*9).toFixed(1)}" cy="${(py-7).toFixed(1)}" r="2.2" fill="#fff"/><circle cx="${(px+side*2).toFixed(1)}" cy="${(py-8).toFixed(1)}" r="1.8" fill="#f6f0ff"/>`}
function branch(t,a,len,x0,y0,sc=1){const r=a*Math.PI/180,sn=Math.sin(r),cs=Math.cos(r),n={euc:6,fern:9,baby:7,olive:8,ivy:5}[t];
 let o=`<path d="M${x0} ${y0}L${(x0+sn*len).toFixed(1)} ${(y0-cs*len).toFixed(1)}" stroke="${t==='baby'?'#a9bfa3':'#5a9a68'}" stroke-width="${t==='baby'?1.2:2}"/>`;
 for(let k=1;k<=n;k++){const tt=.12+.88*k/n,px=x0+sn*len*tt,py=y0-cs*len*tt;
  if(t==='euc')o+=leaf(t,px,py,a,k%2?1:-1,k);else{o+=leaf(t,px,py,a,1,k)+leaf(t,px,py,a,-1,k)}}
 return `<g transform="scale(${sc})" style="transform-origin:${x0}px ${y0}px">${o}</g>`}
const BA=[-64,-40,-16,8,32,58],BL=[150,185,205,200,180,148];
function greenBack(t){return t?`<g class="gsway">`+BA.map((a,i)=>branch(t,a,BL[i],160,262)).join('')+`</g>`:''}
function greenFront(t){return t?[[-78,92],[78,92],[-56,72],[56,72]].map(([a,l])=>branch(t,a,l,160,252)).join(''):''}
function bouquetSVG(S,newKey,anim=true){
 const u=uid(),paper=(PAPER.find(p=>p.k===S.paper)||PAPER[0]).c,rib=(RIB.find(p=>p.k===S.rib)||RIB[0]).c;
 let st='',fl='';
 S.flowers.slice(0,6).forEach((k,i)=>{const f=FL.find(x=>x.k===k),[x,y,sc]=SLOTS[i],rot=f.up?(x-160)/6:(i*53)%360;
  st+=`<path d="M${x} ${y+16}Q${x+(160-x)*.15} ${y+(300-y)*.55} 160 305" stroke="#4d9a5e" stroke-width="3" fill="none"/>`;
  fl+=`<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${anim&&k===newKey?'grow':''}"><g transform="scale(${(sc*f.z*1.14).toFixed(2)})">${f.f(u+i+'_')}</g></g></g>`});
 const wrap=`<defs>${LG(u+'p',paper,'#ffffff')}</defs><path d="M50 232Q70 220 92 234Q114 248 136 234Q158 220 180 234Q202 248 224 234Q246 220 270 232L160 376Z" fill="${paper}" stroke="#fff" stroke-opacity=".8"/><path d="M50 232L160 376L98 252Z" fill="#fff" opacity=".35"/><path d="M270 232L160 376L222 252Z" fill="#000" opacity=".07"/><path d="M160 376L128 262M160 376L194 262" stroke="#fff" stroke-opacity=".4" stroke-width="1.5"/>`;
 const bow=`<path d="M104 300Q160 322 216 300" stroke="${rib}" stroke-width="9" stroke-linecap="round" fill="none"/><g transform="translate(160 312)"><path d="M0 0C-34-22-44 14-4 8Z" fill="${rib}" stroke="#000" stroke-opacity=".1"/><path d="M0 0C34-22 44 14 4 8Z" fill="${rib}" stroke="#000" stroke-opacity=".1"/><path d="M-3 8L-16 40L-4 33L0 44Z" fill="${rib}"/><path d="M3 8L16 40L4 33L0 44Z" fill="${rib}"/><circle r="7" fill="${rib}" stroke="#000" stroke-opacity=".15"/></g>`;
 return `<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">${st}${greenBack(S.green)}${fl}${greenFront(S.green)}${wrap}${bow}</svg>`}
const iconSVG=f=>`<svg viewBox="-52 -54 104 108" xmlns="http://www.w3.org/2000/svg"><g transform="scale(${f.z})">${f.f(uid())}</g></svg>`;
const greenIcon=k=>`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${[-28,0,28].map((a,i)=>branch(k,a,[64,78,64][i],50,96)).join('')}</svg>`;
