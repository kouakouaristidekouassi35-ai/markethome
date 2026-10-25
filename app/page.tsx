"use client";
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";

const spaces = [
  { key: "market", name: "Marketplace", sub: "Boutiques en ligne", description: "Mode, beauté, maison", tags: ["Mode", "Beauté", "Maison"], action: "Explorer", icon: "bag", tone: "orange" },
  { key: "food", name: "Mark Food", sub: "Restaurants", description: "Les saveurs de ton quartier", tags: ["Livraison", "Mobile Money"], action: "Commander", icon: "plate", tone: "coral" },
  { key: "service", name: "Service", sub: "Abonnements streaming", description: "Tes séries, sans interruption", tags: ["Netflix", "Prime Video · bientôt"], action: "S'abonner", icon: "play", tone: "blue" },
];

const promos = [
  { eyebrow: "MARKETPLACE", title: "Les boutiques d'Abidjan, livrées chez toi.", text: "Mode, beauté, maison. Paiement par Mobile Money.", action: "Découvrir", tone: "promo-orange" },
  { eyebrow: "MARK FOOD", title: "Ton garba du midi, commandé en trois clics.", text: "Alloco, poulet braisé, attiéké poisson. Les restos de ton quartier.", action: "Commander", tone: "promo-coral" },
  { eyebrow: "SERVICE", title: "Ton abonnement Netflix, réglé en quelques secondes.", text: "Wave, Orange Money, MTN MoMo, Moov Money.", action: "S'abonner", tone: "promo-blue" },
  { eyebrow: "POUR LES VENDEURS", title: "Ouvre ta boutique sur Market Home.", text: "Premier mois offert, sans abonnement ni commission.", action: "Vendre", tone: "promo-green" },
];

function Logo() {
  return <div className="brand-lockup"><div className="logo-mark" aria-hidden="true"><svg viewBox="0 0 960 960"><rect width="960" height="960" rx="212" fill="#123B2B"/><path d="M320.5 434V343A79.5 79.5 0 0 1 479.5 343V434M479.5 343A79.5 79.5 0 0 1 638.5 343V434" fill="none" stroke="#F6F8F7" strokeWidth="60" strokeLinecap="round"/><path d="M290 422H670C700 422 724 434 731 462L757 645C763 700 735 738 675 738H285C225 738 197 700 203 645L229 462C236 434 260 422 290 422Z" fill="#F6F8F7"/></svg></div><span><b>Market</b> <em>Home</em></span></div>;
}

function SpaceIcon({ type }: { type: string }) {
  if (type === "plate") return <span className="space-icon plate-icon">⌁</span>;
  if (type === "play") return <span className="space-icon play-icon">▶</span>;
  return <span className="space-icon bag-icon">⌑</span>;
}

export default function Home() {
  const [active, setActive] = useState<string | null>(null);
  const [promo, setPromo] = useState(0);
  useEffect(() => { const timer = setInterval(() => setPromo((p) => (p + 1) % promos.length), 5000); return () => clearInterval(timer); }, []);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const current = promos[promo];
  return <main className="home-shell">
    <div className="aurora aurora-one"/><div className="aurora aurora-two"/><div className="aurora aurora-three"/>
    <header className="topbar"><Logo/><div className="topbar-note"><span className="pulse-dot"/> Abidjan, Côte d&apos;Ivoire</div></header>
    <section className="hero-copy"><p className="kicker">BIENVENUE CHEZ TOI</p><h1>Tout ce que tu aimes,<br/><span>au même endroit.</span></h1><p className="lede">Shopping, restos et streaming.<br className="mobile-break"/> Une seule adresse.</p></section>
    <section className="space-stack" aria-label="Les univers Market Home">{spaces.map((space) => <button key={space.key} className={`space-card ${space.tone}`} onClick={() => setActive(space.key)}><div className="card-shine"/><div className="space-leading"><SpaceIcon type={space.icon}/><div><p className="space-name">{space.name}</p><p className="space-sub">{space.sub}</p></div></div><div className="space-bottom"><div className="tags">{space.tags.map((tag, i) => <span className={space.key === "service" && i === 1 ? "muted-tag" : ""} key={tag}>{space.key === "service" && i === 0 && <i/>}{tag}</span>)}</div><span className="space-action">{space.action}<b>↗</b></span></div></button>)}</section>
    <section className={`featured ${current.tone}`} aria-label="À la une"><div className="story-bars">{promos.map((_, i) => <button key={i} className={i === promo ? "active" : i < promo ? "passed" : ""} onClick={() => setPromo(i)} aria-label={`Publicité ${i + 1}`}/>)}</div><div className="featured-content"><p className="kicker">{current.eyebrow}</p><h2>{current.title}</h2><p>{current.text}</p><button className="featured-cta" onClick={() => setActive(current.tone === "promo-green" ? "seller" : current.tone.replace("promo-", ""))}>{current.action} <span>→</span></button></div><div className="featured-number">0{promo + 1}<small>/ 04</small></div></section>
    <footer><span>© 2026 Market Home</span><span>Fait pour Abidjan <b>♥</b></span></footer>
    {active && <div className="universe-overlay" role="dialog" aria-modal="true"><button className="close-overlay" onClick={() => setActive(null)} aria-label="Fermer">×</button><div className={`universe-panel panel-${active}`}><p className="kicker">MARKET HOME / {active.toUpperCase()}</p><h2>{active === "market" ? "Les boutiques d'Abidjan," : active === "food" ? "On mange quoi" : active === "service" ? "Tes abonnements," : "Vends sur Market Home"}<br/><em>{active === "food" ? "ce midi ?" : active === "service" ? "payés en Mobile Money." : "chez toi."}</em></h2><p className="panel-copy">{"Ton espace est prêt. Découvre bientôt une expérience pensée pour toi, avec livraison locale et paiement simple."}</p><div className="panel-grid"><div><strong>{active === "food" ? "120+" : active === "service" ? "2" : "500+"}</strong><span>{active === "food" ? "restaurants" : active === "service" ? "formules Netflix" : "boutiques locales"}</span></div><div><strong>100%</strong><span>pensé pour Abidjan</span></div></div><button className="panel-button" onClick={() => setActive(null)}>Retour à l'accueil <span>↗</span></button></div></div>}
  </main>;
}
