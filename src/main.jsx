import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const photos = [
  { src: '/images/sculpture-01.jpg', title: 'The quiet gaze', type: 'Sculptures' },
  { src: '/images/sculpture-02.jpg', title: 'Many voices, one form', type: 'Sculptures' },
  { src: '/images/sculpture-03.jpg', title: 'A figure in timber', type: 'Sculptures' },
  { src: '/images/sculpture-04.jpg', title: 'Faith carved in wood', type: 'Sculptures' },
  { src: '/images/sculpture-05.jpg', title: 'A story in silhouette', type: 'Sculptures' },
  { src: '/images/decorative-art.jpg', title: 'Objects with a second life', type: 'Decorative Art' },
  { src: '/images/wood-art-panel.webp', title: 'A gathering of forms', type: 'Decorative Art' },
  { src: '/images/furniture-feature.jpg', title: 'A place to pause', type: 'Furniture' },
  { src: '/images/furniture-gallery.jpg', title: 'The character of timber', type: 'Furniture' },
  { src: '/images/furniture-studio.jpg', title: 'Craft for everyday living', type: 'Furniture' },
  { src: '/images/museum-interior.jpg', title: 'Inside the museum', type: 'Museum detail' },
  { src: '/images/museum-interior-2.jpg', title: 'A room of stories', type: 'Museum detail' },
  { src: '/images/museum-interior-3.jpg', title: 'Woodcraft on display', type: 'Museum detail' },
  { src: '/images/museum-interior-4.jpg', title: 'The collection, in context', type: 'Museum detail' },
  { src: '/images/museum-interior-5.jpg', title: 'Sculptures across the gallery', type: 'Museum detail' },
  { src: '/images/museum-interior-6.jpg', title: 'Wooden forms on display', type: 'Museum detail' },
  { src: '/images/museum-interior-7.jpg', title: 'A closer view of the collection', type: 'Museum detail' },
  { src: '/images/museum-interior-8.jpg', title: 'Inside the woodcraft museum', type: 'Museum detail' },
];
const waNumber = '917741084407';
const mapsUrl = 'https://share.google/LvHXvpMvperIkHd7C';

