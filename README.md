# nice
**Nice** atempts to be an API for Sporting Events management.

##Install

1. Make sure you have installed the last version of node.js, you can learn how to intall node.js in any system from https://nodejs.org/.

2. After installing node.js, if you don't have it, install mongodb. See the documentation from mongo's official page http://docs.mongodb.org/manual/.

3. Git clone **nice** repository to your system. Asuming you have git installed, otherwise install git first.
>$> *git clone https://github.com/duatis/nice.git*

4. Enter your freshly installed nice directory and run. 
>$> *npm install*

  to install project dependecies

5. Run the server either straight from node
> $> *node app.njs*

  or using some module for autoload changes as [supervisor](https://www.npmjs.com/package/supervisor)
> $> *supervisor app.njs*

##usage
Once te server is started you can access through the server's you have installed **nice** IP address. 
**Nice**'s default port is 3000 which can be easily changed changing the line with *server.listen(3000);* from app.njs.

Asuming you have installed **Nice** on your localhost you can access it with: http://localhost:300.

The diferent accessible routes can be seen at app.njs file

##TODO
1. Split server creation, routing and socket managment into diferent modules
2. Refactor models and controller to follow inheritance pattern
3. Create controllers and models for Game Actions
4. Test TCP stream using socket.io outside the server
5. API key and authentication for clients
6. Balance server
