/**
 * GELWO TECHNOLOGIES — COMPLETE SERVICE & PRODUCT CATALOGUE
 * Authoritative 2026 Enterprise Classification
 * Divisions A through N (Official Profile) + Software Development & Digital Solutions Expansion
 */

export interface SubCategory {
  title: string;
  items: string[];
}

export interface ServiceDivision {
  id: string;
  code: string; // 'A', 'B', ... 'N', 'SW'
  name: string;
  icon: string;
  tagline: string;
  description: string;
  badge?: string;
  accentColor: string; // e.g. '#4A346A'
  categories: SubCategory[];
  supportingServices?: string[];
  pricingModel: 'Custom Quotation Engine' | 'Bill of Quantities (BOQ)' | 'Fixed Rate / Unit Price' | 'Framework Supply Contract' | 'Monthly Retainer';
  leadTime: string;
}

export const GELWO_CATALOGUE: ServiceDivision[] = [
  {
    id: 'general-supplies',
    code: 'A',
    name: 'General Supplies & Services',
    icon: '📦',
    tagline: 'Procurement, Sourcing, Supply, Delivery & Ongoing Institutional Support',
    description: 'GELWO’s general supplies division covers end-to-end procurement, high-volume sourcing, scheduled deliveries, and institutional inventory planning across 8 dedicated supply categories.',
    badge: 'AGPO & Government Approved',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Office Stationery & Consumables',
        items: [
          'Exercise books',
          'Notebooks & notepads',
          'Pens, pencils & highlighters',
          'Box files, spring files & folders',
          'Envelopes (all sizes)',
          'Paper products (A4, A3, reams, bond paper)',
          'Office consumables & desktop accessories',
        ],
      },
      {
        title: 'Office Furniture & Fittings',
        items: [
          'Executive & workstation office desks',
          'Ergonomic office chairs & visitor seating',
          'Metal & wooden filing cabinets',
          'Heavy-duty industrial shelving & racking',
          'Custom board room tables & fittings',
        ],
      },
      {
        title: 'ICT Accessories & Operational Equipment',
        items: [
          'Computer peripherals & cables (HDMI, VGA, Patch cords)',
          'Power surge protectors & UPS units',
          'Operational ICT hardware & input devices',
        ],
      },
      {
        title: 'Cleaning & Janitorial Supplies',
        items: [
          'Cleaning materials & equipment',
          'Janitorial consumables & dispensers',
          'Commercial cleaning detergents & disinfectants',
          'Facility maintenance materials',
        ],
      },
      {
        title: 'PPE & Safety Gear',
        items: [
          'Personal Protective Equipment (helmets, goggles, ear defenders)',
          'High-visibility reflector jackets & overalls',
          'Safety boots & heavy-duty gloves',
          'Workplace health and safety protection gear',
        ],
      },
      {
        title: 'Institutional Supplies',
        items: [
          'Operational institutional consumables',
          'Maintenance materials & hardware',
          'Bulk boarding & facility provisions',
        ],
      },
      {
        title: 'School Supplies',
        items: [
          'Curriculum learning & textbook materials',
          'School operational supplies & chalk/whiteboards',
          'Educational support & laboratory consumables',
        ],
      },
      {
        title: 'Printing Consumables',
        items: [
          'Original & compatible toner cartridges',
          'Inkjet cartridges & bulk inks',
          'Printer ribbons & maintenance kits',
        ],
      },
    ],
    supportingServices: [
      'Procurement support & tender fulfillment',
      'Product sourcing & quality verification',
      'Bulk-order coordination & freight management',
      'Scheduled & phased deliveries',
      'After-supply warranty & support',
      'Product replacement coordination',
      'Institutional supply planning & inventory advisory',
    ],
    pricingModel: 'Framework Supply Contract',
    leadTime: '24 - 48 Hours Ex-Stock',
  },

  {
    id: 'ict-biometric-security',
    code: 'B',
    name: 'ICT, Biometric & Security Solutions',
    icon: '💻',
    tagline: 'Supply, Enterprise Installation, Hardware Integration & Security Operations',
    description: 'Major technology division delivering turnkey ICT architecture, enterprise biometric time-and-attendance, and smart AI surveillance systems for corporate, commercial, and government installations.',
    badge: 'Enterprise Security Certified',
    accentColor: '#566944',
    categories: [
      {
        title: 'ICT Hardware & Computing',
        items: [
          'Desktop workstations & all-in-one PCs',
          'Commercial & rugged laptops',
          'Office technology: Multifunction printers, scanners, photocopiers',
          'Enterprise routers, managed switches & wireless access points',
          'Computer accessories & peripheral devices',
          'Data-storage devices, NAS servers & backup solutions',
        ],
      },
      {
        title: '🔐 Biometric & Access Control Systems',
        items: [
          'Biometric attendance devices (optical & capacitive)',
          'Biometric access-control turnstiles & magnetic locks',
          'Fingerprint-recognition terminals',
          'AI facial-recognition devices with thermal scanning',
          'Staff identification & smart card systems',
          'Student identification systems & campus portals',
          'Time-and-attendance management software integration',
        ],
      },
      {
        title: '📹 CCTV & Surveillance Systems',
        items: [
          'IP & HD analog CCTV cameras (PTZ, Dome, Bullet, 4K)',
          'Surveillance accessories, power supplies & optical baluns',
          'CCTV infrastructure installation & cabling',
          'DVR & NVR recording systems configuration',
          'Centralized video management software & remote mobile monitoring',
          'CCTV preventative maintenance, servicing & firmware upgrades',
          'Integrated perimeter security solutions & motion alarms',
        ],
      },
    ],
    supportingServices: [
      'Site survey & security risk assessment',
      'Structured cabling & fiber optic backbone termination',
      'System integration with building management',
      'Staff biometric enrollment & admin training',
      '24/7 Remote monitoring support & SLA contracts',
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: '3 - 7 Working Days',
  },

  {
    id: 'electrical-engineering',
    code: 'C',
    name: 'Electrical Equipment, Installation & Maintenance',
    icon: '⚡',
    tagline: 'Power Distribution, Industrial Installations, Energy Optimization & Maintenance',
    description: 'Certified electrical engineering division covering high-grade equipment distribution, commercial wiring, substation connections, power backups, and preventive electrical maintenance.',
    badge: 'EPRA & NCA Certified',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Electrical Equipment & Materials',
        items: [
          'Armoured & flexible electrical cables, wiring materials',
          'Modular switches, sockets & isolators',
          'Circuit breakers (MCBs, MCCBs, RCCBs) & surge protection devices',
          'Commercial lighting systems & LED architectural fixtures',
          'Electrical distribution boards, consumer units & main switchboards',
          'Conduits, cable trays & PVC/metal trunking',
          'Power-backup accessories & automatic transfer switches (ATS)',
        ],
      },
      {
        title: 'Electrical Installation Works',
        items: [
          'New electrical building wiring & conduit installation',
          'Rewiring & power modernization for aging facilities',
          'Industrial power-outlet & three-phase machinery installation',
          'Institutional & commercial electrical distribution setup',
          'Backup-power connections & diesel generator integration',
          'Security, perimeter & flood lighting installations',
          'Electrical fittings & BOQ fulfillment for construction projects',
        ],
      },
      {
        title: 'Electrical Maintenance & Optimization',
        items: [
          'Statutory electrical safety inspection & thermographic auditing',
          'Fault diagnosis & rapid emergency repairs',
          'Preventive maintenance contracts & component replacement',
          'System upgrades, phase balancing & load redistribution',
          'Power factor correction & energy-efficiency improvements',
        ],
      },
    ],
    pricingModel: 'Bill of Quantities (BOQ)',
    leadTime: 'Immediate Deployment',
  },

  {
    id: 'solar-renewable-energy',
    code: 'D',
    name: 'Solar & Renewable Energy',
    icon: '☀️',
    tagline: 'Solar Microgrids, Hybrid Power, Water Pumping & Clean Energy Transition',
    description: 'Pioneering solar engineering solutions across East Africa. Designing and deploying Tier-1 solar microgrids, commercial rooftop arrays, solar water pumping, and industrial lithium battery storage.',
    badge: 'Tier-1 Solar Certified',
    accentColor: '#566944',
    categories: [
      {
        title: 'Solar Products & Hardware',
        items: [
          'Monocrystalline & Bifacial solar panels (Tier-1)',
          'Heavy-duty roof & ground mounting structures and clamps',
          'Hybrid, Off-Grid & Grid-Tie solar inverters',
          'MPPT smart charge controllers',
          'Deep-cycle Gel & Lithium-Iron-Phosphate (LiFePO4) solar batteries',
          'All-in-one commercial energy-storage systems (ESS)',
          'Integrated solar street lights & perimeter lighting',
          'Solar water-pumping systems & borehole solarization',
          'Hybrid power-backup accessories & ATS synchronization',
        ],
      },
      {
        title: 'Engineering, Design & Commissioning',
        items: [
          'Solar system sizing, yield simulation & load profile design',
          'Structural mounting & panel string installation',
          'Inverter & high-voltage battery system integration',
          'Solar/generator/mains grid synchronization',
          'Institutional & agricultural solar water pumping setups',
          'System commissioning, rigorous performance & safety testing',
        ],
      },
      {
        title: 'Solar Maintenance & Optimization',
        items: [
          'Preventive maintenance & thermal string inspection',
          'Array cleaning, fault diagnosis & inverter repairs',
          'Battery capacity testing, balancing & replacement coordination',
          'System expansion, telemetry & solar monitoring upgrades',
        ],
      },
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: '5 - 14 Days Turnkey',
  },

  {
    id: 'branding-printing-communication',
    code: 'E',
    name: 'Branding, Printing & Corporate Communication',
    icon: '🎨',
    tagline: 'Brand Identity, Offset & Digital Printing, Large-Format Signage & Merchandise',
    description: 'High-impact creative production house. We engineer corporate visual identities, institutional publication printing, branded promotional wear, and large-format outdoor exhibitions.',
    badge: 'High-Precision Offset & Digital',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Branded Corporate Merchandise',
        items: [
          'Branded executive stationery, notebooks & pens',
          'Corporate identity materials & gift sets',
          'Screen-printed & embroidered T-shirts, polo shirts & caps',
          'Reflector safety jackets & institutional workwear',
          'Branded backpacks, conference bags & promotional items',
          'Event-branding kits, roll-up banners & pull-up stands',
          'Institutional signage, name plates & 3D directional boards',
          'Vehicle-branding wraps & outdoor billboard graphics',
        ],
      },
      {
        title: 'Commercial Printing & Publications',
        items: [
          'Full-color corporate brochures, flyers & product catalogues',
          'Public awareness materials, posters & newsletters',
          'Institutional annual reports, strategic plans & company profiles',
          'Training manuals, policy documents & workshop dossiers',
          'Official corporate business cards, letterheads & receipt books',
          'Large-format PVC banners, backdrop banners & tear-drop flags',
        ],
      },
      {
        title: 'Creative Strategy & Design Services',
        items: [
          'Corporate branding strategy & logo identity development',
          'Graphic design & artwork development',
          'Document layout formatting & publication typesetting',
          'Product packaging design & 3D visual mockups',
          'Print-production quality coordination & nationwide delivery logistics',
        ],
      },
    ],
    pricingModel: 'Fixed Rate / Unit Price',
    leadTime: '2 - 5 Days',
  },

  {
    id: 'consultancy-survey-research',
    code: 'F',
    name: 'Consultancy, Survey & Research',
    icon: '📊',
    tagline: 'Strategic Advisory, M&E Frameworks, Socio-Economic Surveys & Data Analytics',
    description: 'Providing public and private institutions with evidence-based advisory, strategic planning, rigorous monitoring, evaluation and learning (MEL), and nationwide digital field surveys.',
    badge: 'Data-Driven Impact',
    accentColor: '#566944',
    categories: [
      {
        title: 'Organizational Consultancy & Strategy',
        items: [
          'Institutional strategic planning & 5-year master plans',
          'Organizational restructuring & workflow optimization',
          'Policy development, regulatory review & governance advisory',
          'Institutional framework design & compliance advisory',
          'Project design, feasibility studies & implementation roadmaps',
          'Institutional capacity assessment & performance reviews',
          'Standard Operating Procedures (SOPs) & operational guidelines',
        ],
      },
      {
        title: 'Monitoring, Evaluation & Learning (MEL)',
        items: [
          'Results-Based Management (RBM) & M&E framework design',
          'Key performance indicator (KPI) definition & tracking systems',
          'Mid-term reviews (MTR) & end-term project evaluations',
          'Programme impact assessments & socio-economic impact analysis',
          'Learning documentation, success stories & donor reporting support',
          'Data-management templates & interactive dashboard tools',
        ],
      },
      {
        title: 'Field Research, Surveys & Data Analytics',
        items: [
          'Baseline, midline & end-line surveys (digital & CAPI collection)',
          'Social audits & community needs assessments',
          'Market surveys, consumer insights & feasibility studies',
          'Stakeholder mapping & participatory rural appraisals',
          'Data cleaning, econometric modeling & statistical analysis (SPSS, R, Stata)',
          'Enumerator training, field-team supervision & technical report writing',
        ],
      },
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: 'Project Phased Milestones',
  },

  {
    id: 'capacity-building-training',
    code: 'G',
    name: 'Capacity Building & Training',
    icon: '🎓',
    tagline: 'Institutional Strengthening, Leadership, PFM, Project Management & Digital Skills',
    description: 'Transforming institutional capabilities through specialized executive workshops, certified public financial management (PFM) training, project management, and community empowerment programmes.',
    badge: 'NITA & CPD Aligned',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Governance & Executive Leadership',
        items: [
          'Board induction & corporate governance-effectiveness training',
          'Executive leadership & strategic management development',
          'Integrity, ethics & anti-corruption compliance workshops',
          'Public participation & multi-stakeholder engagement frameworks',
          'Policy implementation & institutional-strengthening retreats',
        ],
      },
      {
        title: 'Financial & Procurement Training',
        items: [
          'Public Financial Management (PFM) & accountability systems',
          'Budget planning, execution & statutory expenditure reporting',
          'Public procurement compliance (PPADA) & tender bid preparation',
          'Supply-chain management, inventory & asset management training',
          'Audit preparedness & electronic records management',
        ],
      },
      {
        title: 'Project Management & M&E Training',
        items: [
          'Project lifecycle planning & Logical-Framework (LogFrame) design',
          'Results-based tracking & field data-collection software training',
          'Risk management, project sustainability & donor reporting',
        ],
      },
      {
        title: 'ICT & Digital Literacy',
        items: [
          'Digital literacy & standard office productivity suites',
          'E-governance tools, ERP system adoption & workflow automation',
          'Enterprise cybersecurity awareness & data-protection compliance',
        ],
      },
      {
        title: 'Community Empowerment & Climate Training',
        items: [
          'Youth & women entrepreneurship skills development',
          'Community mobilization, participatory development & cooperatives',
          'Environmental awareness & climate-resilience agricultural practices',
        ],
      },
    ],
    pricingModel: 'Fixed Rate / Unit Price',
    leadTime: 'Scheduled On-Demand',
  },

  {
    id: 'technical-support-maintenance',
    code: 'H',
    name: 'Technical Support & Systems Maintenance',
    icon: '🛠️',
    tagline: 'ICT Diagnostics, Network Optimization, Hardware Maintenance & SLA Helpdesk',
    description: 'Comprehensive IT infrastructure management. Delivering proactive diagnostic maintenance, scheduled hardware servicing, network optimization, and 24/7 multi-tier helpdesk assistance.',
    badge: '24/7 SLA Guarantee',
    accentColor: '#566944',
    categories: [
      {
        title: 'ICT Infrastructure Maintenance',
        items: [
          'Computer hardware diagnostics, board-level repairs & upgrades',
          'Operating system deployment, driver configuration & software patching',
          'Preventive maintenance servicing for enterprise computer labs & offices',
          'Local area network (LAN/WAN) troubleshooting & throughput optimization',
          'Server administration, virtualization & automated data backup protocols',
          'Hardware replacement advice & asset-lifecycle management',
        ],
      },
      {
        title: 'Installation & Network Infrastructure',
        items: [
          'Enterprise network rack cabling, switch patching & Wi-Fi mesh installation',
          'Biometric terminal & security access-control hardware integration',
          'Heavy-duty printer, scanner & photocopier installation and calibration',
          'Structured cabling, fiber splicing & IT equipment facility relocation',
        ],
      },
      {
        title: 'User Helpdesk & SLA Support',
        items: [
          'Dedicated on-site technical support engineers',
          'Remote desktop troubleshooting & rapid incident response',
          'Tier 1-3 helpdesk support ticketing & end-user training',
          'Scheduled quarterly maintenance contracts & audit reports',
        ],
      },
    ],
    pricingModel: 'Monthly Retainer',
    leadTime: 'Immediate Response',
  },

  {
    id: 'small-works-interior-painting',
    code: 'I',
    name: 'Small Works, Interior Design & Painting',
    icon: '🏗️',
    tagline: 'Commercial Refurbishment, Modern Office Partitioning, Gypsum & Painting',
    description: 'Architectural refinement and minor civil works. We specialize in transforming commercial spaces, executing drywall/aluminum partitioning, luxury gypsum ceilings, decorative finishes, and painting.',
    badge: 'NCA Building Works Approved',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Minor Construction & Civil Refurbishment',
        items: [
          'Commercial office renovations & structural space reconfiguration',
          'Office partitioning: Aluminum, tempered glass & acoustic drywall',
          'Masonry works, concrete paving, drainage improvement & access ramps',
          'Plumbing, water distribution & sanitation facility upgrades',
        ],
      },
      {
        title: 'Interior Design & Modern Finishing',
        items: [
          'Office space planning & ergonomic interior layout design',
          'Gypsum designer ceilings, acoustic ceiling tiles & ambient cove lighting',
          'Porcelain, ceramic, vinyl plank flooring & polished terrazzo finishes',
          'Decorative wall cladding, 3D panels & bespoke reception desks',
          'Custom workspace optimization & interior architectural fittings',
        ],
      },
      {
        title: 'Commercial & Institutional Painting',
        items: [
          'Interior & exterior commercial painting with premium weather-guard paints',
          'Institutional facility painting & protective industrial coatings',
          'Surface treatment, skimming, crack sealing & preventive repainting',
          'Decorative textured wall finishes & branded corporate color schemes',
        ],
      },
    ],
    pricingModel: 'Bill of Quantities (BOQ)',
    leadTime: 'Site Survey Within 24 Hours',
  },

  {
    id: 'environment-climate-resilience',
    code: 'J',
    name: 'Mitigation, Environmental Management & Climate Resilience',
    icon: '🌱',
    tagline: 'Flood Control, Soil Conservation, Land Restoration & Climate Adaptation',
    description: 'Environmental engineering division committed to sustainable ecosystems. Delivering flood risk mitigation, stormwater culvert infrastructure, slope stabilization, and commercial afforestation.',
    badge: 'NEMA & Green Infrastructure Certified',
    accentColor: '#566944',
    categories: [
      {
        title: 'Flood Control & Stormwater Management',
        items: [
          'Flood-risk assessment & hydrological drainage modeling',
          'Stormwater drainage construction, culvert installation & rehabilitation',
          'Surface-runoff diversion, drainage excavation & desilting works',
          'Institutional & facility flood-protection infrastructure',
        ],
      },
      {
        title: 'Soil Conservation & Land Rehabilitation',
        items: [
          'Slope stabilization, soil erosion control & terracing',
          'Gabion box installation, stone pitching & protective rock barriers',
          'Vegetative erosion control with vetiver grass & ground cover',
          'Degraded land rehabilitation & commercial site restoration',
        ],
      },
      {
        title: 'Environmental Conservation & Climate Resilience',
        items: [
          'Afforestation, commercial tree seedling nurseries & tree planting drives',
          'Ecosystem rehabilitation & sustainable land-use advisory',
          'Solid waste management planning & community climate-adaptation training',
          'Disaster preparedness, risk reduction & green infrastructure planning',
        ],
      },
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: 'Project Scheduled',
  },

  {
    id: 'cereals-foodstuff-supplies',
    code: 'K',
    name: 'Cereals & Foodstuff Supplies',
    icon: '🌾',
    tagline: 'Bulk Grain Supply, Institutional Food Provisions, Emergency Relief & Distribution',
    description: 'Reliable agricultural logistics division providing certified bulk grains, fortified flour, pulses, cooking oils, and contracted institutional food provisions for schools, hospitals, and relief agencies.',
    badge: 'KEBS Tested & Certified Dry Commodities',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Food Commodities & Staple Products',
        items: [
          'Grade-1 White & Yellow Maize (90kg bags)',
          'Fortified Maize meal & whole maize flour',
          'Dry beans (Yellow, Rosecoco, Nyayo, Mwitemania)',
          'Green grams (Ndengu), Sorghum & Millet',
          'Long-grain & Pishori Rice (25kg & 50kg)',
          'Wheat products, baking flour & pasta',
          'Fortified Vegetable Cooking Oil & pure fats',
          'Iodized salt, sugar & dry institutional food commodities',
        ],
      },
      {
        title: 'Supply, Logistics & Distribution Services',
        items: [
          'Bulk farm-gate procurement & nationwide freight transport',
          'Hygienic food handling, moisture testing & tamper-evident packaging',
          'Institutional food-supply schedules & emergency relief distribution',
          'Farmer cooperative linkages & guaranteed grain aggregation',
        ],
      },
      {
        title: 'Institutional Feeding Programmes',
        items: [
          'Primary & secondary school feeding contract provisions',
          'Hospital & healthcare dietary commodity supply',
          'Public institution & vocational training centre food supplies',
          'Relief-food distribution & disaster response framework agreements',
        ],
      },
    ],
    pricingModel: 'Framework Supply Contract',
    leadTime: 'Scheduled Bulk Deliveries',
  },

  {
    id: 'poultry-animal-feeds',
    code: 'L',
    name: 'Poultry Products & Animal Feeds',
    icon: '🐔',
    tagline: 'High-Yield Formulated Feeds, Day-Old Chicks, Livestock Nutrition & Advisory',
    description: 'Precision livestock nutrition and poultry supplies. Providing scientifically balanced feeds, commercial day-old chick coordination, mineral concentrates, and on-farm productivity advisory.',
    badge: 'KEBS Certified Animal Nutrition',
    accentColor: '#566944',
    categories: [
      {
        title: 'Poultry Feeds & Nutritional Supplements',
        items: [
          'Chick Mash (0 - 8 weeks high protein formula)',
          'Growers Mash (8 - 18 weeks balanced development)',
          'Layers Mash (18+ weeks high calcium egg production)',
          'Broiler Starter, Grower & Finisher formulated feeds',
          'Nutritional feed additives, vitamins & mineral premixes',
        ],
      },
      {
        title: 'Poultry Products & Day-Old Chicks',
        items: [
          'Day-old chick coordination (Layers, Broilers & Kienyeji improved)',
          'Commercial table eggs & hatching egg supply',
          'Dressed chicken supply for institutions & hospitality',
        ],
      },
      {
        title: 'Livestock Feeds & Concentrates',
        items: [
          'High-yield Dairy Meal (Standard & Premium)',
          'Cattle feed concentrates, calf starter pellets & molasses feeds',
          'Mineral salt licks, DCP & calcium supplements',
          'Dairy goat pellets & sheep fattening feeds',
        ],
      },
      {
        title: 'Agricultural Support & Farm Planning',
        items: [
          'Bulk feed procurement & scheduled on-farm delivery',
          'Feed-utilization efficiency advisory & livestock productivity audits',
          'Farmer linkages with veterinary and animal-health products',
        ],
      },
    ],
    pricingModel: 'Fixed Rate / Unit Price',
    leadTime: 'Weekly / Bi-Weekly Schedules',
  },

  {
    id: 'community-development-special-programs',
    code: 'M',
    name: 'Special Programs & Community Development',
    icon: '🤝',
    tagline: 'Youth Empowerment, Women Inclusion, Civic Engagement & Social Protection',
    description: 'Catalyzing sustainable community transformation through structured entrepreneurship training, civic governance forums, social protection initiatives, and community infrastructure rehabilitation.',
    badge: 'Community Impact Leader',
    accentColor: '#4A346A',
    categories: [
      {
        title: 'Economic Inclusion & Empowerment',
        items: [
          'Youth skills development, vocational apprenticeships & incubation',
          'Women economic empowerment & financial literacy training',
          'Self-Help Group (SHG) & cooperative enterprise support',
          'Livelihood diversification & micro-grant project management',
        ],
      },
      {
        title: 'Governance & Civic Engagement',
        items: [
          'Civic education & devolved governance awareness campaigns',
          'Public participation facilitation & multi-stakeholder forums',
          'Integrity, transparency & social audit monitoring',
          'Community-institutional dialogue platforms',
        ],
      },
      {
        title: 'Social Development & Resilience',
        items: [
          'Community health outreach, hygiene & WASH awareness campaigns',
          'Education support initiatives & school mentoring programs',
          'Disaster risk reduction & grassroots climate-adaptation programs',
          'Community infrastructure improvement & water access rehabilitation',
        ],
      },
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: 'Program Multi-Year / Phased',
  },

  {
    id: 'landscaping-cleaning',
    code: 'N',
    name: 'Landscaping & Cleaning',
    icon: '🌿',
    tagline: 'Landscape Architecture, Grounds Maintenance, Post-Construction & Deep Cleaning',
    description: 'Transforming commercial grounds and maintaining pristine corporate environments. Providing landscape design, tree planting, compound greening, deep hygiene sanitization, and janitorial operations.',
    badge: 'Pristine Hygiene & Aesthetics',
    accentColor: '#566944',
    categories: [
      {
        title: 'Landscaping & Compound Greening',
        items: [
          'Landscape architecture design, 3D layout & implementation',
          'Lawn establishment (Kikuyu, Paspalum, Cape Royal) & mowing services',
          'Ornamental flower gardens, hedges & shrub design',
          'Institutional compound leveling, site clearing & bush clearing',
          'Compound drainage improvement & paved walkway integration',
          'Environmental greening, shade tree planting & nursery supply',
        ],
      },
      {
        title: 'Professional Cleaning & Janitorial Operations',
        items: [
          'Commercial office & institutional daily janitorial maintenance',
          'Post-construction heavy-duty cleaning & debris clearing',
          'Deep carpet cleaning, upholstery extraction & tile scrubbing',
          'Public facility, hospital & washroom sanitation services',
          'Safe waste collection & environmental disposal coordination',
          'Supply of industrial cleaning detergents & consumables',
          'Professional fumigation & pest-control coordination',
        ],
      },
    ],
    pricingModel: 'Monthly Retainer',
    leadTime: 'Within 24 Hours',
  },

  {
    id: 'software-digital-solutions',
    code: 'SW',
    name: 'Software Development & Digital Solutions',
    icon: '🚀',
    tagline: 'Custom Web Apps, Enterprise ERP/CRM, Mobile Applications, AI & Cloud Systems',
    description: 'GELWO’s premier digital engineering division. Architecting bespoke Next.js web applications, mobile apps, enterprise ERPs, automated quotation engines, cloud architectures, and AI business automations.',
    badge: 'Digital Innovation Engine',
    accentColor: '#4A346A',
    categories: [
      {
        title: '💻 1. Custom Website Development',
        items: [
          'Corporate & company-profile websites with dynamic CMS',
          'Institutional, NGO, University & Government portals',
          'Hotel, tourism, restaurant & online booking websites',
          'High-converting landing pages & service-request platforms',
          'Customer portals with secure authentication & payment processing',
        ],
      },
      {
        title: '📱 2. Web & Mobile Application Development',
        items: [
          'Interactive business dashboards & administrative backends',
          'Employee, procurement & workflow management web apps',
          'Native & cross-platform Android & iOS mobile applications',
          'Field-worker data collection, GPS tracking & delivery mobile apps',
          'Customer account management & booking mobile applications',
        ],
      },
      {
        title: '🏢 3. Enterprise Business Management Systems (ERP/CRM)',
        items: [
          'Custom ERP systems tailored to East African operational workflows',
          'CRM, lead pipeline, customer loyalty & support ticketing',
          'HR & Payroll management with statutory KRA/NHIF/NSSF calculations',
          'Point-of-Sale (POS), inventory & warehouse barcoding systems',
          'Procurement, supply chain & fleet-management tracking',
          'School, hospital, hotel & SACCO cooperative management platforms',
        ],
      },
      {
        title: '🛒 4. E-Commerce, Billing & API Integrations',
        items: [
          'Custom product catalogues, shopping carts & secure checkout',
          'M-Pesa STK Push, Card, Airtel Money & bank payment gateway integrations',
          'Automated invoice generation, PDF receipts & SMS/Email notifications',
          'RESTful API architecture & third-party SaaS system integrations',
          'IoT device telemetry & physical security system digital bridges',
        ],
      },
      {
        title: '🤖 5. AI Solutions & Business Automation',
        items: [
          'Intelligent AI customer assistants & conversational chatbots',
          'AI automated quotation engines & cost estimators',
          'Document OCR, automated data extraction & reporting engines',
          'Automated approval workflows, stock alerts & client follow-ups',
        ],
      },
      {
        title: '🗄️ 6. Cloud Infrastructure, Security & Maintenance',
        items: [
          'PostgreSQL, Supabase & cloud database architecture with automated backups',
          'Vercel, AWS & hybrid enterprise cloud hosting deployment',
          'Role-based access control (RBAC), data encryption & audit logging',
          'Ongoing software maintenance, security patches, SLA monitoring & upgrades',
        ],
      },
    ],
    supportingServices: [
      'UI/UX Prototyping & Figma Wireframing',
      'System Architecture & Database Schema Design',
      'Code Audits & Performance Optimization',
      'API Documentation & End-User Training',
      'Dedicated Post-Launch SLA & DevOps Support',
    ],
    pricingModel: 'Custom Quotation Engine',
    leadTime: '2 - 6 Weeks (Agile Sprints)',
  },
];
