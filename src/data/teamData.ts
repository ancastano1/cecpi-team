export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  divisionSlug: string;
  email: string;
  photo: string;
  accentColor: string;
}

export const divisions = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'equipo-cecp', label: 'Equipo CECP' },
  { slug: 'gestores', label: 'Gestores' },
  { slug: 'mercadeo-comunicaciones', label: 'Mercadeo y Comunicaciones' },
  { slug: 'telemercadeo', label: 'Telemercadeo' },
] as const;

export type DivisionSlug = typeof divisions[number]['slug'];

export const teamMembers: TeamMember[] = [
  // — Equipo CECP —
  {
    id: 'elizabeth',
    name: 'Elizabeth Pabón Gelves',
    role: 'Directora de Investigación y Extensión',
    division: 'Equipo CECP',
    divisionSlug: 'equipo-cecp',
    email: 'dirinvext_med@unal.edu.co',
    photo: '/team-photos/elizabeth_pabon.jpg',
    accentColor: 'var(--color-equipo-cecp)',
  },
  {
    id: 'andres',
    name: 'Christian Camilo Arango Osorio',
    role: 'Coordinador Centro de Educación Continua y Permanente',
    division: 'Equipo CECP',
    divisionSlug: 'equipo-cecp',
    email: 'educontinua_med@unal.edu.co',
    photo: '/team-photos/andres_ossa.jpg',
    accentColor: 'var(--color-equipo-cecp)',
  },
  {
    id: 'diana',
    name: 'Diana Ruiz Isaza',
    role: 'Secretaria CECP e Idiomas',
    division: 'Equipo CECP',
    divisionSlug: 'equipo-cecp',
    email: 'idiomas_med@unal.edu.co',
    photo: '/team-photos/diana_ruiz.jpg',
    accentColor: 'var(--color-equipo-cecp)',
  },
  // — Gestores —
  {
    id: 'sara',
    name: 'Sara Rivera Monsalve',
    role: 'Gestora Administrativa',
    division: 'Gestores',
    divisionSlug: 'gestores',
    email: 'educontinua_med@unal.edu.co',
    photo: '/team-photos/sara_rivera.jpg',
    accentColor: 'var(--color-gestores)',
  },
  {
    id: 'melissa',
    name: 'Melissa Restrepo Villegas',
    role: 'Gestora de Oferta Abierta',
    division: 'Gestores',
    divisionSlug: 'gestores',
    email: 'ofertacep_med@unal.edu.co',
    photo: '/team-photos/melissa_restrepo.jpg',
    accentColor: 'var(--color-gestores)',
  },
  {
    id: 'cristhian',
    name: 'Cristhian Agudelo',
    role: 'Gestor de Oferta a la Medida',
    division: 'Gestores',
    divisionSlug: 'gestores',
    email: 'oportunicep_med@unal.edu.co',
    photo: '/team-photos/cristhian_agudelo.jpg',
    accentColor: 'var(--color-gestores)',
  },
  {
    id: 'karen',
    name: 'Karen Gisell Acosta Restrepo',
    role: 'Gestora de Idiomas',
    division: 'Gestores',
    divisionSlug: 'gestores',
    email: 'idiomascep_med@unal.edu.co',
    photo: '/team-photos/karen_acosta.jpg',
    accentColor: 'var(--color-gestores)',
  },
  {
    id: 'esneider',
    name: 'Esneider Jesús Guzmán Cañavera',
    role: 'Gestor de Plataformas',
    division: 'Gestores',
    divisionSlug: 'gestores',
    email: 'platafcep_med@unal.edu.co',
    photo: '/team-photos/esneider_guzman.jpg',
    accentColor: 'var(--color-gestores)',
  },
  // — Mercadeo y Comunicaciones —
  {
    id: 'laura',
    name: 'Laura Castaño Sosa',
    role: 'Gestora de Mercadeo y Tendencias',
    division: 'Mercadeo y Comunicaciones',
    divisionSlug: 'mercadeo-comunicaciones',
    email: 'mercadeocep_med@unal.edu.co',
    photo: '/team-photos/laura_castano.jpg',
    accentColor: 'var(--color-mercadeo)',
  },
  {
    id: 'mayra',
    name: 'Mayra Alejandra Álvarez Bedoya',
    role: 'Comunicadora',
    division: 'Mercadeo y Comunicaciones',
    divisionSlug: 'mercadeo-comunicaciones',
    email: 'comunicep_med@unal.edu.co',
    photo: '/team-photos/mayra_alvarez.jpg',
    accentColor: 'var(--color-mercadeo)',
  },
  // — Telemercadeo —
  {
    id: 'john',
    name: 'John Hamilthon Galeano Mazo',
    role: 'Apoyo de Telemercadeo',
    division: 'Telemercadeo',
    divisionSlug: 'telemercadeo',
    email: 'inscripcdi_med@unal.edu.co',
    photo: '/team-photos/john_galeano.jpg',
    accentColor: 'var(--color-telemercadeo)',
  },
  {
    id: 'carolina',
    name: 'Carolina Gutiérrez Vinasco',
    role: 'Apoyo Comercial',
    division: 'Telemercadeo',
    divisionSlug: 'telemercadeo',
    email: 'inscripcdi_med@unal.edu.co',
    photo: '/team-photos/carolina_gutierrez.jpg',
    accentColor: 'var(--color-telemercadeo)',
  },
];
