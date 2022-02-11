# Run server

## Option 1: json-server

- Step 1: Run json-server

```bash
  json-server --watch ./sampleData/db.json --port 5000
```

- Step 1:
  - Open link: http://localhost:5000

**json server docs: https://github.com/typicode/json-server**

## Add data to /server/sampleData/db.json

```json
{
  "golf":[....],
  "DuLieuMoi":[
    {
      "_id":"id1",
      "name":"Nguyễn Hùng Vĩ",
      ...
    }
  ]
}
```

## Option 2: Using mongodb

- B1: Create file `.env` with the following data

```
NODE_ENV=development
PORT=5000
MONGO_URI=`local db uri hoặc mongodb atlas`
```

- B2: Install typescript globaly

```
npm i -g typescript
```

- B3: Run the following commands

  - Windows

    ```bash
    yarn add concurrently
    ```

    ```
    yarn concurrently "tsc -w" "yarn nodemon dist/server.js"
    ```

  - MacOS & linux

    ```
    yarn server
    ```

- B4: Server now run on port 5000

**Note:** In order to use every function of the app, you have to fill in all the data in .env file. See env.sample to see all the requirements
