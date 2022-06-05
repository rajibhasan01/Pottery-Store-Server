import { Product } from '../../models/model.product';
import { ObjectId, MongoClient } from 'mongodb';
import { ConfigService } from '../utility/configService';

const config = ConfigService.getInstance().getConfig();

export class DbProduct {
  private static dbProduct: DbProduct;
  private collectionName: string;
  constructor() {
    this.collectionName = 'products';
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbProduct.dbProduct) {
      DbProduct.dbProduct = new DbProduct();
    }
    return DbProduct.dbProduct;
  }
  private async getDbConnection() {
    const client = new MongoClient(config.mongo.url);

    const dbConnection = await client.connect();
    return dbConnection;
  }
  /**
   * createProduct
   */
  public async CreateProduct(product: Product) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        product.createdAt = new Date();
        const result = await dbCollection.insertOne(product);
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in CreateProduct method of DbProduct class: ', error);
    }
  }
  public async GetAllProduct() {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllProduct method of DbProduct class: ', error);
    }
  }
  public async GetProductById(productId: string) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({
          _id: new ObjectId(productId),
        });
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllProduct method of DbProduct class: ', error);
    }
  }
  public async EditProduct(productId: string, productData: Product) {
    try {
      return await new Promise(async (resolve, reject) => {
        const { imageName, imagePath, title, amount, cashType } = productData;
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(productId) },
          {
            $set: {
              imageName,
              imagePath,
              cashType,
              title,
              amount,
            },
          }
        );
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllProduct method of DbProduct class: ', error);
    }
  }
}
