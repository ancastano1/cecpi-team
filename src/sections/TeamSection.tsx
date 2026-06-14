import { useState, useCallback, useMemo } from 'react';
import SectionHeading from '@/components/SectionHeading';
import FilterBar from '@/components/FilterBar';
import TeamCard from '@/components/TeamCard';
import { teamMembers, type DivisionSlug } from '@/data/teamData';

export default function TeamSection() {
  const [activeFilter, setActiveFilter] = useState<DivisionSlug>('todos');

  const handleFilterChange = useCallback((slug: DivisionSlug) => {
    setActiveFilter(slug);
  }, []);

  const visibleMembers = useMemo(() => {
    if (activeFilter === 'todos') return teamMembers;
    return teamMembers.filter((m) => m.divisionSlug === activeFilter);
  }, [activeFilter]);

  return (
    <section
      className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Equipo de Trabajo"
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(45,138,58,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10">
        <SectionHeading />

        {/* Filters */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>

        {/* Team Grid — uniform cards */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 mt-12 md:mt-16">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="tabpanel"
            aria-label="Miembros del equipo"
          >
            {visibleMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 mt-16 md:mt-24">
          <div
            className="h-px w-full"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <p
            className="text-center text-xs mt-6"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
            }}
          >
            CENTRO DE EDUCACIÓN CONTINUA Y PERMANENTE — UNIVERSIDAD NACIONAL DE COLOMBIA
          </p>
        </div>
      </div>
    </section>
  );
}
