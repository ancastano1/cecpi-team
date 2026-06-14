import { useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { useCardTilt } from '@/hooks/useCardTilt';
import type { TeamMember } from '@/data/teamData';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { cardRef: tiltRef, handleMouseMove, handleMouseLeave, handleTouchStart } = useCardTilt();

  const setRefs = (el: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    const delay = index * 60;
    const timer = setTimeout(() => {
      card.style.transition = 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <article
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className="
        relative overflow-hidden rounded-2xl
        bg-[var(--color-surface)] border border-[var(--color-border)]
        transition-all duration-300 ease-out
        hover:border-[var(--color-border-hover)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        hover:translate-y-[-2px]
        group
      "
      style={{ willChange: 'transform, opacity' }}
      data-division={member.divisionSlug}
    >
      {/* Top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: member.accentColor }}
      />

      {/* Uniform card layout */}
      <div className="flex flex-col h-full">
        {/* Photo */}
        <div className="overflow-hidden relative aspect-[4/3]">
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <p
            className="text-[10px] uppercase tracking-[0.15em] mb-2 font-medium"
            style={{ fontFamily: 'var(--font-mono)', color: member.accentColor }}
          >
            {member.division}
          </p>
          <h3
            className="text-base font-semibold leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {member.name}
          </h3>
          <p
            className="text-sm mt-1.5"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            {member.role}
          </p>
          <div className="mt-auto pt-4">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 group/email"
              aria-label={`Enviar correo a ${member.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="text-xs transition-colors duration-200 group-hover/email:text-[var(--color-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
              >
                {member.email}
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