function TreeMark() {
  return <span className="tree-mark" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27"/><circle cx="32" cy="32" r="21"/><circle cx="32" cy="32" r="14"/><path d="M11 35c9-8 19-9 29-3 5 3 9 3 13 0M20 14c2 5 1 9-3 13M39 44c-3 3-4 6-3 9"/></svg></span>;
}
function Logo({onClick}) { return <a href="/" className="brand" onClick={onClick} aria-label="Ghone’s WoodCraft Museum home"><img src="/images/ghones-woodcraft-logo.png" alt="Ghone’s WoodCraft Museum" /></a>; }
function ImageSlot({src, title, className='', onClick}) {
  const [failed, setFailed] = useState(false);
  return <button className={`image-slot ${className} ${failed?'is-placeholder':''}`} onClick={onClick} aria-label={`View ${title}`}>
    {!failed && <img src={src} alt={title} loading="lazy" onError={()=>setFailed(true)} />}
    {failed && <div className="placeholder-art"><span className="placeholder-ring ring-one"/><span className="placeholder-ring ring-two"/><span className="placeholder-ring ring-three"/><span className="placeholder-caption">Add your photograph<br/><small>{src.split('/').pop()}</small></span></div>}
    <span className="image-label"><small>{title}</small><span aria-hidden="true">↗</span></span>
  </button>;
}
function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [lightbox,setLightbox] = useState(null);
  const [showTop,setShowTop] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{ const onScroll=()=>{setShowTop(window.scrollY>500);setScrolled(window.scrollY>60)}; window.addEventListener('scroll',onScroll,{passive:true}); return ()=>window.removeEventListener('scroll',onScroll); },[]);
  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('motion-ready');
    const targets=document.querySelectorAll('.intro-kicker, .intro-copy, .intro-image-wrap, .collection-head, .art-grid .image-slot, .gallery-cta, .highlight-heading, .highlight-grid .image-slot, .artist-photo, .artist-copy, .visit-image, .visit-copy, .contact > *, .gallery-intro > *, .gallery-filter, .full-gallery .image-slot, .gallery-contact > *');
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    targets.forEach((el,index)=>{el.classList.add('scroll-reveal'); if(el.matches('.art-grid .image-slot, .highlight-grid .image-slot, .full-gallery .image-slot')) el.style.setProperty('--reveal-delay',`${(index%3)*100}ms`); observer.observe(el);});
    return ()=>{observer.disconnect();document.documentElement.classList.remove('motion-ready')};
  },[]);
  useEffect(()=>{ if(lightbox!==null){const onKey=e=>{if(e.key==='Escape')setLightbox(null); if(e.key==='ArrowRight')setLightbox(i=>(i+1)%photos.length); if(e.key==='ArrowLeft')setLightbox(i=>(i-1+photos.length)%photos.length)}; window.addEventListener('keydown',onKey); document.body.style.overflow='hidden'; return ()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=''};} },[lightbox]);
  const closeMenu=()=>setMenuOpen(false);
  const scrollTo=(id)=>{closeMenu();document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  const whatsappUrl=waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I would like to enquire about Ghone’s WoodCraft Museum.')}` : 'https://wa.me/?text='+encodeURIComponent('Hello, I would like to enquire about Ghone’s WoodCraft Museum.');
  return <>
    <header className={`site-header ${scrolled?'is-scrolled':''}`}>
      <Logo onClick={e=>{e.preventDefault();closeMenu();window.scrollTo({top:0,behavior:'smooth'});}} />
      <button className="menu-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}><span/><span/></button>
      <nav className={menuOpen?'nav-open':''} aria-label="Main navigation"><a href="#home" onClick={e=>{e.preventDefault();scrollTo('home')}}>Home</a><a href="#museum" onClick={e=>{e.preventDefault();scrollTo('museum')}}>Museum</a><a href="/gallery.html">Gallery</a><a href="#contact" onClick={e=>{e.preventDefault();scrollTo('contact')}}>Contact</a></nav>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-image"><img src="/images/museum-hero.jpg" alt="Inside Ghone’s WoodCraft Museum, surrounded by wooden sculptures" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('hero-placeholder')}} /></div>
        <div className="hero-shade"/><div className="hero-content reveal">
          <p className="eyebrow"><span/> A living heritage of woodcraft</p>
          <h1>Where wood<br/><em>becomes art.</em></h1>
          <p className="hero-subtitle">Discover the beauty of handcrafted wooden sculpture by Ramesh Ghone.</p>
          <button className="button button-gold" onClick={()=>scrollTo('museum')}>Explore the Museum <span>↘</span></button>
        </div>
        <div className="hero-bottom"><span>CRAFTED WITH PATIENCE</span><span className="hero-scroll">SCROLL TO DISCOVER ↓</span></div>
      </section>
      <section className="intro section-pad" id="museum">
        <div className="intro-kicker"><span className="section-number">01</span><span className="eyebrow">The museum</span></div>
        <div className="intro-grid"><div className="intro-copy"><h2>More than wood.<br/><em>A world of wonder.</em></h2><p className="lead">Every grain holds a story. Every curve reveals the hand of an artist.</p><p>Step into a world where patience, imagination and the natural beauty of wood come together. Ghone’s WoodCraft Museum celebrates the art of transforming an enduring material into pieces that invite you to pause, look closer and feel something.</p><button className="text-link" onClick={()=>scrollTo('collection')}>Discover the collection <span>↗</span></button></div><div className="intro-image-wrap"><ImageSlot src="/images/museum-interior.jpg" title="Inside the museum" className="intro-image" onClick={()=>setLightbox(10)}/><span className="image-note">A place where craftsmanship lives on.</span></div></div>
      </section>
      <section className="collection section-pad" id="collection">
        <div className="collection-head"><div><div className="intro-kicker"><span className="section-number">02</span><span className="eyebrow">Selected works</span></div><h2>Made by hand.<br/><em>Made to be remembered.</em></h2></div><p>A glimpse into the forms, details and stories waiting to be discovered throughout the museum.</p></div>
        <div className="art-grid"><ImageSlot src={photos[0].src} title={photos[0].title} className="art-tall" onClick={()=>setLightbox(0)}/><ImageSlot src={photos[1].src} title={photos[1].title} className="art-short" onClick={()=>setLightbox(1)}/><ImageSlot src={photos[2].src} title={photos[2].title} className="art-medium" onClick={()=>setLightbox(2)}/></div>
        <div className="gallery-cta"><span>Explore the craft, one piece at a time.</span><a className="button button-outline" href="/gallery.html">Explore the full gallery <span>↗</span></a></div>
      </section>
      <section className="highlights section-pad"><div className="highlight-heading"><div className="intro-kicker"><span className="section-number">03</span><span className="eyebrow">A closer look</span></div><h2>The beauty is<br/><em>in the details.</em></h2><p>From the natural grain to the smallest carved line, discover the moments that make woodcraft extraordinary.</p></div><div className="highlight-grid"><ImageSlot src="/images/sculpture-03.jpg" title="A closer look at the craft" onClick={()=>setLightbox(2)}/><ImageSlot src="/images/sculpture-05.jpg" title="Hand-carved expression" onClick={()=>setLightbox(4)}/><ImageSlot src="/images/museum-detail.jpg" title="Within the museum" onClick={()=>setLightbox(10)}/></div></section>
      <section className="artist section-pad" id="artist"><div className="artist-photo-pair"><div className="artist-photo artist-photo-primary"><img src="/images/ramesh-ghone-portrait.webp" alt="Ramesh Ghone beside one of his wooden sculptures" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('portrait-placeholder')}}/><span className="photo-credit">THE HAND BEHIND THE ART</span></div><div className="artist-photo artist-photo-secondary"><img src="/images/ramesh-ghone-with-furniture.jpg" alt="Ramesh Ghone seated beside handcrafted wooden furniture" loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('portrait-placeholder')}}/><span className="photo-credit">CRAFT, MADE PERSONAL</span></div><span className="artist-photo-note">The artist &amp; his craft</span></div><div className="artist-copy"><div className="intro-kicker"><span className="section-number">04</span><span className="eyebrow">The artist’s story</span></div><h2>One artist.<br/><em>A lifetime of craft.</em></h2><p className="lead">He sees art where others see discarded wood.</p><p>Born and brought up in Mumbai, Ramesh Ghone began experimenting with discarded coconut shells, turning them into sculptures and installations. After moving with his family to Kolad, he worked alongside a sawmill, learning about different kinds of wood and beginning to shape small sculptures from scrap timber.</p><p>As people began appreciating his work, a bigger idea took root: a museum devoted to wooden sculpture. Established in 1997, his studio and museum grew into a collection reported to hold around 2,000 creations. Inspired by travels and visits to museums across India, Ghone continues to explore the expressive possibilities of wood. Alongside his art, he has made furniture, lamps and household pieces to sustain his practice.</p><p className="artist-signature">Ramesh Ghone <span>— Woodcraft artist</span></p></div></section>
      <section className="visit section-pad" id="visit"><div className="visit-image"><img src="/images/museum-interior-3.jpg" alt="Welcome to Ghone’s WoodCraft Museum" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('visit-placeholder')}}/></div><div className="visit-copy"><div className="intro-kicker"><span className="section-number">05</span><span className="eyebrow">Come and discover</span></div><h2>See the craft<br/><em>up close.</em></h2><p>Discover the wooden sculptures and handcrafted forms at Ghone’s WoodCraft Museum in Warasgaon, near Kolad.</p><p className="visit-note">Visiting hours have not yet been confirmed. Please enquire before planning your visit.</p><a className="button button-gold" href={mapsUrl} target="_blank" rel="noreferrer">View location <span>↗</span></a> <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div></section>
      <section className="contact section-pad" id="contact"><p className="eyebrow">Stay connected</p><h2>Let the story<br/><em>continue.</em></h2><p>Questions about the museum or planning a visit? We’d love to hear from you.</p><a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">Contact us on WhatsApp <span>↗</span></a></section>
    </main>
    <footer className="footer"><div className="footer-top"><Logo onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}/><p>Where wood becomes art.</p><nav aria-label="Footer navigation"><a href="#museum">Museum</a><a href="/gallery.html">Gallery</a><a href="#contact">Contact</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ghone’s WoodCraft Museum</span><span>Crafted with respect for the art of wood.</span></div></footer>
    {showTop && <button className="back-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>}
    {lightbox!==null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Artwork viewer" onClick={()=>setLightbox(null)}><button className="lightbox-close" aria-label="Close image viewer" onClick={()=>setLightbox(null)}>×</button><button className="lightbox-prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();setLightbox(i=>(i-1+photos.length)%photos.length)}}>‹</button><div className="lightbox-frame" onClick={e=>e.stopPropagation()}><img src={photos[lightbox].src} alt={photos[lightbox].title} onError={e=>{e.currentTarget.style.display='none'}}/><p>{photos[lightbox].title}</p></div><button className="lightbox-next" aria-label="Next image" onClick={e=>{e.stopPropagation();setLightbox(i=>(i+1)%photos.length)}}>›</button></div>}
  </>;
}

