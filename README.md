# assignement-ztech
A small project I worked on as a "homework" assignment. Making use of Node.js, Express.js, React.js, Backbone.js to create a registration / dashboard landing page of a sort. This project is currently a work in progress, and will be completed as soon as possible.

## Getting started
* You will need to have node.js installed

```javascript
    npm run build
```

This should run through the root directory of the project, and then the public/assets directory. This will kick off the npm installs in both directories as well as should finish up with running the packing scripts to build the distribution files

```javascript
    npm run start
```

Will kick off the express server which will be listening on localhost:8090


Since this is incomplete in the middle region of the project. You can fake a registered user (post registration) by going into your browsers console window, and adding a localSession property called yfUserId to a number between 1 and 4.

