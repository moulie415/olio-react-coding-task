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

## UI

I used the library [Material UI](https://mui.com/) on this project as out of the box the components look quite nice which saves time having to style everything. It also seems to have been built with accessibility in mind which is great!

## Redux

This project used redux for state management. More specifically it uses redux toolkit and it was my first time trying it out and I found it really nice for reducing a lot of the boilerplate code necessary in other redux based apps I've worked on. You can learn more about the template I used for this project [here](https://redux-toolkit.js.org/introduction/getting-started). Redux toolkit also provides a great tool to handle data fetching called "RTK Query" and it includes lots of nice features including automatic hook generation. You can read more about RTK Query [here](https://redux-toolkit.js.org/tutorials/rtk-query).

## Notes and things to add

There's lots that could be added to this project but I could be working on this for weeks if I wanted to implement all the possible improvements/features so here's a by no means exhaustive list of things you could add.

- The "mark as viewed" functionality feels like it should be persisted to local storage so that state isn't lost after refreshing the page, this could be easily implemented using [Redux Persist](https://github.com/rt2zz/redux-persist)
- I don't display all the photos on the individual article pages, perhaps if there's more that one photo on an article item we could show them in a carousel like in the OLIO app?
- The OLIO mobile app has a nice feature where it groups markers into one marker based off there proximity to each other, that functionality would certainly carry over nicely into this project
- I add the flag button to articles so in future could actually function as a button for flagging inappropriate items
- I know for some having styling in stylesheets, whilst its not something I prioritise there are some inline styles that could be moved to further neaten things up a bit
