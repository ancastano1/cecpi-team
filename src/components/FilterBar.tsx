import { useRef, useEffect, useCallback } from 'react';
import { divisions, type DivisionSlug } from '@/data/teamData';

interface FilterBarProps {
  activeFilter: DivisionSlug;
  onFilterChange: (slug: DivisionSlug) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setPillRef = useCallback((slug: string, el: HTMLButtonElement | null) => {
    if (el) {
      pillRefs.current.set(slug, el);
    } else {
      pillRefs.current.delete(slug);
    }
  }, []);

  const updateIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const activePill = pillRefs.current.get(activeFilter);
    const container = pillsRef.current;
    if (!indicator || !activePill || !container) return;

    const containerRect = container.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();

    const x = pillRect.left - containerRect.left;
    const y = pillRect.top - containerRect.top;

    indicator.style.transform = `translate(${x}px, ${y}px)`;
    indicator.style.width = `${pillRect.width}px`;
    indicator.style.height = `${pillRect.height}px`;
  }, [activeFilter]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div
      ref={pillsRef}
      className="relative flex flex-wrap gap-2 mt-12"
      role="tablist"
      aria-label="Filtrar por dependencia"
    >
      {/* Sliding indicator */}
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none"
        style={{
          backgroundColor: 'var(--color-primary)',
          zIndex: 0,
        }}
      />

      {divisions.map((div) => (
        <button
          key={div.slug}
          ref={(el) => setPillRef(div.slug, el)}
          onClick={() => onFilterChange(div.slug)}
          role="tab"
          aria-selected={activeFilter === div.slug}
          className={`
            relative z-10 px-5 py-2.5 rounded-full border text-[13px] font-medium
            transition-colors duration-200 whitespace-nowrap
            ${
              activeFilter === div.slug
                ? 'border-transparent text-white'
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-hover)]'
            }
          `}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {div.label}
        </button>
      ))}
    </div>
  );
}
