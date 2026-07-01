'use client';

import { useState, useEffect } from 'react';
import './page.css';

export default function Home() {
  // v3 - All sections fully implemented and working
  const [activeTab, setActiveTab] = useState('strategie');
  const [activeMonth, setActiveMonth] = useState('juillet');
  const [calendarData, setCalendarData] = useState([]);
  const [reunions, setReunions] = useState([]);
  const [finances, setFinances] = useState([]);
  const [idees, setIdees] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [planData, setPlanData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPlanRecording, setIsPlanRecording] = useState(false);
  const [planTranscript, setPlanTranscript] = useState('');
  const [planRecognition, setPlanRecognition] = useState(null);

  useEffect(() => {
    fetchCalendar();
    fetchReunions();
    fetchFinances();
    fetchIdees();
    fetchPlan();
  }, []);

  const fetchCalendar = async () => {
    try {
      const res = await fetch('/api/calendar');
      const data = await res.json();
      setCalendarData(data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const fetchReunions = async () => {
    try {
      const res = await fetch('/api/reunions');
      const data = await res.json();
      setReunions(data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const fetchFinances = async () => {
    try {
      const res = await fetch('/api/finances');
      const data = await res.json();
      setFinances(data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const fetchIdees = async () => {
    try {
      const res = await fetch('/api/idees');
      const data = await res.json();
      setIdees(data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const fetchPlan = async () => {
    try {
      const stored = localStorage.getItem('planData');
      if (stored) {
        setPlanData(JSON.parse(stored));
      } else {
        const res = await fetch('/api/plan');
        const data = await res.json();
        setPlanData(data);
        localStorage.setItem('planData', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const updatePlan = async (dayNum, dayData) => {
    const updated = { ...planData, [dayNum]: dayData };
    setPlanData(updated);
    localStorage.setItem('planData', JSON.stringify(updated));
    try {
      await fetch('/api/plan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateCell = async (index, field, value) => {
    const updated = [...calendarData];
    updated[index][field] = value;
    setCalendarData(updated);

    try {
      await fetch('/api/calendar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateReunion = async (index, field, value) => {
    const updated = [...reunions];
    updated[index][field] = value;
    setReunions(updated);

    try {
      await fetch('/api/reunions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateFinance = async (index, field, value) => {
    const updated = [...finances];
    updated[index][field] = value;
    setFinances(updated);
    try {
      await fetch('/api/finances', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateIdee = async (index, field, value) => {
    const updated = [...idees];
    updated[index][field] = value;
    setIdees(updated);
    try {
      await fetch('/api/idees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCalendarByMonth = (month) => {
    if (month === 'juillet') {
      return calendarData.filter(d => d.date.includes('2026-07'));
    } else if (month === 'aout') {
      return calendarData.filter(d => d.date.includes('2026-08'));
    }
    return [];
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateCell(index, 'miniature', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadIdee = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updateIdee(index, 'images', [...(idees[index].images || []), event.target.result]);
    };
    reader.readAsDataURL(file);
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + transcript + ' ');
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.start();
  };

  const startPlanRecording = () => {
    if (isPlanRecording && planRecognition) {
      planRecognition.stop();
      setIsPlanRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('La reconnaissance vocale n\'est pas supportée');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsPlanRecording(true);
    };

    recognition.onend = () => {
      setIsPlanRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Erreur microphone:', event.error);
      setIsPlanRecording(false);
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setPlanTranscript(prev => prev + transcript + ' ');
        }
      }
    };

    setPlanRecognition(recognition);
    recognition.start();
  };

  return (
    <div className="container">
      <header>
        <h1>📊 Stratégie Création de Contenu</h1>
        <p className="subtitle">Juillet - Août 2026 | Production Intensive</p>
      </header>

      <nav className="tabs">
        <button className={`tab-btn ${activeTab === 'strategie' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategie')}>
          📄 Stratégie
        </button>
        <button className={`tab-btn ${activeTab === 'calendrier' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendrier')}>
          📅 Calendrier
        </button>
        <button className={`tab-btn ${activeTab === 'plan' ? 'active' : ''}`}
          onClick={() => setActiveTab('plan')}>
          📋 Plan
        </button>
        <button className={`tab-btn ${activeTab === 'reunions' ? 'active' : ''}`}
          onClick={() => setActiveTab('reunions')}>
          🤝 Réunions
        </button>
        <button className={`tab-btn ${activeTab === 'idees' ? 'active' : ''}`}
          onClick={() => setActiveTab('idees')}>
          💡 Idées
        </button>
        <button className={`tab-btn ${activeTab === 'finances' ? 'active' : ''}`}
          onClick={() => setActiveTab('finances')}>
          📊 Finance
        </button>
      </nav>

      {activeTab === 'strategie' && (
        <section className="tab-content strategie-content">
          <section className="strategie-section">
            <h2>🎯 Objectif Global</h2>
            <p>Lancer une production intensive de contenu : <strong>1 vidéo longue par jour + 3+ réels par jour</strong></p>
          </section>

          <section className="strategie-phase">
            <h2>🔴 Phase 1 : Préparation (1-5 juillet)</h2>
            <div className="phase-details">
                <p><strong>Objectif :</strong> Préparer tout le matériel, setup technique et contenu en brouillon pour démarrer la production intensive.</p>
                <ul>
                  <li>✓ Tester caméra, micro, lumières, décor</li>
                  <li>✓ Créer 20-30 idées de vidéos longues</li>
                  <li>✓ Préparer 50+ idées de réels (TikTok, Instagram, YouTube Shorts)</li>
                  <li>✓ Organiser l'espace de travail/tournage</li>
                  <li>✓ Préparer graphiques, templates, musiques</li>
                </ul>
              </div>
          </section>

          <section className="strategie-phase">
            <h2>🔵 Phase 2 : Lancement (6-20 juillet)</h2>
            <div className="phase-details">
                <p><strong>Objectif :</strong> 50% contenu SaaS (stratégie business) + 50% Personal Branding (vlogs, lifestyle).</p>
                <ul>
                  <li>📹 1 vidéo longue/jour (environ 15-30 min)</li>
                  <li>📱 3-5 réels/jour (30-60 sec)</li>
                  <li>💼 Vidéos SaaS : tutoriels, fonctionnalités, cas d'usage</li>
                  <li>👤 Contenu PB : coulisses, journée type, tips perso</li>
                  <li>📊 Analyser engagement et adapter</li>
                </ul>
              </div>
          </section>

          <section className="strategie-phase">
            <h2>🟠 Phase 3 : Branding Focus (21 juil - alentours du 21 juillet)</h2>
            <div className="phase-details">
                <p><strong>Objectif :</strong> 80% Personal Branding + 20% contenu SaaS. Finir TOUTE la préparation du trip Airbnb pour être prêt à partir.</p>
                <ul>
                  <li>👤 80% contenu branding : coulisses, lifestyle, personal touch</li>
                  <li>💼 20% contenu SaaS : stratégie et cas d'usage</li>
                  <li>🏠 Choisir l'Airbnb parfait (bon éclairage naturel, espace travail, wifi stable)</li>
                  <li>✈️ Réserver, faire liste du matériel, préparer les valises</li>
                  <li>✅ Après le 21 juillet : TOUT EST PRÉVU, plus rien à réfléchir, juste faire les valises</li>
                </ul>
              </div>
          </section>

          <section className="strategie-phase">
            <h2>🟢 Phase 4 : Production Trip Airbnb (2-3 jours max)</h2>
            <div className="phase-details">
                <p><strong>Objectif :</strong> 48-72 heures de production ULTRA intensive en Airbnb. Tourner un maximum de contenu en très peu de temps.</p>
                <ul>
                  <li>🏠 Airbnb avec bon éclairage naturel, espace de travail confortable et wifi stable</li>
                  <li>💪 Rythme : 15h de travail par jour possible grâce à l'ambiance</li>
                  <li>🎬 Production massive en 48-72h : créer du contenu premium en mode batch</li>
                  <li>👥 Collaborations avec d'autres créateurs pour dynamique + croissance mutuelle</li>
                  <li>📱 Behind the scenes du trip = engagement maximal</li>
                  <li>🚀 Résultat : stock de 1-2 mois de contenu créé en un week-end</li>
                </ul>
              </div>
          </section>
        </section>
      )}

      {activeTab === 'calendrier' && (
        <section className="tab-content calendrier-content">
          <div className="month-tabs">
            <button className={`month-btn ${activeMonth === 'juillet' ? 'active' : ''}`} onClick={() => setActiveMonth('juillet')}>
              📅 Juillet 2026
            </button>
            <button className={`month-btn ${activeMonth === 'aout' ? 'active' : ''}`} onClick={() => setActiveMonth('aout')}>
              📅 Août 2026
            </button>
          </div>
          <div className="table-container">
            <table className="calendar-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Vidéo</th>
                  <th>Statut</th>
                  <th>Titre</th>
                  <th>Miniature</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {getCalendarByMonth(activeMonth).map((row, idx) => (
                  <tr key={idx} className={`phase-${row.phase}`}>
                    <td className="date-cell">{row.day} {new Date(row.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>
                      <select value={row.video} onChange={(e) => {
                        const realIdx = calendarData.findIndex(d => d.date === row.date);
                        updateCell(realIdx, 'video', e.target.value);
                      }}>
                        <option value="">Sélectionner</option>
                        <option value="Vidéo longue">Vidéo longue</option>
                        <option value="Vidéo courte">Vidéo courte</option>
                      </select>
                    </td>
                    <td>
                      <select value={row.status} onChange={(e) => {
                        const realIdx = calendarData.findIndex(d => d.date === row.date);
                        updateCell(realIdx, 'status', e.target.value);
                      }}>
                        <option>À faire</option>
                        <option>En cours</option>
                        <option>Publié</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" value={row.title} onChange={(e) => {
                        const realIdx = calendarData.findIndex(d => d.date === row.date);
                        updateCell(realIdx, 'title', e.target.value);
                      }} placeholder="Titre..." />
                    </td>
                    <td className="miniature-cell">
                      {row.miniature && <img src={row.miniature} alt="miniature" className="thumbnail-preview" />}
                      <label className="file-upload-label">
                        📁 Importer
                        <input type="file" accept="image/*" onChange={(e) => {
                          const realIdx = calendarData.findIndex(d => d.date === row.date);
                          handleImageUpload(e, realIdx);
                        }} />
                      </label>
                    </td>
                    <td>
                      <textarea
                        value={row.notes}
                        onChange={(e) => {
                          const realIdx = calendarData.findIndex(d => d.date === row.date);
                          updateCell(realIdx, 'notes', e.target.value);
                        }}
                        placeholder="Notes..."
                        className="notes-textarea"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'plan' && (
        <section className="tab-content plan-content">
          <div className="plan-header">
            <h2>📋 Plan Juillet 2026</h2>
            <p>Planifiez votre mois jour par jour</p>
          </div>

          <div className="plan-calendar">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const dayData = planData[day] || { title: '', description: '', completed: false };
              return (
                <div
                  key={day}
                  className={`plan-day ${selectedDay === day ? 'selected' : ''} ${dayData.completed ? 'completed' : ''}`}
                  onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                >
                  <div className="day-number">{day}</div>
                  <div className="day-title">{dayData.title ? dayData.title.substring(0, 20) : '...'}</div>
                </div>
              );
            })}
          </div>

          {selectedDay && (
            <div className="plan-detail">
              <h3>📅 Juillet {selectedDay} - {planData[selectedDay]?.title || 'Sans titre'}</h3>
              <input
                type="text"
                placeholder="Titre du jour"
                value={planData[selectedDay]?.title || ''}
                onChange={(e) => updatePlan(selectedDay, { ...planData[selectedDay], title: e.target.value })}
                className="plan-input"
              />
              <textarea
                placeholder="Tâches et détails..."
                value={planData[selectedDay]?.description || ''}
                onChange={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  updatePlan(selectedDay, { ...planData[selectedDay], description: e.target.value });
                }}
                className="plan-textarea"
                style={{ minHeight: '100px', resize: 'none' }}
              />

              <div className="audio-section">
                <label>🎤 Enregistrer vocalement</label>
                <div className="audio-controls">
                  <button className={`btn-record ${isPlanRecording ? 'recording' : ''}`} onClick={startPlanRecording}>
                    {isPlanRecording ? '🔴 Enregistrement...' : '🎤 Démarrer'}
                  </button>
                </div>
                {planTranscript && (
                  <div className="transcript-box">
                    <p><strong>Transcription :</strong></p>
                    <p>{planTranscript}</p>
                    <button onClick={() => {
                      updatePlan(selectedDay, { ...planData[selectedDay], description: (planData[selectedDay]?.description || '') + '\n' + planTranscript });
                      setPlanTranscript('');
                    }}>✅ Ajouter à la description</button>
                    <button onClick={() => setPlanTranscript('')}>🗑️ Effacer</button>
                  </div>
                )}
              </div>

              <label className="plan-checkbox">
                <input
                  type="checkbox"
                  checked={planData[selectedDay]?.completed || false}
                  onChange={(e) => updatePlan(selectedDay, { ...planData[selectedDay], completed: e.target.checked })}
                />
                Journée complétée ✓
              </label>
            </div>
          )}
        </section>
      )}

      {activeTab === 'reunions' && (
        <section className="tab-content reunions-content">
          <div className="reunions-header">
            <h2>🤝 Réunions & Trips</h2>
            <p>Organisez vos rencontres, trips et moments de création intensive</p>
          </div>
          <div className="reunions-list">
            {reunions.length === 0 ? (
              <div className="empty-state">
                <p>Aucune réunion planifiée. Cliquez sur "Ajouter une réunion" pour en créer une.</p>
              </div>
            ) : (
              reunions.map((reunion, idx) => (
                <div key={idx} className="reunion-card">
                  <div className="reunion-field">
                    <label>Titre</label>
                    <input type="text" value={reunion.titre} onChange={(e) => updateReunion(idx, 'titre', e.target.value)} placeholder="Ex: Trip Airbnb Août" />
                  </div>
                  <div className="reunion-row">
                    <div className="reunion-field">
                      <label>Lieu</label>
                      <input type="text" value={reunion.lieu} onChange={(e) => updateReunion(idx, 'lieu', e.target.value)} placeholder="Paris, Marseille, etc." />
                    </div>
                    <div className="reunion-field">
                      <label>Lien Airbnb</label>
                      <input type="url" value={reunion.airbnbLink} onChange={(e) => updateReunion(idx, 'airbnbLink', e.target.value)} placeholder="https://airbnb.com/..." />
                    </div>
                  </div>
                  <div className="reunion-row">
                    <div className="reunion-field">
                      <label>Date début</label>
                      <input type="date" value={reunion.dateDebut} onChange={(e) => updateReunion(idx, 'dateDebut', e.target.value)} />
                    </div>
                    <div className="reunion-field">
                      <label>Date fin</label>
                      <input type="date" value={reunion.dateFin} onChange={(e) => updateReunion(idx, 'dateFin', e.target.value)} />
                    </div>
                    <div className="reunion-field">
                      <label>Heure arrivée</label>
                      <input type="time" value={reunion.heureArrivee} onChange={(e) => updateReunion(idx, 'heureArrivee', e.target.value)} />
                    </div>
                    <div className="reunion-field">
                      <label>Heure départ</label>
                      <input type="time" value={reunion.heureDepart} onChange={(e) => updateReunion(idx, 'heureDepart', e.target.value)} />
                    </div>
                  </div>
                  <div className="reunion-field">
                    <label>Participants</label>
                    <textarea value={reunion.participants} onChange={(e) => updateReunion(idx, 'participants', e.target.value)} placeholder="Qui va participer ?" className="notes-textarea" />
                  </div>
                  <div className="reunion-row">
                    <div className="reunion-field">
                      <label>Matériel personnel</label>
                      <textarea value={reunion.materielPersonnel} onChange={(e) => updateReunion(idx, 'materielPersonnel', e.target.value)} placeholder="Vêtements, toilettes, etc." className="notes-textarea" />
                    </div>
                    <div className="reunion-field">
                      <label>Matériel professionnel</label>
                      <textarea value={reunion.materielProfessionnel} onChange={(e) => updateReunion(idx, 'materielProfessionnel', e.target.value)} placeholder="Caméra, micro, lumières, etc." className="notes-textarea" />
                    </div>
                  </div>
                  <div className="reunion-field">
                    <label>Activités & Scénarios</label>
                    <textarea value={reunion.activites} onChange={(e) => updateReunion(idx, 'activites', e.target.value)} placeholder="Que faire ? Comment filmer ? Quels scénarios ?" className="notes-textarea" />
                  </div>
                  <div className="reunion-field">
                    <label>Notes</label>
                    <textarea value={reunion.notes} onChange={(e) => updateReunion(idx, 'notes', e.target.value)} placeholder="Autres détails..." className="notes-textarea" />
                  </div>
                  <button className="btn-delete-reunion" onClick={async () => {
                    const updated = reunions.filter((_, i) => i !== idx);
                    setReunions(updated);
                    await fetch('/api/reunions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
                  }}>🗑️ Supprimer</button>
                </div>
              ))
            )}
          </div>
          <button className="btn-add-reunion" onClick={async () => {
            const newReunion = {
              titre: 'Nouvelle réunion', lieu: '', dateDebut: '', dateFin: '', heureArrivee: '', heureDepart: '',
              airbnbLink: '', participants: '', materielPersonnel: '', materielProfessionnel: '', activites: '', notes: ''
            };
            const updated = [...reunions, newReunion];
            setReunions(updated);
            await fetch('/api/reunions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
          }}>➕ Ajouter une réunion</button>
        </section>
      )}

      {activeTab === 'idees' && (
        <section className="tab-content idees-content">
          <div className="idees-header">
            <h2>💡 Idées</h2>
            <p>Toutes les idées de contenu, vidéos, et concepts</p>
          </div>
          <div className="idees-list">
            {idees.map((idee, idx) => (
              <div key={idx} className="idee-card">
                <div className="idee-type-badge">{idee.type || 'Idée générale'}</div>
                <div className="idee-field">
                  <label>Titre</label>
                  <input type="text" value={idee.titre} onChange={(e) => updateIdee(idx, 'titre', e.target.value)} placeholder="Titre de l'idée..." />
                </div>
                <div className="idee-field">
                  <label>Description & Concept</label>
                  <textarea value={idee.description} onChange={(e) => updateIdee(idx, 'description', e.target.value)} placeholder="Explique l'idée en détail..." className="notes-textarea large-textarea" />
                </div>
                {idee.type === 'Vidéo' && (
                  <>
                    <div className="idee-row">
                      <div className="idee-field">
                        <label>Type de contenu</label>
                        <select value={idee.typeContenu || ''} onChange={(e) => updateIdee(idx, 'typeContenu', e.target.value)}>
                          <option value="">Sélectionner</option>
                          <option value="Contenu">Contenu</option>
                          <option value="Concept">Concept (à développer)</option>
                          <option value="Test">Test</option>
                        </select>
                      </div>
                      <div className="idee-field">
                        <label>Durée estimée</label>
                        <input type="text" value={idee.duree || ''} onChange={(e) => updateIdee(idx, 'duree', e.target.value)} placeholder="Ex: 15 min, 5 min..." />
                      </div>
                    </div>
                  </>
                )}
                <div className="idee-field">
                  <label>Photos & Références</label>
                  <div className="images-container">
                    {(idee.images || []).map((img, imgIdx) => (
                      <div key={imgIdx} className="image-item">
                        <img src={img} alt="référence" />
                        <button onClick={() => updateIdee(idx, 'images', idee.images.filter((_, i) => i !== imgIdx))}>✕</button>
                      </div>
                    ))}
                  </div>
                  <label className="file-upload-label">
                    📁 Ajouter une image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUploadIdee(e, idx)} />
                  </label>
                </div>
                <div className="audio-section">
                  <label>🎤 Enregistrer des notes vocales</label>
                  <div className="audio-controls">
                    <button className={`btn-record ${isRecording ? 'recording' : ''}`} onClick={startRecording}>
                      {isRecording ? '🔴 Enregistrement...' : '🎤 Démarrer'}
                    </button>
                  </div>
                  {transcript && (
                    <div className="transcript-box">
                      <p><strong>Transcription :</strong></p>
                      <p>{transcript}</p>
                      <button onClick={() => {
                        updateIdee(idx, 'notes', (idee.notes || '') + '\n' + transcript);
                        setTranscript('');
                      }}>✅ Ajouter à la description</button>
                    </div>
                  )}
                </div>
                <div className="idee-field">
                  <label>Notes</label>
                  <textarea value={idee.notes || ''} onChange={(e) => updateIdee(idx, 'notes', e.target.value)} placeholder="Notes supplémentaires..." className="notes-textarea" />
                </div>
                <button className="btn-delete-idee" onClick={async () => {
                  const updated = idees.filter((_, i) => i !== idx);
                  setIdees(updated);
                  await fetch('/api/idees', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
                }}>🗑️ Supprimer</button>
              </div>
            ))}
          </div>
          <div className="add-idee-buttons">
            <button className="btn-add-idee" onClick={async () => {
              const updated = [...idees, { titre: '', type: 'Idée générale', description: '', images: [], notes: '' }];
              setIdees(updated);
              await fetch('/api/idees', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
            }}>➕ Ajouter une idée générale</button>
            <button className="btn-add-idee btn-add-video" onClick={async () => {
              const updated = [...idees, { titre: '', type: 'Vidéo', description: '', typeContenu: '', duree: '', images: [], notes: '' }];
              setIdees(updated);
              await fetch('/api/idees', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
            }}>🎬 Ajouter une idée de vidéo</button>
          </div>
        </section>
      )}

      {activeTab === 'finances' && (
        <section className="tab-content finances-content">
          <div className="finances-header">
            <h2>📊 Finances & Matériel</h2>
            <p>Tracker tout ce qu'on doit acheter et les dépenses</p>
          </div>
          <div className="finances-summary">
            <div className="summary-card">
              <span>Total estimé :</span>
              <strong>€{finances.reduce((sum, item) => sum + (parseFloat(item.prixUnitaire || 0) * parseInt(item.quantite || 0)), 0).toFixed(2)}</strong>
            </div>
          </div>
          <div className="table-container">
            <table className="finances-table">
              <thead>
                <tr>
                  <th>Produit / Service</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Fournisseur</th>
                  <th>Lien</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {finances.map((item, idx) => (
                  <tr key={idx}>
                    <td><input type="text" value={item.produit || ''} onChange={(e) => updateFinance(idx, 'produit', e.target.value)} placeholder="Produit..." /></td>
                    <td><input type="number" value={item.quantite || ''} onChange={(e) => updateFinance(idx, 'quantite', e.target.value)} placeholder="Qté" /></td>
                    <td><input type="number" value={item.prixUnitaire || ''} onChange={(e) => updateFinance(idx, 'prixUnitaire', e.target.value)} placeholder="€" /></td>
                    <td className="total-cell">€{(parseFloat(item.prixUnitaire || 0) * parseInt(item.quantite || 0)).toFixed(2)}</td>
                    <td>
                      <select value={item.statut || 'À commander'} onChange={(e) => updateFinance(idx, 'statut', e.target.value)}>
                        <option>À commander</option>
                        <option>Commandé</option>
                        <option>Reçu</option>
                      </select>
                    </td>
                    <td><input type="text" value={item.fournisseur || ''} onChange={(e) => updateFinance(idx, 'fournisseur', e.target.value)} placeholder="Fournisseur..." /></td>
                    <td><input type="url" value={item.lien || ''} onChange={(e) => updateFinance(idx, 'lien', e.target.value)} placeholder="https://..." /></td>
                    <td><textarea value={item.notes || ''} onChange={(e) => updateFinance(idx, 'notes', e.target.value)} placeholder="Notes..." className="notes-textarea" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-add-finance" onClick={async () => {
            const updated = [...finances, { produit: '', quantite: '', prixUnitaire: '', statut: 'À commander', fournisseur: '', lien: '', notes: '' }];
            setFinances(updated);
            await fetch('/api/finances', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
          }}>➕ Ajouter un article</button>
        </section>
      )}
    </div>
  );
}
