import { Project, Service, JournalArticle, StudioLocation } from "./types";

// Brochure PDF Imports
import govindrajPdf from "./assets/GovindrajBrouchure(1).pdf";
import amrutsiddhiPdf from "./assets/Amrutsiddhi Leafl.pdf";
import oasisVatikaPdf from "./assets/OasisVatikaLandDevelopersPomplate.pdf";
import plots from "./assets/plots.png";
import bank from "./assets/bank.png";
import farm from "./assets/farm.png";
import emi from "./assets/emi.png";
// ── Cloudinary Image URLs ─────────────────────────────────
const govindrajImg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015615/govindraj_uz2ohu.png";
const govindraj1Img =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015614/govindraj1_gnowqo.png";
const amrutsiddhiImg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015613/amrutsiddhi_mgfq9i.png";
const amrutsiddhi1Img =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015616/amrutsiddhi1_edrt72.png";
const amrutsiddhi2Img =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015614/amrutsiddhi2_twxa02.png";
const plotsBg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015615/govindraj_uz2ohu.png";
const buildingBg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015614/govindraj1_gnowqo.png";
const farmhouseBg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015614/amrutsiddhi2_twxa02.png";
const flagshipLayoutImg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015615/image_h4twm0.png";

const oasisVatikaImg =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1791181764/image1_xy71rh.png";
const oasisVatika1Img =
  "https://res.cloudinary.com/ds1y9wivv/image/upload/v1791181838/image2_yqr9pc.png";  

