import { StaticImageData } from "next/image";

import alarmImg from "@/assets/alarmProject.jpg";
import libyaZoneDashImg from "@/assets/libyaZoneDashboardProject.jpg";
import libyaZoneWebImg from "@/assets/libyaZoneWebsiteProject.jpg";
import newZeroImg from "@/assets/newZeroProject.png";
import suqAljameuhDashImg from "@/assets/suqAljameuhDashboardProject.png";
import suqAljameuhWebImg from "@/assets/suqAljameuhWebsiteProject.jpg";

export interface ProjectDetailSection {
  heading: string;
  body: string | string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  descPrefix: string;
  descSuffix: string;
  image: StaticImageData;
  category: string;
  // Extended Details
  clientFrom?: string;
  duration?: string;
  service?: string;
  summary?: string;
  details?: ProjectDetailSection[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "newzero-web",
    title: "NewZero Car Care Platform",
    descPrefix: "Premium Car Wash & Detailing Booking Platform,",
    descSuffix:
      "allowing customers across Saudi Arabia to discover services, book appointments at multiple branches, and manage their car care packages online.",
    image: newZeroImg,
    category: "Cars",
    clientFrom: "Saudi Arabia",
    duration: "4 Months",
    service: "Web Platform",
    summary: "NewZero is a premium car care and detailing booking website designed to provide a seamless scheduling experience for customers. The platform enables users to effortlessly explore service packages, book appointments at any of the seven branches, manage their memberships, and make secure online payments.",
    details: [
      {
        heading: "Booking & Services",
        body: [
          "**Service Catalog:** Browse a comprehensive menu of premium car wash, detailing, and polishing services with transparent pricing.",
          "**Branch Locator:** Easily discover any of the seven branches, view their precise locations on an interactive map, and check real-time availability.",
          "**Online Scheduling:** A frictionless booking system that lets customers select their preferred date, time slot, and branch for their car care appointment."
        ]
      },
      {
        heading: "User Experience & Accounts",
        body: [
          "**Customer Profiles:** Dedicated user dashboards to track upcoming appointments, view service history, and manage personal vehicles.",
          "**Loyalty & Rewards:** A built-in tier system that rewards frequent customers with exclusive discounts and priority bookings.",
          "**Automated Reminders:** Receive timely SMS and email notifications for upcoming appointments or exclusive seasonal offers."
        ]
      },
      {
        heading: "Payments & Subscriptions",
        body: [
          "**Secure Checkout:** Integration with trusted local payment gateways to provide a safe, seamless online payment experience.",
          "**Care Packages:** The ability to subscribe to monthly or tier-based car care packages for automated, hassle-free maintenance.",
          "**Invoice Management:** Instantly download digital receipts and track past payments directly from the user dashboard."
        ]
      }
    ]
  },
  {
    id: "libyazone-web",
    title: "LibyaZone Global Shopping Platform",
    descPrefix: "International Shopping & Door-to-Door Shipping Storefront,",
    descSuffix:
      "letting shoppers in Libya order products from worldwide stores with multi-currency pricing, upfront shipping estimates, and live shipment tracking.",
    image: libyaZoneWebImg,
    category: "E-Commerce",
    clientFrom: "Libya",
    duration: "3 Months",
    service: "Web Platform",
    summary: "LibyaZone is a premier global e-commerce storefront and mobile app designed to bridge the gap between Libyan consumers and international markets. The platform empowers users to effortlessly browse, order, and ship unique products from around the world directly to their doorstep in Libya, ensuring a seamless, transparent, and premium cross-border shopping experience.",
    details: [
      {
        heading: "Global Discovery & Shopping",
        body: [
          "**Unified Product Catalog:** Browse thousands of curated international products from global retailers, all translated and localized for the Libyan market.",
          "**Smart Search & Filters:** Advanced search capabilities with robust filtering by brand, category, origin country, and price range to easily find unique foreign goods.",
          "**Personalized Recommendations:** An intelligent recommendation engine that suggests trending global products and exclusive deals based on user preferences and browsing history."
        ]
      },
      {
        heading: "Transparent Checkout & Shipping",
        body: [
          "**Upfront Cost Calculator:** A built-in calculator that provides users with exact, transparent estimates for international shipping, customs, and local delivery before checkout.",
          "**Multi-Currency Support:** View product prices seamlessly in local currency alongside original foreign currencies for complete financial transparency.",
          "**Door-to-Door Tracking:** Live, step-by-step shipment tracking allowing users to monitor their packages from the overseas warehouse all the way to their front door in Libya."
        ]
      },
      {
        heading: "User Accounts & Financials",
        body: [
          "**Digital Wallet Integration:** A secure in-app wallet system where users can deposit funds, track their spending, and receive instant refunds for returned items.",
          "**Order Management:** Comprehensive user dashboards to view past purchases, download invoices, and quickly reorder favorite international items.",
          "**Secure Payment Gateways:** Integration with trusted local and international payment methods to ensure a smooth, safe, and reliable checkout process."
        ]
      },
      {
        heading: "Customer Engagement",
        body: [
          "**Interactive Reviews:** A community-driven rating system allowing buyers to share their experiences, post photos, and rate the quality of imported goods.",
          "**Real-Time Notifications:** Instant push notifications and email updates sent directly to users regarding flash sales, price drops, and crucial order status changes.",
          "**24/7 Customer Support:** Integrated live chat and helpdesk support to assist users with international sizing, product inquiries, and shipping questions."
        ]
      }
    ]
  },
  {
    id: "libyazone-dash",
    title: "LibyaZone Admin Dashboard",
    descPrefix: "Cross-Border Orders & Shipping Operations Console,",
    descSuffix:
      "handling catalog and pricing rules, end-to-end order tracking from purchase abroad to delivery, wallet and refund management, and revenue reporting.",
    image: libyaZoneDashImg,
    category: "Operations Console",
    clientFrom: "Libya",
    duration: "5 Months",
    service: "SaaS Dashboard",
    summary: "The LibyaZone Admin Dashboard is a comprehensive cross-border operations console designed to manage international e-commerce and shipping. It provides administrators with a centralized control center to oversee the entire lifecycle of foreign product orders, from international procurement to local door-to-door delivery, while seamlessly managing multi-currency pricing and user wallets.",
    details: [
      {
        heading: "Order & Shipping Operations",
        body: [
          "**Cross-Border Tracking:** End-to-end visibility of orders, tracking status from overseas warehouse arrival to international freight and final local delivery.",
          "**Customs & Clearance:** Integrated tools to manage customs documentation, calculate import duties, and update clearance statuses for international shipments.",
          "**Last-Mile Logistics:** Manage local delivery fleets, assign optimized routes to drivers, and track door-to-door delivery performance."
        ]
      },
      {
        heading: "Catalog & Pricing Engine",
        body: [
          "**Dynamic Pricing:** Automated pricing rules that adjust product costs based on real-time exchange rates, shipping weight, and international taxes.",
          "**Catalog Moderation:** Review and approve imported product listings, update Arabic translations, and automatically filter out prohibited or restricted items.",
          "**Shipping Calculators:** Configure advanced weight and volumetric algorithms to provide customers with highly accurate upfront international shipping estimates."
        ]
      },
      {
        heading: "Financial & Wallet Management",
        body: [
          "**Digital Wallets:** Complete oversight of user wallet balances, processing manual top-ups, and handling secure withdrawal or transfer requests.",
          "**Refunds & Disputes:** A streamlined system for handling international returns, damaged goods claims, and processing partial or full refunds directly to user wallets.",
          "**Revenue Analytics:** Comprehensive financial reporting detailing profit margins, international shipping overheads, and overall revenue trends."
        ]
      },
      {
        heading: "Customer Support & Notifications",
        body: [
          "**User Verification:** Manage user accounts, verify identities for high-value cross-border transactions, and handle account security.",
          "**Integrated Helpdesk:** A centralized ticketing system to efficiently resolve customer inquiries regarding delayed shipments, customs holds, or product issues.",
          "**Automated Alerts:** Configure and send automated SMS and email notifications to customers at critical shipment milestones (e.g., 'Cleared Customs', 'Out for Delivery')."
        ]
      }
    ]
  },
  {
    id: "suq-web",
    title: "Souq Al-Jumaa Marketplace",
    descPrefix: "Peer-to-Peer Classifieds Platform for Web & Mobile,",
    descSuffix:
      "with photo-rich listings, category, location and condition filters, direct buyer-seller messaging, and a two-way rating system.",
    image: suqAljameuhWebImg,
    category: "E-Commerce",
    clientFrom: "Saudi Arabia",
    duration: "2 Months",
    service: "Marketplace",
    summary: "Souq Al-Jumaa is a premier peer-to-peer classifieds marketplace designed to connect buyers and sellers seamlessly across Libya. Available on both web and mobile, the platform offers an intuitive, secure, and highly localized ecosystem for users to list items, discover deals, and negotiate directly in real-time.",
    details: [
      {
        heading: "Listing & Discovery Experience",
        body: [
          "**Frictionless Ad Creation:** A simple, intuitive interface allowing sellers to easily upload multiple high-resolution photos, add comprehensive descriptions, and post their ads in seconds.",
          "**Advanced Search & Filtering:** Powerful search capabilities enabling buyers to filter listings effortlessly by specific categories, precise geographic locations, price ranges, and product conditions.",
          "**Smart Recommendations:** An intelligent algorithm that suggests relevant, localized listings and trending items based on the user's browsing habits and search history."
        ]
      },
      {
        heading: "Communication & Negotiation",
        body: [
          "**Real-Time Direct Messaging:** An integrated, secure live chat system allowing instant, direct communication between buyers and sellers to negotiate prices and arrange meetups effortlessly.",
          "**In-App Offers:** A structured bidding system where buyers can submit formal price offers directly on listings, helping sellers manage multiple negotiations efficiently.",
          "**Push Notifications:** Instant alerts notifying users of new messages, counter-offers, or status changes to their saved and watched listings."
        ]
      },
      {
        heading: "Trust & Community Safety",
        body: [
          "**Two-Way Rating System:** A comprehensive evaluation system where both buyers and sellers can rate each other after a transaction, building community trust and highlighting reputable users.",
          "**Verified Profiles:** Secure account verification through phone numbers and email to combat fraud and ensure all platform participants are genuine.",
          "**Report & Flagging Tools:** Community-driven safety features allowing users to instantly flag suspicious listings or inappropriate behavior for administrator review."
        ]
      },
      {
        heading: "User Engagement & Utilities",
        body: [
          "**Wishlists & Favorites:** Allows users to save favorite listings, track price drops, and compare multiple items easily before making a purchasing decision.",
          "**Social Sharing:** Built-in sharing tools empowering sellers to distribute their listings across popular social media networks (like Facebook and WhatsApp) to reach a wider audience quickly.",
          "**Location-Based Browsing:** Interactive map integrations and proximity-based sorting to help users discover the best local deals right in their own neighborhoods."
        ]
      }
    ]
  },
  {
    id: "suq-dash",
    title: "Souq Al-Jumaa Admin Dashboard",
    descPrefix: "Classifieds Moderation & Ad Monetization Console,",
    descSuffix:
      "managing listings and paid placements, a report and abuse review queue, live chat oversight, user tiering, and traffic and engagement analytics.",
    image: suqAljameuhDashImg,
    category: "SaaS Dashboard",
    clientFrom: "Saudi Arabia",
    duration: "6 Months",
    service: "Dashboard",
    summary: "The Souq Al-Jumaa Admin Dashboard provides a comprehensive suite of tools to efficiently manage, monitor, and monetize the classifieds platform. It empowers administrators to oversee content, handle user interactions, and optimize the overall performance and safety of the marketplace.",
    details: [
      {
        heading: "Ads & Content Management",
        body: [
          "**Ads Management:** Complete control over live classifieds, including reviewing, approving, editing, deleting, and strategically placing ads across the platform.",
          "**Content Management:** Easily add and edit dynamic website pages, allowing customization of text, images, and promotional links to keep the platform fresh.",
          "**Paid Ads System:** Comprehensive support for premium, promoted listings with a streamlined interface for managing billing, invoicing, and transactions.",
          "**Ad Customization:** Ability to schedule specific promotional campaigns or target featured ads toward particular user demographics."
        ]
      },
      {
        heading: "Moderation & User Oversight",
        body: [
          "**Live Chat Monitoring:** Real-time oversight of open chat conversations between buyers and sellers to ensure community safety and policy compliance.",
          "**User Tracking & Tiering:** Monitor user activities, logins, and engagement levels. Categorize users based on their activity to improve targeting and platform trust.",
          "**Abuse Reporting System:** A dedicated queue to track, investigate, and resolve user-submitted reports regarding suspicious listings, fraud, or inappropriate behavior.",
          "**Technical Support:** Integrated helpdesk tools to handle customer inquiries, provide technical assistance, and resolve platform issues effectively."
        ]
      },
      {
        heading: "Analytics & System Operations",
        body: [
          "**Reports & Analytics:** Generate periodic reports on platform performance, user engagement, ad click-through rates, and overall traffic trends.",
          "**Notification Engine:** Instant push alerts sent directly to administrators regarding critical platform events, new abuse reports, or system anomalies.",
          "**Social Media Integration:** Built-in tools to easily share popular or featured classifieds across social networks to drive external traffic and engagement.",
          "**Data Security & Performance:** A robust security infrastructure to protect sensitive user data, coupled with effective server management tools to ensure optimal platform speed and reliability."
        ]
      }
    ]
  },
  {
    id: "alaram-pharmacy",
    title: "Alaram Pharmacy Management System",
    descPrefix: "Pharmacy Operations Platform with Contraindication Alerts,",
    descSuffix:
      "combining patient condition records, real-time restricted-medication warnings at point of sale, precise inventory tracking, and sales performance reports.",
    image: alarmImg,
    category: "Healthcare System",
    clientFrom: "Egypt",
    duration: "6 Months",
    service: "System Design",
    summary: `"Alaram" is an integrated pharmacy management system aiming to improve the efficiency of internal operations and provide better customer service. The system includes features for inventory management, disease tracking, and sales recording, with a focus on ensuring restricted medications are not sold to specific patients.`,
    details: [
      {
        heading: "Features of 'Alaram'",
        body: [
          "**Inventory Management:** 'Alaram' allows pharmacies to track inventory accurately, making it easier for staff to manage medical supplies and ensure continuous availability of medications.",
          "**Recording Diseases & Drug Interactions:** The system allows recording data on patients' chronic diseases and potential drug interactions, facilitating improved quality of pharmaceutical service.",
          "**Advanced Alert System (Alarm):** The system includes an advanced alert mechanism that allows the pharmacy to specify restricted medications for a specific patient, and alerts the staff if an attempt is made to sell these medications to the patient.",
          "**Tracking Medication Sales:** 'Alaram' provides periodic reports on medication sales, helping the pharmacy understand demand patterns and improve supply and demand strategies.",
          "**Improving Customer Experience:** The system enhances the customer experience by providing accurate information about medications and improving service delivery efficiency."
        ]
      },
      {
        heading: "How 'Alaram' Works",
        body: [
          "**Patient Registration:** Patient information is registered, including their chronic diseases and medications restricted for them.",
          "**Inventory Tracking:** The pharmacy's inventory is periodically tracked and information is updated on the system.",
          "**Restricted Medication Sales Alerts:** The alert system is configured to notify staff if they attempt to sell restricted medications to a specific patient.",
          "**Sales Recording & Reports:** All sales transactions are recorded, and periodic reports are generated to help monitor the pharmacy's performance."
        ]
      },
      {
        heading: "Benefits of 'Alaram'",
        body: [
          "Enhancing health safety for patients.",
          "Increasing efficiency in inventory management and distribution.",
          "Providing high-quality pharmaceutical services.",
          "Improving customer experience and building patients' trust in the pharmacy.",
          "By using 'Alaram', pharmacies become able to improve their performance and provide a safe and effective service to their patients."
        ]
      }
    ]
  },
];
