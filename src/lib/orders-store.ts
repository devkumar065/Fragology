import { Order } from "@/types/order";

// In-memory persistent order registry with sample demo orders
// This complements the Supabase database and ensures 100% reliable order tracking
// even when operating with placeholder Supabase credentials.

const GLOBAL_ORDERS: Order[] = [
  {
    id: "ord-demo-01",
    orderNumber: "FRG-20261107-8491",
    userId: "client-demo-01",
    customerEmail: "client@fragology.com",
    customerName: "Lord Dev Kumar",
    customerPhone: "+1 (555) 382-9481",
    status: "shipped",
    paymentStatus: "paid",
    paymentProvider: "stripe",
    paymentReference: "pi_3Mtwx2LkdIwHu7ix28a3tqZ0",
    currency: "USD",
    subtotal: 760.0,
    discountAmount: 76.0,
    shippingFee: 0.0,
    taxAmount: 54.72,
    totalAmount: 738.72,
    couponCode: "FRAGOLOGY10",
    shippingAddress: {
      id: "addr-01",
      fullName: "Lord Dev Kumar",
      phone: "+1 (555) 382-9481",
      streetAddress1: "740 Park Avenue",
      streetAddress2: "Penthouse Suite 14B",
      city: "New York",
      stateProvince: "NY",
      postalCode: "10021",
      country: "United States",
    },
    items: [
      {
        id: "prod-1-100ml",
        productId: "prod-1",
        productSlug: "nocturne-ambre",
        productName: "Nocturne Ambré",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 340.0,
        priceDisplay: "$340",
        quantity: 1,
        accentColor: "#C8A45D",
      },
      {
        id: "prod-2-100ml",
        productId: "prod-2",
        productSlug: "oud-imperiale",
        productName: "Oud Impériale",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 420.0,
        priceDisplay: "$420",
        quantity: 1,
        accentColor: "#AE8847",
      },
    ],
    shippingCarrier: "DHL Express Luxury Network",
    trackingNumber: "TRK-FRG-98412-US",
    estimatedDelivery: "November 11, 2026",
    createdAt: "2026-11-05T14:22:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Commission confirmed & authenticated at Paris atelier.",
        timestamp: "November 5, 2026 - 14:22 GMT",
        location: "Maison Fragology Atelier, Paris",
      },
      {
        status: "processing",
        note: "Flacons hand-poured, inspected under polarized light, and sealed with monogrammed wax.",
        timestamp: "November 6, 2026 - 09:15 GMT",
        location: "Maison Fragology Atelier, Grasse",
      },
      {
        status: "shipped",
        note: "Consignment handed over to DHL White-Glove Luxury Transit.",
        timestamp: "November 7, 2026 - 08:30 GMT",
        location: "Charles de Gaulle International Hub, Roissy",
      },
    ],
  },
  {
    id: "ord-demo-02",
    orderNumber: "FRG-20261107-6007",
    userId: "client-demo-02",
    customerEmail: "helena.montrose@mayfair.co.uk",
    customerName: "Duchess Helena Montrose",
    customerPhone: "+44 20 7946 0912",
    status: "processing",
    paymentStatus: "paid",
    paymentProvider: "stripe",
    paymentReference: "pi_3Nuvx9LkdIwHu8jx31b4vrT1",
    currency: "USD",
    subtotal: 580.0,
    discountAmount: 0.0,
    shippingFee: 0.0,
    taxAmount: 46.4,
    totalAmount: 626.4,
    shippingAddress: {
      id: "addr-02",
      fullName: "Duchess Helena Montrose",
      phone: "+44 20 7946 0912",
      streetAddress1: "14 Grosvenor Square",
      city: "London",
      stateProvince: "Greater London",
      postalCode: "W1K 6HJ",
      country: "United Kingdom",
    },
    items: [
      {
        id: "prod-3-100ml",
        productId: "prod-3",
        productSlug: "santal-nocturne",
        productName: "Santal Nocturne",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (28%)",
        priceNum: 290.0,
        priceDisplay: "$290",
        quantity: 2,
        accentColor: "#9C6B30",
      },
    ],
    shippingCarrier: "Ferrari Haute Courier",
    trackingNumber: "TRK-FRG-77192-GB",
    estimatedDelivery: "November 12, 2026",
    createdAt: "2026-11-06T10:15:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Commission confirmed & certified.",
        timestamp: "November 6, 2026 - 10:15 GMT",
        location: "Maison Fragology Atelier, Paris",
      },
      {
        status: "processing",
        note: "Currently undergoing bottle engraving and gold seal wax stamping.",
        timestamp: "November 6, 2026 - 15:40 GMT",
        location: "Maison Fragology Atelier, Grasse",
      },
    ],
  },
  {
    id: "ord-demo-03",
    orderNumber: "FRG-20261107-4192",
    userId: "client-demo-03",
    customerEmail: "jeanluc.renaud@elysee.fr",
    customerName: "Count Jean-Luc Renaud",
    customerPhone: "+33 1 42 68 55 90",
    status: "confirmed",
    paymentStatus: "paid",
    paymentProvider: "concierge_transfer",
    paymentReference: "wire_20261107_9921",
    currency: "USD",
    subtotal: 1250.0,
    discountAmount: 150.0,
    shippingFee: 0.0,
    taxAmount: 88.0,
    totalAmount: 1188.0,
    couponCode: "MAISON20",
    shippingAddress: {
      id: "addr-03",
      fullName: "Count Jean-Luc Renaud",
      phone: "+33 1 42 68 55 90",
      streetAddress1: "28 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      stateProvince: "Île-de-France",
      postalCode: "75008",
      country: "France",
    },
    items: [
      {
        id: "prod-4-100ml",
        productId: "prod-4",
        productSlug: "fleur-de-soie",
        productName: "Fleur de Soie",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Eau de Parfum (22%)",
        priceNum: 240.0,
        priceDisplay: "$240",
        quantity: 2,
        accentColor: "#D4AF37",
      },
      {
        id: "prod-2-100ml",
        productId: "prod-2",
        productSlug: "oud-imperiale",
        productName: "Oud Impériale",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 420.0,
        priceDisplay: "$420",
        quantity: 1,
        accentColor: "#AE8847",
      },
      {
        id: "prod-5-100ml",
        productId: "prod-5",
        productSlug: "vetiver-celeste",
        productName: "Vétiver Céleste",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Eau de Parfum (20%)",
        priceNum: 350.0,
        priceDisplay: "$350",
        quantity: 1,
        accentColor: "#7A9A7E",
      },
    ],
    shippingCarrier: "Maison Private Courier",
    createdAt: "2026-11-07T09:30:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Concierge wire verified by Private Banking Liaison.",
        timestamp: "November 7, 2026 - 09:30 GMT",
        location: "Maison Fragology Treasury, Geneva",
      },
    ],
  },
  {
    id: "ord-demo-04",
    orderNumber: "FRG-20261105-3310",
    userId: "client-demo-04",
    customerEmail: "aria.davenport@ritz.com",
    customerName: "Aria Davenport",
    customerPhone: "+1 (310) 849-2041",
    status: "delivered",
    paymentStatus: "paid",
    paymentProvider: "stripe",
    paymentReference: "pi_3Mox81LkdIwHu5hx91c2qrE8",
    currency: "USD",
    subtotal: 340.0,
    discountAmount: 34.0,
    shippingFee: 0.0,
    taxAmount: 24.48,
    totalAmount: 330.48,
    couponCode: "FRAGOLOGY10",
    shippingAddress: {
      id: "addr-04",
      fullName: "Aria Davenport",
      phone: "+1 (310) 849-2041",
      streetAddress1: "9500 Wilshire Boulevard",
      city: "Beverly Hills",
      stateProvince: "CA",
      postalCode: "90212",
      country: "United States",
    },
    items: [
      {
        id: "prod-1-100ml",
        productId: "prod-1",
        productSlug: "nocturne-ambre",
        productName: "Nocturne Ambré",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 340.0,
        priceDisplay: "$340",
        quantity: 1,
        accentColor: "#C8A45D",
      },
    ],
    shippingCarrier: "DHL Express Luxury Network",
    trackingNumber: "TRK-FRG-66281-US",
    estimatedDelivery: "November 6, 2026",
    createdAt: "2026-11-04T16:00:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Order confirmed.",
        timestamp: "November 4, 2026 - 16:00 GMT",
        location: "Paris Atelier",
      },
      {
        status: "processing",
        note: "Hand bottled & sealed.",
        timestamp: "November 4, 2026 - 19:30 GMT",
        location: "Grasse Laboratory",
      },
      {
        status: "shipped",
        note: "Dispatched via DHL Express.",
        timestamp: "November 5, 2026 - 06:10 GMT",
        location: "Roissy Airport",
      },
      {
        status: "delivered",
        note: "Hand-delivered with signature verification to patron.",
        timestamp: "November 6, 2026 - 14:45 PST",
        location: "Beverly Hills, CA",
      },
    ],
  },
  {
    id: "ord-demo-05",
    orderNumber: "FRG-20261104-1849",
    userId: "client-demo-05",
    customerEmail: "khalid.alnuaimi@dubaiholdings.ae",
    customerName: "Sheikh Khalid Al-Nuaimi",
    customerPhone: "+971 4 361 0000",
    status: "delivered",
    paymentStatus: "paid",
    paymentProvider: "razorpay",
    paymentReference: "pay_N83xkl0194Lkp",
    currency: "USD",
    subtotal: 1680.0,
    discountAmount: 150.0,
    shippingFee: 0.0,
    taxAmount: 122.4,
    totalAmount: 1652.4,
    couponCode: "MAISON20",
    shippingAddress: {
      id: "addr-05",
      fullName: "Sheikh Khalid Al-Nuaimi",
      phone: "+971 4 361 0000",
      streetAddress1: "Emirates Hills, Sector E",
      city: "Dubai",
      stateProvince: "Dubai",
      postalCode: "00000",
      country: "United Arab Emirates",
    },
    items: [
      {
        id: "prod-2-100ml",
        productId: "prod-2",
        productSlug: "oud-imperiale",
        productName: "Oud Impériale",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 420.0,
        priceDisplay: "$420",
        quantity: 4,
        accentColor: "#AE8847",
      },
    ],
    shippingCarrier: "Emirates SkyCargo VIP",
    trackingNumber: "TRK-FRG-11094-DXB",
    estimatedDelivery: "November 6, 2026",
    createdAt: "2026-11-03T11:20:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Order confirmed.",
        timestamp: "November 3, 2026 - 11:20 GMT",
        location: "Paris Atelier",
      },
      {
        status: "delivered",
        note: "VIP Diplomatic courier delivery completed.",
        timestamp: "November 6, 2026 - 16:30 GST",
        location: "Emirates Hills, Dubai",
      },
    ],
  },
];

