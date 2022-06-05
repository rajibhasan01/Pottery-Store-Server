import { Product } from '../models/model.product';

export interface ProductInterface {
  AddProduct(productData: Product): any;
  EditProduct(productId: string, invoiceData: Product): any;
  GetAllProduct(): any;
  GetProductById(productId: string): any;
}
