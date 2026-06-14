import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SectionHeading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!container || !eyebrow || !title || !subtitle) return;

    // Set initial states
    gsap.set(eyebrow, { opacity: 0 });
    gsap.set(title, { opacity: 0 });
    gsap.set(subtitle, { opacity: 0 });

    // Split title into character spans
    const titleText = title.textContent || '';
    title.innerHTML = '';
    const chars: HTMLSpanElement[] = [];
    for (let i = 0; i < titleText.length; i++) {
      const span = document.createElement('span');
      span.textContent = titleText[i] === ' ' ? '\u00A0' : titleText[i];
      span.style.display = 'inline-block';
      span.style.clipPath = 'inset(0 100% 0 0)';
      span.style.opacity = '1';
      title.appendChild(span);
      chars.push(span);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const tl = gsap.timeline({ delay: 0.3 });

          // Eyebrow fades in
          tl.to(eyebrow, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Title characters reveal
          tl.to(
            chars,
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.6,
              stagger: 0.02,
              ease: 'power3.out',
            },
            '-=0.1'
          );

          // Title container opacity
          tl.to(
            title,
            {
              opacity: 1,
              duration: 0.1,
            },
            '<'
          );

          // Subtitle fades in
          tl.to(
            subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.2'
          );

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto px-6 md:px-8">
      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        className="text-[11px] uppercase tracking-[0.2em] mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
        }}
      >
        Centro de Educación Continua
      </p>

      {/* Title */}
      <h2
        ref={titleRef}
        className="font-extrabold leading-[1.05]"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-primary)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        }}
      >
        Equipo de Trabajo
      </h2>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-lg mt-4 max-w-[560px] translate-y-2"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-secondary)',
        }}
      >
        12 personas, 4 dependencias, un solo propósito: transformar vidas a través de la educación.
      </p>
    </div>
  );
}
