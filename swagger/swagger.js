const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

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
        url: "http://52.79.206.198", // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }