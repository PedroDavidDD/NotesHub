import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleEffectProps {
  color: string;
}

export function ParticleEffect({ color }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const containerSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const createParticle = (canvas: HTMLCanvasElement): Particle => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 20,
    size: Math.random() * 2 + 1,
    speedY: -(Math.random() * 2 + 1),
    opacity: Math.random() * 0.5 + 0.2,
    color,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // Guardar el tamaño actual del contenedor
      containerSize.current = { width: canvas.width, height: canvas.height };

      // Reiniciar las partículas para adaptarse al nuevo tamaño
      particles.current = [];
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      // Verificar si el tamaño del contenedor cambió
      const parent = canvas.parentElement;
      if (parent && (parent.clientWidth !== containerSize.current.width || parent.clientHeight !== containerSize.current.height)) {
        resizeCanvas();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Agregar nuevas partículas
      if (particles.current.length < 50) {
        particles.current.push(createParticle(canvas));
      }

      // Actualizar y dibujar partículas
      particles.current = particles.current.filter(particle => {
        particle.y += particle.speedY;
        particle.opacity -= 0.003;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        return particle.y > 0 && particle.opacity > 0;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
