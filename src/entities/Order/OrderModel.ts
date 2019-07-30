import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';

mongoose.pluralize(null);

const orderHeaderSchema = new Schema({
  orderNumber: Number,
  clientCode: Number,
});

const orderUserSchema = new Schema({
  userCode: Number,
  userName: String,
  userBase: Number,
  userType: String,
});

const orderProductSchema = new Schema({
  description: String,
  name: String,
  productCode: Number,
  productPrice: Number,
});

const orderSchema = new Schema(
  {
    status: String,
    orderHeader: orderHeaderSchema,
    orderProduct: [orderProductSchema],
    orderUser: orderUserSchema,
  },
  {
    timestamps: true,
  },
);

orderSchema.index('clientCode');
// tslint:disable-next-line
orderSchema.index(
  { 'orderUser.userCode': 1, 'orderHeader.orderNumber': 1 },
  { unique: true },
);

const orderModel = model('order', orderSchema);

export default orderModel;
