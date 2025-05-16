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
      title: "최영현",
      description:
        "JMT Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3000" // 요청 URL
      },
    ],
    components: {
      schemas: {
        User: mongooseToSwagger(User),
        Store: mongooseToSwagger(Store),
        Menu: mongooseToSwagger(Menu),
      },
    },
  },

  apis: ["./routes/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }