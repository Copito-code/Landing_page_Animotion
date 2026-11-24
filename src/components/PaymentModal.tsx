import React from 'react';
import {motion} from 'framer-motion';
import styles from '../css/css_components/donations.module.css'
import { FaRegCopy } from 'react-icons/fa';   //  Añadimos este import

import qrBinance from '../assets/binancepay.png'

interface PaymentModalProps{
    isOpen: boolean;
    onClose: () => void;
    amount: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({isOpen, onClose, amount}) =>{

    if(!isOpen) return null;

    //Funcion rapida para copiar exto al portapapeles de forma automatizada
    const handleCopy = (text: string, message: string) => {
        navigator.clipboard.writeText(text);
        alert(`// COPIADO: ${message}`);
    };

    return(
       <motion.div 
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.modalContent}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Cabecera del Modal */}
        <div className={styles.modalHeader}>
          <h3>// AYUDANOS A CRECER</h3>
          <button className={styles.closeModalBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalInstructions}>
            Escanea el código QR desde tu app de Binance o copia los datos de texto inferiores para transferir exactamente: <strong>${parseFloat(amount).toFixed(2)} USDT</strong>.
          </p>

          {/* Área del Código QR */}
          <div className={styles.qrContainer}>
            {/* ⚡ CAMBIAMOS LA RUTA FIJA POR LA VARIABLE IMPORTADA */}
            <img 
              src={qrBinance} 
              alt="Código QR de Binance Pay Personal" 
              className={styles.qrImage}
            />
            <div className={styles.qrOverlayText}>[ TRANSMISIÓN_DIRECTA_P2P ]</div>
          </div>

          {/* Datos de Texto con función de Copiado al hacer Clic */}
          <div className={styles.userDataGrid}>
            <div className={styles.dataRow} onClick={() => handleCopy("TU_PAY_ID_REAL", "Pay ID copiado al portapapeles")}>
              <span className={styles.dataLabel}>// BINANCE_PAY_ID (Clic para copiar):</span>
              <span className={styles.dataValue}>716868392 <FaRegCopy className={styles.copyIcon}/></span>
            </div>
            
            <div className={styles.dataRow} onClick={() => handleCopy("tu-correo@gmail.com", "Correo copiado al portapapeles")}>
              <span className={styles.dataLabel}>// CORREO_BINANCE (Clic para copiar):</span>
              <span className={styles.dataValue}>giovannanadalesmora@gmail.com <FaRegCopy className={styles.copyIcon}/></span>
            </div>
          </div>

          {/* Botón de Confirmación de Cierre */}
          <div className={styles.modalFooter}>
            <button className={styles.modalConfirmBtn} onClick={onClose}>
                HE CONTRIBUIDO
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;