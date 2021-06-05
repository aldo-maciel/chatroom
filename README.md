# Node.js API Specification

### Description

An application to make a URL shorter

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

### Models

- **shortenedUrl**
    - **shortUrl**: String - required
    - **originalUrl**: String - required
    - **createdAt**: Date - Auto managed
    - **updatedAt**: Date - Auto managed

---

### Routes

Base: /api/v1/

- **/shortened-url**
    - public
        - **/shortened-url** - POST - (Create a new short URL)
        - **/shortened-url** - GET - (FindAll)

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

### Examples

---

##### Creating new short url

POST - http://localhost:3001/api/v1/shortened-url

- body
    ```json
   {
     "originalUrl": "http://localhost:3005/#/history"
   }
    ```
- payload
    ```json
    {
      "createdAt": "2020-07-13T06:36:52.513Z",
      "originalUrl": "http://localhost:3005/#/history",
      "shortUrl": "https://pbid.io/6r0th42h",
      "updatedAt": "2020-07-13T06:36:52.513Z",
      "_id": "5f0c0104dc2fce0015eb81af"
    }
    ```

---  

##### Login with crated URL

GET - http://localhost:3001/api/v1/shortened-url

- params
    ```text
     start=0
     step=10
    ```
- payload
    ```json
    {
      "data": [{
          "_id": "5f0c0104dc2fce0015eb81af",
          "originalUrl": "http://localhost:3005/#/history", 
          "shortUrl": "https://pbid.io/6r0th42h", 
          "createdAt": "2020-07-13T06:36:52.513Z",
          "updatedAt":"2020-07-13T06:36:52.513Z"
      }],
      "count":1
    }
    ```

---

### Main technologies

- typescript@3.8.3
- node@12.16.1
- mongoose@5.9.6
- ws@7.2.3
- express@4.17.1
- mocha@7.1.1
- MongoDB@3.6.3
