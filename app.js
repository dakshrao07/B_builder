const $=id=>document.getElementById(id);
const S={flowers:[],green:null,paper:'blush',rib:'rose'};let step=0;
// falling petals
const cv=$('bg'),cx=cv.getContext('2d');let W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
const E=['🌸','🌷','🌹','🌻','🪷','🌼','💗'];
const PT=Array.from({length:24},(_,i)=>({x:Math.random()*W,y:Math.random()*H,s:14+Math.random()*16,v:.4+Math.random()*.7,e:E[i%7],r:Math.random()*6}));
(function L(t){cx.clearRect(0,0,W,H);cx.globalAlpha=.5;PT.forEach(p=>{cx.font=p.s+'px serif';cx.fillText(p.e,p.x+Math.sin(t/1200+p.r)*20,p.y);p.y+=p.v;if(p.y>H+30){p.y=-30;p.x=Math.random()*W}});requestAnimationFrame(L)})(0);
function burst(x,y,n=4){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='pop';s.textContent=E[Math.random()*7|0];s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--x',(Math.random()*240-120)+'px');s.style.setProperty('--y',(-70-Math.random()*150)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),1300)}}
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,3));
let tt;function toast(m){const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2400)}

$('introArt').innerHTML=iconSVG(FL[0]);
const draw=k=>{$('bq').innerHTML=bouquetSVG(S,k)};
function steps(){$('steps').innerHTML=['1 Flowers 🌸','2 Greenery 🌿','3 Wrapping 🎀'].map((t,i)=>`<span class="${i===step?'on':i<step?'ok':''}">${t}</span>`).join('')}
function go(n){step=n;steps();[p0,p1,p2][n]();$('panel').style.animation='none';void $('panel').offsetWidth;$('panel').style.animation='';scrollTo({top:0,behavior:'smooth'})}

function p0(){
 $('panel').innerHTML=`<h3>Pick 6 flowers 🌸</h3><p class="cnt" id="cnt"></p><div class="grid" id="fg">${FL.map(f=>`<div class="opt" data-k="${f.k}">${iconSVG(f)}<b>${f.n}</b><small>${f.t}</small><i class="chk">💗</i></div>`).join('')}</div><div class="nav"><button id="nx">Next: Greenery 🌿</button></div>`;
 const upd=()=>{$('cnt').textContent=`${S.flowers.length} of 6 chosen`+(S.flowers.length===6?' ✨':'');$('nx').disabled=S.flowers.length<6;
  document.querySelectorAll('#fg .opt').forEach(o=>{const on=S.flowers.includes(o.dataset.k);o.classList.toggle('sel',on);o.classList.toggle('dim',!on&&S.flowers.length>=6)})};
 document.querySelectorAll('#fg .opt').forEach(o=>o.onclick=e=>{const k=o.dataset.k,i=S.flowers.indexOf(k);
  if(i>-1){S.flowers.splice(i,1);draw()}
  else if(S.flowers.length>=6){toast('Only 6 flowers, tap one to swap it 💗');return}
  else{S.flowers.push(k);draw(k);burst(e.clientX,e.clientY,6)}
  upd()});
 $('nx').onclick=()=>go(1);upd()}
function p1(){
 $('panel').innerHTML=`<h3>Add some greenery 🌿</h3><p class="cnt">Choose the leaves you like</p><div class="grid" id="gg">${GREEN.map(g=>`<div class="opt" data-k="${g.k}">${greenIcon(g.k)}<b>${g.n}</b><small>${g.t}</small><i class="chk">💗</i></div>`).join('')}</div><div class="nav"><button class="ghost" id="bk">← Back</button><button id="nx">Next: Wrapping 🎀</button></div>`;
 const upd=()=>{$('nx').disabled=!S.green;document.querySelectorAll('#gg .opt').forEach(o=>o.classList.toggle('sel',o.dataset.k===S.green))};
 document.querySelectorAll('#gg .opt').forEach(o=>o.onclick=e=>{S.green=o.dataset.k;draw();burst(e.clientX,e.clientY,4);upd()});
 $('bk').onclick=()=>go(0);$('nx').onclick=()=>go(2);upd()}
function p2(){
 const sw=(a,key,id)=>`<div class="row" id="${id}">${a.map(x=>`<div class="swi" data-k="${x.k}"><div class="sw" style="background:${x.c}"></div>${x.n}</div>`).join('')}</div>`;
 $('panel').innerHTML=`<h3>Choose the wrapping 🎁</h3><p class="cnt">Paper</p>${sw(PAPER,'paper','pp')}<p class="cnt">Ribbon</p>${sw(RIB,'rib','rr')}<div class="nav"><button class="ghost" id="bk">← Back</button><button id="nx">Finish my bouquet 💐</button></div>`;
 const upd=()=>{document.querySelectorAll('#pp .swi').forEach(o=>o.classList.toggle('sel',o.dataset.k===S.paper));document.querySelectorAll('#rr .swi').forEach(o=>o.classList.toggle('sel',o.dataset.k===S.rib))};
 document.querySelectorAll('#pp .swi').forEach(o=>o.onclick=()=>{S.paper=o.dataset.k;draw();upd()});
 document.querySelectorAll('#rr .swi').forEach(o=>o.onclick=()=>{S.rib=o.dataset.k;draw();upd()});
 $('bk').onclick=()=>go(1);$('nx').onclick=finish;upd()}

function finish(){
 $('app').classList.add('hidden');$('final').classList.remove('hidden');$('final').scrollTop=0;
 $('finalBq').innerHTML=bouquetSVG(S,null,false);
 $('names').textContent='Your flowers: '+S.flowers.map(k=>FL.find(f=>f.k===k).n).join(', ')+' · with '+GREEN.find(g=>g.k===S.green).n;
 for(let i=0;i<36;i++)setTimeout(()=>burst(Math.random()*innerWidth,innerHeight*.8,2),i*80)}
$('again').onclick=()=>{S.flowers=[];S.green=null;$('final').classList.add('hidden');$('app').classList.remove('hidden');draw();go(0)};
$('save').onclick=()=>{
 const svg=$('finalBq').querySelector('svg').cloneNode(true);svg.setAttribute('width',640);svg.setAttribute('height',800);
 const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=800;c.height=1040;const g=c.getContext('2d');
  const bgr=g.createLinearGradient(0,0,800,1040);bgr.addColorStop(0,'#fff0f6');bgr.addColorStop(.5,'#f4e9ff');bgr.addColorStop(1,'#fff6e3');g.fillStyle=bgr;g.fillRect(0,0,800,1040);
  g.drawImage(img,80,150,640,800);g.fillStyle='#e0407f';g.textAlign='center';g.font='bold 46px sans-serif';g.fillText("Disha ji's bouquet 💐",400,95);g.font='28px sans-serif';g.fillStyle='#7a2b54';g.fillText('Made with love by Disha, wishes from Daksh 💖',400,1005);
  c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='disha-bouquet.png';a.click();toast('Saved! 📸')})};
 img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg))};
$('go').onclick=e=>{burst(e.clientX,e.clientY,16);$('intro').classList.add('gone');$('app').classList.remove('hidden');draw();go(0)};
