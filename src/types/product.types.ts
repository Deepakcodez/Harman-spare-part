import mongoose from 'mongoose';

// Define the Image interface
export interface Image {
  public_id: string;
  url: string;
  _id:  mongoose.Types.ObjectId;
}

// Define the Review interface
export interface Review {
  user: mongoose.Types.ObjectId;
  name: string | undefined;
  rating: number;
  comment: string;
}

// Define the UserReference interface
export interface UserReference {
  user: mongoose.Types.ObjectId;
}

// Define the ProdDocument interface
export interface ProdDocument extends UserReference {
  _id:mongoose.Types.ObjectId, 
  name: string;
  description: string;
  price: number;
  refPrice?: number;
  ratings: number;
  images: Image[];
  category: string;
  stock: number;
  numberOfReviews: number;
  reviews: Review[];
  isFreeDelivery : Boolean
}

export interface ProductResponse {
  products: ProdDocument[];
  productCount: number;
}

export interface singleProductResponse {
  product: ProdDocument;
  productCount: number;
}


