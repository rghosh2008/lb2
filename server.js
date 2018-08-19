const Hapi = require("hapi");
const server = new Hapi.Server();
const mongoose = require('mongoose');
const User = require("./model/user_model")

server.connection({port:3000});

server.start(console.log("test"))

server.route({
    method: "GET", 
    path: "/test",
    handler: function(request,reply){
        reply.view("landing");
    }
})

server.register(require("vision"), function(err){
    server.views({
        engines: {
            ejs: require("ejs")
        },
        relativeTo: __dirname,
        path: "views"
    })
});

server.register(require("inert"), function(err){
    
});

server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: "public"
        }
    }
});


// Database setup
const mongoURI = 'mongodb://luckybreak2.0:rghosh2008@ds223812.mlab.com:23812/luckybreak2';

mongoose.connect(mongoURI)
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.register({
    register: require("./routes/user")
}, function(err){
    if(err){
        return;
  }
});