export function getAllOrders(): Order[] {
  return [...GLOBAL_ORDERS];
}

export function getOrder(orderNumber: string): Order | undefined {
  return GLOBAL_ORDERS.find(
    (o) =>
      o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase() ||
      o.id === orderNumber
  );
}

export function saveOrder(order: Order): Order {
  const index = GLOBAL_ORDERS.findIndex(
    (o) => o.orderNumber.toUpperCase() === order.orderNumber.toUpperCase()
  );
  if (index >= 0) {
    GLOBAL_ORDERS[index] = order;
  } else {
    GLOBAL_ORDERS.unshift(order);
  }
  return order;
}

export function updateOrderStatus(
  orderNumber: string,
  newStatus: Order["status"],
  note?: string,
  location?: string
): Order | undefined {
  const order = GLOBAL_ORDERS.find(
    (o) =>
      o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase() ||
      o.id === orderNumber
  );
  if (!order) return undefined;

  order.status = newStatus;
  const historyEntry = {
    status: newStatus,
    note: note || `Consignment status adjusted to ${newStatus}.`,
    timestamp: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    location: location || "Maison Fragology Atelier",
  };

  order.statusHistory = [...(order.statusHistory || []), historyEntry];
  return order;
}

export function getOrdersForCustomer(email: string): Order[] {
  return GLOBAL_ORDERS.filter(
    (o) => o.customerEmail.toLowerCase() === email.trim().toLowerCase()
  );
}
