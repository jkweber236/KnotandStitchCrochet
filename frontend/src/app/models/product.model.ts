export interface Product {
  _id: string; // MongoDB's ObjectId
  name: string;
  description: string;
  image: string; // Image URL
  type: string; // Physical or Digital
  packs: any[];
  colors: ColorVariant[]; // Array of color variant objects
}

export interface ColorVariant {
  color: string;
  quantity: number; // Quantity available
  price: number; // Price for that color
}
