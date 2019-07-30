import {
  ApiModelProperty,
  SwaggerDefinitionConstant,
  ApiModel,
} from 'swagger-express-ts';
import { OrderHeaderSwaggerModel } from './OrderHeaderSwaggerModel';
import { OrderProductSwaggerModel } from './OrderProductSwaggerModel';
import { OrderUserSwaggerModel } from './OrderUserSwaggerModel';

@ApiModel({
  name: 'Order',
  description: 'Order',
})
export default class OrderSwaggerModel {
  @ApiModelProperty({
    description: 'ID',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  _id: string;

  @ApiModelProperty({
    description: 'Current order status',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  status: string;

  @ApiModelProperty({
    description: 'Current order status',
    type: SwaggerDefinitionConstant.OBJECT,
    model: 'OrderHeader',
    required: true,
  })
  orderHeader: OrderHeaderSwaggerModel;

  @ApiModelProperty({
    description: 'Current order status',
    type: SwaggerDefinitionConstant.ARRAY,
    model: 'OrderProduct',
    required: true,
  })
  orderProduct: OrderProductSwaggerModel;

  @ApiModelProperty({
    description: 'Current order status',
    type: SwaggerDefinitionConstant.OBJECT,
    model: 'OrderUser',
    required: true,
  })
  orderUser: OrderUserSwaggerModel;
}
