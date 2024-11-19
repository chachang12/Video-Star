export interface Video {
  id: number;
  name: string;
  isFree: boolean;
  isPurchased: boolean;
  duration: string;
  size: number;
  price: number;
  url: string;
  isFavorited: boolean; // Add this property
  isInCart: boolean;    // Add this property
}