function GalleryPage(){
 const [lightbox,setLightbox]=useState(null);
 useEffect(()=>{const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||!('IntersectionObserver' in window))return;document.documentElement.classList.add('motion-ready');const targets=document.querySelectorAll('.gallery-intro > *, .gallery-filter, .full-gallery .image-slot, .gallery-contact > *');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});targets.forEach((el,index)=>{el.classList.add('scroll-reveal');if(el.matches('.full-gallery .image-slot'))el.style.setProperty('--reveal-delay',`${(index%3)*100}ms`);observer.observe(el)});return()=>{observer.disconnect();document.documentElement.classList.remove('motion-ready')}},[]);
 const visible=photos;
 useEffect(()=>{if(lightbox!==null){const k=e=>{if(e.key==='Escape')setLightbox(null);if(e.key==='ArrowRight')setLightbox(i=>(i+1)%visible.length);if(e.key==='ArrowLeft')setLightbox(i=>(i-1+visible.length)%visible.length)};window.addEventListener('keydown',k);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',k);document.body.style.overflow=''};}},[lightbox,visible.length]);
 return <><header className="site-header inner-header"><Logo onClick={e=>{e.preventDefault();window.location.href='/';}}/><button className="menu-toggle" aria-label="Open navigation" onClick={()=>document.querySelector('.site-header nav')?.classList.toggle('nav-open')}><span/><span/></button><nav><a href="/#home">Home</a><a href="/#museum">Museum</a><a className="active" href="/gallery.html">Gallery</a><a href="/#contact">Contact</a></nav></header><main className="gallery-page"><section className="gallery-intro"><p className="eyebrow">A collection of craftsmanship</p><h1>Every piece<br/><em>has a story.</em></h1><p>Explore the shapes, textures and details of woodcraft at Ghone’s WoodCraft Museum.</p></section><p className="gallery-all-note">The complete collection — sculptures, furniture, decorative art and views from inside the museum.</p><div className="full-gallery">{visible.map((p,i)=><ImageSlot key={p.src} src={p.src} title={p.title} className={`gallery-tile tile-${i%3}`} onClick={()=>setLightbox(i)}/>)}</div><div className="gallery-contact"><h2>Would you like to visit?</h2><p>Get in touch to enquire about visiting the museum.</p><a className="button button-gold" href="https://wa.me/917741084407?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Ghone%27s%20WoodCraft%20Museum." target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></div></main><footer className="footer"><div className="footer-top"><Logo onClick={e=>{e.preventDefault();window.location.href='/';}}/><p>Where wood becomes art.</p><nav><a href="/#museum">Museum</a><a href="/gallery.html">Gallery</a><a href="/#contact">Contact</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ghone’s WoodCraft Museum</span><span>Crafted with respect for the art of wood.</span></div></footer>{lightbox!==null&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setLightbox(null)}><button className="lightbox-close" aria-label="Close image viewer">×</button><button className="lightbox-prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();setLightbox(i=>(i-1+visible.length)%visible.length)}}>‹</button><div className="lightbox-frame" onClick={e=>e.stopPropagation()}><img src={visible[lightbox].src} alt={visible[lightbox].title} onError={e=>{e.currentTarget.style.display='none'}}/><p>{visible[lightbox].title}</p></div><button className="lightbox-next" aria-label="Next image" onClick={e=>{e.stopPropagation();setLightbox(i=>(i+1)%visible.length)}}>›</button></div>}</>;
}

createRoot(document.getElementById('root')).render(window.location.pathname.endsWith('gallery.html') ? <GalleryPage/> : <App/>);
