// swagger.config.ts
export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Mon API',
        version: '1.0.0',
        description: 'Documentation de l\'API',
      },
    },
    // Incluez ici les chemins vers vos fichiers annotés (API et éventuellement contrôleurs)
    apis: ['./pages/api/**/*.ts', './controllers/**/*.ts'],
  };
  