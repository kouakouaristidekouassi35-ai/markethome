"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  ChevronRight,
  Clock3,
  Heart,
  House,
  MapPin,
  Menu,
  Package,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
} from "lucide-react";

const worlds = [
  {
    id: "market",
    eyebrow: "Boutiques en ligne",
    title: "Marketplace",
    description: "Mode, beauté, maison",
    tags: ["Mode", "Beauté", "Maison"],
    action: "Explorer",
    icon: ShoppingBag,
    tone: "orange",
  },
  {
    id: "food",
    eyebrow: "Restaurants",
    title: "Mark Food",
    description: "Les saveurs de ton quartier",
    tags: ["Livraison", "Mobile Money"],
    action: "Commander",
    icon: Utensils,
    tone: "coral",
  },
  {
    id: "service",
    eyebrow: "Abonnements streaming",
    title: "Service",
    description: "Tes séries, sans interruption",
    tags: ["Netflix", "Prime Video · bientôt"],
    action: "S'abonner",
    icon: Play,
    tone: "blue",
  },
];

const ads = [
  { kicker: "MARKETPLACE", title: "Les boutiques d'Abidjan, livrées chez toi.", body: "Mode, beauté, maison. Paiement par Mobile Money.", action: "Découvrir", tone: "orange" },
  { kicker: "MARK FOOD", title: "Ton garba du midi, commandé en trois clics.", body: "Alloco, poulet braisé, attiéké poisson. Les restos de ton quartier.", action: "Commander", tone: "coral" },
  { kicker: "SERVICE", title: "Ton abonnement Netflix, réglé en quelques secondes.", body: "Wave, Orange Money, MTN MoMo, Moov Money.", action: "S'abonner", tone: "blue" },
  { kicker: "VENDEURS", title: "Ouvre ta boutique sur Market Home.", body: "Premier mois offert, sans abonnement ni commission.", action: "Vendre", tone: "green" },
];

const collections = {
  market: { title: "Les boutiques d'Abidjan, chez toi.", sub: "Tout ce qu'il te faut, livré avec soin.", accent: "orange", chips: ["Tout", "Mode", "Beauté", "Maison", "High-tech"], cards: ["Sacs en raphia", "Ensemble ivoire", "Bougie coco", "Casque audio"] },
  food: { title: "On mange quoi ce midi ?", sub: "Les saveurs de ton quartier, en quelques clics.", accent: "coral", chips: ["Tout", "Garba", "Braisé", "Alloco", "Burgers"], cards: ["Chez Awa", "Le Braisé d'Abidjan", "Garba Express", "Jus frais"] },
  service: { title: "Tes abonnements, payés en Mobile Money.", sub: "Divertis-toi sans interruption.", accent: "blue", chips: ["Netflix", "1 mois", "2 mois"], cards: ["Netflix 1 mois", "Netflix 2 mois"] },
} as const;

function Logo() {
  return <div className="brand-mark" aria-label="Market Home"><span /><i /><b /></div>;
}

export default function Home() {
  const [activeWorld, setActiveWorld] = useState<string | null>(null);
  const [adIndex, setAdIndex] = useState(0);
  const [sellerOpen, setSellerOpen] = useState(false);

  useEffect(() => {
    if (activeWorld || sellerOpen) return;
    const timer = window.setInterval(() => setAdIndex((value) => (value + 1) % ads.length), 5000);
    return () => window.clearInterval(timer);
  }, [activeWorld, sellerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActiveWorld(null); setSellerOpen(false); }
      if (!activeWorld && !sellerOpen && event.key === "ArrowRight") setAdIndex((value) => (value + 1) % ads.length);
      if (!activeWorld && !sellerOpen && event.key === "ArrowLeft") setAdIndex((value) => (value - 1 + ads.length) % ads.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeWorld, sellerOpen]);

  const open = (id: string) => setActiveWorld(id);
  const active = activeWorld ? collections[activeWorld as keyof typeof collections] : null;

  return (
    <main className="site-shell">
      <div className="aurora aurora-orange" /><div className="aurora aurora-coral" /><div className="aurora aurora-blue" />
      <header className="topbar"><div className="brand"><Logo /><span><strong>Market</strong> <em>Home</em></span></div><button className="location-pill"><MapPin /> Cocody, Abidjan <ChevronRight /></button><button className="menu-btn" aria-label="Ouvrir le menu"><Menu /></button></header>

      {!activeWorld && !sellerOpen ? <section className="home-content">
        <div className="hero-copy"><div className="status-line"><Sparkles /> Ton univers, au même endroit</div><h1>Shopping, restos<br />et <span>streaming.</span></h1><p>Une seule adresse.</p></div>
        <div className="world-list">{worlds.map((world) => { const Icon = world.icon; return <button key={world.id} className={`world-card ${world.tone}`} onClick={() => open(world.id)}><div className="world-icon"><Icon /></div><div className="world-info"><small>{world.eyebrow}</small><h2>{world.title}</h2><p>{world.description}</p><div className="tag-row">{world.tags.map((tag, index) => <span key={tag} className={world.id === "service" && index === 0 ? "available" : ""}>{world.id === "service" && index === 0 && <i />} {tag}</span>)}</div></div><div className="world-arrow"><ArrowRight /></div></button> })}</div>
        <section className={`spotlight ${ads[adIndex].tone}`} aria-label="À la une"><div className="story-bars">{ads.map((_, index) => <button key={index} onClick={() => setAdIndex(index)} className={index === adIndex ? "active" : ""}><i /></button>)}</div><div className="spotlight-content"><div><small>{ads[adIndex].kicker}</small><h2>{ads[adIndex].title}</h2><p>{ads[adIndex].body}</p></div><button className="spotlight-action" onClick={() => ads[adIndex].action === "Vendre" ? setSellerOpen(true) : open(ads[adIndex].tone === "coral" ? "food" : ads[adIndex].tone === "blue" ? "service" : "market")}>{ads[adIndex].action}<ArrowRight /></button></div><div className="slide-controls"><button onClick={() => setAdIndex((adIndex - 1 + ads.length) % ads.length)} aria-label="Publicité précédente"><ArrowLeft /></button><button onClick={() => setAdIndex((adIndex + 1) % ads.length)} aria-label="Publicité suivante"><ArrowRight /></button></div></section>
        <button className="seller-banner" onClick={() => setSellerOpen(true)}><span className="seller-symbol"><Store /></span><span><small>POUR LES PROS</small><strong>Tu vends quelque chose ? <u>Ouvre ton espace vendeur</u></strong></span><ChevronRight /></button>
      </section> : sellerOpen ? <SellerPanel onClose={() => setSellerOpen(false)} /> : <UniversePanel data={active!} worldId={activeWorld!} onClose={() => setActiveWorld(null)} />}
    </main>
  );
}

