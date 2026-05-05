export interface SiteConfig {
  business: {
    name: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    license: string;
    tagline: string;
    description: string;
    hours: { days: string; hours: string }[];
    foundedYear: number;
  };
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      cta: string;
      ctaHover: string;
      background: string;
      surface: string;
      text: string;
      textMuted: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    radius: {
      card: string;
      cta: string;
    };
  };
  features: {
    enableGallery: boolean;
    enableTestimonials: boolean;
    enableEmergencyBanner: boolean;
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
  };
  form: {
    endpoint: string;
    accessKey: string;
  };
  social: {
    facebook?: string;
    google?: string;
    yelp?: string;
    nextdoor?: string;
    instagram?: string;
  };
  serviceArea: {
    primary: string;
    cities: string[];
  };
}

export const siteConfig: SiteConfig = {
  business: {
    name: "Presto Change-O's Handywork",
    phone: '(512) 300-8483',
    email: 'prestonkristof76@gmail.com',
    address: {
      street: '',
      city: 'Round Rock',
      state: 'TX',
      zip: '78664',
    },
    license: '',
    tagline: 'Knocking Out Your Honey-Do List',
    description:
      "North Austin's honest handyman. Run by Preston Kristof, Presto Change-O's Handywork tackles fast, fair fixes for homes across Round Rock, Hutto, Georgetown, and beyond — from squeaky doors to full-on transformations.",
    hours: [
      { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { days: 'Saturday', hours: '9:00 AM - 4:00 PM' },
      { days: 'Sunday', hours: 'By Appointment' },
    ],
    foundedYear: 2021,
  },

  branding: {
    colors: {
      primary: '#1f1f23',
      secondary: '#f6f7f5',
      accent: '#a8d977',
      cta: '#7ec24a',
      ctaHover: '#5fa12d',
      background: '#ffffff',
      surface: '#eef0ec',
      text: '#0f0f12',
      textMuted: '#5a5d63',
    },
    fonts: {
      heading: '"Orbitron"',
      body: '"Rajdhani"',
    },
    radius: {
      card: '0.125rem',
      cta: '0.125rem',
    },
  },

  features: {
    enableGallery: false,
    enableTestimonials: false,
    enableEmergencyBanner: true,
  },

  seo: {
    titleTemplate: "%s | Presto Change-O's Handywork",
    defaultDescription:
      "Presto Change-O's Handywork — Preston Kristof's honest handyman service for North Austin. Carpentry, repairs, mounting, drywall, fixtures, and small remodels in Round Rock, Hutto, Georgetown, Pflugerville, Cedar Park, and Leander.",
  },

  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: 'YOUR_ACCESS_KEY_HERE',
  },

  social: {
    google: 'https://g.page/prestochangeos',
  },

  serviceArea: {
    primary: 'North Austin Metro',
    cities: [
      'Round Rock',
      'Hutto',
      'Georgetown',
      'Pflugerville',
      'Cedar Park',
      'Leander',
      'Taylor',
      'Jonestown',
      'Liberty Hill',
      'Brushy Creek',
      'Wells Branch',
      'North Austin',
    ],
  },
};

/** Navigation links derived from config */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  ...(siteConfig.features.enableGallery
    ? [{ label: 'Gallery', href: '/gallery' }]
    : []),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
