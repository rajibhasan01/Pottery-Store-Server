import { DbProduct } from './db.product';
import { Product } from '../../models/model.product';
import { ProductInterface } from '../../interfaces/interface.product';

const dbProduct = DbProduct.getInstance();

export class ProductService implements ProductInterface {
  public static productService: ProductService;
  private constructor() {}
  public static getInstance() {
    if (!ProductService.productService) {
      ProductService.productService = new ProductService();
    }
    return ProductService.productService;
  }
  async AddProduct(productData: Product) {
    try {
      return await new Promise((resolve, reject) => {
        dbProduct
          .CreateProduct(productData)
          .then((res) => resolve('Product Added Successfully'))
          .catch((err) => reject('Failed to add Product. Please try again'));
      });
    } catch (err) {
      console.log('error in AddProduct method of ProductService Class: ', err);
    }
  }
  async EditProduct(productId: string, productData: Product) {
    try {
      return await new Promise((resolve, reject) => {
        dbProduct
          .EditProduct(productId, productData)
          .then((res) => resolve('Product Edit Successfully'))
          .catch((err) => reject('Failed to Edit Product. Please try again'));
      });
    } catch (err) {
      console.log('error in EditProduct method of ProductService Class: ', err);
    }
  }
  async GetAllProduct() {
    try {
      return await new Promise((resolve, reject) => {
        dbProduct
          .GetAllProduct()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetAllProduct method of ProductService Class: ',
        err
      );
    }
  }
  async GetProductById(productId: string) {
    try {
      return await new Promise((resolve, reject) => {
        dbProduct
          .GetProductById(productId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetProductById method of ProductService Class: ',
        err
      );
    }
  }
}
