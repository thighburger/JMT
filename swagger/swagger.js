const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const User = require("../models/User")
const Store = require("../models/Store")
const Menu = require("../models/Menu")

const mongooseToSwagger = require('mongoose-to-swagger');

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "JMT Node.js Swagger",
      description: "JMT Node.js Swagger swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: mongooseToSwagger(User),
        Store: mongooseToSwagger(Store),
        Menu: mongooseToSwagger(Menu),
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }