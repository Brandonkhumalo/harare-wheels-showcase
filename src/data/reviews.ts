export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Tendai Moyo",
    role: "Business Owner",
    content: "Velocity Motors made buying my dream car effortless. Their professionalism and attention to detail exceeded all my expectations. Highly recommended!",
    rating: 5,
    avatar: "TM"
  },
  {
    id: "2",
    name: "Grace Chigwedere",
    role: "Marketing Director",
    content: "I found the perfect Mercedes for my family. The team was incredibly helpful, and the financing options were very flexible. A+ service!",
    rating: 5,
    avatar: "GC"
  },
  {
    id: "3",
    name: "Farai Mutasa",
    role: "Engineer",
    content: "Best dealership in Harare! They had exactly what I was looking for, and the price was competitive. Will definitely be back for my next car.",
    rating: 5,
    avatar: "FM"
  },
  {
    id: "4",
    name: "Rudo Ncube",
    role: "Doctor",
    content: "The after-sales service is what sets Velocity Motors apart. They genuinely care about their customers even after the sale is complete.",
    rating: 5,
    avatar: "RN"
  },
  {
    id: "5",
    name: "Tinashe Zimuto",
    role: "Entrepreneur",
    content: "Bought my Range Rover from here and couldn't be happier. The vehicle was in perfect condition, and the documentation was handled seamlessly.",
    rating: 5,
    avatar: "TZ"
  },
  {
    id: "6",
    name: "Chiedza Mhaka",
    role: "Lawyer",
    content: "Professional, trustworthy, and efficient. Velocity Motors understood exactly what I needed and delivered beyond expectations.",
    rating: 5,
    avatar: "CM"
  },
  {
    id: "7",
    name: "Tatenda Chirisa",
    role: "IT Consultant",
    content: "The selection of Japanese imports is impressive. Found a pristine Honda Fit at an unbeatable price. Smooth transaction from start to finish.",
    rating: 5,
    avatar: "TC"
  },
  {
    id: "8",
    name: "Nyasha Dube",
    role: "Architect",
    content: "From test drive to final handover, every step was handled with care. Velocity Motors has earned a customer for life!",
    rating: 5,
    avatar: "ND"
  }
];
