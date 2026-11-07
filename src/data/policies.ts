import { PolicyDocument } from "@/types/policy";

export const POLICIES_DATA: Record<string, PolicyDocument> = {
  privacy: {
    id: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "November 2026 (Demonstration Template)",
    introduction:
      "At Fragology, we are committed to honoring and safeguarding the personal privacy of our patrons. This document outlines our data collection, management, and security standards.",
    sections: [
      {
        id: "information-collected",
        title: "1. Information Collected",
        content: [
          "We collect personal data that you provide directly to us when navigating our boutique, creating an account, or communicating with our concierge.",
          "This includes your name, email address, postal shipping destination, billing information, and scent preference responses gathered through our diagnostic Scent Finder.",
        ],
      },
      {
        id: "account-and-orders",
        title: "2. Account & Order Information",
        content: [
          "When you place an order with Fragology (upon commercial phase enablement), transaction details are processed via secure encrypted payment gateways. We do not store raw credit card numbers on our application servers.",
          "Order history is preserved to facilitate customer care inquiries, track consignment status, and provide tailored fragrance recommendations.",
        ],
      },
      {
        id: "cookies-and-analytics",
        title: "3. Cookies & Session Storage",
        content: [
          "We utilize essential session cookies to remember your shopping bag state, currency preferences, and interface settings. Analytical cookies help us understand page navigation patterns to improve boutique responsiveness.",
          "You may adjust your browser preferences to restrict cookie storage, though certain interactive features may function with limited capacity.",
        ],
      },
      {
        id: "data-usage-and-sharing",
        title: "4. Data Usage & Sharing",
        content: [
          "Your personal information is used exclusively to fulfill orders, deliver client concierge services, and transmit brand monographs when you have explicitly subscribed.",
          "We never sell, rent, or trade your personal information to third-party marketing brokers. Data is shared solely with trusted logistics couriers and payment service providers strictly necessary to fulfill your purchases.",
        ],
      },
      {
        id: "security-and-rights",
        title: "5. Security & Customer Rights",
        content: [
          "We implement technical, physical, and administrative safeguards to protect your personal information against unauthorized access, loss, or alteration.",
          "Depending on your jurisdiction, you possess the right to access, rectify, or request the deletion of your personal data held in our systems by contacting our Data Protection Concierge.",
        ],
      },
      {
        id: "contact-reference",
        title: "6. Data Protection Inquiries",
        content: [
          "For privacy questions or data requests, please submit an inquiry via our Concierge Contact form with the subject 'Privacy Inquiry'.",
          "Note: This document represents a structural policy template. Specific legal entity disclosures and jurisdictional clauses will be configured prior to final production release.",
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms of Service",
    lastUpdated: "November 2026 (Demonstration Template)",
    introduction:
      "Please review these Terms of Service carefully before utilizing the Fragology online boutique. By accessing or interacting with our storefront, you acknowledge your agreement to these terms.",
    sections: [
      {
        id: "website-usage",
        title: "1. Boutique Usage & Access",
        content: [
          "Access to the Fragology website is granted on a temporary, revocable basis. We reserve the right to modify, suspend, or discontinue any feature, catalogue flacon, or service without prior notice.",
          "You agree not to misuse our systems, introduce malicious scripts, or attempt unauthorized access to customer databases or administrative endpoints.",
        ],
      },
      {
        id: "product-information",
        title: "2. Product Information & Accuracy",
        content: [
          "We strive to display olfactory pyramids, volume specifications, and flacon artwork as accurately as possible. However, subtle variations in botanical natural yields may occur between distillation batches.",
          "Demonstration products and catalog items displayed during preview phases are for illustrative purposes and do not constitute a binding unilateral contract of sale.",
        ],
      },
      {
        id: "pricing-and-orders",
        title: "3. Pricing & Order Acceptance",
        content: [
          "Prices for our fragrances are subject to adjustment without prior notification. In the event of an inadvertent technical pricing discrepancy, we reserve the right to cancel affected orders prior to carrier dispatch.",
          "An order confirmation email signifies receipt of your order request, not formal acceptance. Acceptance occurs upon carrier dispatch of the consignment.",
        ],
      },
      {
        id: "intellectual-property",
        title: "4. Intellectual Property Rights",
        content: [
          "All trademarks, brand trade dress, fragrance names, monographs, photography, and bespoke graphic compositions displayed on Fragology are the exclusive intellectual property of Fragology Maison.",
          "Reproduction, redistribution, or commercial exploitation without prior written authorization is strictly prohibited.",
        ],
      },
      {
        id: "limitation-of-liability",
        title: "5. Limitation of Liability",
        content: [
          "Fragology shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital boutique or products, within the limits permitted by applicable law.",
        ],
      },
      {
        id: "modifications-to-terms",
        title: "6. Modifications to Terms",
        content: [
          "We reserve the right to revise these Terms of Service at our discretion. Any revisions will be reflected with an updated timestamp on this page.",
          "Note: Final governing law, registered corporate entity, and statutory dispute resolution mechanisms will be designated prior to commercial launch.",
        ],
      },
    ],
  },

  shipping: {
    id: "shipping-policy",
    title: "Shipping & Climate Delivery",
    lastUpdated: "November 2026 (Demonstration Template)",
    introduction:
      "Fine perfumery demands climate vigilance throughout transit. Fragology partners with premium courier services to protect delicate volatile botanical accords from dispatch to delivery.",
    sections: [
      {
        id: "shipping-destinations",
        title: "1. Delivery Destinations",
        content: [
          "Fragology prepares shipments for domestic delivery and over 70 verified international destinations.",
          "Due to air transport regulations governing high-concentration alcohol perfumes (Dangerous Goods Class 3), certain remote island regions may require ground transit or specialized maritime logistics.",
        ],
      },
      {
        id: "processing-times",
        title: "2. Order Processing",
        content: [
          "Orders are carefully packed in our climate-regulated fulfillment atelier. Standard processing requires 1 to 2 business days prior to carrier handover.",
          "During private collection releases or seasonal holidays, fulfillment processing may require additional preparation time.",
        ],
      },
      {
        id: "delivery-methods",
        title: "3. Delivery Methods & Estimates",
        content: [
          "We provide Express Climate Courier delivery with signature upon receipt. Estimated transit schedules vary by destination country and are calculated at checkout.",
          "All parcels are tracked continuously. Temperature-shielding thermal linings are utilized during periods of peak summer heat.",
        ],
      },
      {
        id: "shipping-charges",
        title: "4. Shipping Charges & Complimentary Tiers",
        content: [
          "Complimentary express delivery is provided on qualifying orders exceeding established thresholds (to be finalized during commercial checkout deployment).",
          "For orders below the threshold, standard calculated courier tariffs apply based on destination postal zone.",
        ],
      },
      {
        id: "customs-and-duties",
        title: "5. Customs, Taxes & Import Duties",
        content: [
          "For international destinations, import tariffs, VAT, and brokerage fees are determined by the destination customs authority.",
          "Where supported by local customs agreements, duties are calculated and collected directly at checkout to avoid delivery delays.",
        ],
      },
      {
        id: "delivery-issues",
        title: "6. Damaged or Delayed Consignments",
        content: [
          "If your consignment experiences transit damage or abnormal carrier delay, notify our concierge within 48 hours of carrier notification so an immediate investigation can be initiated.",
        ],
      },
    ],
  },

  returns: {
    id: "returns-refunds",
    title: "Returns & Exchanges",
    lastUpdated: "November 2026 (Demonstration Template)",
    introduction:
      "We want your olfactory journey to be completely fulfilling. Below are the conditions governing returns, exchanges, and the Fragology skin-test guarantee.",
    sections: [
      {
        id: "return-eligibility",
        title: "1. Return Eligibility & The Skin-Test Guarantee",
        content: [
          "Every full presentation flacon is shipped with an identical matching 2ml test vial on the exterior of the presentation box.",
          "We invite you to test the scent on your skin using the sample vial first. Due to cosmetic hygiene standards, we accept returns only on full flacons whose original presentation cellophane wrap remains intact and unbroken.",
        ],
      },
      {
        id: "return-window",
        title: "2. Return Authorization Window",
        content: [
          "Return requests must be initiated within 30 days of confirmed delivery receipt.",
          "Items returned without prior concierge authorization or with broken packaging seals are ineligible for return.",
        ],
      },
      {
        id: "return-process",
        title: "3. The Return Process",
        content: [
          "Step 1: Contact our concierge team through the Concierge Contact page indicating your order reference code.",
          "Step 2: Receive your prepaid return shipping authorization label and instructions.",
          "Step 3: Securely repackage the unopened flacon in its original shipping carton and deliver it to the designated courier.",
        ],
      },
      {
        id: "refund-process",
        title: "4. Inspection & Refund Timeline",
        content: [
          "Upon receipt at our atelier, returned flacons undergo quality inspection to verify cellophane integrity.",
          "Approved refunds are credited to the original payment method within 5 to 10 business days of inspection completion.",
        ],
      },
      {
        id: "exchanges",
        title: "5. Flacon Exchanges",
        content: [
          "If you prefer to exchange an unopened fragrance for an alternative creation within our catalog, our concierge will facilitate the exchange upon receipt of the returned item.",
        ],
      },
      {
        id: "non-returnable",
        title: "6. Non-Returnable Items",
        content: [
          "Discovery Sets, custom-engraved flacons, opened cellophane presentations, and bespoke commissions are non-returnable and non-refundable.",
        ],
      },
    ],
  },
};
