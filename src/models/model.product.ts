class Product {
  title?: string;
  amount?: number;
  cashType?: string;
  imageName?: string;
  imagePath?: string;
  createdAt?: Date;
  createdBy?: string;

  private static product: Product;

  private constructor() {}

  public static getInstance() {
    if (!Product.product) {
      Product.product = new Product();
    }
    return Product.product;
  }
}

export { Product };
