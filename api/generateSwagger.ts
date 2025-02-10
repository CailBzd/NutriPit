// generateSwagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.config';
import fs from 'fs';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

fs.writeFileSync('./public/swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger spec generated in public/swagger.json');
