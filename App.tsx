import { useEffect, useRef, useState } from "react";
import { mountPlaceListMap, mapsDirectionsUrl } from "./metaMaps";
import logoUrl from "./assets/03999ba9dbbe1028-Graduation_cap_vector_logo_design_Education_logo.jpg";
import classeUrl from "./assets/ca1484ab1bc67af1-Oooo_Me_Me.jpg";
import applaudUrl from "./assets/70375e8a973e7a10-1077627017111301306.jpg";
import fillesUrl from "./assets/56891de0a3e2158c-770889661254527641_1.jpg";
import bibliothequeUrl from "./assets/3892b9d3a34cffae-40_Bookshelf_Decor_Ideas_To_Showcase_Your_Style.jpg";
import informatiqueUrl from "./assets/695eb0443c39e67f-classe.jpg";
import sportUrl from "./assets/c3dfe9c5703919db-504121752058226095.jpg";
import directeurUrl from "./assets/fd552d4a5e065f1a-homme_noir_en_veste.jpg";
import drapeauCongoUrl from "./assets/9a5e1fff8a8095e8-What_Languages_Are_Spoken_in_the_Republic_of_the.jpg";
import {
  ShieldCheck,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Monitor,
  HeartHandshake,
  Trophy,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  FileDown,
  Check,
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
} from "lucide-react";

// ---------- Types ----------
type Inscription = {
  parentNom: string;
  enfantNom: string;
  classe: string;
  telephone: string;
  message?: string;
  createdAt: string;
};

// ---------- Map Data ----------
const MAP_PLACES = [
  {
    label: "Complexe Scolaire Nouveau Depart - Bacongo",
    latitude: -4.27297,
    longitude: 15.28621,
    resolved_address: "Hotel Leon Bacongo, Avenue William Guynet, Brazzaville",
  },
];

// ---------- Content ----------
const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "formations", label: "Formations" },
  { id: "vie-ecole", label: "Vie de l'école" },
  { id: "apropos", label: "À propos" },
  { id: "inscription", label: "Inscription" },
];

const CHIFFRES = [
  { v: "15 ans", l: "d'existence à Bacongo", c: "Fondé en 2010" },
  { v: "4 niveaux", l: "Maternelle au Lycée", c: "Parcours continu" },
  { v: "98%", l: "de réussite", c: "CEP 2024-2025" },
  { v: "350+", l: "élèves encadrés", c: "Effectifs maîtrisés" },
];

const POURQUOI = [
  { icon: ShieldCheck, t: "Sécurité maximale", d: "Portail fermé, surveillance permanente, cour sécurisée. Vos enfants évoluent dans un cadre protégé à Bacongo." },
  { icon: Trophy, t: "Excellence prouvée", d: "98% au CEP, 95% BEPC, 92% BAC. Méthodes actives et suivi rigoureux des résultats." },
  { icon: HeartHandshake, t: "Suivi personnalisé", d: "Classes à effectif réduit, cahier de liaison quotidien, rencontres parents chaque mois." },
  { icon: Users, t: "Enseignants qualifiés", d: "Diplômés d'État, formés en pédagogie bienveillante. Stabilité de l'équipe depuis 8 ans." },
];

const PHOTO_ALT = "Élèves du Complexe Scolaire Nouveau Depart à Bacongo Brazzaville";
const DIRECTEUR_ALT = "Directeur du Complexe Scolaire Nouveau Depart à Bacongo Brazzaville";

const FORMATIONS = [
  {
    id: "maternelle",
    age: "3-5 ans",
    title: "Maternelle",
    desc: "Premiers pas en confiance. Éveil, langage, motricité et vie en groupe. Nous apprenons à votre enfant à aimer l'école, avec douceur et discipline bienveillante.",
    matieres: ["Éveil", "Langage", "Graphisme", "Chant", "Motricité"],
    debouches: "Préparation solide pour le CP, autonomie, socialisation.",
    frais: "5.000 FCFA + 7.000 FCFA/mois",
    photo: fillesUrl,
  },
  {
    id: "primaire",
    age: "CP - CM2",
    title: "Primaire",
    desc: "Les fondamentaux maîtrisés. Lecture, écriture, calcul, avec un vrai suivi individualisé. Chaque enfant est vu, écouté, encouragé. Idéal pour les familles de Bacongo et Makélékélé.",
    matieres: ["Français", "Maths", "Sciences", "Histoire-Géo", "Anglais dès CE1"],
    debouches: "Entrée sereine au collège, 98% de réussite CEP.",
    frais: "5.000 FCFA + 10.000 FCFA/mois",
    photo: fillesUrl,
  },
  {
    id: "college",
    age: "6e - 3e",
    title: "Collège",
    desc: "Adolescence encadrée. Méthode, rigueur et orientation. Nous structurons le travail, renforçons les bases et préparons le BEPC sans stress.",
    matieres: ["Maths", "Français", "Anglais", "PC", "SVT", "Informatique"],
    debouches: "BEPC, orientation Lycée général ou technique.",
    frais: "5.000 FCFA + 12.000 FCFA/mois",
    photo: null as string | null,
  },
  {
    id: "lycee",
    age: "2nde - Terminale",
    title: "Lycée",
    desc: "Objectif BAC avec mention. Groupes de soutien, devoirs surveillés chaque semaine, coaching orientation. Nous croyons au potentiel de chaque lycéen de Brazzaville.",
    matieres: ["Séries A, C, D", "Philo", "Maths expertes", "Informatique", "Anglais renforcé"],
    debouches: "BAC, université, écoles supérieures, concours.",
    frais: "5.000 FCFA + 15.000 FCFA/mois",
    photo: null as string | null,
  },
];

const GALERIE = [
  { t: "Nos élèves, notre fierté", s: "Des élèves heureux, applaudis et encouragés chaque jour", g: "from-[#FEF3C7] to-[#FDE68A]", img: applaudUrl },
  { t: "Des classes à taille humaine", s: "Filles souriantes en uniforme bleu, suivies de près", g: "from-[#E0F2FE] to-[#BAE6FD]", img: fillesUrl },
  { t: "La participation en classe", s: "Main levée, élèves en bleu devant le tableau noir", g: "from-[#DBEAFE] to-[#93C5FD]", img: classeUrl },
  { t: "Bibliothèque - Le goût de la lecture", s: "Des livres adaptés à chaque niveau, du conte de maternelle au roman du lycée.", g: "from-[#FEF3C7] to-[#FDE68A]", img: bibliothequeUrl },
  { t: "Salle Informatique - L'école du futur", s: "Ordinateurs pour tous, initiation à l'informatique dès le primaire, bureautique au collège et lycée.", g: "from-[#DBEAFE] to-[#93C5FD]", img: informatiqueUrl },
  { t: "Sport - Un corps sain, un esprit sain", s: "Football, athlétisme et jeux collectifs sur le terrain, encadrés par un coach.", g: "from-[#DCFCE7] to-[#86EFAC]", img: sportUrl },
];

const TEMOIGNAGES = [
  {
    nom: "Mme Ngoma Clarisse",
    quartier: "Bacongo – Maman de Grâce (CM2)",
    texte: "Depuis la maternelle ici, ma fille lit très bien et respecte ses aînés. Les enseignants appellent quand il y a un retard. On sent qu'ils aiment les enfants. Frais abordables pour la qualité.",
    note: 5,
  },
  {
    nom: "Papa Mabiala Serge",
    quartier: "Makélékélé – Papa de Junior (3e)",
    texte: "Junior a eu son BEPC du premier coup. Le directeur nous a reçus 3 fois pour son orientation. Discipline juste, pas de violence. Je recommande à tous mes voisins.",
    note: 5,
  },
  {
    nom: "Mme Itoua Prisca",
    quartier: "Bacongo – Maman de twins Maternelle",
    texte: "J'ai visité 4 écoles à Brazzaville. Ici les classes sentent le propre, les enfants sourient. Mes jumeaux ne pleurent plus le matin. Le WhatsApp du suivi aide beaucoup.",
    note: 5,
  },
];

const ENSEIGNANTS = [
  { nom: "M. Kodia A.", mat: "Maths Collège-Lycée", exp: "12 ans, Licence Maths" },
  { nom: "Mme Samba L.", mat: "Français Primaire", exp: "10 ans, CAP" },
  { nom: "M. Bakala J.", mat: "Informatique", exp: "8 ans, BTS" },
  { nom: "Mme Mbenza R.", mat: "Maternelle", exp: "9 ans, Éducatrice" },
];

export default function App() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [splash, setSplash] = useState<"show" | "fade" | "done">("show");
  const [form, setForm] = useState({ parent: "", enfant: "", classe: "", tel: "", msg: "" });
  const [busy, setBusy] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [records, setRecords] = useState<Inscription[]>([]);
  const [mapUnavailable, setMapUnavailable] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // SEO
  useEffect(() => {
    document.title = "COMPLEXE SCOLAIRE NOUVEAU DEPART - École Privée Brazzaville";
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', "COMPLEXE SCOLAIRE NOUVEAU DEPART, école privée Brazzaville Bacongo : Maternelle, Primaire, Collège, Lycée. Inscription école Brazzaville à 5.000 FCFA, scolarité dès 7.000 FCFA/mois. 98% réussite CEP. Sécurité, excellence, suivi personnalisé.");
    if (!document.head.contains(meta)) document.head.appendChild(meta);
  }, []);

  // Splash screen : visible 3.5s minimum, puis fondu 0.7s. Scroll bloqué pendant l'affichage.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const showTimer = window.setTimeout(() => setSplash("fade"), 3500);
    const hideTimer = window.setTimeout(() => {
      setSplash("done");
      document.body.style.overflow = previousOverflow;
    }, 4200);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in');
      })
    }, { threshold: 0.45 });
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Map mount
  useEffect(() => {
    if (!mapRef.current) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (rows.length === 0) return;
    let mapInstance: any = null;
    try {
      const places = MAP_PLACES.map(p => ({ label: p.label, lat: p.latitude, lng: p.longitude }));
      mapInstance = mountPlaceListMap(mapRef.current, { places, rows }, () => {
        setMapUnavailable(true);
      });
    } catch {
      setMapUnavailable(true);
    }
    return () => { try { mapInstance?.destroy(); } catch { } };
  }, []);

  // Records API helpers - literal strings required
  async function reloadRecords() {
    try {
      const res = await fetch("actions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "records.list", args: { collection: "inscriptions", limit: 50 } })
      });
      const json = await res.json();
      if (json?.data?.records) {
        setRecords(json.data.records.map((r: any) => r.value));
      }
    } catch { }
  }
  useEffect(() => { reloadRecords(); }, []);

  async function createRow(row: Inscription) {
    const res = await fetch("actions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "records.create", args: { collection: "inscriptions", value: row }, })
    });
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(json.error || "Erreur sauvegarde");
    return json.data;
  }

  const waBase = "https://wa.me/242053916891?text=";
  const waGeneric = waBase + encodeURIComponent("Bonjour COMPLEXE SCOLAIRE NOUVEAU DEPART, je veux inscrire mon enfant");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parent || !form.enfant || !form.classe || !form.tel) {
      setSavedMsg("Veuillez remplir les champs obligatoires *");
      return;
    }
    setBusy(true);
    setSavedMsg(null);
    const inscription: Inscription = {
      parentNom: form.parent,
      enfantNom: form.enfant,
      classe: form.classe,
      telephone: form.tel,
      message: form.msg,
      createdAt: new Date().toISOString(),
    };
    const msg = `Bonjour, je suis ${form.parent}, je souhaite inscrire ${form.enfant} en ${form.classe}. Tel: ${form.tel}. ${form.msg ? 'Message: ' + form.msg : ''} Merci.`;
    let error: string | null = null;
    try {
      await createRow(inscription);
      await reloadRecords();
    } catch (err: any) {
      error = err.message;
    }
    setBusy(false);
    if (error) {
      setSavedMsg("Inscription enregistrée localement. " + error);
    } else {
      setSavedMsg("Inscription enregistrée ! Ouverture de WhatsApp...");
    }
    // Open WhatsApp after save attempt
    const waUrl = waBase + encodeURIComponent(msg);
    window.open(waUrl, "_blank", "noopener");
    setTimeout(() => setForm({ parent: "", enfant: "", classe: "", tel: "", msg: "" }), 800);
  };

  const generatePDF = () => {
    const lines = [
      "COMPLEXE SCOLAIRE NOUVEAU DEPART",
      "Bacongo, Brazzaville - Tel WhatsApp 05 391 68 91",
      "",
      "FICHE D'INSCRIPTION 2025-2026",
      "----------------------------------------",
      `Nom du parent: ___________________________`,
      `Nom de l'enfant: _________________________`,
      `Classe souhaitee: Maternelle / Primaire / College / Lycee`,
      `Telephone: _______________________________`,
      `Adresse: _________________________________`,
      "",
      "FRAIS OFFICIELS:",
      "- Inscription: 5.000 FCFA (unique)",
      "- Maternelle: 7.000 FCFA / mois",
      "- Primaire: 10.000 FCFA / mois",
      "- College: 12.000 FCFA / mois",
      "- Lycee: 15.000 FCFA / mois",
      "",
      "DOCUMENTS A FOURNIR:",
      "1. Acte de naissance enfant (copie)",
      "2. 2 photos d'identite",
      "3. Carnet de vaccination (Maternelle-Primaire)",
      "4. Bulletins annee precedente (College-Lycee)",
      "5. 5.000 FCFA frais d'inscription",
      "",
      "Horaires: Lun-Ven 7h30-17h00, Sam 7h30-12h00",
      "Valeurs: Discipline, Excellence, Respect, Foi",
      "",
      "Signature parent:           Cachet ecole:",
    ];
    const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    let stream = "BT\n/F1 11 Tf\n50 800 Td\n";
    lines.forEach((l, i) => {
      const txt = escape(l);
      if (i === 0) stream += "/F1 14 Tf\n";
      else if (i === 3) stream += "/F1 12 Tf\n";
      else stream += "/F1 11 Tf\n";
      stream += `(${txt}) Tj\n0 -16 Td\n`;
    });
    stream += "ET";

    const objects: string[] = [];
    objects.push("<< /Type /Catalog /Pages 2 0 R >>");
    objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 4 0 R >>");
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);

    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [];
    objects.forEach((obj, i) => {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach(o => { pdf += `${String(o).padStart(10, '0')} 00000 n \n`; });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Fiche-Inscription-Nouveau-Depart.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-safe-area-inset-root style={{ boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)' }} className="min-h-screen bg-[var(--bg)] overflow-x-clip">
      {/* SPLASH SCREEN — première chose visible au lancement, couvre toute la page */}
      {splash !== "done" && (
        <div
          id="splash-screen"
          role="status"
          aria-label="Chargement du Complexe Scolaire Nouveau Depart"
          aria-hidden={splash === "fade"}
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 99999, background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
          className={`px-6 text-center pt-[max(1rem,var(--safe-area-inset-top))] ${splash === "fade" ? "splash-hidden splash-fade-out" : ""}`}
        >
          <div className="flex flex-col items-center">
            <img
              src={logoUrl}
              alt="Logo COMPLEXE SCOLAIRE NOUVEAU DEPART"
              width={180}
              height={180}
              className="splash-logo h-[180px] w-[180px] rounded-[22px] bg-white object-contain"
            />
            <p className="poppins mt-6 text-[18px] font-bold leading-tight tracking-[0.18em] text-[#0B3D91]">COMPLEXE SCOLAIRE</p>
            <p className="poppins mt-2 text-[32px] font-bold leading-none tracking-tight text-[#EAB308]">NOUVEAU DEPART</p>
            <p className="mt-3 text-[14px] font-medium text-[#64748B]">Bacongo, Brazzaville • L&apos;excellence, ici à Brazzaville</p>
            <div className="mt-7 h-[6px] w-[200px] overflow-hidden rounded-full bg-[#E5E7EB]" aria-hidden="true">
              <div className="splash-load-bar h-full rounded-full bg-[#EAB308]" />
            </div>
            <p className="mt-3 text-[13px] font-medium text-[#64748B]">Chargement...</p>
          </div>
        </div>
      )}
      {/* BANDE TRICOLORE — DRAPEAU DU CONGO */}
      <div aria-hidden="true" className="h-[6px] w-full" style={{ background: "linear-gradient(90deg, #009444 0%, #009444 33.333%, #FFD100 33.333%, #FFD100 66.666%, #E30613 66.666%, #E30613 100%)" }} />
      {/* HEADER */}
      <header data-safe-area-sticky-top style={{ top: 'var(--safe-area-inset-top)' }} className="sticky z-40 bg-white/95 backdrop-blur border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <a href="#accueil" className="flex items-center gap-3 min-w-0">
            <img src={logoUrl} alt="Logo COMPLEXE SCOLAIRE NOUVEAU DEPART" className="h-[48px] w-auto shrink-0 rounded-[10px] bg-white object-contain p-1 shadow-sm" />
            <div className="leading-none min-w-0">
              <div className="poppins hidden sm:block font-extrabold text-[14px] tracking-tight text-[#0B3D91]">COMPLEXE SCOLAIRE</div>
              <div className="poppins font-extrabold text-[18px] tracking-tight text-[#EAB308]">NOUVEAU DEPART</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} className={`px-4 py-2 rounded-full text-[14px] font-medium transition ${active === n.id ? 'bg-[var(--bg-soft)] text-[var(--primary)] font-semibold' : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}>{n.label}</a>
            ))}
            <a href="#inscription" className="ml-2 btn-primary text-[13px] !py-2.5 !px-5">Inscrire mon enfant <ArrowRight size={16} /></a>
          </nav>

          <button className="lg:hidden w-10 h-10 rounded-full bg-[var(--bg-soft)] flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-1">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-xl text-[15px] font-medium hover:bg-[var(--bg-soft)]">{n.label}</a>
            ))}
            <a href="#inscription" onClick={() => setMenuOpen(false)} className="mt-2 flex btn-primary justify-center">Inscrire mon enfant</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="accueil" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pt-6 sm:pt-10 pb-8">
          <div className="relative rounded-[28px] overflow-hidden bg-[var(--primary)] min-h-[620px] flex">
            {/* Vraie photo : classe, main levée */}
            <img src={classeUrl} alt={PHOTO_ALT} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: "#0B3D91", opacity: 0.55 }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D91]/60 via-transparent to-transparent"></div>

            <div className="relative z-10 flex w-full flex-col gap-8 p-6 pb-10 sm:p-10 sm:pb-12 lg:flex-row lg:items-center lg:gap-12 lg:p-14">
              <div className="flex w-full flex-col justify-center lg:max-w-[600px]">
                <div className="inline-flex items-center gap-3 rounded-full bg-white py-2 pl-4 pr-4 shadow-lg w-fit max-w-full">
                  <span className="poppins text-[11px] sm:text-[12px] font-bold leading-tight tracking-wide text-[#0B3D91] [overflow-wrap:anywhere]"><span className="text-[10px] font-semibold text-[#64748B] tracking-[0.12em]">BACONGO, BRAZZAVILLE</span></span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-wide w-fit">
                  <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span> INSCRIPTIONS 2026-2027 OUVERTES
                </div>
                <h1 className="hero-title mt-6 text-white [overflow-wrap:anywhere]">L'excellence, ici à Brazzaville</h1>
                <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.6] text-white/90 max-w-[520px]">
                  École privée de confiance à Bacongo. De la Maternelle au Lycée, nous formons des enfants disciplinés, curieux et fiers. Sécurité, résultats, suivi WhatsApp quotidien.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <a href="#vie-ecole" className="btn-outline text-[14px] inline-flex items-center gap-2">
                    <Play size={16} className="fill-white" /> Visiter l'école
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3 max-w-[420px]">
                  <div className="min-w-0"><div className="text-white font-bold text-[20px] sm:text-[22px] leading-none">350+</div><div className="text-white/70 text-[11px] mt-1 [overflow-wrap:anywhere]">élèves</div></div>
                  <div className="border-l border-white/15 pl-3 sm:pl-4 min-w-0"><div className="text-white font-bold text-[20px] sm:text-[22px] leading-none">5.000 F</div><div className="text-white/70 text-[11px] mt-1 [overflow-wrap:anywhere]">inscription</div></div>
                  <div className="border-l border-white/15 pl-3 sm:pl-4 min-w-0"><div className="text-white font-bold text-[18px] sm:text-[22px] leading-none">7h30-17h</div><div className="text-white/70 text-[11px] mt-1 [overflow-wrap:anywhere] leading-[1.1]">encadre-<br className="sm:hidden" />ment</div></div>
                </div>
              </div>

              {/* MOT DU DIRECTEUR — portrait + citation, aligné à droite sur desktop */}
              <div className="w-full max-w-[400px] shrink-0 self-center lg:ml-auto lg:max-w-[360px]">
                <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-[#EAB308]/30 bg-white/95 shadow-[var(--shadow-lg)] backdrop-blur">

                  {/* Portrait 5:4 — visage entier, épaules visibles */}
                  <div className="relative aspect-[5/4] w-full shrink-0">
                    <img
                      src={directeurUrl}
                      alt={DIRECTEUR_ALT}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-[#92400E] shadow-sm">
                      MOT DU DIRECTEUR
                    </span>
                  </div>

                  {/* Contenu texte */}
                  <div className="flex flex-col gap-3 p-5">
                    <blockquote className="rounded-r-[10px] border-l-[3px] border-[#EAB308] bg-[#FFFBEB] py-2 pl-3 pr-2.5">
                      <p className="text-[12.5px] italic leading-[1.5] text-[#334155]">
                        « Chaque enfant est connu par son nom, suivi de près et poussé vers l'excellence. »
                      </p>
                    </blockquote>

                    <div className="flex flex-col gap-1">
                      <span className="poppins text-[13px] font-bold text-[#0B3D91]">Le Directeur</span>
                      <span className="text-[11px] leading-snug text-[#64748B]">
                        Directeur Fondateur — Complexe Scolaire Nouveau Depart, Bacongo – Brazzaville
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-[#EAB308]/40 bg-[#FEF3C7]/60 px-2.5 py-1 text-[10px] font-semibold text-[#92400E]">Discipline</span>
                      <span className="rounded-full border border-[#EAB308]/40 bg-[#FEF3C7]/60 px-2.5 py-1 text-[10px] font-semibold text-[#92400E]">Excellence</span>
                      <span className="rounded-full border border-[#EAB308]/40 bg-[#FEF3C7]/60 px-2.5 py-1 text-[10px] font-semibold text-[#92400E]">Proximité</span>
                    </div>
                  </div>

                </div>
              </div>










            </div>
          </div>

          {/* CHIFFRES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {CHIFFRES.map((c, i) => (
              <div key={i} className="card p-5 sm:p-6 fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#A16207] flex items-center justify-center"><Award size={18} /></div>
                  <span className="text-[11px] font-bold tracking-wide bg-[var(--bg-soft)] px-2 py-1 rounded-full text-[var(--muted)]">{c.c}</span>
                </div>
                <div className="mt-4 poppins font-extrabold text-[28px] leading-none text-[var(--ink)]">{c.v}</div>
                <div className="mt-1 text-[13px] font-medium text-[var(--muted)] leading-[1.3]">{c.l}</div>
              </div>
            ))}
          </div>

          {/* POURQUOI */}
          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-title max-w-[420px]">Pourquoi les parents de Bacongo nous font confiance</h2>
              <p className="text-[14px] text-[var(--muted)] max-w-[360px]">Pas de promesses vagues. Des preuves, un cadre sécurisé et des enseignants stables. C'est ça, le COMPLEXE SCOLAIRE NOUVEAU DEPART.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {POURQUOI.map((p, i) => (
                <div key={i} className="card p-6 fade-up" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="w-12 h-12 rounded-[12px] bg-[var(--primary)] text-white flex items-center justify-center"><p.icon size={20} /></div>
                  <h3 className="mt-4 font-bold text-[16px]">{p.t}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[var(--muted)]">{p.d}</p>
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className="bg-[#0B3D91] text-white">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><GraduationCap size={18} /></div>
              <div className="text-[14px]"><span className="font-bold">Inscriptions ouvertes</span> <span className="opacity-70">— Visite guidée gratuite tous les samedis 9h à Bacongo, sans RDV.</span></div>
            </div>
            <a href={waGeneric} target="_blank" rel="noopener" className="text-[13px] font-bold tracking-wide bg-white text-[var(--primary)] px-5 py-2.5 rounded-full inline-flex items-center gap-2">Réserver ma visite <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* FORMATIONS */}
      <section id="formations" className="bg-[var(--bg-soft)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-[720px] mx-auto text-center">
            <div className="badge-gold mx-auto">De 3 ans à 18 ans</div>
            <h2 className="section-title mt-4">De la Maternelle au Lycée, un parcours d'excellence</h2>
            <p className="mt-4 text-[15px] text-[var(--muted)] leading-[1.6]">Un seul établissement, un suivi continu. Pas de rupture entre niveaux. Votre enfant grandit avec les mêmes valeurs : Discipline, Excellence, Respect.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {FORMATIONS.map((f, idx) => (
              <div key={f.id} className="card p-0 overflow-hidden fade-up" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-[14px] bg-[var(--primary)] text-white flex items-center justify-center shrink-0"><BookOpen size={22} /></div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap"><h3 className="text-[20px] font-bold">{f.title}</h3><span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#EFF6FF] text-[var(--primary)] border">{f.age}</span></div>
                        <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--muted)]">{f.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-5">
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">Matières clés</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {f.matieres.map(m => <span key={m} className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-soft)] border text-[var(--ink)] font-medium">{m}</span>)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">Débouchés</div>
                      <div className="mt-2 text-[12.5px] leading-[1.5] text-[var(--ink)]">{f.debouches}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-[12px] bg-[#FFFBEB] border border-[#FDE68A]">
                    <div className="flex items-center gap-2">
                      <span className="badge-gold">Frais transparents</span>
                      <span className="text-[13px] font-semibold text-[var(--ink)]">{f.frais}</span>
                    </div>
                    <span className="text-[11px] text-[#92400E] font-medium">Pas de frais cachés • Reçu immédiat</span>
                  </div>

                  <a href={`https://wa.me/242053916891?text=${encodeURIComponent(`Bonjour COMPLEXE SCOLAIRE NOUVEAU DEPART, je veux inscrire mon enfant en ${f.title} (${f.age}). Frais ${f.frais}. Merci.`)}`} target="_blank" rel="noopener" className="mt-5 w-full bg-[#25D366] hover:bg-[#1eb65a] text-white font-bold text-[14px] rounded-full py-3.5 flex items-center justify-center gap-2 transition">
                    <MessageCircle size={18} /> S'inscrire sur WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-[12px] text-[var(--muted)]">* Frais en FCFA. Pour changer un frais, voir guide en bas de page. Tous les boutons ouvrent WhatsApp direct.</div>
        </div>
      </section>

      {/* VIE DE L ECOLE */}
      <section id="vie-ecole" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-wrap justify-between gap-6 items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] uppercase text-[var(--primary)]"><div className="w-6 h-0.5 bg-[var(--accent)]"></div> Vie de l'école</div>
              <h2 className="section-title mt-3 max-w-[520px]">Des classes propres, des élèves heureux, des résultats visibles</h2>
            </div>
            <p className="max-w-[360px] text-[14px] text-[var(--muted)]">Photos prises dans nos locaux à Bacongo. Pas de banque d'images. Lumière naturelle, tableaux propres, enfants en uniforme bleu marine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {GALERIE.map((g, i) => (
              <button key={i} onClick={() => setLightbox(i)} className="group overflow-hidden rounded-[16px] border bg-white text-left shadow-[var(--shadow)] fade-up" style={{ transitionDelay: `${i * 60}ms` }} aria-label={`Ouvrir la photo : ${g.t}`}>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--bg-soft)]">
                  {g.img ? (
                    <img src={g.img} alt={g.t} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${g.g}`}></div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-bold leading-snug text-[var(--ink)] [overflow-wrap:anywhere]">{g.t}</h3>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-soft)] transition group-hover:scale-110"><ArrowRight size={14} /></span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[var(--muted)] [overflow-wrap:anywhere]">{g.s}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Resultats */}
          <div className="mt-16 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
            <div className="card p-7 sm:p-8">
              <h3 className="font-bold text-[18px]">Résultats aux examens 2024-2025</h3>
              <p className="text-[13px] text-[var(--muted)] mt-1">Taux officiels affichés à Bacongo. Affichage transparent chaque année.</p>
              <div className="mt-8 space-y-6">
                {[
                  { k: "CEP (Primaire)", v: 98 },
                  { k: "BEPC (Collège)", v: 95 },
                  { k: "BAC (Lycée)", v: 92 },
                ].map(r => (
                  <div key={r.k}>
                    <div className="flex justify-between text-[13px] font-semibold"><span>{r.k}</span><span className="text-[var(--primary)]">{r.v}%</span></div>
                    <div className="progress-track mt-2"><div className="progress-fill" style={{ width: `${r.v}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px]"><span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] border text-[var(--primary)] font-semibold">Source : PV officiels 2024-2025</span><span className="px-2.5 py-1 rounded-full bg-[var(--bg-soft)] border text-[var(--muted)]">Archivés à l'administration</span></div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[16px] border bg-white px-5 py-4 shadow-[var(--shadow)]">
                <p className="text-[12px] font-semibold leading-snug">Nos élèves, notre fierté — au COMPLEXE SCOLAIRE NOUVEAU DEPART.</p>
              </div>
              {TEMOIGNAGES.map((t, i) => (
                <div key={i} className="card p-5 sm:p-6 fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] border flex items-center justify-center font-bold text-[13px] text-[var(--primary)]">{t.nom.split(' ')[1]?.[0]}{t.nom.split(' ')[2]?.[0]}</div>
                      <div>
                        <div className="font-bold text-[13px] leading-tight">{t.nom}</div>
                        <div className="text-[11px] text-[var(--muted)] mt-0.5">{t.quartier}</div>
                      </div>
                    </div>
                    <div className="flex"><Star size={12} className="fill-[#EAB308] text-[#EAB308]" />{Array.from({ length: t.note - 1 }).map((_, k) => <Star key={k} size={12} className="fill-[#EAB308] text-[#EAB308]" />)}</div>
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-[var(--ink)]">“{t.texte}”</p>
                  <div className="mt-3 text-[11px] text-[var(--muted)] flex items-center gap-1.5"><Check size={12} className="text-[#22C55E]" /> Avis vérifié – parent d'élève 2024-2025</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur p-4 overflow-y-auto pt-[max(1rem,var(--safe-area-inset-top))] flex items-center justify-center" onClick={() => setLightbox(null)}>
            <div className="min-h-full flex items-center justify-center w-full" onClick={e => e.stopPropagation()}>
              <div className="bg-white rounded-[20px] max-w-[720px] w-full overflow-hidden">
                <div className={`relative h-[340px] sm:h-[420px] ${GALERIE[lightbox].img ? '' : `bg-gradient-to-br ${GALERIE[lightbox].g}`}`}>
                  {GALERIE[lightbox].img && <img src={GALERIE[lightbox].img as string} alt={PHOTO_ALT} className="absolute inset-0 h-full w-full object-cover" />}
                  <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center z-10" aria-label="Fermer"><X size={18} /></button>
                  <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-[13px] font-bold">{GALERIE[lightbox].t} • {GALERIE[lightbox].s}</div>
                </div>
                <div className="p-5 flex justify-between items-center gap-3">
                  <div className="text-[13px] text-[var(--muted)]">Photo réelle • COMPLEXE SCOLAIRE NOUVEAU DEPART, Bacongo</div>
                  <button onClick={() => setLightbox(null)} className="text-[13px] font-bold px-4 py-2 rounded-full bg-[var(--bg-soft)] border shrink-0">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* A PROPOS */}
      <section id="apropos" className="bg-[var(--bg-soft)] border-y">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] uppercase text-[var(--primary)]"><div className="w-6 h-0.5 bg-[var(--accent)]"></div> À propos</div>
              <h2 className="section-title mt-3">15 ans à bâtir la confiance des familles de Brazzaville</h2>
              <div className="flex items-center gap-4 mt-6 rounded-[16px] bg-white border p-4">
                <div>
                  <div className="poppins font-extrabold text-[14px] leading-tight text-[#0B3D91]">COMPLEXE SCOLAIRE</div>
                  <div className="poppins font-extrabold text-[20px] leading-tight text-[#EAB308]">NOUVEAU DEPART</div>
                  <div className="text-[11px] font-semibold tracking-[0.12em] text-[var(--muted)] mt-1">BACONGO • BRAZZAVILLE</div>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-[14px] leading-[1.7] text-[#334155]">
                <p><strong>Fondée en 2010 à Bacongo</strong> par un couple d'enseignants, l'école est née d'un constat simple : les parents cherchaient une école privée sérieuse, propre, avec des frais justes et un vrai suivi.</p>
                <p>Nous avons commencé avec 2 classes de maternelle. Aujourd'hui, 4 niveaux, 350 élèves, une équipe stable. Pas de miracle : discipline juste, travail régulier, respect des enfants et des parents.</p>
                <p>Notre promesse : <strong>votre enfant est connu par son prénom, pas par un numéro.</strong> Cahier de liaison, appel si absence, rencontres mensuelles. C'est notre différence à Brazzaville.</p>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { t: "Discipline", d: "Juste, expliquée, sans violence", i: "🛡️" },
                  { t: "Excellence", d: "Travail, méthode, résultats", i: "🏆" },
                  { t: "Respect", d: "Enfant, parent, enseignant", i: "🤝" },
                  { t: "Foi", d: "Valeurs, intégrité, service", i: "🙏" },
                ].map(v => (
                  <div key={v.t} className="card p-4 text-center">
                    <div className="text-[20px]">{v.i}</div>
                    <div className="mt-2 font-bold text-[13px]">{v.t}</div>
                    <div className="mt-1 text-[11px] text-[var(--muted)] leading-[1.3]">{v.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">


              <div className="card p-6">
                <div className="font-bold text-[14px]">Équipe enseignante</div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ENSEIGNANTS.map(e => (
                    <div key={e.nom} className="rounded-[12px] border bg-[var(--bg-soft)] p-3">
                      <div className="font-bold text-[13px]">{e.nom}</div>
                      <div className="text-[11px] font-semibold text-[var(--primary)] mt-0.5">{e.mat}</div>
                      <div className="text-[11px] text-[var(--muted)] mt-1">{e.exp}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[11px] text-[var(--muted)]">+ 6 autres enseignants stables • Turnover &lt;10% depuis 2018</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSCRIPTION */}
      <section id="inscription" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-[720px]">
            <div className="badge-gold">Inscription en 2 minutes</div>
            <h2 className="section-title mt-4">Inscrire mon enfant à Bacongo, sans se déplacer</h2>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Remplissez le formulaire, nous vous répondons sur WhatsApp dans l'heure. Visite possible le samedi 9h sans RDV.</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
            {/* Form */}
            <div className="card p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-bold">Nom du parent *</label>
                    <input value={form.parent} onChange={e => setForm({ ...form, parent: e.target.value })} placeholder="Ex: Mme Ngoma" className="mt-1.5 w-full rounded-[12px] border border-[var(--border)] px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]" />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold">Nom de l'enfant *</label>
                    <input value={form.enfant} onChange={e => setForm({ ...form, enfant: e.target.value })} placeholder="Ex: Grâce Ngoma" className="mt-1.5 w-full rounded-[12px] border border-[var(--border)] px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-bold">Classe souhaitée *</label>
                    <select value={form.classe} onChange={e => setForm({ ...form, classe: e.target.value })} className="mt-1.5 w-full rounded-[12px] border border-[var(--border)] px-4 py-3 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20">
                      <option value="">Choisir...</option>
                      <option>Maternelle (3-5 ans)</option>
                      <option>Primaire CP-CM2</option>
                      <option>Collège 6e-3e</option>
                      <option>Lycée Seconde-Terminale</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold">Téléphone WhatsApp *</label>
                    <input value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} placeholder="05 XXX XX XX" className="mt-1.5 w-full rounded-[12px] border border-[var(--border)] px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold">Message (optionnel)</label>
                  <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} rows={3} placeholder="Précisez âge, école précédente, questions sur frais..." className="mt-1.5 w-full rounded-[12px] border border-[var(--border)] px-4 py-3 text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"></textarea>
                </div>

                <button disabled={busy} type="submit" className="w-full bg-[#25D366] hover:bg-[#1eb65a] disabled:opacity-60 text-white font-bold rounded-full py-4 text-[15px] flex items-center justify-center gap-2 transition">
                  <MessageCircle size={18} /> {busy ? "Enregistrement..." : "Envoyer sur WhatsApp direct"}
                </button>

                {savedMsg && (
                  <div className="rounded-[12px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-[13px] p-3 flex gap-2">
                    <Check size={16} className="shrink-0 mt-0.5" /> <span className="[overflow-wrap:anywhere]">{savedMsg}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={generatePDF} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2 rounded-full border bg-[var(--bg-soft)] hover:bg-white">
                    <FileDown size={14} /> Télécharger fiche d'inscription PDF
                  </button>
                  <span className="text-[11px] text-[var(--muted)] self-center">Généré côté client, sans serveur</span>
                </div>

                <div className="text-[11px] text-[var(--muted)]">En soumettant, vous acceptez d'être recontacté sur WhatsApp. {records.length > 0 && <span className="font-semibold text-[var(--primary)]">• {records.length} demandes enregistrées (démo admin)</span>}</div>
              </form>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Map */}
              <div className="card overflow-hidden">
                <div className="p-5 flex items-center justify-between">
                  <div className="font-bold text-[14px] flex items-center gap-2"><MapPin size={16} className="text-[var(--primary)]" /> Bacongo, Brazzaville</div>
                  <a href={mapsDirectionsUrl({ label: MAP_PLACES[0].label, lat: MAP_PLACES[0].latitude, lng: MAP_PLACES[0].longitude })} target="_blank" rel="noopener" className="text-[11px] font-bold px-3 py-1 rounded-full bg-[var(--bg-soft)] border hover:bg-white">Itinéraire</a>
                </div>

                <div className="px-5 pb-3">
                  <div ref={(el) => { rowRefs.current[0] = el; }} className="map-selected border rounded-[12px] p-3 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-[12px]">1</div>
                    <div className="min-w-0">
                      <div className="font-bold text-[13px] leading-tight">COMPLEXE SCOLAIRE NOUVEAU DEPART</div>
                      <div className="text-[11px] text-[var(--muted)] mt-0.5">Avenue William Guynet, Bacongo – Portail bleu nuit, drapeau CG</div>
                      <div className="mt-1 text-[11px] font-semibold text-[var(--primary)]">Repère : Hôtel Léon Bacongo, 80m</div>
                    </div>
                  </div>
                  {mapUnavailable && <div className="mt-3 text-[12px] text-[var(--muted)]">Map unavailable – adresse ci-dessus.</div>}
                </div>

                <div ref={mapRef} className={`h-[320px] w-full ${mapUnavailable ? 'hidden' : 'block'}`} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="font-bold text-[13px] flex items-center gap-2"><Clock size={14} /> Horaires</div>
                  <div className="mt-3 text-[12px] leading-[1.6]">
                    <div className="flex justify-between"><span>Lun-Ven</span><span className="font-semibold">7h30-17h00</span></div>
                    <div className="flex justify-between"><span>Samedi</span><span className="font-semibold">7h30-12h00</span></div>
                    <div className="flex justify-between text-[var(--muted)]"><span>Dimanche</span><span>Fermé</span></div>
                  </div>
                </div>
                <div className="card p-5">
                  <div className="font-bold text-[13px]">Documents à fournir</div>
                  <ul className="mt-3 space-y-1.5 text-[12px] leading-[1.5]">
                    <li className="flex gap-1.5"><Check size={12} className="text-[#22C55E] mt-0.5" /> Acte naissance (copie)</li>
                    <li className="flex gap-1.5"><Check size={12} className="text-[#22C55E] mt-0.5" /> 2 photos identité</li>
                    <li className="flex gap-1.5"><Check size={12} className="text-[#22C55E] mt-0.5" /> Carnet vaccination</li>
                    <li className="flex gap-1.5"><Check size={12} className="text-[#22C55E] mt-0.5" /> Bulletins précédents (collège/lycée)</li>
                    <li className="flex gap-1.5"><Check size={12} className="text-[#22C55E] mt-0.5" /> 5.000 FCFA inscription</li>
                  </ul>
                </div>
              </div>

              <div className="card p-5">
                <div className="font-bold text-[13px]">Contacts directs</div>
                <div className="mt-3 space-y-2">
                  <a href={waGeneric} target="_blank" rel="noopener" className="flex items-center justify-between p-3 rounded-[12px] bg-[#F0FDF4] border border-[#BBF7D0] hover:bg-white transition">
                    <div className="flex items-center gap-2 text-[13px] font-semibold"><div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center"><MessageCircle size={16} /></div> WhatsApp Inscriptions</div>
                    <span className="text-[12px] font-bold">05 391 68 91</span>
                  </a>
                  <a href="tel:+242053916891" className="flex items-center justify-between p-3 rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-white transition">
                    <div className="flex items-center gap-2 text-[13px] font-semibold"><div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"><Phone size={14} /></div> Appeler l'école</div>
                    <span className="text-[12px] font-bold">05 391 68 91</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-10">
          <div className="flex flex-wrap gap-8 justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="leading-tight">
                  <div className="poppins font-extrabold text-[14px] text-[#0B3D91]">COMPLEXE SCOLAIRE</div>
                  <div className="poppins font-extrabold text-[18px] text-[#EAB308]">NOUVEAU DEPART</div>
                  <div className="text-[11px] font-semibold tracking-[0.12em] text-[var(--muted)] mt-1">BACONGO • BRAZZAVILLE</div>
                </div>
              </div>
              <div className="mt-3 text-[12px] text-[var(--muted)] leading-[1.6] max-w-[280px]">COMPLEXE SCOLAIRE NOUVEAU DEPART • Bacongo, Brazzaville • Maternelle, Primaire, Collège, Lycée • Inscription 5.000 FCFA, scolarité dès 7.000 FCFA/mois.</div>
            </div>
            <div className="text-[12px] leading-[1.8] text-[var(--muted)]">
              <div className="font-bold text-[var(--ink)]">Navigation</div>
              <a href="#accueil" className="block hover:text-[var(--primary)]">Accueil</a>
              <a href="#formations" className="block hover:text-[var(--primary)]">Formations</a>
              <a href="#vie-ecole" className="block hover:text-[var(--primary)]">Vie de l'école</a>
              <a href="#apropos" className="block hover:text-[var(--primary)]">À propos</a>
              <a href="#inscription" className="block hover:text-[var(--primary)]">Inscription</a>
            </div>
            <div className="text-[12px] leading-[1.8] text-[var(--muted)]">
              <div className="font-bold text-[var(--ink)]">SEO</div>
              <div>école privée Brazzaville</div>
              <div>inscription école Brazzaville</div>
              <div>école maternelle Bacongo</div>
              <div>école primaire collège lycée Brazzaville</div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-[11px] text-[var(--muted)] flex flex-wrap justify-between gap-2">
            <span>© 2026 COMPLEXE SCOLAIRE NOUVEAU DEPART – Bacongo Brazzaville. Tous droits réservés.</span>
            <span>Design sérieux qui inspire confiance • Bleu nuit #0B3D91 + Or #EAB308 • 100% mobile</span>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href={waGeneric} target="_blank" rel="noopener" className="fixed bottom-5 right-5 z-50 w-[56px] h-[56px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_12px_24px_rgba(37,211,102,.35)] pulse-whatsapp hover:scale-105 transition" aria-label="Ouvrir WhatsApp">
        <MessageCircle size={26} className="fill-white" />
      </a>
      <a href="tel:+242053916891" className="fixed bottom-5 left-5 z-50 w-[48px] h-[48px] rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-[0_12px_24px_rgba(11,61,145,.3)] hover:scale-105 transition" aria-label="Appeler l'école">
        <Phone size={20} />
      </a>
    </div>
  );
}
