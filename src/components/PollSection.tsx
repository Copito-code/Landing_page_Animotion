import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; 
import styles from '../css/css_components/poll.module.css'; // Asegúrate de apuntar al nuevo CSS

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/poll`;

interface PollOption {
  id: string;
  label: string;
  tag: string;
  votes: number;
}

const PollSection: React.FC = () => {
  // Opciones iniciales con votos base simulados para dar sensación de comunidad activa
  const [options, setOptions] = useState<PollOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });

 // Cargar votos reales desde SQLite y revisar si el navegador ya votó
  useEffect(() => {
    const savedVote = localStorage.getItem('animotion_user_vote');
    if (savedVote) {
      setSelectedOptionId(savedVote);
      setHasVoted(true);
    }

    fetch(API_URL)
      .then((res) => res.json())
      .then((data: PollOption[]) => setOptions(data))
      .catch((err) => console.error('Error conectando con SQLite:', err));
  }, []);

  const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);

  const handleVote = async (id: string) => {
    if (hasVoted) return;

    try {
      const response = await fetch(`${API_URL}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: id }),
      });

      if (!response.ok) throw new Error('Error al registrar voto');

      const updatedOptions: PollOption[] = await response.json();
      setOptions(updatedOptions);
      setSelectedOptionId(id);
      setHasVoted(true);
      localStorage.setItem('animotion_user_vote', id);
    } catch (err) {
      alert('// ERROR: Verifica que el servidor (node server.js) esté corriendo.');
    }
  };

  return (
    <section id="votacion" ref={ref} className={styles.pollSection}>
      <div className={styles.layoutContainer}>
        
        {/* 📑 COLUMNA IZQUIERDA: MANIFIESTO Y PANEL DE VOTACIÓN */}
        <div className={styles.contentColumn}>
          
          <motion.div 
            className={styles.manifestoContainer}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.systemTag}>// FEEDBACK DE COMUNIDAD</span>
            <h2 className={styles.manifestoTitle}>¿Qué opinas de este proyecto?</h2>
            <p className={styles.manifestoText}>
              Animotion evoluciona con la visión de quienes lo prueban. Tu diagnóstico directo nos ayuda a calibrar el motor y definir las próximas actualizaciones de la plataforma.
              <br /><br />
              <strong>Selecciona una frecuencia</strong> para registrar tu evaluación en el núcleo del sistema.
            </p>
          </motion.div>

          {/* 📊 PANEL INTERACTIVO DE VOTACIÓN */}
          <motion.div 
            className={styles.controlPanel}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>[ ¿Cómo artista la usarias? ]</span>
              <span className={styles.panelStatus}>
                {hasVoted ? '● VOTO REGISTRADO' : '● SELECCIONA UNA OPCIÓN'}
              </span>
            </div>

            {/* LISTA DE 3 OPCIONES */}
            <div className={styles.optionsList}>
              {options.map((option) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                const isSelected = selectedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    disabled={hasVoted}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''} ${hasVoted ? styles.optionLocked : ''}`}
                  >
                    {/* Barra de porcentaje animada en el fondo (solo visible al votar) */}
                    {hasVoted && (
                      <motion.div
                        className={styles.resultBarFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    )}

                    <div className={styles.optionContent}>
                      <div className={styles.optionTextGroup}>
                        <span className={styles.optionTag}>{option.tag}</span>
                        <span className={styles.optionLabel}>{option.label}</span>
                      </div>

                      {hasVoted && (
                        <span className={styles.optionPercentage}>{percentage}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* PIE DEL PANEL CON MÉTRICAS */}
            <div className={styles.panelFooter}>
              <span>[ TOTAL DE VOTOS: {totalVotes} ]</span>
              <span>{hasVoted ? 'GRACIAS POR TU APORTE' : ''}</span>
            </div>
          </motion.div>

        </div>

        {/* 👁️ COLUMNA DERECHA: ANIMACIÓN INTERACTIVA SPLINE INTACTA */}
        <div className={styles.splineColumn}>
          <Suspense fallback={
            <div className={styles.splineLoader}>
              <span className={styles.loaderText}>// INICIALIZANDO INTERFAZ 3D...</span>
            </div>
          }>
            <div className={inView ? styles.splineActive : styles.splinePassive}>
              <Spline scene="https://prod.spline.design/NB-1ejJVTMQEcahh/scene.splinecode" />
            </div>
          </Suspense>
        </div>

      </div>
    </section>
  );
};

export default PollSection;