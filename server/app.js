const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors"); // Import the cors package
const jwt = require("jsonwebtoken");

const secretKey = "secret-key"; // Replace with a strong, unique secret key.

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Hardcoded data
const products = [
  {
    id: 0,
    name: "Apples",
    photo:
      "https://www.bigbasket.com/media/uploads/p/l/30005030_9-fresho-grape-fruit-indian.jpg",
    detail: "3 pc (270-300g)",
    categoryId: 0,
    price: 87,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 1,
    name: "Fresh Kiwi",
    photo:
      "https://www.bigbasket.com/media/uploads/p/l/30005030_9-fresho-grape-fruit-indian.jpg",
    detail: "3 pc (270-300g)",
    categoryId: 0,
    price: 87,
    tag: "Regular",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 2,
    name: "Pomegranates",
    photo:
      "https://www.bigbasket.com/media/uploads/p/l/30005030_9-fresho-grape-fruit-indian.jpg",
    detail: "No Preservatives",
    categoryId: 0,
    price: 87,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 3,
    name: "Capsicum - Green 1 Kg",
    photo:
      "https://www.bigbasket.com/media/uploads/p/l/30005030_9-fresho-grape-fruit-indian.jpg",
    detail: "",
    categoryId: 0,
    price: 87,
    tag: "Demanding",
    available: "false",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 4,
    name: "Apples",
    photo:
      "https://www.bigbasket.com/media/uploads/p/l/30005030_9-fresho-grape-fruit-indian.jpg",
    detail: "",
    categoryId: 0,
    price: 87,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    photo:
      "https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg",
    detail: "No Eggs",
    categoryId: 1,
    price: 450,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 6,
    name: "Red valvet Cake",
    photo:
      "https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg",
    detail: "",
    categoryId: 1,
    price: 500,
    tag: "Regular",
    available: "false",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 7,
    name: "Cookies",
    photo:
      "https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg",
    detail: "10 pcs",
    categoryId: 1,
    price: 80,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 8,
    name: "Toast",
    photo:
      "https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg",
    detail: "20 pcs (No Rusk)",
    categoryId: 1,
    price: 60,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 9,
    name: "Cupcakes",
    photo:
      "https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg",
    detail: "4 pcs",
    categoryId: 1,
    price: 200,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 10,
    name: "Soda",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHCqZoUCOGWvE5sk3aXZeR-74lqVS1OEig&usqp=CAU",
    detail: "6 bottles",
    categoryId: 2,
    price: 60,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 11,
    name: "Lemonade",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHCqZoUCOGWvE5sk3aXZeR-74lqVS1OEig&usqp=CAU",
    detail: "1 bottle",
    categoryId: 2,
    price: 20,
    tag: "Regular",
    available: "false",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 12,
    name: "Real Juice (Orange)",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHCqZoUCOGWvE5sk3aXZeR-74lqVS1OEig&usqp=CAU",
    detail: "1 pcs Tetrapack",
    categoryId: 2,
    price: 80,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 13,
    name: "Kingfisher beer",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHCqZoUCOGWvE5sk3aXZeR-74lqVS1OEig&usqp=CAU",
    detail: "6 pcs",
    categoryId: 2,
    price: 600,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 14,
    name: "Budwiser",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEHCqZoUCOGWvE5sk3aXZeR-74lqVS1OEig&usqp=CAU",
    detail: "6 pcs",
    categoryId: 2,
    price: 700,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 15,
    name: "Body Lotion (100g)",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Ota7ouAzx589x_ikDJi5OLs9Y6PNqIFrc6Li2ryKln4u7w1oTrkBkfY9GPtpyGPOwv0&usqp=CAU",
    detail: "Dry",
    categoryId: 3,
    price: 60,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 16,
    name: "Sunscereen Lotion",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Ota7ouAzx589x_ikDJi5OLs9Y6PNqIFrc6Li2ryKln4u7w1oTrkBkfY9GPtpyGPOwv0&usqp=CAU",
    detail: "No smell",
    categoryId: 3,
    price: 100,
    tag: "Regular",
    available: "false",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 17,
    name: "Hand Sanitizer 1 Ltr",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Ota7ouAzx589x_ikDJi5OLs9Y6PNqIFrc6Li2ryKln4u7w1oTrkBkfY9GPtpyGPOwv0&usqp=CAU",
    detail: "",
    categoryId: 3,
    price: 120,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 18,
    name: "Nail paint remover 50g",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Ota7ouAzx589x_ikDJi5OLs9Y6PNqIFrc6Li2ryKln4u7w1oTrkBkfY9GPtpyGPOwv0&usqp=CAU",
    detail: "1 pcs",
    categoryId: 3,
    price: 70,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 19,
    name: "Facepack",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Ota7ouAzx589x_ikDJi5OLs9Y6PNqIFrc6Li2ryKln4u7w1oTrkBkfY9GPtpyGPOwv0&usqp=CAU",
    detail: "3 sachets",
    categoryId: 3,
    price: 30,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 20,
    name: "Pampers Diapers (180 pcs)",
    photo:
      "https://rukminim1.flixcart.com/image/612/612/l12h1u80/diaper/6/7/4/-original-imagcpvzrghqdwhs.jpeg?q=70",
    detail: "Premium",
    categoryId: 4,
    price: 2000,
    tag: "Regular",
    available: "false",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 21,
    name: "Body shower (Liquied)",
    photo:
      "https://rukminim1.flixcart.com/image/612/612/l12h1u80/diaper/6/7/4/-original-imagcpvzrghqdwhs.jpeg?q=70",
    detail: "700g",
    categoryId: 4,
    price: 300,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 22,
    name: "Hiegen Pack (5 items)",
    photo:
      "https://rukminim1.flixcart.com/image/612/612/l12h1u80/diaper/6/7/4/-original-imagcpvzrghqdwhs.jpeg?q=70",
    detail: "complete hyegene",
    categoryId: 4,
    price: 70,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
  {
    id: 23,
    name: "Nail cutter (1 pc)",
    photo:
      "https://rukminim1.flixcart.com/image/612/612/l12h1u80/diaper/6/7/4/-original-imagcpvzrghqdwhs.jpeg?q=70",
    detail: "Baby size",
    categoryId: 4,
    price: 30,
    tag: "",
    available: "true",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget aliquam lorem. Mauris tempor sagittis est, at interdum odio auctor suscipit. Morbi ac lectus eget purus scelerisque congue et nec velit. Aliquam quis commodo mi. Phasellus facilisis, diam pulvinar varius viverra, tortor augue tempor magna, in suscipit magna urna nec libero. Morbi quis tempus magna. Proin in dolor velit. Fusce tempor massa purus, et commodo mauris tempor eget.",
  },
];
const categories = [
  {
    id: 0,
    photo:
      "https://cdn.mos.cms.futurecdn.net/BdFw3fQfAcVKkHgsyu4JCN-1024-80.jpg.webp",
    name: "Fruits & vegitables",
    description: "A variety of fruits and vegetables",
    button: "Explore fruit-and-veg",
  },
  {
    id: 1,
    photo:
      "https://cdn.mos.cms.futurecdn.net/BdFw3fQfAcVKkHgsyu4JCN-1024-80.jpg.webp",
    name: "Bakery Cakes and Dairy",
    description:
      "The best cupcakes cookies, cakes, pies, cheesecakes, fresh bread, biscotti,muffins, bagels, fresh coffe, milk amd more.",
    button: "Explore bakery-cakes-dairy",
  },
  {
    id: 2,
    photo:
      "https://cdn.mos.cms.futurecdn.net/BdFw3fQfAcVKkHgsyu4JCN-1024-80.jpg.webp",
    name: "Beverages",
    description:
      "Our beverage department will ensure your fridge is always fully stocked. Shop for soda,juice,beer and more.",
    button: "Explore beverages",
  },
  {
    id: 3,
    photo:
      "https://cdn.mos.cms.futurecdn.net/BdFw3fQfAcVKkHgsyu4JCN-1024-80.jpg.webp",
    name: "Beauty and Hygiene",
    description:
      "Buy beauty and personal care products online in India at best prices",
    button: "Explore buauty-hygiene",
  },
  {
    id: 4,
    photo:
      "https://cdn.mos.cms.futurecdn.net/BdFw3fQfAcVKkHgsyu4JCN-1024-80.jpg.webp",
    name: "Baby Care",
    description:
      "Shop online for Baby Products, Diapers, Skin Care products, etc.",
    button: "Explore baby",
  },
];
const banners = [
  {
    bannerImageUrl: "/static/images/offers/offer1.jpg",
    bannerImageAlt: "Independence Day Deal - 25% off on shampoo",
    isActive: true,
    order: 1,
    id: "5b6c38156cb7d770b7010ccc",
  },
  {
    bannerImageUrl: "/static/images/offers/offer2.jpg",
    bannerImageAlt: "Independence Day Deal - Rs120 off on surf",
    isActive: true,
    order: 2,
    id: "5b6c38336cb7d770b7010ccd",
  },
  {
    bannerImageUrl: "/static/images/offers/offer3.jpg",
    bannerImageAlt: "Independence Day Deal - Rs99 off on domex",
    isActive: true,
    order: 3,
    id: "5b6c38456cb7d770b7010cce",
  },
  {
    bannerImageUrl: "/static/images/offers/offer4.jpg",
    bannerImageAlt: "Independence Day Deal - Rs99 off on bodywash",
    isActive: true,
    order: 4,
    id: "5b6c38576cb7d770b7010ccf",
  },
  {
    bannerImageUrl: "/static/images/offers/offer5.jpg",
    bannerImageAlt: "Independence Day Deal - Rs70 off on tea",
    isActive: true,
    order: 5,
    id: "5b6c386b6cb7d770b7010cd0",
  },
];
const cart = {
  response: "Success",
  responseMessage: "Product added to cart successfully",
};
const users = [
  {
    firstname: "hiren",
    lastname: "chauhan",
    email: "hrnchny@yahoo.co.in",
    password: "kk",
    confirmPassword: "kk",
  },
];

app.post("/signup", (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  console.log("users", users);
  // Create a new user object and add it to the array (or save to the database).
  const newUser = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  };
  const existingUser = users.some((u) => {
    return u.firstname === newUser.firstname;
  });
  console.log("existingUser", existingUser);

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push(newUser);
  res
    .status(200)
    .json({ user: newUser, message: "User registered successfully" });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Find the user by username (you would typically query your database here).
  const user = users.find((u) => u.email === email);
  console.log("email", email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token.
  const token = jwt.sign({ email }, secretKey, { expiresIn: "10h" });
  res.json({ token, userDetails: user, msg: "You are Signed In!" });
});

// Route to get all items
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/banners", (req, res) => {
  res.json(banners);
});

// Route to get an item by ID
app.get("/products/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = products.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});
app.get("/search", (req, res) => {
  const name = req.query.name.toLowerCase(); // Access the 'id' parameter from the URL
  // const categoryId = req.query.categoryId;
  console.log("name", name);
  // console.log("categoryId", categoryId);
  const findbyName = products.filter((prd) =>
    prd.name.toLowerCase().includes(name)
  );
  // const findbyCategoryId = findbyName.filter(
  //   (prd) => prd.categoryId == categoryId
  // );
  console.log("findbyName", findbyName);
  // console.log("findbyCategoryId", findbyCategoryId);
  res.send(findbyName.length === 0 ? [] : findbyName);
  // if (!categoryId) {
  //   res.send(
  //     findbyName.length === 0
  //       ? []
  //       : // : findbyCategoryId
  //         // ? findbyCategoryId
  //         findbyName
  //   );
  // } else {
  //   res.send(
  //     findbyCategoryId.length === 0
  //       ? []
  //       : // : findbyCategoryId
  //         // ? findbyCategoryId
  //         findbyCategoryId
  //   );
  // }
});

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
