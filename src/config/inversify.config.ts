import '../shared/middlewares/HealthCheck';
import '../entities/Order/OrderController';

import { Container } from 'inversify';

import Connection from '../shared/class/Connection';
import REFERENCES from './inversify.references';
import OrderService from '../entities/Order/OrderService';
import orderModel from '../entities/Order/OrderModel';
import RemoteController from '../shared/class/RemoteController';

const injectionContainer = new Container({ defaultScope: 'Singleton' });

injectionContainer.bind(REFERENCES.Connection).to(Connection);
injectionContainer.bind(REFERENCES.RemoteController).to(RemoteController);
injectionContainer.bind(REFERENCES.OrderService).to(OrderService);

injectionContainer.bind(REFERENCES.OrderModel).toConstantValue(orderModel);

export default injectionContainer;
