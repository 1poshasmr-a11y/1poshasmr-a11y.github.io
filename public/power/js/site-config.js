/* Roeder Outdoor Power — site configuration.
   Same shape as the Implement config; only the values differ, which is what
   keeps both storefronts on an identical component set. */
window.__SITE__ = {
    key: 'power',
    name: 'Roeder Outdoor Power',
    tagline: 'Mow It. Haul It. Get It Done.',
    founded: 1957,
    city: 'Dubuque, Iowa',
    streetAddress: '2580 Rockdale Road',
    postalCode: 'IA 52003',
    phone: '563-556-2071',
    tollFree: '800-942-4673',
    contactEmail: 'info@roederoutdoorpower.com',
    careersEmail: 'careers@roederoutdoorpower.com',
    url: 'https://www.roederoutdoorpower.com',
    facebook: 'https://www.facebook.com/roederimplement/',

    apiBase: '/api/power',

    logo: '/power/images/rop-logo.png',
    logoMaxWidth: '420px',
    // Their supplied logo is only 195px wide with dark text, so the hero sets
    // the name in type instead. The logo still serves as the favicon.
    wordmark: ['Roeder', 'Outdoor Power'],
    heroImage: '/power/images/hero.jpg',

    intro: 'Roeder Outdoor Power is a family owned and operated dealership in Dubuque, Iowa, selling and servicing lawn tractors, zero turn mowers, compact tractors and utility vehicles. We sell more than seven hundred new mowers a year, which means an unusually deep selection of trade-ins, and we service every brand we sell.',

    stats: [
        { value: '69', label: 'Years in Dubuque' },
        { value: '700+', label: 'Mowers Sold a Year' },
        { value: '29', label: 'Used Units in Stock' },
        { value: '67', label: 'Parts Brands Stocked' },
    ],

    departments: [
        { icon: '🚜', name: 'Sales', href: '#/equipment', cta: 'Shop Now',
          blurb: 'New and used mowers, compact tractors and utility vehicles from John Deere, Kubota, Cub Cadet and more.' },
        { icon: '🔧', name: 'Service', href: '#/service', cta: 'Track Ticket',
          blurb: 'A full line of service on every brand we sell, from spring tune-ups to full engine rebuilds.' },
        { icon: '⚙️', name: 'Parts', href: '#/parts', cta: 'Request Parts',
          blurb: 'Blades, belts, filters and hard-to-find parts across sixty-seven brands, most of them on the shelf.' },
        { icon: '🧸', name: 'Toy Department', href: '#/company', cta: 'Visit In Store',
          blurb: 'Die-cast tractors, pedal tractors and farm toys — a Roeder tradition for the next generation.' },
    ],

    // Values match the `category` field in the inventory data
    categories: [
        { value: 'Riding Mowers', label: 'Riding Mowers' },
        { value: 'Zero Turn Mowers', label: 'Zero Turn Mowers' },
        { value: 'Utility Vehicles', label: 'Utility Vehicles' },
        { value: 'Tractors', label: 'Tractors' },
        { value: 'Golf Carts', label: 'Golf Carts' },
        { value: 'Attachments', label: 'Attachments' },
    ],

    // Brands that actually appear in the inventory, so the filter always returns results
    brands: ['John Deere', 'Cub Cadet', 'Toro', 'Club Car', 'Kodiak'],
    brandExamples: 'John Deere, Kubota',
    modelExample: 'X380',
    communityPhrase: 'homeowners, acreage owners and grounds crews across the tri-state area',

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
        profileIntro: 'A family owned dealership serving Dubuque and the tri-state area since 1957. Lawn tractors, zero turn mowers, compact tractors and UTVs — sold, serviced and stocked in parts.',
        aboutHeading: 'Family Owned and Operated Since 1957',
        aboutLede: 'Learn about our history, our annual auction, and our commitment to servicing every brand we sell.',
        aboutParagraphs: [
            'Welcome to Roeder Outdoor Power, a family owned and operated dealership operating since 1957 located in Dubuque, Iowa. Our annual sales of new lawn tractors, garden tractors, and zero turn mowers exceed seven hundred units. This large number of sales generates a great selection of used equipment to choose from.',
            'Each April we feature an auction which contains over one hundred units, all sold with no reserve. It has become one of the largest outdoor power equipment auctions in the region and draws buyers from across Iowa, Illinois and Wisconsin.',
            'Roeder Outdoor Power carries a large variety of makes and models and offers a full line of service on every brand we sell. Our Service Department proudly serves the tri-state area of Illinois, Iowa and Wisconsin.',
        ],
        brandList: ['John Deere', 'Kubota', 'Cub Cadet', 'Exmark', 'Honda', 'STIHL',
                    'Frontier', 'Land Pride', 'Doolittle Trailers', 'Green Mountain Grills'],
        careerField: 'Outdoor Power Equipment',
        aboutImage: '/power/images/about-cover.jpg',
        teamImage: '/power/images/about-cover.jpg',
        contactImage: '/power/images/contact-cover.jpg',
        careerImage: '/power/images/career-cover.jpg',
        specialImage: '/power/images/special-cover.png',
    },
};
