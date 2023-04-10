# Getting Setup with OLIO React Coding Task

This project assumes you have node installed so if you don't make sure to install that first, you can follow this [guide](https://kinsta.com/blog/how-to-install-node-js/) if you haven't already got it installed. If you are having issues running this project make sure you have the same node version I used to create this project (v16.13.1) you can use [nvm](https://github.com/nvm-sh/nvm) to install multiple versions of node if needed.

Before running the project you need to make sure to setup the environment variables do this by copy the .env.example file to .env

```sh
cp .env.example .env
```

***Important!*** You will also need to paste your google maps api key into the env file else google maps will not work

Now if you've got node installed you should be able to run npm install to install the dependencies.

```sh
npm install
```

After that run npm start and you should be able to access the web app at [localhost:3000](http://localhost:3000)

```sh
npm start
```

## Tests

You can also run the test using this command

```sh
npm test
```