function UniversePanel({ data, worldId, onClose }: { data: typeof collections[keyof typeof collections]; worldId: string; onClose: () => void }) {
  return <section className={`universe-panel ${data.accent}`}><header className="universe-header"><button className="back-btn" onClick={onClose}><ArrowLeft /> Retour</button><div><small>{worldId === "food" ? "MARK FOOD" : worldId.toUpperCase()}</small><h1>{worldId === "market" ? "Marketplace" : worldId === "food" ? "Mark Food" : "Service"}</h1></div><button className="circle-btn"><ShoppingBag /></button></header><div className="universe-body"><div className="welcome-row"><div><span className="status-line"><MapPin /> Livrer à Cocody, Abidjan</span><h2>{data.title}</h2><p>{data.sub}</p></div><button className="search-btn"><Search /> <span>Rechercher</span></button></div><div className="chips">{data.chips.map((chip, index) => <button key={chip} className={index === 0 ? "selected" : ""}>{chip}</button>)}</div><div className="promo-strip"><div><small>EN CE MOMENT</small><h3>{worldId === "service" ? "Netflix, ton prochain épisode t'attend." : worldId === "food" ? "-15% sur ton premier déjeuner" : "Les pépites locales qu'on adore"}</h3></div><Sparkles /></div><div className="section-heading"><h3>{worldId === "service" ? "Choisis ta formule" : "Découvre nos sélections"}</h3><button>Voir tout <ChevronRight /></button></div><div className="product-grid">{data.cards.map((card, index) => <article className="product-card" key={card}><div className={`product-art art-${index + 1}`}><span>{worldId === "food" ? <ChefHat /> : worldId === "service" ? <Play /> : <ShoppingBag />}</span></div><div className="product-card-copy"><small>{worldId === "food" ? "Restaurant partenaire" : worldId === "service" ? "Abonnement" : "Sélection locale"}</small><h4>{card}</h4><strong>{worldId === "service" ? index === 0 ? "2 000 F" : "3 000 F" : worldId === "food" ? `${3 + index * 2} 500 F` : `${12 + index * 4} 000 F`}</strong></div><button className="add-btn">+</button></article>)}</div></div><nav className="floating-dock"><button className="active"><House /><span>Accueil</span></button><button><Package /><span>Catégories</span></button><button className="dock-main"><ShoppingBag /></button><button><Heart /><span>Favoris</span></button><button><Clock3 /><span>Commandes</span></button></nav></section>;
}

function SellerPanel({ onClose }: { onClose: () => void }) {
  return <section className="seller-panel"><header className="universe-header"><button className="back-btn" onClick={onClose}><ArrowLeft /> Retour</button><div><small>ESPACE VENDEUR</small><h1>Vends sur Market Home</h1></div><button className="circle-btn"><Store /></button></header><div className="seller-body"><div className="seller-hero"><span className="seller-symbol large"><Store /></span><small>POUR LES BOUTIQUES & RESTOS</small><h2>Ton activité mérite<br /><em>d&apos;être vue.</em></h2><p>Premier mois offert. Zéro commission. Tu livres toi-même tes clients et tu es payé sur Wave après chaque vente.</p></div><div className="benefit-grid"><div><strong>30 jours</strong><span>offerts pour démarrer</span></div><div><strong>0 %</strong><span>de commission le 1er mois</span></div><div><strong>+ 5 000</strong><span>clients à Abidjan</span></div></div><h3>Qu&apos;est-ce que tu veux ouvrir ?</h3><div className="seller-choice"><button><ShoppingBag /><span><strong>Ma boutique</strong><small>Articles, mode, beauté, maison</small></span><ChevronRight /></button><button><Utensils /><span><strong>Mon restaurant</strong><small>Plats, boissons, livraison maison</small></span><ChevronRight /></button></div><p className="seller-note">Pas d&apos;abonnement le premier mois. Tu peux arrêter quand tu veux.</p></div></section>;
}
