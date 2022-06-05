import { Order } from '../../models/model.orders';
import { ObjectId, MongoClient } from 'mongodb';
import { ConfigService } from '../utility/configService';

const config = ConfigService.getInstance().getConfig();

export class DbOrder {
  private static dbOrder: DbOrder;
  private collectionName: string;
  constructor() {
    this.collectionName = 'orderList';
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbOrder.dbOrder) {
      DbOrder.dbOrder = new DbOrder();
    }
    return DbOrder.dbOrder;
  }
  private async getDbConnection() {
    const client = new MongoClient(config.mongo.url);

    const dbConnection = await client.connect();
    return dbConnection;
  }
  /**
   * createorder
   */
  public async CreateOrder(order:any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        order.createdAt = new Date();
        const options = { ordered: true };
        const result = await dbCollection.insertMany(order, options);
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in Createorder method of dbOrder class: ', error);
    }
  }
  public async GetAllOrder() {
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
      console.log('error in GetAllorder method of dbOrder class: ', error);
    }
  }
  public async GetOrderById(orderId: string) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({
          _id: new ObjectId(orderId),
        });
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllorder method of dbOrder class: ', error);
    }
  }

  public async GetOrderBySearch(search:any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const query = { order_code: search };
        const result = await dbCollection.find(query).toArray();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllorder method of dbOrder class: ', error);
    }
  }

  public async EditOrder(orderId: string, orderData: Order) {
    try {
      return await new Promise(async (resolve, reject) => {
        const { imageName, imagePath, title, amount, cashType } = orderData;
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(orderId) },
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
      console.log('error in GetAllorder method of dbOrder class: ', error);
    }
  }

  public async DeleteOrderById(orderId: string) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.deleteOne({
          _id: new ObjectId(orderId),
        });
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllorder method of dbOrder class: ', error);
    }
  }

}
