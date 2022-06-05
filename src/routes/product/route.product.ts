import { invoiceImage } from '../../services/utility/functions';
import { fileUpload } from '../../services/utility/file-upload';
import { ProductService } from '../../services/product/service.product';
import express from 'express';
const productRoute = express.Router();
const productService = ProductService.getInstance();

productRoute.get('/', (req, res) => {
  productService
    .GetAllProduct()
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({"msg": "Welcome to home page"});
      }
    })
    .catch((err) => {
      console.log(`Can't get the data: ${err}`);
    });
});

productRoute.get('/:id', (req, res) => {
  productService
    .GetProductById(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({"msg": "Welcome to home page"});
      }
    })
    .catch((err) => {
      console.log(`Can't get the data: ${err}`);
    });
});




export = productRoute;
