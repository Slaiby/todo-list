# Todo-List

Simple todo-list application that lists some tasks and has the ability to perform some functionalities on them

## Features

- Set a todo complete
- Edit a todo when its in the first column
- Delete a todo when its in the second column
- Add a new Todo
- Toggle a todo from pending to complete
- Search and filter for a todo

## Tech

Todo-List uses a number of open source projects to work properly:

- [Angular] - Single page web-app. JS based framework
- [Json-server] - Mock a restful api to change update and read from the todos list in db.json

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd todo-list
npm install
make sure to have json-server installed as well
npm start will run "concurrently \"npm run serve-mock-db\" \"ng serve\""
serve-mock-db runs "json-server --watch db.json --port 3000"
```

Json-server might need to be installed sepparetly globally on some operating systems if errors arise

```sh
"npm install -g json-server"
```

## Api

- The Restful api will run on "http://localhost:3000"
- Todos => http://localhost:3000/todos
- Home => http://localhost:3000
- The api json configuration is documented in "apis-collection_Todo-List.json".
- Can be imported as a collection to ping the mock json-server backend

## Tests

Run the test cases by calling

```sh
npm test
```

## Running the app

- After installation the app can be served locally on _http://localhost:4200/_
- The route to enter the todos is on _http://localhost:4200/todo_
