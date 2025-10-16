import img1 from '../../public/1.png'
import img2 from '../../public/2.png'
import img3 from '../../public/3.png'
import img4 from '../../public/4.png'
import img6 from '../../public/6.png'
import img7 from '../../public/7.png'
import img8 from '../../public/8.png'
import img9 from '../../public/9.png'
import img10 from '../../public/10.png'
import img11 from '../../public/11.png'
import img12 from '../../public/12.png'
import img13 from '../../public/13.png'
import img14 from '../../public/14.png'
import img15 from '../../public/15.png'
import img16 from '../../public/16.png'
import img17 from '../../public/17.png'

export const products = [
  {
    id: 1,
    image: img1,
    title: "HAVIT HV-G92 Gamepad",
    description: "High-quality gaming controller compatible with multiple platforms. Ergonomic design with responsive buttons.",
    offerprice: 280,
    mainprice: 400,
    category: "electronics",
    status: "flashSale",
    rating: 120,     
    stars: 2,
    sizes: false,
    isStock: false
  },
  {
    id: 2,
    image: img2,
    title: "AK-900 Wired Keyboard",
    description: "Mechanical keyboard with RGB lighting. Durable keys and ergonomic layout for gamers.",
    offerprice: 960,
    mainprice: 1160,
    category: "electronics",
    status: "flashSale",
    rating: 80,
    stars: 3,
    sizes: false,
    isStock: true
  },
  {
    id: 3,
    image: img3,
    title: "IPS LCD Gaming Monitor",
    description: "24-inch Full HD monitor with high refresh rate and vibrant colors. Perfect for gaming and media.",
    offerprice: 370,
    mainprice: 400,
    category: "electronics",
    status: "flashSale",
    rating: 150,
    stars: 4.7,
    sizes: false,
    isStock: true
  },
  {
    id: 4,
    image: img4,
    title: "S-Series Comfort Chair",
    description: "Ergonomic chair with cushioned seat and adjustable backrest. Ideal for office or home use.",
    offerprice: 375,
    mainprice: 400,
    category: "furniture",
    status: "flashSale",
    rating: 60,
    stars: 4.0,
    sizes: false,
    isStock: true
  },
  {
    id: 5,
    image: img4,
    title: "S-Series Comfort Chair",
    description: "Premium comfort chair with adjustable features and stylish design.",
    offerprice: 375,
    mainprice: 400,
    category: "furniture",
    status: "flashSale",
    rating: 95,
    stars: 4.3,
    sizes: false,
    isStock: false
  },
  {
    id: 6,
    image: img6,
    title: "The north coat",
    description: "Warm and durable coat suitable for winter. Stylish design with multiple color options.",
    offerprice: 260,
    mainprice: 360,
    category: "fashion",
    status: "bestSelling",
    rating: 200,
    stars: 4.6,
    colors: ["#000000", "#4A90E2"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isStock: false
  },
  {
    id: 7,
    image: img7,
    title: "Gucci duffle bag",
    description: "Luxury duffle bag made with premium materials. Spacious and stylish for travel or casual use.",
    offerprice: 960,
    mainprice: 1160,
    category: "fashion",
    status: "bestSelling",
    rating: 50,
    stars: 4.1,
    colors: ["#8B4513", "#000000"],
    sizes: false,
    isStock: true
  },
  {
    id: 8,
    image: img8,
    title: "RGB liquid CPU Cooler",
    description: "High-performance CPU liquid cooler with customizable RGB lighting. Keeps your system cool efficiently.",
    offerprice: 160,
    mainprice: 170,
    category: "electronics",
    status: "bestSelling",
    rating: 140,
    stars: 4.4,
    sizes: false,
    isStock: true
  },
  {
    id: 9,
    image: img9,
    title: "Small Bookshelf",
    description: "Compact and stylish bookshelf suitable for living rooms, offices, or bedrooms.",
    offerprice: 360,
    mainprice: 400,
    category: "furniture",
    status: "bestSelling",
    rating: 70,
    stars: 3.9,
    sizes: false,
    isStock: true
  },
  {
    id: 10,
    image: img10,
    title: "Breed Dry Dog Food",
    description: "Nutritious dry dog food for adult dogs. Supports healthy digestion and energy levels.",
    offerprice: 100,
    mainprice: 120,
    category: "pets",
    status: "normal",
    rating: 30,
    stars: 4.0,
    sizes: false,
    isStock: true
  },
  {
    id: 11,
    image: img11,
    title: "CANON EOS DSLR Camera",
    description: "High-quality DSLR camera for professional photography. Includes multiple shooting modes and accessories.",
    offerprice: 360,
    mainprice: 500,
    category: "electronics",
    status: "normal",
    rating: 250,
    stars: 4.8,
    sizes: false,
    isStock: true
  },
  {
    id: 12,
    image: img12,
    title: "Asus FHD Gaming Laptop",
    description: "High-performance gaming laptop with FHD display and powerful graphics card. Ideal for gaming and streaming.",
    offerprice: 700,
    mainprice: 1000,
    category: "electronics",
    status: "normal",
    rating: 180,
    stars: 4.5,
    sizes: false,
    isStock: true
  },
  {
    id: 13,
    image: img13,
    title: "Curology Product Set",
    description: "Skincare product set including cleansers, serums, and moisturizers. Suitable for all skin types.",
    offerprice: 500,
    mainprice: 600,
    category: "cosmetics",
    status: "normal",
    rating: 40,
    stars: 4.1,
    sizes: false,
    isStock: true
  },
  {
    id: 14,
    image: img14,
    title: "Kids Electric Car",
    description: "Battery-powered electric car for kids with safety features. Fun and safe for children ages 3-8.",
    offerprice: 960,
    mainprice: 1200,
    category: "toys",
    status: "normal",
    rating: 65,
    stars: 4.2,
    sizes: false,
    isStock: true
  },
  {
    id: 15,
    image: img15,
    title: "Jr. Zoom Soccer Cleats",
    description: "Lightweight and durable soccer cleats designed for young athletes. Comfortable fit with excellent traction.",
    offerprice: 1160,
    mainprice: 1300,
    category: "sports",
    status: "normal",
    rating: 75,
    stars: 4.4,
    sizes: ["XS", "S", "M", "L", "XL"],
    isStock: true
  },
  {
    id: 16,
    image: img16,
    title: "GP11 Shooter USB Gamepad",
    description: "USB gamepad with ergonomic design. Compatible with multiple platforms and ideal for gaming sessions.",
    offerprice: 550,
    mainprice: 600,
    category: "electronics",
    status: "normal",
    rating: 90,
    stars: 4.3,
    sizes: false,
    isStock: true
  },
  {
    id: 17,
    image: img17,
    title: "Quilted Satin Jacket",
    description: "Stylish satin jacket with quilted design. Warm, comfortable, and available in multiple colors.",
    offerprice: 660,
    mainprice: 750,
    category: "fashion",
    status: "normal",
    rating: 110,
    stars: 4.5,
    colors: ["#C0C0C0", "#000000"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isStock: true
  },
  {
    id: 18,
    image: img1,
    title: "Tushar Bhai",
    description: "Tushar bhai is very smart, dashing, handsome, intellectual",
    offerprice: 0,
    mainprice: 100000,
    category: "fashion",
    status: "bestSelling",
    rating: 2000,
    stars: 5,
    colors: ["#C0C0C0", "#000000"],
    sizes: false,
    isStock: true
  }
];