export interface Product{
  id: string;
  title: string;
  price: number;
  images:string[];
  description: string;
  category: Category;
}
export interface Category{
  id: string;
  name: string;
  image: string;
}
export interface CreateProductDTA extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}
