### Node + TypeScript + NodeInspector

1. `npm install` to install all required tools.
2. `npm run tsc:watch` to auto-compile the source .ts files in `.src` directory.
3. `npm run serve` to start the server (under the hood it runs `./dist/main.js` using `nodemon`, which restarts the server each time the compiled files change).
4. `npm test` to run tests.
