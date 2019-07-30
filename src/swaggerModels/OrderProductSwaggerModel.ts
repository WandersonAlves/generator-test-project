import {
  ApiModelProperty,
  SwaggerDefinitionConstant,
  ApiModel,
} from 'swagger-express-ts';

@ApiModel({
  name: 'OrderProduct',
  description: 'Order Product',
})
export class OrderProductSwaggerModel {
  @ApiModelProperty({
    description: 'Description',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  description: string;

  @ApiModelProperty({
    description: 'Name of the product',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: 'Product code',
    type: SwaggerDefinitionConstant.NUMBER,
  })
  productCode: string;

  @ApiModelProperty({
    description: 'Product price',
    type: SwaggerDefinitionConstant.NUMBER,
  })
  productPrice: string;
}
