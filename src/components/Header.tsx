import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import HeaderHome from '../css/css_components/header.module.css'

// Imagenes
import imgSlider1 from '../assets/slider_1.jpg'
import imgSlider2 from '../assets/slider_2.jpg'
import imgSlider3 from '../assets/slider_3.jpg'

const SLIDE_DATA = [
    {
        id: 1,
        text: 'El talento urbano también tiene su espacio para progresar.',
        image: imgSlider1
    },
    {
        id: 2,
        text: 'Crea sin límites tecnológicos, sin suscripciones, sin licencias.',
        image: imgSlider2
    },
    {
        id: 3,
        text: 'El poder ahora está al alcance de tus manos.',
        image: imgSlider3
    }
];

// Estructura interna para controlar las partículas del lápiz
interface Point {
    x: number;
    y: number;
    age: number;
}

const Header: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pointsRef = useRef<Point[]>([]);

    // 1. Efecto para el cambio automático del slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDE_DATA.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // 2. Efecto interactivo para el Canvas de Dibujo
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ajustar resolución del lienzo
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let animationFrameId: number;

        // Bucle de renderizado para desvanecer los trazos
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let points = pointsRef.current;

            for (let i = 0; i < points.length; i++) {
                const pt = points[i];
                pt.age += 1; // Incrementa el tiempo de vida del trazo

                const maxAge = 35; // Cuántos frames dura el trazo antes de morir
                const opacity = 1 - pt.age / maxAge;
                const radius = 8 * opacity; // Se vuelve más delgado al final

                if (opacity <= 0) {
                    points.splice(i, 1);
                    i--;
                    continue;
                }

                // Dibujar la partícula aquamarina con brillo cyberpunk
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 241, 193, ${opacity})`; // var(--neon-cyan)
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(102, 241, 193, 0.8)';
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };
        
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Manejador del movimiento del mouse
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        // Guardamos la posición exacta relativa al slider
        pointsRef.current.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            age: 0
        });
    };

    return (
        <header 
            className={HeaderHome.heroContainer}
            onMouseMove={handleMouseMove}
        >
            {/* 🎨 LIENZO INTERACTIVO SOBREPUESTO */}
            <canvas ref={canvasRef} className={HeaderHome.drawingCanvas} />
        
            {/* PANTALLA IZQUIERDA: Textos Dinámicos */}
            <div className={HeaderHome.leftScreen}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <span className={HeaderHome.systemTag}>
                            
                        </span>

                        <h1 className={HeaderHome.headline}>
                            {(() => {
                                const currentText = SLIDE_DATA[currentSlide].text;
                                const words = currentText.split(' ');

                                if (words.length < 2) {
                                    return <span className={HeaderHome.highlightText}>{currentText}</span>;
                                }

                                const firstWord = words[0];
                                const lastWord = words[words.length - 1];
                                const middleText = words.slice(1, -1).join(' ');

                                return (
                                    <>
                                        <span className={HeaderHome.highlightText}>{firstWord} </span>
                                        {middleText}{' '}
                                        <span className={HeaderHome.highlightText2}>{lastWord}</span>
                                    </>
                                );
                            })()}
                        </h1>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* PANTALLA DERECHA: Imagen del Software + Máscara Difuminadora */}
            <div className={HeaderHome.rightScreen}>
                <div className={HeaderHome.blendMask} />
                
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={SLIDE_DATA[currentSlide].image}
                        alt="AniMotion Software Preview"
                        className={HeaderHome.softwareImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                    />
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;