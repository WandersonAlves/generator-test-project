import {
  ApiModelProperty,
  SwaggerDefinitionConstant,
  ApiModel,
} from 'swagger-express-ts';

@ApiModel({
  name: 'OrderHeader',
  description: 'Main info about order',
})
export class OrderHeaderSwaggerModel {
  @ApiModelProperty({
    description: 'Number of this order',
    type: SwaggerDefinitionConstant.NUMBER,
  })
  orderNumber: string;

  @ApiModelProperty({
    description: 'Client code',
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  clientCode: number;
}
