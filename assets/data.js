/* Meridian Estates — listing data
   To rebrand or change market: edit SITE below, then replace LISTINGS. */

const SITE = {
  brand: "Meridian",
  suffix: "Estates",
  city: "Dubai",
  currency: "AED",
  phone: "+971 4 555 0100",
  email: "hello@meridian.estates",
  address: "Level 24, Index Tower, DIFC, Dubai"
};

const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 1200}&q=75`;

const LISTINGS = [
  {
    id: "ME-1042",
    title: "Signature Villa on the Crescent",
    area: "Palm Jumeirah",
    type: "villa",
    deal: "sale",
    price: 18500000,
    beds: 5, baths: 6, sqft: 7200,
    badge: "Exclusive",
    featured: true,
    images: [
      IMG("1613490493576-7fde63acd811"),
      IMG("1600607687939-ce8a6c25118c"),
      IMG("1600566753086-00f18fb6b3ea")
    ],
    blurb: "A beachfront villa on the western crescent with 22 metres of private sand, a sunken lounge and a rooftop terrace oriented to the sunset.",
    amenities: ["Private beach", "Infinity pool", "Cinema room", "Staff quarters", "Smart home", "4-car garage"]
  },
  {
    id: "ME-1088",
    title: "Burj Vista Sky Penthouse",
    area: "Downtown Dubai",
    type: "penthouse",
    deal: "sale",
    price: 9750000,
    beds: 3, baths: 4, sqft: 3400,
    badge: "New",
    featured: true,
    images: [
      IMG("1600607687920-4e2a09cf159d"),
      IMG("1502672260266-1c1ef2d93688"),
      IMG("1522708323590-d24dbb6b0267")
    ],
    blurb: "Full-floor penthouse at level 62, framed by 4.2 metre glazing that puts the Burj Khalifa directly in the living room.",
    amenities: ["Burj Khalifa view", "Private lift", "Concierge", "Gym & spa", "2 parking bays"]
  },
  {
    id: "ME-1119",
    title: "Marina Gate Waterfront Residence",
    area: "Dubai Marina",
    type: "apartment",
    deal: "sale",
    price: 2850000,
    beds: 2, baths: 3, sqft: 1450,
    badge: null,
    featured: true,
    images: [
      IMG("1600585154340-be6161a56a0c"),
      IMG("1554995207-c18c203602cb"),
      IMG("1493809842364-78817add7ffb")
    ],
    blurb: "Corner unit on the 31st floor with double-aspect marina views, a chef's kitchen and direct access to the promenade.",
    amenities: ["Marina view", "Balcony", "Shared pool", "24h security", "1 parking bay"]
  },
  {
    id: "ME-1203",
    title: "Emirates Hills Estate",
    area: "Emirates Hills",
    type: "villa",
    deal: "sale",
    price: 42000000,
    beds: 7, baths: 9, sqft: 12000,
    badge: "Exclusive",
    featured: false,
    images: [
      IMG("1613977257363-707ba9348227"),
      IMG("1600210492486-724fe5c67fb0"),
      IMG("1600566752355-35792bedcfea")
    ],
    blurb: "Twelve thousand square feet set on a 24,000 sqft plot fronting the Montgomerie golf course, with a guest annexe and majlis.",
    amenities: ["Golf course frontage", "Majlis", "Guest annexe", "Indoor pool", "Elevator", "6-car garage"]
  },
  {
    id: "ME-1156",
    title: "Jumeirah Bay Island Villa",
    area: "Jumeirah Bay Island",
    type: "villa",
    deal: "sale",
    price: 24000000,
    beds: 4, baths: 5, sqft: 5600,
    badge: null,
    featured: false,
    images: [
      IMG("1580587771525-78b9dba3b914"),
      IMG("1600047509807-ba8f99d2cdde"),
      IMG("1560518883-ce09059eeffa")
    ],
    blurb: "One of 128 villas on the island, with a 14 metre pool deck, private mooring rights and a shaded outdoor kitchen.",
    amenities: ["Private mooring", "Pool deck", "Outdoor kitchen", "Beach access", "Smart home"]
  },
  {
    id: "ME-1301",
    title: "Executive One-Bed, Business Bay",
    area: "Business Bay",
    type: "apartment",
    deal: "rent",
    price: 95000,
    beds: 1, baths: 2, sqft: 880,
    badge: null,
    featured: false,
    images: [
      IMG("1568605114967-8130f3a36994"),
      IMG("1522708323590-d24dbb6b0267"),
      IMG("1502672260266-1c1ef2d93688")
    ],
    blurb: "Fully furnished canal-facing unit, bills included, walking distance to DIFC and the metro.",
    amenities: ["Furnished", "Canal view", "Bills included", "Gym", "Concierge"],
    per: "year"
  },
  {
    id: "ME-1337",
    title: "Al Barari Garden Residence",
    area: "Al Barari",
    type: "villa",
    deal: "rent",
    price: 380000,
    beds: 4, baths: 5, sqft: 6100,
    badge: "Featured",
    featured: false,
    images: [
      IMG("1600596542815-ffad4c1539a9"),
      IMG("1600566753086-00f18fb6b3ea"),
      IMG("1554995207-c18c203602cb")
    ],
    blurb: "Set inside the greenest community in Dubai — 60% of the plot is mature garden, with a lap pool and shaded pergola.",
    amenities: ["Mature garden", "Lap pool", "Pergola", "Community gym", "Pet friendly"],
    per: "year"
  },
  {
    id: "ME-1344",
    title: "Arabian Ranches Townhouse",
    area: "Arabian Ranches",
    type: "townhouse",
    deal: "rent",
    price: 220000,
    beds: 3, baths: 4, sqft: 2900,
    badge: null,
    featured: false,
    images: [
      IMG("1512917774080-9991f1c4c750"),
      IMG("1493809842364-78817add7ffb"),
      IMG("1600210492486-724fe5c67fb0")
    ],
    blurb: "Family townhouse backing onto the community park, with a converted study and a landscaped rear garden.",
    amenities: ["Park facing", "Study", "Landscaped garden", "Community pool", "Schools nearby"],
    per: "year"
  },
  {
    id: "ME-1360",
    title: "JVC Modern Studio",
    area: "Jumeirah Village Circle",
    type: "apartment",
    deal: "rent",
    price: 55000,
    beds: 1, baths: 1, sqft: 520,
    badge: "New",
    featured: false,
    images: [
      IMG("1570129477492-45c003edd2be"),
      IMG("1600607687939-ce8a6c25118c"),
      IMG("1600566752355-35792bedcfea")
    ],
    blurb: "Brand new studio in a low-rise building, fitted with a full kitchen and a 6 sqm balcony.",
    amenities: ["Brand new", "Balcony", "Covered parking", "Shared gym"],
    per: "year"
  },
  {
    id: "ME-1402",
    title: "Dubai Hills Golf View Villa",
    area: "Dubai Hills Estate",
    type: "villa",
    deal: "sale",
    price: 14200000,
    beds: 5, baths: 6, sqft: 6800,
    badge: "Featured",
    featured: true,
    images: [
      IMG("1600585154340-be6161a56a0c"),
      IMG("1600607687920-4e2a09cf159d"),
      IMG("1600047509807-ba8f99d2cdde")
    ],
    blurb: "Fairway-facing villa with a double-height entrance hall, a 12 metre pool and a basement entertainment level.",
    amenities: ["Golf view", "12m pool", "Basement cinema", "Elevator", "Maid's room", "3-car garage"]
  },
  {
    id: "ME-1418",
    title: "Bluewaters Sea View Apartment",
    area: "Bluewaters Island",
    type: "apartment",
    deal: "rent",
    price: 210000,
    beds: 2, baths: 3, sqft: 1380,
    badge: null,
    featured: false,
    images: [
      IMG("1583608205776-bfd35f0d9f83"),
      IMG("1554995207-c18c203602cb"),
      IMG("1502672260266-1c1ef2d93688")
    ],
    blurb: "Ain Dubai and open-sea views from a wraparound balcony, steps from the beach clubs on the island.",
    amenities: ["Sea view", "Wraparound balcony", "Beach club access", "Concierge"],
    per: "year"
  },
  {
    id: "ME-1477",
    title: "DIFC Sky Penthouse",
    area: "DIFC",
    type: "penthouse",
    deal: "sale",
    price: 16800000,
    beds: 4, baths: 5, sqft: 4900,
    badge: "Exclusive",
    featured: false,
    images: [
      IMG("1600566752355-35792bedcfea"),
      IMG("1493809842364-78817add7ffb"),
      IMG("1600607687939-ce8a6c25118c")
    ],
    blurb: "Duplex penthouse over the financial district with a private roof terrace, plunge pool and 270° skyline aspect.",
    amenities: ["Roof terrace", "Plunge pool", "Private lift", "Valet", "3 parking bays"]
  }
];

const AGENTS = [
  { name: "Layla Haddad", role: "Director — Palm & Islands", phone: "+971 50 442 1180", photo: IMG("1573497019940-1c28c88b4f3e", 300) },
  { name: "Omar Al-Rashid", role: "Head of Downtown & DIFC", phone: "+971 50 337 9042", photo: IMG("1560250097-0b93528c311a", 300) },
  { name: "Priya Menon", role: "Leasing — Marina & JVC", phone: "+971 50 918 6634", photo: IMG("1580489944761-15a19d654956", 300) }
];
