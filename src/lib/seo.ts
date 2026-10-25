import type { Route } from './router';
import { MISSIONS, getMission } from '../data/missions';
import { PERSONAL_INFO } from '../data/portfolioData';

const SITE = 'https://bambamdev.com/kortfolio';
const PERSON_NAME = PERSONAL_INFO.name;
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article' | 'profile';
  noindex?: boolean;
  jsonLd: Record<string, unknown>;
}

function canonical(path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE}/${clean}/` : `${SITE}/`;
}

function missionMeta(slug: string): RouteMeta | null {
  const mission = getMission(slug);
  if (!mission) return null;

  const image = mission.hero ? `${SITE}${mission.hero}` : DEFAULT_IMAGE;
  return {
    title: `${mission.title} — Case Study | KORTFOLIO`,
    description: mission.tagline,
    canonical: canonical(`missions/${mission.slug}`),
    image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: mission.title,
      description: mission.tagline,
      url: canonical(`missions/${mission.slug}`),
      image,
      creator: {
        '@type': 'Person',
        name: PERSON_NAME,
        jobTitle: 'Computer Engineer & Creative Director',
        url: canonical(),
      },
      keywords: mission.techStack.join(', '),
      genre: mission.category,
    },
  };
}

export function getRouteMeta(route: Route): RouteMeta {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    jobTitle: 'Computer Engineer & Creative Director',
    url: canonical(),
    image: `${SITE}/assets/profile/kondwani.webp`,
    email: `mailto:${PERSONAL_INFO.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lilongwe', addressCountry: 'MW' },
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin, PERSONAL_INFO.instagram],
    knowsAbout: ['Systems Architecture', 'Cloud Engineering', 'Edge AI', 'FinTech', 'Creative Direction'],
  };

  switch (route.name) {
    case 'home':
      return {
        title: 'KORTFOLIO — Kondwani Austin Phanga | Computer Engineer & Creative Director',
        description:
          'A retro-futurist portfolio and systems lab from Kondwani Austin Phanga: production software across fintech, public health, edge AI, and documentary media. Built in Malawi.',
        canonical: canonical(),
        image: DEFAULT_IMAGE,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            person,
            {
              '@type': 'WebSite',
              name: 'KORTFOLIO',
              url: canonical(),
              author: { '@type': 'Person', name: PERSON_NAME },
            },
          ],
        },
      };
    case 'missions':
      return {
        title: 'Mission Select — Selected Work | KORTFOLIO',
        description:
          'Case studies from Kondwani Austin Phanga spanning mobile-money reconciliation, solar edge vision, on-device AI, cultural game engines, health systems, and data platforms.',
        canonical: canonical('missions'),
        image: DEFAULT_IMAGE,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Mission Select',
          url: canonical('missions'),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: MISSIONS.map((mission, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: canonical(`missions/${mission.slug}`),
              name: mission.title,
            })),
          },
        },
      };
    case 'mission':
      return (
        missionMeta(route.slug) ?? {
          title: 'Mission not found | KORTFOLIO',
          description: 'The requested mission could not be located.',
          canonical: canonical('missions'),
          image: DEFAULT_IMAGE,
          type: 'website',
          noindex: true,
          jsonLd: person,
        }
      );
    case 'lab':
      return {
        title: 'Tech Lab — Interactive Systems | KORTFOLIO',
        description:
          'Four interactive engineering demos: mobile-money reconciliation, solar edge-vision buffering, on-device motion capture, and a traditional Bawo game engine.',
        canonical: canonical('lab'),
        image: DEFAULT_IMAGE,
        type: 'website',
        jsonLd: person,
      };
    case 'player':
      return {
        title: 'Player File — Kondwani Austin Phanga | KORTFOLIO',
        description:
          'Profile, career history, education, and capabilities of Kondwani Austin Phanga — computer engineer, systems builder, and creative director in Lilongwe, Malawi.',
        canonical: canonical('player'),
        image: `${SITE}/assets/profile/kondwani.webp`,
        type: 'profile',
        jsonLd: { ...person, '@type': 'ProfilePage', mainEntity: person },
      };
    case 'media':
      return {
        title: 'Media Archive — Photography & Documentary | KORTFOLIO',
        description:
          'Documentary, portrait, landscape, and field photography by Kondwani Austin Phanga across Malawi.',
        canonical: canonical('media'),
        image: `${SITE}/assets/photos/photo_1.jpg`,
        type: 'website',
        jsonLd: person,
      };
    case 'contact':
      return {
        title: 'Next Mission — Contact & Enquiries | KORTFOLIO',
        description:
          'Start a project with Kondwani Austin Phanga: software systems, cloud architecture, edge AI, or creative direction. Based in Lilongwe, Malawi.',
        canonical: canonical('contact'),
        image: DEFAULT_IMAGE,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: canonical('contact'),
          mainEntity: person,
        },
      };
    default:
      return {
        title: 'Signal Lost — Page not found | KORTFOLIO',
        description: 'This route does not exist. Return to Mission Select to continue.',
        canonical: canonical('404'),
        image: DEFAULT_IMAGE,
        type: 'website',
        noindex: true,
        jsonLd: person,
      };
  }
}

function setMeta(selector: string, attr: 'content' | 'href', value: string): void {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    if (selector.startsWith('link')) {
      element = document.createElement('link');
      element.setAttribute('rel', selector.match(/rel="([^"]+)"/)?.[1] ?? 'canonical');
    } else {
      element = document.createElement('meta');
      const name = selector.match(/name="([^"]+)"/)?.[1];
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
}

export function applyRouteMeta(route: Route): void {
  if (typeof document === 'undefined') return;
  const meta = getRouteMeta(route);

  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', meta.canonical);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', meta.canonical);
  setMeta('meta[property="og:image"]', 'content', meta.image);
  setMeta('meta[property="og:type"]', 'content', meta.type);
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);
  setMeta('meta[name="twitter:image"]', 'content', meta.image);
  setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex, nofollow' : 'index, follow');

  let script = document.head.querySelector<HTMLScriptElement>(
    'script[data-kortfolio-jsonld], script[type="application/ld+json"]',
  );
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.dataset.kortfolioJsonld = 'true';
  script.textContent = JSON.stringify(meta.jsonLd);
}