export const projects: Project[] = [
  {
    id: "proj-govindraj-nagari",
    title: "Govindraj Nagari",
    category: "Premium",
    location: "Mouza-Tamaswadi, Wardha Road Corridor, Nagpur",
    area: "97 Plots | 23,856 SQ.M.",
    scope: "NATP Sanctioned • Ready to Registry • Bank Finance",
    year: "2026",
    imageUrl: govindrajImg,
    galleryImages: [govindrajImg, govindraj1Img],
    layoutMapImages: [govindrajPdf],
    description:
      "Govindraj Nagari is an NATP Sanctioned residential layout situated on Kh.No. 31, 32, 33 at Mouza-Tamaswadi, just 2 KM from Wardha-Nagpur Road. Spanning 97 premium residential plots over 23,856 SQ.M. with 4,214 SQ.M. reserved open green space, this layout is completely Ready to Registry with full Bank Finance availability.",
    isFeatured: true,

    // Extended Project Details
    developer: "Aryans Realtors",
    taglines: [
      "A TRADITION OF TRUST",
      "Buy your Home Plots",
      "Build your customized Villas",
    ],
    statusFinance: [
      "READY TO REGISTRY",
      "BANK FINANCE AVAILABLE",
      "NATP SANCTIONED",
    ],
    sanctionStatus: "NATP SANCTIONED",
    totalPlots: 97,
    plotAreaText: "23,856.26 SQ.M. (Total 97 Plots)",
    openSpaceArea: "4,214.06 SQ.M.",
    publicUtilityArea: "1,209.00 SQ.M.",
    amenities: [
      "Grand Entrance Gate",
      "Wide Tar Road Network",
      "Electric Pole Network",
      "Lush Plantation & Greenery",
      "Layout Boundary Fencing",
      "Landscaped Garden Park",
    ],
    distances: [
      { label: "Wardha-Nagpur Road", distance: "2 KM" },
      { label: "Add. Butibori MIDC", distance: "5 KM" },
      { label: "Purti Sakar Karkhana", distance: "5 KM" },
      { label: "Butibori Junction", distance: "13 KM" },
      { label: "Nagpur International Airport", distance: "36 KM" },
    ],
    landmarks: [
      "Mumbai Samruddhi Marg Expressway",
      "Chandrapur-Wardha-Nagpur Highway",
      "215 MW Energy Power Plant",
      "Palloti College & Mountfort School",
      "Suretech Hospital",
      "MIHAN SEZ Tech Hub",
      "Sandesh City & Sahara City",
      "Ruchi Soya Industries",
      "Tamaswadi & Bolhar Village",
    ],
    developerContact: {
      office:
        "Corporate Office: Block No. 1, 2 & 3, Shanti Apartment, Chinchbhavan, Wardha Road, Nagpur-440005",
      phone: ["+91 8767010825"],
      email: "aryansbuildcon@gmail.com",
    },
    locationQrCode: undefined,
    googleMapsUrl:
      "https://maps.google.com/?q=Mouza+Tamaswadi+Wardha+Road+Nagpur",
  },

  {
    id: "proj-amrutsiddhi",
    title: "Amrutsiddhi",
    category: "Investment",
    location: "Mouza Deoli (Nistane), Kh. No. 21/1,4,5, Nagpur",
    area: "47 Acres | 463 Plots",
    scope: "NATP Sanctioned Gated Community",
    year: "2026",
    imageUrl: amrutsiddhiImg,
    galleryImages: [amrutsiddhiImg, amrutsiddhi1Img, amrutsiddhi2Img],
    layoutMapImages: [amrutsiddhiPdf],
    description:
      "Amrutsiddhi is a sprawling 47-acre gated plotted community featuring 463 premium demarcated plots at Mouza Deoli (Nistane). Officially Town Planning sanctioned with 20% land dedicated to open green parks and public utilities, Amrutsiddhi offers unmatched connectivity just 5 minutes from Butibori Metro Station and 15 minutes from Samruddhi Circle.",
    isFeatured: true,

    // Extended Project Details
    developer: "Aryans Buildcon",
    taglines: [
      "47-Acre Sprawling Gated Community",
      "NATP Compliant Layout",
      "Positioned Next to New Nagpur IBFC",
    ],
    statusFinance: [
      "NATP SANCTIONED",
      "20% RESERVED OPEN SPACE & PU",
      "BANK FINANCE ASSISTANCE",
    ],
    sanctionStatus: "NATP SANCTIONED",
    totalPlots: 463,
    plotAreaText: "47 Acres Gated Plotted Community",
    openSpaceArea: "20% Reserved Land (Open Space & PU)",
    publicUtilityArea: "Fully Sanctioned PU Land",
    amenities: [
      "NATP Sanctioned Layout",
      "Precisely Demarcated Plot Boundaries",
      "Inbuilt Wide Tar Road Network",
      "Electricity Supply Connection Points",
      "Common Water Well System",
      "Landscaped & Well-Fenced Boundaries",
      "Grand Gated Security Entrance",
    ],
    distances: [
      { label: "Butibori Metro Station", distance: "5 Mins" },
      { label: "Samruddhi Circle", distance: "15 Mins" },
      { label: "Nagpur International Airport", distance: "25 Mins" },
    ],
    landmarks: [
      "New Nagpur IBFC (1,710 Acres International Business Hub - ₹6,500 Cr NMRDA Project)",
      "Nagpur Metro Extension Corridor",
      "Golden Arch Highway (Proposed 3rd Outer Ring Road)",
      "Vardhaan Lithium Refinery (₹42,535 Cr Investment)",
      "Avaada Group Solar Factory (₹13,650 Cr Investment)",
      "Jupiter International Solar Cell Unit (₹10,900 Cr)",
      "JSW Renewable Technologies (₹10,100 Cr)",
      "Sangam Solar One (₹8,000 Cr)",
      "Raheja Township (153 Acres), Godrej & Kalpataru Townships",
      "Venkatesh City & Vrindavan City",
      "Patanjali Hub & MIHAN Cargo Airport",
    ],
    developerContact: {
      office:
        "Developer Office: Plot No. 22, Guruchhaya Housing Society, DP Road, New Manish Nagar, Nagpur-440035",
      phone: ["+91 8767010825"],
      email: "aryansbuildcon@gmail.com",
    },
    locationQrCode: undefined,
    googleMapsUrl: "https://maps.google.com/?q=Mouza+Deoli+Nistane+Nagpur",
  },
  {
    id: "proj-oasis-vatika-shirul",
    title: "Oasis-Vatika Shirul",
    category: "Premium",
    location: "Mouza-Shirul, Tah. Hingna, Dist. Nagpur",
    area: "89 Residential Plots",
    scope: "NMRDA Sanctioned • RERA Approved • 90% Bank Finance Available",
    year: "2026",
    imageUrl: oasisVatikaImg,
    galleryImages: [oasisVatikaImg, oasisVatika1Img],
    layoutMapImages: [oasisVatikaPdf],

    description:
      "Oasis-Vatika Shirul is a sanctioned residential layout situated on Kh. No. 120, PH No. 71, Mouza-Shirul, Tah. Hingna, Dist. Nagpur. The project offers 89 residential plots with an open space of 1,815.092 SQ.M. and is NMRDA sanctioned and RERA approved. ",
    isFeatured: true,

    // Extended Project Details
    developer: "Oasis-Vatika",

    taglines: [
      "A TRADITION OF TRUST",
      "Buy your Home Plots",
      "Build your Customized Villas",
    ],

    statusFinance: [
      "BOOKING OPEN",
      "90% BANK FINANCE AVAILABLE",
      "NMRDA SANCTIONED",
      "RERA APPROVED PROJECT",
    ],

    sanctionStatus: "NMRDA SANCTIONED",

    totalPlots: 89,

    plotAreaText:
      "89 Residential Plots | Plot Sizes as per Sanctioned Layout Plan",

    openSpaceArea: "1,815.092 SQ.M.",

    publicUtilityArea: undefined,

    amenities: [
      "Electricity",
      "Sewerage Line",
      "Cement Road",
      "Drinking Water",
      "Garden",
      "Tree Plantation",
    ],

    distances: [
      {
        label: "Tulsiramji Gaikwad Patil College of Engineering",
        distance: "1.5 KM",
      },
      {
        label: "Borkhedi Metro Station",
        distance: "1.5 KM",
      },
      {
        label: "Butibori MIDC",
        distance: "4 KM",
      },
      {
        label: "VCA Stadium",
        distance: "7 KM",
      },
      {
        label: "International Airport (Dr. Babasaheb Ambedkar)",
        distance: "16 KM",
      },
    ],

    landmarks: [
      "Third Ring Road",
      "Nearby Metro Station",
      "Tulsiramji Gaikwad Patil College of Engineering",
      "Borkhedi Metro Station",
      "Butibori MIDC",
      "VCA Stadium",
      "Nagpur International Airport",
    ],

    developerContact: {
      office:
        "Developer Office: Plot No. 22, Guruchhaya Housing Society, DP Road, New Manish Nagar, Nagpur-440035",
      phone: ["+91 8767010825"],
      email: "aryansbuildcon@gmail.com",
    },

    locationQrCode: undefined,

    googleMapsUrl: "https://maps.google.com/?q=Shirul+Hingna+Nagpur",
  },
];

