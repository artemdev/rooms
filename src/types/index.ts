export type IRoom = {
  id: string;
  name: string;
  variants: Variant[];
};

type Variant = {
  id: string;
  name: string;
  price: number;
  currency: string;
  videos: string[];
  images: string[];
  description: string;
};
