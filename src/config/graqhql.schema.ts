import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { Order } from '../entities/Order/OrderInterface';

import orderModel from '../entities/Order/OrderModel';

const orderHeaderType = new GraphQLObjectType({
  name: 'orderHeader',
  fields: {
    orderNumber: { type: GraphQLInt },
    clientCode: { type: GraphQLInt },
  },
});

const orderProductType = new GraphQLObjectType({
  name: 'orderProduct',
  fields: {
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    productCode: { type: GraphQLInt },
    productPrice: { type: GraphQLFloat },
  },
});

const orderUserType = new GraphQLObjectType({
  name: 'orderUser',
  fields: {
    orderNumber: { type: GraphQLInt },
    userCode: { type: GraphQLInt },
    clientCode: { type: GraphQLInt },
    userType: { type: GraphQLString, description: 'Current type of user' },
  },
});

const orderType = new GraphQLObjectType({
  name: 'order',
  fields: {
    _id: { type: GraphQLID },
    orderHeader: { type: orderHeaderType, description: 'Main info about order' },
    orderProduct: {
      type: GraphQLList(orderProductType),
      description: 'List of products',
    },
    orderUser: { type: orderUserType, description: 'User information' },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    totalOrderValue: {
      type: GraphQLString,
      description: 'How much cost this order',
      resolve: (root: Order) => {
        return `$ ${root.orderProduct.reduce((pv, cv) => pv + cv.productPrice, 0)}`;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      orders: {
        type: GraphQLList(orderType),
        args: {
          sort: {
            type: GraphQLNonNull(GraphQLInt),
            defaultValue: 1,
            description: 'Use 1 or -1 to sort',
          },
          limit: {
            type: GraphQLNonNull(GraphQLInt),
            defaultValue: 10,
            description: 'Limits the results',
          },
          skip: {
            type: GraphQLNonNull(GraphQLInt),
            defaultValue: 0,
            description: 'Skips N results',
          },
        },
        resolve: (root, args) => {
          return orderModel
            .find(null, null, {
              limit: args.limit,
              skip: args.skip,
            })
            .sort({ _id: args.sort })
            .exec();
        },
      },
      order: {
        type: orderType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args) => {
          return orderModel.findById(args.id);
        },
      },
    },
  }),
});

export default schema;
