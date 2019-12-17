# React/Express/Sqlite3
##### Note:
I have used express to setup API's & used sqlite3 to store the user info and Integer state for the user.
You can see front-end @ http://52.53.161.200:8000/
For Curl Request

##### Register

```sh
curl -X POST \
  http://52.53.161.200:8000/api/v1/register \
  -H 'content-type: application/json' \
  -d '{
	"email": "abc@gmail.com",
	"password": "test1234",
	"name": "Test User"
}'
RESPONSE: 
{
    "success": true,
    "api_key": "MPT297X-MGVM7TW-NAANK0K-6Z65DG1"
}
```
#### Login

```sh
curl -X POST \
  http://52.53.161.200:8000/api/v1/login \
  -H 'content-type: application/json' \
  -d '{
	"email": "abc@gmail.com",
	"password": "test1234"
}'
Response:
{
    "success": true,
    "api_key": "MPT297X-MGVM7TW-NAANK0K-6Z65DG1"
}
```

#### Current

```sh
curl http://52.53.161.200:8000/api/v1/current -H "Authorization: Bearer MPT297X-MGVM7TW-NAANK0K-6Z65DG1"
Response:
{"success":true,"current":1}
```

#### Next

```sh
curl http://52.53.161.200:8000/api/v1/next -H "Authorization: Bearer MPT297X-MGVM7TW-NAANK0K-6Z65DG1"
Response:
{"success":true,"current":2}
```

#### Reset

```sh
curl -X "PUT" http://52.53.161.200:8000/api/v1/current -H "Authorization: Bearer MPT297X-MGVM7TW-NAANK0K-6Z65DG1" --data "current=1000"
Response:
{"success":true,"current":"1000"}
```
### Installation

Install the dependencies.

```sh
$ npm install
$ cd client
$ npm install
```
Rename config/config.sample.json to config/config.json and update database configurations. By default it will use development env.
### Database Migration
Run following commands to create database structure.
```sh
npm run dbsync
```

### Build Client side application

```sh
$ cd client
$ npm run build
```

### Start Project
```sh
$ npm start
```
go to http://localhost:8000.
