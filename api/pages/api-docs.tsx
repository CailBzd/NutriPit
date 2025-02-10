// pages/api-docs.tsx
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      {/* SwaggerUI charge la spécification depuis public/swagger.json */}
      <SwaggerUI url="/swagger.json" />
    </div>
  );
};

export default ApiDocs;
