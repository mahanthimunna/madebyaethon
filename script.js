
(function(){
  const body = document.body;
  const menu = document.querySelector('.menu-toggle');
  if(menu){
    menu.addEventListener('click',()=>{
      const open = body.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>body.classList.remove('menu-open')));
  }

  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
    },{threshold:.12});
    revealEls.forEach(el=>obs.observe(el));
  } else revealEls.forEach(el=>el.classList.add('visible'));

  document.querySelectorAll('.accordion-item').forEach(item=>{
    const btn=item.querySelector('.accordion-header');
    const content=item.querySelector('.accordion-content');
    if(!btn||!content) return;
    const set=(open)=>{
      item.classList.toggle('open',open);
      btn.setAttribute('aria-expanded',open?'true':'false');
      content.style.maxHeight=open ? content.scrollHeight+'px' : '0px';
    };
    set(item.classList.contains('open'));
    btn.addEventListener('click',()=>{
      const willOpen=!item.classList.contains('open');
      const wrap=item.closest('.accordion');
      if(wrap) wrap.querySelectorAll('.accordion-item.open').forEach(other=>{
        if(other!==item){
          other.classList.remove('open');
          const oc=other.querySelector('.accordion-content');
          const ob=other.querySelector('.accordion-header');
          if(oc) oc.style.maxHeight='0px';
          if(ob) ob.setAttribute('aria-expanded','false');
        }
      });
      set(willOpen);
    });
    content.querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>{ if(item.classList.contains('open')) content.style.maxHeight=content.scrollHeight+'px'; }, {once:true}));
  });

  const slab=document.querySelector('[data-tilt-card]');
  if(slab && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    slab.addEventListener('mousemove',e=>{
      const r=slab.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      slab.style.transform=`rotateY(${(-13 + x*6).toFixed(2)}deg) rotateX(${(4 - y*5).toFixed(2)}deg) rotateZ(-1deg)`;
    });
    slab.addEventListener('mouseleave',()=>{ slab.style.transform='rotateY(-13deg) rotateX(4deg) rotateZ(-1deg)'; });
  }
})();
