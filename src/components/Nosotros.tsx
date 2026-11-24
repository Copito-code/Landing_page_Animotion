import React from 'react';
import NosotrosHome from '../css/css_components/nosotros.module.css';
import { FaLinkedin } from 'react-icons/fa';


import miguelAvatar from '../assets/avatar_1.jfif'; // Asegúrate de que la ruta sea correcta


const Nosotros: React.FC = () => {
  return (
    <section id='nosotros' className={NosotrosHome.container}>
      
      {/* PARTE A: EL MANIFIESTO LIBRE Y ARTÍSTICO */}
      <div className={NosotrosHome.manifestoSection}>
        <h2 className={NosotrosHome.mainTitle}>// NOSOTROS</h2>
        <p className={NosotrosHome.textBlock}>
          <strong>Animotion Graphic Studio</strong> es un software independiente y gratuito que busca 
           darle la oportunidad a los artistas de poder crear sin licencias, sin pagos mensuales y sin preocuparse por el rendimiento de su PC. Animotion ofrece al artista la posibilidad de animar, dibujar y editar videos en un solo sistema, siendo una alternativa ligera y accesible para todo aquel que desee crear. 
        </p> 

        <div className={NosotrosHome.subGrid}>
          <div className={NosotrosHome.artCard}>
            <h3 className={NosotrosHome.subCardTitle}>// MISIÓN</h3>
            <p className={NosotrosHome.cardText}>
              Animotion ofrece aquella comunidad creativa y apasionada la oportunidad de adquirir un software ligero y accesible, sin pagar licencias costosas ni suscripciones mensuales, y con la capacidad suficiente para estar a la altura de las mentes creativas de sus usuarios. Fusionamos la animación, dibujo digital  y edicion de videos en un solo espacio interactivo. 
            </p>
          </div>

          <div className={NosotrosHome.artCard}>
            <h3 className={NosotrosHome.subCardTitle}>// VISIÓN</h3>
            <p className={NosotrosHome.cardText}>
              Pretendemos ser un software que pueda posicionarse con los mejores programas de la industria de la animación y ser versátil en todos sus aspectos, manteniendonos firmes nuestros pilares fundamentales: accesibilidad absoluta, potencia tecnológica y versatilidad.
            </p>
          </div>
        </div>

        <div className={NosotrosHome.objectivesContainer}>
          <h3 className={NosotrosHome.subCardTitle} style={{ color: 'var(--neon-cyan)' }}>// OBJETIVOS DEL SISTEMA</h3>
          <ul className={NosotrosHome.objectivesList}>
            <li>
              Lograr que el software sea accesible para cualquiera, sin importar la capacidad del computador.      </li>
            <li>
              Impulsar la creatividad de los usuarios menos afortunados para que todos tengan la oportunidad de adquirir una herramienta de desarrollo artístico de alta calidad.
            </li>
            <li>
              Convertirnos en uno de los softwares más utilizados y posicionarnos entre los grandes de la industria, consiguiendo así alzar la voz para los proyectos independientes, demostrando que no todo gran proyecto tiene que venir de un gran estudio.
            </li>
          </ul>
        </div>
      </div>

      {/* PARTE B: LOS DESARROLLADORES (EQUIPO) - SE MANTIENE INTACTO TU DISEÑO VERTICAL */}
      <div id='equipo' className={NosotrosHome.teamSection}>
        <h2 className={NosotrosHome.mainTitle} style={{ color: 'var(--neon-cyan)' }}>
          // EQUIPO DE DESARROLLO
        </h2>
        
        <div className={NosotrosHome.teamGrid}>
          {/* PROGRAMADOR 1: MIGUEL */}
          <div className={NosotrosHome.devCard}>
            <div className={NosotrosHome.avatarWrapper}>
              <img 
                src={miguelAvatar} 
                alt="Miguel Arquinzones" 
                className={NosotrosHome.avatar}
              />
            </div>
            <div className={NosotrosHome.devInfo}>
              <h3 className={NosotrosHome.devName}>Miguel Arquinzones</h3>
              <p className={NosotrosHome.devRole}>PROGRAMADOR FULL-STACK / ARCHITECT</p>
              <div className={NosotrosHome.devSocials}>
                <a 
                  href="https://www.linkedin.com/in/miguel-arquinzones-a9a36a342/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={NosotrosHome.socialIcon}
                  title="Conectar en LinkedIn"
                >
                  <FaLinkedin />Developer Full Stack</a>
              </div>
              <p className={NosotrosHome.devBio}>
                Especialista en backend, APIs y diseño UX para interfaces de usuario. 
                Cuenta con amplio conocimiento en lenguajes de bajo nivel como C++ y Java, asegurando 
                la optimización del núcleo del sistema.
              </p>
            </div>
          </div>

          {/* PROGRAMADOR 2: GIOVANNA */}
          <div className={NosotrosHome.devCard}>
            <div className={NosotrosHome.avatarWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" 
                alt="Giovanna Nadales" 
                className={NosotrosHome.avatar}
              />
            </div>
            <div className={NosotrosHome.devInfo}>
              <h3 className={NosotrosHome.devName}>Giovanna Nadales</h3>
              <p className={NosotrosHome.devRole}>DESARROLLADOR FULL-STACK / 3D CREATIVE</p>

              <div className={NosotrosHome.devSocials}>
                <a 
                  href="https://www.linkedin.com/in/giovanna-nadales-a94607342/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={NosotrosHome.socialIcon}
                  title="Conectar en LinkedIn"
                >
                  <FaLinkedin />Frontend developer and Database</a>

                <a 
                href="https://www.linkedin.com/in/giovanna-veronica-nadales-mora-28065322b/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={NosotrosHome.socialIcon}
                title="Conectar en LinkedIn"
                >
                <FaLinkedin />3D character modeler</a>
              </div>


              <p className={NosotrosHome.devBio}>
                Inclinada al desarrollo de arquitecturas de servidor, bases de datos eficientes y diseño 
                creativo asistido por elementos tridimensionales para interfaces atractivas, modernas e inmersivas.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Nosotros;