/* Roeder Implement — site configuration.
   Loaded as a classic script so it runs before any module. */
window.__SITE__ = {
    key: 'implement',
    name: 'Roeder Implement',
    tagline: 'Your Farm. Our Equipment. Your Success.',
    founded: 1957,
    city: 'Dubuque, Iowa',
    streetAddress: '2550 Rockdale Rd',
    postalCode: 'IA 52003',
    phone: '563-557-1184',
    tollFree: '800-557-1184',
    contactEmail: 'info@roederimplement.com',
    careersEmail: 'careers@roederimplement.com',
    url: 'https://www.roederimplement.com',
    facebook: 'https://www.facebook.com/roederimplement/',

    apiBase: '/api',

    logo: '/images/ri-logo.png',
    logoMaxWidth: '900px',
    heroImage: '/images/hero.png',

    intro: "Roeder Implement is a Case IH dealer in Dubuque, Iowa, selling and servicing new and used tractors, combines and farm equipment. An experienced, knowledgeable staff, competitive prices, first rate service and hard to find parts are what makes Roeder Implement Eastern Iowa's premiere destination for all your farming needs.",

    stats: [
        { value: '69', label: 'Years Serving Dubuque' },
        { value: '258', label: 'Units in Stock' },
        { value: '24hr', label: 'Service Response' },
        { value: '50+', label: 'Brand Partners' },
    ],

    departments: [
        { icon: '🚜', name: 'Sales', href: '#/equipment', cta: 'Shop Now',
          blurb: 'New and used equipment from top brands to keep your operation running efficiently.' },
        { icon: '🔧', name: 'Service', href: '#/service', cta: 'Track Ticket',
          blurb: 'Factory-trained technicians ready for routine maintenance or emergency repairs.' },
        { icon: '⚙️', name: 'Parts', href: '#/parts', cta: 'Request Parts',
          blurb: 'Massive on-hand inventory of OEM parts to minimize your downtime.' },
        { icon: '🛰️', name: 'AFS Precision', href: '#/quote', cta: 'Get Support',
          blurb: 'Advanced farming systems and tech support for modern precision agriculture.' },
    ],

    // Values match the `category` field in the inventory data
    categories: [
        { value: 'Tractors', label: 'Tractors' },
        { value: 'Harvesting', label: 'Harvesting' },
        { value: 'Construction', label: 'Construction' },
        { value: 'Attachments', label: 'Attachments' },
        { value: 'Hay & Forage', label: 'Hay & Forage' },
        { value: 'Tillage', label: 'Tillage' },
        { value: 'Planting', label: 'Planting' },
        { value: 'Application', label: 'Application' },
        { value: 'Livestock', label: 'Livestock' },
    ],

    // Brands that actually appear in the inventory, so the filter always returns results
    brands: ['Case IH', 'Kubota', 'John Deere', 'New Holland', 'Bobcat', 'Massey Ferguson',
             'Land Pride', 'Kuhn', 'Hardi', 'Yanmar', 'Virnig'],
    brandExamples: 'Case IH, Kubota',
    modelExample: 'Magnum 340',
    communityPhrase: 'our farming community',

    hoursDetailed: [
        ['Monday', '8:00 AM - 5:00 PM'],
        ['Tuesday', '8:00 AM - 5:00 PM'],
        ['Wednesday', '8:00 AM - 5:00 PM'],
        ['Thursday', '8:00 AM - 5:00 PM'],
        ['Friday', '8:00 AM - 5:00 PM'],
        ['Saturday', '8:00 AM - 12:00 PM'],
        ['Sunday', 'Closed'],
    ],

    company: {
        profileIntro: 'Serving the Dubuque community with premium equipment and service since our founding. We are your trusted partner for Case IH, Kubota, and many other top brands.',
        aboutHeading: "Eastern Iowa's Premiere Destination",
        aboutLede: 'Learn about our history, our values, and our commitment to the local farming and construction community.',
        aboutParagraphs: [
            'Since 1957, Roeder Implement has been a trusted business partner in the Tri-State area. Today, this third generation, family owned business has become a multi-line dealership carrying high quality new and used tractors, combines, and farm equipment from Case IH, Kubota, Jaylor, Anderson, H&S, Land Pride, Yanmar and many more.',
            'An experienced, knowledgeable staff, competitive prices, first rate service and hard to find parts are what makes Roeder Implement Eastern Iowa’s premiere destination for all your farming needs.',
            'To look at our complete inventory, please check our New Equipment and Used Equipment pages for great deals on all of our Case IH and other equipment brands like Land Pride, Degelman, Kubota, Virnig, Paladin Attachments and more.',
        ],
        brandList: ['Case IH', 'Kubota', 'Case Construction', 'Land Pride', 'Degelman', 'E-Z Trail',
                    'J&M', 'Yanmar', 'Yetter', 'Virnig', 'Hardi', 'Paladin', 'Meridian', 'H&S',
                    'Jaylor', 'Anderson Group', 'Fantini', 'Strobel', 'Doolittle', 'Mi-T-M'],
        careerField: 'Agriculture',
        aboutImage: '/images/company/about-cover.jpg',
        teamImage: '/images/company/ResizedImage900870-IMG-8665-2.jpg',
        contactImage: '/images/company/contact-cover.jpg',
        careerImage: '/images/company/career-cover.jpg',
        specialImage: '/images/company/special-cover.jpg',
    },
};
