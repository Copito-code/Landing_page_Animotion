import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Añadimos AnimatePresence
import { useInView } from 'react-intersection-observer'; 
import styles from '../css/css_components/donations.module.css';
import PaymentModal from './PaymentModal'; // 1. Importamos tu nuevo modal separado

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Donations: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<string>('');

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  
  // Detecta si el usuario está en la sección de donaciones
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.01, // Se activa inmediatamente al rozar la sección
  });

  // Datos simulados de la meta de la comunidad
  const currentFunded = 720; 
  const monthlyGoal = 1000;   
  const progressPercentage = Math.min((currentFunded / monthlyGoal) * 100, 100);

  // Funcio para validar que pongan un monto real antes de abrir el modal
  const handleOpenPayment = () =>{
    if(!donationAmount || parseFloat(donationAmount) <= 0) {
      alert("Por favor, ingresa un monto valido de Luz.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section id='donar' ref={ref} className={styles.donationsSection}>
      <div className={styles.layoutContainer}>
        
        {/* 📑 COLUMNA IZQUIERDA: CONTENIDO Y PANEL */}
        <div className={styles.contentColumn}>
          
          {/* 📜 MANIFIESTO EMOCIONAL */}
          <motion.div 
            className={styles.manifestoContainer}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.systemTag}>// AYUDANOS CON TU LUZ</span>
            <h2 className={styles.manifestoTitle}>Creado por talento local, Sostenido por la comunidad</h2>
            <p className={styles.manifestoText}>
              AniMotion no tiene muros de pago, ni grandes corporaciones detrás. Nació para ofrecerle a los usuarios, herramientas de nivel profesional sin la presión de suscripciones, anuncios molestos, ni licencias. 
              Cada servidor de descarga, actualización de código y optimización del motor se mantiene vivo gracias a la <strong>Luz</strong> de creadores como tú. 
              <br /><br />
              <strong>Aporta lo que consideres justo.</strong> Protege un espacio donde el talento urbano pueda progresar y siga siendo gratis para todos.
            </p>
          </motion.div>

          {/* 📊 PANEL DE CONTROL DE DONACIÓN ÚNICA */}
          <motion.div 
            className={styles.controlPanel}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>[ ESTACION_DE_DONACIONES ]</span>
              <span className={styles.panelStatus}>● SEGURIDAD GARANTIZADA</span>
            </div>

            <div className={styles.interactionArea}>
              <div className={styles.inputWrapper}>
                <span className={styles.currencySymbol}>$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className={styles.donationInput}
                  min="1"
                />
                <span className={styles.currencyCode}>USD</span>
              </div>

              {/* 4. Conectamos tu botón a la función que abre el modal */}
              <button className={styles.donateButton} onClick={handleOpenPayment}>
                APORTA TU LUZ
              </button>
            </div>

            {/* 🎚️ BARRA DE PROGRESO */}
            <div className={styles.progressContainer}>
              <div className={styles.progressMetrics}>
                <span className={styles.metricLabel}>// SUBSISTENCE_POOL:</span>
                <span className={styles.metricValue}>
                  ${currentFunded} <span className={styles.metricGoal}>/ ${monthlyGoal} USD ({progressPercentage.toFixed(0)}%)</span>
                </span>
              </div>
              
              <div className={styles.progressBarTrack}>
                <motion.div 
                  className={styles.progressBarFill}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className={styles.progressFooter}>
                <span>[ SYSTEM_STATUS: OPERATIONAL ]</span>
                <span>META_MENSUAL_DE_SERVIDORES</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 👁️ COLUMNA DERECHA */}
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

      {/* 5. Inyectamos el componente del modal con soporte de salida animada */}
      <AnimatePresence>
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setDonationAmount(''); // Limpia el input al cerrar con éxito
          }} 
          amount={donationAmount} 
        />
      </AnimatePresence>

    </section>
  );
};

export default Donations;