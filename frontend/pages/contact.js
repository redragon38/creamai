import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Mail, Clock, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// FORMSPREE — Étapes pour recevoir les mails sur l.bonin2011@gmail.com :
//  1. Va sur https://formspree.io et crée un compte GRATUIT
//  2. Clique "New Form" → entre l'email : l.bonin2011@gmail.com
//  3. Copie l'ID (ex: xpwzqkbd) et remplace FORMSPREE_ID ci-dessous
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = 'xjgezqgj';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const SUBJECTS = [
  { value: '', label: 'Choisissez un sujet…', disabled: true },
  { value: 'question', label: '❓ Question générale' },
  { value: 'partenariat', label: '🤝 Partenariat' },
  { value: 'suggestion', label: '💡 Suggestion d\'outil' },
  { value: 'support', label: '🛠️ Support technique' },
  { value: 'autre', label: '💬 Autre' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ prenom: '', email: '', sujet: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.prenom.trim()) e.prenom = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.sujet) e.sujet = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    if (!FORMSPREE_ID.includes('REMPLACE')) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.prenom,
            email: form.email,
            subject: form.sujet,
            message: form.message,
            _replyto: form.email,
            _subject: `[Thecreamai] ${form.sujet} – ${form.prenom}`,
          }),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ prenom: '', email: '', sujet: '', message: '' });
        } else {
          throw new Error();
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback mailto vers l.bonin2011@gmail.com
      const subject = encodeURIComponent(`[Thecreamai] ${form.sujet} – ${form.prenom}`);
      const body = encodeURIComponent(`Nom : ${form.prenom}\nEmail : ${form.email}\nSujet : ${form.sujet}\n\nMessage :\n${form.message}`);
      window.location.href = `mailto:l.bonin2011@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  const inputClass = (field) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact — Thecreamai"
        description="Contactez l'équipe Thecreamai pour toute question ou partenariat."
        canonical="https://thecreamai.com/contact"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-purple-50 to-white border-b border-purple-100">
          <div className="container mx-auto px-6 text-center">
            <span className="inline-block bg-white border border-purple-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              ✉️ Contactez-nous
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              On est là pour<br />
              <span className="text-gray-900">vous aider</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Une question, un partenariat, une suggestion ? Réponse sous 24h.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Infos */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: <Mail className="w-5 h-5 text-gray-900" />, title: 'Email', content: 'l.bonin2011@gmail.com' },
                { icon: <Clock className="w-5 h-5 text-gray-900" />, title: 'Délai de réponse', content: 'Sous 24h en jours ouvrés' },
                { icon: <Globe className="w-5 h-5 text-gray-900" />, title: 'Disponibilité', content: 'Partout en France et à l\'international' },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex items-start gap-4 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1">{card.title}</p>
                    <p className="text-gray-600 text-sm font-medium">{card.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyer un message</h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1.5">Prénom</label>
                      <input type="text" name="prenom" value={form.prenom} onChange={handleChange}
                        placeholder="Marie" className={inputClass('prenom')} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1.5">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="marie@email.com" className={inputClass('email')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1.5">Sujet</label>
                    <select name="sujet" value={form.sujet} onChange={handleChange}
                      className={`${inputClass('sujet')} cursor-pointer appearance-none`}>
                      {SUBJECTS.map(s => (
                        <option key={s.value} value={s.value} disabled={s.disabled}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Votre message…"
                      className={`${inputClass('message')} resize-y min-h-[120px]`} />
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full gradient-purple text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-300/50 hover:-translate-y-0.5 transition-all disabled:opacity-60">
                    {status === 'loading' ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Envoi…</>
                    ) : (
                      <><Send className="w-4 h-4" /> Envoyer le message</>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      Message envoyé ! Nous vous répondrons sous 24h.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Erreur. Écrivez directement à{' '}
                      <a href="mailto:l.bonin2011@gmail.com" className="underline">l.bonin2011@gmail.com</a>
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
  );
}
