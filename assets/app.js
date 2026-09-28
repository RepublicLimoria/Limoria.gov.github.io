const q=document.getElementById("q"),results=document.getElementById("results");
const data=[["National Identity","#identity"],["Mamun Hossen Limon — President of Limoria","#president"],["National Flag","#identity"],["National Emblem","#identity"],["Currency","#identity"],["Moonlight City","#identity"],["Country Dashboard","#country"],["Government","#government"],["President Limon","#president"],["Services","#services"],["Map","#map"],["Tourism","#tourism"],["Gallery","#gallery"],["News","#news"],["National Symbols","#symbols"],["FAQ","#faq"],["Assistant","#assistant"]];
function search(){let s=q.value.toLowerCase().trim();if(!s){results.style.display="none";return}let a=data.filter(x=>x[0].toLowerCase().includes(s));results.innerHTML=a.length?a.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join(""):"No matching section";results.style.display="block"}q.oninput=search;document.getElementById("go").onclick=search;
document.addEventListener("click",e=>{if(!e.target.closest(".searchbar"))results.style.display="none"});
document.getElementById("lang").onclick=e=>e.target.textContent=e.target.textContent==="English"?"বাংলা":"English";
document.getElementById("night").onclick=()=>document.body.classList.toggle("light");
document.getElementById("menu").onclick=()=>toast("Mobile menu: Home • Country • Government • President • Services • Map • Tourism • News");
document.querySelectorAll(".region-buttons button").forEach(b=>b.onclick=()=>{document.getElementById("mapInfo").textContent=b.dataset.region+" — fictional region information loaded.";document.getElementById("b-map").classList.add("unlocked")});
document.querySelectorAll(".gallery button").forEach(b=>b.onclick=()=>{document.getElementById("b-gallery").classList.add("unlocked");toast("Gallery viewer opened: "+b.innerText.replace(/\\n/g," "))});
document.querySelectorAll(".gallery button, .visual-card, .poster-frame").forEach(b=>b.addEventListener("click",()=>openLightbox(b.dataset.lightbox,b.dataset.title||b.innerText.trim())));
function openLightbox(src,title){
  const box=document.getElementById("lightbox"), img=document.getElementById("lightboxImg"), cap=document.getElementById("lightboxTitle");
  if(!box)return;
  img.src=src; img.alt=title; cap.textContent=title; box.classList.add("show");
  document.getElementById("b-gallery").classList.add("unlocked");
}
document.getElementById("lightboxClose").onclick=()=>document.getElementById("lightbox").classList.remove("show");
document.getElementById("lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")e.currentTarget.classList.remove("show")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("lightbox").classList.remove("show")});
document.querySelectorAll(".service-grid button").forEach(b=>b.onclick=()=>toast(b.innerText+" is a fictional demo service."));
document.getElementById("ask").onclick=()=>{let s=document.getElementById("chatInput").value.toLowerCase();let r=s.includes("president")?"President Limon is the fictional Mamun Hossen Limon — President of Limoria.":s.includes("map")?"Limoria has a fictional interactive atlas with regions such as Azure Bay and Verdant Peak.":s.includes("service")?"The service cards are fictional demonstrations.":"স্বাগতম! Limoria একটি সম্পূর্ণ কাল্পনিক দেশ। President, Government, Map, Tourism বা Services সম্পর্কে জিজ্ঞেস করতে পারেন।";document.getElementById("reply").textContent=r};
let taps=0;document.getElementById("secret").onclick=()=>{taps++;if(taps>=5){document.getElementById("b-secret").classList.add("unlocked");toast("✦ Secret Limoria mode unlocked!");taps=0}else toast("Emblem tap "+taps+"/5")};
document.getElementById("checkPuzzle").onclick=()=>{document.getElementById("b-flag").classList.add("unlocked");document.getElementById("puzzleMsg").textContent="✓ Puzzle completed — achievement unlocked!"};
function toast(s){let t=document.getElementById("toast");t.textContent=s;t.style.display="block";clearTimeout(window.tt);window.tt=setTimeout(()=>t.style.display="none",2200)}

/* Interactive 3D atlas tilt */
(function(){
 const map=document.getElementById('limoriaMap3D'); const reset=document.getElementById('mapReset'); if(!map)return;
 let rx=57, rz=-7, dragging=false, sx=0, sy=0, baseX=57, baseZ=-7;
 function apply(){
   const surface=map.querySelector('.map-surface');
   const e1=map.querySelector('.map-extrude-1'),e2=map.querySelector('.map-extrude-2'),e3=map.querySelector('.map-extrude-3');
   surface.style.transform=`rotateX(${rx}deg) rotateZ(${rz}deg) translateZ(34px) scale(.98)`;
   e1.style.transform=`rotateX(${rx}deg) rotateZ(${rz}deg) translate3d(0,13px,22px) scale(.98)`;
   e2.style.transform=`rotateX(${rx}deg) rotateZ(${rz}deg) translate3d(0,25px,10px) scale(.98)`;
   e3.style.transform=`rotateX(${rx}deg) rotateZ(${rz}deg) translate3d(0,38px,0) scale(.98)`;
 }
 function move(x,y){
   rz=Math.max(-18,Math.min(8,baseZ+(x-sx)*.08));
   rx=Math.max(45,Math.min(72,baseX-(y-sy)*.08)); apply();
 }
 map.addEventListener('pointerdown',e=>{dragging=true;sx=e.clientX;sy=e.clientY;baseX=rx;baseZ=rz;map.setPointerCapture(e.pointerId)});
 map.addEventListener('pointermove',e=>{if(dragging)move(e.clientX,e.clientY)});
 map.addEventListener('pointerup',()=>{dragging=false}); map.addEventListener('pointercancel',()=>{dragging=false});
 reset&&reset.addEventListener('click',()=>{rx=57;rz=-7;apply()});
})();
