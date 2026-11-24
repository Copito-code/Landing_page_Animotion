import React from 'react';
import FooterHome from '../css/css_components/footer.module.css';
import { FaTiktok } from 'react-icons/fa';

import logoAnimotion from '../assets/icon_animotion.png'; // Asegúrate de que la ruta sea correcta


const Footer: React.FC = () => {
  return (
    <footer className={FooterHome.footer}>
      <div className={FooterHome.footerContainer}>
        
        {/* --- COLUMNA 1: IDENTIDAD --- */}
        <div className={FooterHome.brandSection}>
          <div className={FooterHome.logoWrapper}>
            <img src={logoAnimotion} alt="Animotion Logo" className={FooterHome.logo} />
            <span className={FooterHome.brandName}>ANIMOTION</span>
          </div>
          <p className={FooterHome.brandTagline}>
            Potenciando el talento urbano mediante herramientas digitales de acceso gratuito.
          </p>
          <div className={FooterHome.systemStatus}>
            <span className={FooterHome.statusDot}></span>
            <span className={FooterHome.statusText}>EN DESARROLLO</span>
          </div>
        </div>

        {/* --- COLUMNA 2: NAVEGACIÓN (Usa secciones reales de tu Landing) --- */}
        <div className={FooterHome.linkColumn}>
          <h4 className={FooterHome.columnTitle}>// NAVEGACIÓN</h4>
          <ul className={FooterHome.linkList}>
            <li><a href="#nosotros">Sobre el Motor</a></li>
            <li><a href="#equipo">Equipo a cargo</a></li>
            <li><a href="#votacion">Votación</a></li>
          </ul>
        </div>

        {/* --- COLUMNA 3: SISTEMA Y CRÉDITOS (Limpia y con identidad local) --- */}
        <div className={FooterHome.linkColumn}>
          <h4 className={FooterHome.columnTitle}>// ORIGEN</h4>
          <ul className={FooterHome.linkList}>
            <li>
              <span style={{ color: '#a0a0aa', fontSize: '0.9rem', display: 'block', marginBottom: '0.2rem' }}>
                Desarrollado en:
              </span>
              <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Caracas, Venezuela 🇻🇪
              </span>
            </li>
          </ul>
        </div>

        {/* --- COLUMNA 4: REDES SOCIALES (Solo tus redes reales) --- */}
        <div className={FooterHome.socialColumn}>
          <h4 className={FooterHome.columnTitle}>// REDES</h4>
          <div className={FooterHome.socialIcons}>

            {/* <a href="TU_ENLACE_A_YOUTUBE" target="_blank" rel="noopener noreferrer" className={FooterHome.socialIcon}>
              <FaYoutube />
            </a> */}


            <a href="TU_ENLACE_A_TIKTOK" target="_blank" rel="noopener noreferrer" className={FooterHome.socialIcon}>
              {/* Nota: Si no tienes el icono de TikTok importado, puedes usar FaTiktok de react-icons/fa */}
              <FaTiktok /> 
            </a>
          </div>
        </div>

      </div>


      {/* --- BARRA INFERIOR FINAL --- */}
      <div className={FooterHome.footerBottom}>
        <div className={FooterHome.copyright}>
          © {new Date().getFullYear()} ANIMOTION GRAPHIC STUDIO. A FAVOR DE LA COMUNIDA.
        </div>
      </div>
    </footer>
  );
};

export default Footer;