export const services: Service[] = [
  {
    id: "serv-01",
    title: "Ready-to-Register Plots",
    description:
      "We believe in absolute transparency. Every single plot in our developments is fully cleared, legally checked, and immediately ready for official registration so you can purchase with absolute confidence.",
    deliverables: [
      "Clear Title Verification & Search Reports",
      "Individual Boundary Demarcation Boards",
      "Immediate Legal Conveyance & Registration support",
    ],
    duration: "Immediate",
    image: plots,
  },
  {
    id: "serv-02",
    title: "Bank Finance Assistance",
    description:
      "Owning your dream plot shouldn't be a financial burden. We maintain trusted relationships with national and private banks to secure easy and fast plot loan approvals at highly competitive interest rates.",
    deliverables: [
      "Pre-Approved Layout Projects by Major Banks",
      "Seamless Documentation Processing Service",
      "Flexible Payment & Installment Guidance",
    ],
    duration: "1–2 Weeks",
    image: bank,
  },
  {
    id: "serv-03",
    title: "Prime Growth Corridors",
    description:
      "Location drives real estate value. We hand-select premium development land along Nagpur's fastest-growing corridors (Wardha Road, MIHAN, Hingna MIDC) to guarantee maximum appreciation and rental yield potential.",
    deliverables: [
      "Rapid Infrastructure Development Alignment",
      "Proximity to Expressways, Airport & Metro Stations",
      "High-Growth Investment Consultation Reports",
    ],
    duration: "Ongoing",
    image: farm,
  },
  {
    id: "serv-04",
    title: "24-Month 0% Interest EMI Plan",
    description:
      "Make your property purchase easier with a flexible 24-month EMI facility at 0% interest, designed to provide convenient payment options with a 30% to 50% down payment.",
    deliverables: [
      "24-Month Flexible EMI Facility",
      "0% Rate of Interest",
      "30% to 50% Down Payment Options",
    ],
    duration: "24 Months",
    image: emi,
  },
];

export const studioLocations: StudioLocation[] = [
  {
    city: "Head Office (New Manish Nagar)",
    address:
      "Plot No. 22, Guruchhaya Housing Society, DP Road, New Manish Nagar, Nagpur-440035",
    phone: "+91 8767010825",
    email: "aryansbuildcon@gmail.com",
  },
];
