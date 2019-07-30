import {
  ApiModelProperty,
  SwaggerDefinitionConstant,
  ApiModel,
} from 'swagger-express-ts';

@ApiModel({
  name: 'OrderUser',
  description: 'Info about user',
})
export class OrderUserSwaggerModel {
  @ApiModelProperty({
    description: 'User code',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  userCode: string;

  @ApiModelProperty({
    description: 'Name of the user',
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  userName: string;

  @ApiModelProperty({
    description: 'Where the user sells',
    type: SwaggerDefinitionConstant.NUMBER,
  })
  userBase: number;

  @ApiModelProperty({
    description: 'User type',
    example: ['manager', 'supervisor', 'vendor'],
    type: SwaggerDefinitionConstant.NUMBER,
  })
  userType: string;
}
