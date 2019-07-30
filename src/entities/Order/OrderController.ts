import { OK, NO_CONTENT, CREATED } from 'http-status-codes';
import { Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  response,
  requestBody,
  requestParam,
  httpPut,
  next,
} from 'inversify-express-utils';

import OrderService from './OrderService';
import withException from '../../shared/decorators/withException';
import REFERENCES from '../../config/inversify.references';
import {
  ApiPath,
  ApiOperationGet,
  SwaggerDefinitionConstant,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from 'swagger-express-ts';
import { Order } from './OrderInterface';
import EntityNotFoundException from '../../shared/exceptions/EntityNotFoundException';

@ApiPath({
  path: '/',
  name: 'order',
})
@controller('/order')
export default class OrderController {
  @inject(REFERENCES.OrderService) private orderService: OrderService;

  @ApiOperationGet({
    description: 'List of orders made',
    responses: {
      200: {
        description: 'OK',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Order',
      },
      204: {
        description: 'NO CONTENT',
      },
    },
  })
  @httpGet('/')
  @withException
  async getOrders(@response() res: Response) {
    const result = await this.orderService.find({});
    if (!result.length) {
      res.status(NO_CONTENT).send();
      return;
    }
    res.status(OK).send(result);
  }

  @ApiOperationGet({
    description: 'Get a single order',
    path: '{id}',
    responses: {
      200: {
        description: 'OK',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Order',
      },
      404: {
        description: 'NOT FOUND',
      },
    },
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
        },
      },
    },
  })
  @httpGet('/:id')
  @withException
  async getOrder(
    @requestParam('id') orderId: string,
    @response() res: Response,
    @next() nextFn: NextFunction,
  ) {
    if (orderId === 'api-docs') {
      nextFn();
    }
    const result = await this.orderService.findById(orderId);
    if (!result) {
      throw new EntityNotFoundException({ orderId });
    }
    res.status(OK).send(result);
  }

  @ApiOperationPost({
    description: 'Creates a order',
    responses: {
      201: {
        description: 'Created',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'Order',
      },
    },
    parameters: {
      body: {
        description: 'Order',
        required: true,
        model: 'Order',
      },
    },
  })
  @httpPost('/')
  @withException
  async postOrder(@requestBody() order: Order, @response() res: Response) {
    const result = await this.orderService.insert(order);
    res.status(OK).send(result);
  }

  @ApiOperationPut({
    description: 'Updates a order',
    path: '{id}',
    responses: {
      200: {
        description: 'OK',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'Order',
      },
    },
    parameters: {
      body: {
        description: 'Order',
        required: true,
        model: 'Order',
      },
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
        },
      },
    },
  })
  @httpPut('/:id')
  @withException
  async putOrder(@requestBody() order: Order, @response() res: Response) {
    const result = await this.orderService.update(order);
    res.status(CREATED).send(result);
  }

  @ApiOperationDelete({
    description: 'Deletes a order',
    path: '{id}',
    responses: {
      204: {
        description: 'NO CONTENT',
      },
      404: {
        description: 'NOT FOUND',
      },
    },
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
        },
      },
    },
  })
  @httpPut('/:id')
  @withException
  async deleteOrder(@requestParam('id') orderId: string, @response() res: Response) {
    await this.orderService.delete(orderId);
    res.status(NO_CONTENT).send();
  }
}
