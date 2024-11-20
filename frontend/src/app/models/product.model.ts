export interface BaseProduct {
  _id: string; // MongoDB's ObjectId
  name: string;
  description: string;
  image: string; // Image URL
  price: number; // Base price for each product
  type: 'Physical' | 'Digital'; // Physical or Digital
}

export interface DigitalProduct extends BaseProduct {
  type: 'Digital';
  downloadableLink: string;
}

export interface PhysicalProduct extends BaseProduct {
  type: 'Physical';
  colors: ColorVariant[];
  packs: PackOption[];
}

export interface ColorVariant {
  color: string;
  stock: number;
}

export interface PackOption {
  quantity: number;
  price: number;
}

export type Product = DigitalProduct | PhysicalProduct;
