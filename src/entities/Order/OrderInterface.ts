import { IMongoModel } from '../../shared/interfaces/IMongoModel';

export interface Order extends IMongoModel {
  status: string;
  orderHeader: OrderHeader;
  orderProduct: OrderProduct[];
  orderUser: OrderUser;
}

export interface OrderHeader {
  orderNumber: number;
  userCode: number;
}

export interface OrderProduct {
  description: string;
  name: string;
  productCode: number;
  productPrice: number;
}

export interface OrderUser {
  userCode: number;
  userName: string;
  userBase: number;
  userType?: 'manager' | 'supervisor' | 'master';
}
