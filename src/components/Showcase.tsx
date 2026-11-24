import React, {useState} from 'react';
import ShowcaseHome from '../css/css_components/showcase.module.css';

interface VideoItem{
    id: string;
    title: string;
}

const Showcase: React.FC = () =>{
    // Guardamos los 5 videos en un estado estructurado
    const [videoList, setVideoList] = useState<VideoItem[]>([

        {id: "CrbR7JmM-L8", title: "// VIDEO_PRINCIPAL_DEMO"},
        {id: "qr-2QEASD_s", title: "// MOTOR_DE_TRAZOS"},
        {id: "V8HbEVMhDnE", title: "// TIEMPO_REAL_FPS"},
        {id: "tWc4BrOxJeM", title: "// CAPAS_VECTORIALES"},
        {id: "sCKYny6ALpY", title: "// RENDER_EX_PRIME"},

    ]);

    //El primer elemento del arreglo siempre sera el que se proyecta en grande
    const mainVideo = videoList[0];

    //Los elementos restantes (del indice 1 al 4) van a la rejilla inferior
    const secondaryVideos = videoList.slice(1);


    //Fucion para intercambiar en video seleccionado con el principal
    const handleVideoSwap = (selectedIndex: number) => {
        //creamos una copia del estado actual 
        const updateList = [...videoList];

        //EL indice real en el arrego completo es selecteIndex +  1 (porque omitimos el primero en el slice)
        const realIndex = selectedIndex + 1;

        //Guardamos temporalmene el video pricipal actual
        const currentMain = updateList[0];

        //Hacemos el intercambio de posiciones (Swap)
        updateList[0] = updateList[realIndex];
        updateList[realIndex] = currentMain;

        // Actualizamos el estdo para relanzar los iframes con los nuevos links
        setVideoList(updateList)

    };

    //Funcion auxiliar para construir el enlace en modo loop/Autoplay/mute
    const getYoutubeEmbedUrl = (id:string) =>{
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0`;
    };

    return(
        <section id='galeria' className={ShowcaseHome.showcaseContainer}>
            <h2 className={ShowcaseHome.sectionTitle}>// MUESTRAS DE ANIMOTION</h2>
            
            {/* 📱 LA TABLETA GRÁFICA PRINCIPAL (HORIZONTAL) */}
            <div className={ShowcaseHome.tabletWrapper}>
                <div className={ShowcaseHome.tabletHeader}>
                <span className={ShowcaseHome.tabletTitle}>[ MODEL: ANIMOTION_MOVIE_X ]</span>
                <span className={ShowcaseHome.tabletTitle} style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                    ● PROYECTANDO: {mainVideo.title.replace('// ', '')}
                </span>
                </div>
                
                <div className={ShowcaseHome.videoResponsive}>
                <iframe
                    key={mainVideo.id} // El atributo key fuerza el refresco del iframe al cambiar de ID
                    src={getYoutubeEmbedUrl(mainVideo.id)}
                    title="AniMotion Main Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                </div>
            </div>

            {/* 🎛️ REJILLA INFERIOR CON LOS OTROS 4 VIDEOS MÁS PEQUEÑOS */}
            <div className={ShowcaseHome.thumbnailsGrid}>
                {secondaryVideos.map((video, index) => (
                <div 
                    key={video.id} 
                    className={ShowcaseHome.subCard}
                    onClick={() => handleVideoSwap(index)} // Al hacer clic se ejecuta el intercambio
                    style={{ cursor: 'pointer' }} // Hace que el mouse cambie a manito indicando interacción
                >
                    <div className={ShowcaseHome.videoResponsive} style={{ pointerEvents: 'none' }}>
                    {/* pointerEvents: none evita que los clics se "pierdan" dentro del iframe de YouTube */}
                    <iframe
                        src={getYoutubeEmbedUrl(video.id)}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                    />
                    </div>
                    <h3 className={ShowcaseHome.subCardTitle}>{video.title}</h3>
                </div>
                ))}
            </div>
        </section>
  );
};

export default Showcase;