# Node.js API Specification

### Description

Chat App

---

### Commands

- **npm run build**
  ###### build the project on the ./dist folder
- **npm run dev**
  ###### run the application in dev mode
- **npm run start**
  ###### run the application from ./dist folder
- **npm run prod**
  ###### build and run the application in prod mode
- **npm run test**
  ###### run tests
- **npm run coverage**
  ###### run tests with coverages
- **docker-compose build**
  ###### build the application in an image
- **docker-compose up**
  ###### run the application on a docker container (port 3001)

---

### Environment

|   Variable     | Description         |  default      |
| -------------  | :------------------ | ------------: |
| PORT           | Server port         |  3001         |
| MONGODB_HOST   | Mongo host          |  localhost    |
| MONGODB_PORT   | Mongo port          |  27017        |
| MONGODB_BASE   | Mongo database      |  shortened    |
| LOG_LEVEL      | Level to print logs |  INFO ([log4js](https://www.npmjs.com/package/log4js))|
| LOG_DAYS       | Days to keep logs   |  15           |
| LOG_PATH       | path to save logs   |  logs/        |
| MAX_LENGTH_URL | max URl short length|  8            |

---

### Main technologies

- typescript@3.8.3
- node@12.16.1
- mongoose@5.9.6
- socket.io@5.x.x
- express@4.17.1
- mocha@7.1.1
- MongoDB@3.6.3
- Rabbitmp@3
