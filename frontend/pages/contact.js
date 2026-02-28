import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Mail, Clock, Globe, Lightbulb, Send, CheckCircle, AlertCircle } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// CONFIGURATION FORMSPREE
// 1. Créez un compte gratuit sur https://formspree.io
// 2. Créez un formulaire avec l'adresse contact@thecreamai.com
// 3. Remplacez VOTRE_ID_ICI par votre identifiant Formspree
// ──────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ID_ICI';

const subjects = [
  { value: '', label: 'Choisissez un sujet…', disabled: true },
  { value: 'demo', label: '🎯 Demande de démo' },
  { value: 'devis', label: '💰 Demande de devis' },
  { value: 'partenariat', label: '🤝 Partenariat' },
  { value: 'support', label: '🛠️ Support technique' },
  { value: 'presse', label: '📰 Presse / Médias' },
  { value: 'autre', label: '💬 Autre' },
];

const infoCards = [
  {
    icon: <Mail className="w-5 h-5 text-purple-400" />,
    title: 'Email',
    content: (
      <a href="mailto:contact@thecreamai.com" className="text-white hover:text-purple-400 transition-colors">
        contact@thecreamai.com
      </a>
    ),
  },
  {
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    title: 'Temps de réponse',
    content: <p className="text-gray-300">Sous 24h en jours ouvrés</p>,
  },
  {
    icon: <Globe className="w-5 h-5 text-purple-400" />,
    title: 'Disponibilité',
    content: <p className="text-gray-300">Nous travaillons avec des clients partout en France et à l&apos;international.</p>,
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-purple-400" />,
    title: 'Pour quoi nous écrire ?',
    content: <p className="text-gray-300">Démo, devis, partenariat, support ou toute autre question — on est là.</p>,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const validate = () => {
    const newErrors = {};
    if (!form.prenom.trim()) newErrors.prenom = true;
    if (!form.nom.trim()) newErrors.nom = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = true;
    if (!form.sujet) newErrors.sujet = true;
    if (!form.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Si Formspree est configuré
    if (!FORMSPREE_ENDPOINT.includes('VOTRE_ID_ICI')) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: `${form.prenom} ${form.nom}`,
            email: form.email,
            subject: form.sujet,
            message: form.message,
            _replyto: form.email,
            _subject: `[TheCreamAI] ${form.sujet} – ${form.prenom} ${form.nom}`,
          }),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ prenom: '', nom: '', email: '', sujet: '', message: '' });
        } else {
          throw new Error('server error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback : ouvre le client mail natif
      const subject = encodeURIComponent(`[TheCreamAI] ${form.sujet} – ${form.prenom} ${form.nom}`);
      const body = encodeURIComponent(
        `Prénom : ${form.prenom}\nNom : ${form.nom}\nEmail : ${form.email}\n\nSujet : ${form.sujet}\n\nMessage :\n${form.message}`
      );
      window.location.href = `mailto:contact@thecreamai.com?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  return (
    <>
      <SEO
        title="Contact — Thecreamai"
        description="Contactez l'équipe Thecreamai pour toute question, demande de démo ou partenariat."
        canonical="https://thecreamai.com/contact"
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* ── HERO ── */}
          <section className="relative py-24 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/20 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-900/30 border border-purple-700/40 px-4 py-1.5 rounded-full mb-6">
                ✉️ Contactez-nous
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Parlons de votre{' '}
                <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                  projet IA
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                Une question, un projet, un partenariat ? Notre équipe vous répond sous 24h.
              </p>
            </div>
          </section>

          {/* ── CONTENT ── */}
          <section className="container mx-auto px-6 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

              {/* Info cards */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {infoCards.map((card, i) => (
                  <div
                    key={i}
                    className="gradient-card rounded-2xl p-5 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                        {card.title}
                      </p>
                      {card.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="gradient-card rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                  <form onSubmit={handleSubmit} noValidate className="relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      {/* Prénom */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          value={form.prenom}
                          onChange={handleChange}
                          placeholder="Marie"
                          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                            errors.prenom ? 'border-red-500/60' : 'border-purple-900/30 focus:border-purple-500/50'
                          }`}
                        />
                      </div>

                      {/* Nom */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Nom
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={form.nom}
                          onChange={handleChange}
                          placeholder="Dupont"
                          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                            errors.nom ? 'border-red-500/60' : 'border-purple-900/30 focus:border-purple-500/50'
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Adresse e-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="marie@entreprise.com"
                          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                            errors.email ? 'border-red-500/60' : 'border-purple-900/30 focus:border-purple-500/50'
                          }`}
                        />
                      </div>

                      {/* Sujet */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Sujet
                        </label>
                        <select
                          name="sujet"
                          value={form.sujet}
                          onChange={handleChange}
                          className={`bg-[#0e0520] border rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500/40 transition-all appearance-none cursor-pointer ${
                            errors.sujet ? 'border-red-500/60' : 'border-purple-900/30 focus:border-purple-500/50'
                          } ${!form.sujet ? 'text-gray-600' : 'text-white'}`}
                        >
                          {subjects.map((s) => (
                            <option key={s.value} value={s.value} disabled={s.disabled}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Décrivez votre projet ou votre question en quelques lignes…"
                          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/40 transition-all resize-y min-h-[120px] ${
                            errors.message ? 'border-red-500/60' : 'border-purple-900/30 focus:border-purple-500/50'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="mt-5 w-full gradient-purple text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed glow-purple"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>

                    {/* Feedback */}
                    {status === 'success' && (
                      <div className="mt-4 flex items-center gap-2 bg-green-900/20 border border-green-700/40 text-green-400 px-4 py-3 rounded-xl text-sm font-medium">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        Message envoyé ! Nous vous répondrons sous 24h.
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="mt-4 flex items-center gap-2 bg-red-900/20 border border-red-700/40 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Erreur lors de l&apos;envoi. Écrivez directement à{' '}
                        <a href="mailto:contact@thecreamai.com" className="underline">
                          contact@thecreamai.com
                        </a>
                      </div>
                    )}
                  </form>
                </div>
              </div>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
