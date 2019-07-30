import '../../swaggerModels/OrderSwaggerModel';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as express from 'express';
import * as expressGraphQL from 'express-graphql';
import * as swagger from 'swagger-express-ts';

import exception from './Exception';
import unauthorized from './Unauthorized';
import notFound from './404';
import schema from '../../config/graqhql.schema';

export default {
  initMiddlewares(server) {
    server.use(compression());
    server.use(bodyParser.json());
    server.use(cors());
    if (process.env.NODE_ENV !== 'production') {
      server.use(morgan('tiny'));
    }
    server.use(
      '/order/graphql',
      expressGraphQL({
        schema,
        graphiql: true,
      }),
    );
    // server.use(unauthorized);
  },
  initExceptionMiddlewares(server) {
    server.use(notFound);
    server.use(exception);
  },
  initCustomRoutes(server) {
    server.use('/order/api-docs/swagger', express.static('swagger'));
    server.use('/order/docs', express.static('docs'));
    server.use(
      '/api-docs/swagger/assets',
      express.static('node_modules/swagger-ui-dist'),
    );
    server.use(
      swagger.express({
        definition: {
          info: {
            title: 'generator-test-project',
            version: '0.0.1',
          },
          basePath: '/order',
        },
      }),
    );
  },
};
