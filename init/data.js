const sampleListing = [
  {
    title: "Cozy Cabin in the Woods",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    price: 120,
    location: "Manali, India"
  },
  {
    title: "Modern Apartment with City View",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1484154218962-a197022b5858" },
    price: 90,
    location: "Bangalore, India"
  },
  {
    title: "Beachside Bungalow",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    price: 150,
    location: "Goa, India"
  },
  {
    title: "Mountain View Homestay",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    price: 75,
    location: "Darjeeling, India"
  },
  {
    title: "Luxury Villa with Pool",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6" },
    price: 250,
    location: "Udaipur, India"
  },
  {
    title: "Heritage Haveli",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
    price: 180,
    location: "Jaipur, India"
  },
  {
    title: "Cliffside Cottage",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
    price: 110,
    location: "Munnar, India"
  },
  {
    title: "Eco-Friendly Treehouse",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf" },
    price: 95,
    location: "Wayanad, India"
  },
  {
    title: "Urban Studio Apartment",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb" },
    price: 80,
    location: "Pune, India"
  },
  {
    title: "Lakeview Cottage",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600566752225-3f2fe98059b8" },
    price: 130,
    location: "Nainital, India"
  },
  {
    title: "Desert Camp Tent",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    price: 60,
    location: "Jaisalmer, India"
  },
  {
    title: "Hilltop Resort Room",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154" },
    price: 100,
    location: "Shimla, India"
  },
  {
    title: "Artistic Bohemian Loft",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab" },
    price: 85,
    location: "Mumbai, India"
  },
  {
    title: "Riverside Cottage",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154" },
    price: 105,
    location: "Rishikesh, India"
  },
  {
    title: "Modern Hill Cabin",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
    price: 125,
    location: "Kodaikanal, India"
  },
  {
    title: "Penthouse with Private Deck",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6" },
    price: 200,
    location: "Hyderabad, India"
  },
  {
    title: "Colonial Bungalow",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
    price: 175,
    location: "Ooty, India"
  },
  {
    title: "Forest Retreat",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600566752225-3f2fe98059b8" },
    price: 140,
    location: "Coorg, India"
  },
  {
    title: "Traditional Kerala House",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    price: 95,
    location: "Alleppey, India"
  },
  {
    title: "Glass House in Nature",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
    price: 210,
    location: "Chikmagalur, India"
  },
  {
    title: "Modern Farmhouse",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600566752225-3f2fe98059b8" },
    price: 160,
    location: "Nagpur, India"
  },
  {
    title: "Luxury Tent Stay",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    price: 130,
    location: "Pushkar, India"
  },
  {
    title: "Secluded Jungle Cottage",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
    price: 100,
    location: "Jim Corbett, India"
  },
  {
    title: "Lakefront Apartment",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154" },
    price: 125,
    location: "Bhopal, India"
  },
  {
    title: "Charming Old Town Flat",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab" },
    price: 70,
    location: "Pondicherry, India"
  },
  {
    title: "Minimalist Studio",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    price: 65,
    location: "Chennai, India"
  },
  {
    title: "Panoramic View Apartment",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
    price: 145,
    location: "Sikkim, India"
  },
  {
    title: "Contemporary Duplex",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600566752225-3f2fe98059b8" },
    price: 155,
    location: "Ahmedabad, India"
  },
  {
    title: "Sunset Beach Cottage",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    price: 170,
    location: "Daman, India"
  },
  {
    title: "Rustic Village Home",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
    price: 60,
    location: "Kutch, India"
  }
];

module.exports = { data: sampleListing };
