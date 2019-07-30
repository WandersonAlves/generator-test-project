import { Model, Document } from 'mongoose';
import { Order } from './OrderInterface';
import { BaseController } from '../../shared/class/BaseController';
import { injectable, inject } from 'inversify';
import REFERENCES from '../../config/inversify.references';

@injectable()
export default class OrderService extends BaseController<Order> {
  constructor(@inject(REFERENCES.OrderModel) model: Model<Document>) {
    super(model);
  }
}
