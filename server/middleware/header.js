module.exports = function(req, res, next) {

    res.header('access-control-allow-origin', '*'); //tells the server what the specific origin locations that are allowed to communicate with the server are 
    // '*' is a wild-card, meaning that everything is allowed -- requests from any location are allowed to communicate with the database
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};
