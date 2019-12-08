var http = require('http');


var server = http.createServer(function (req, res) {

    const likedIt = { id: 1, name: "liked it" };
    const hatedIt = { id: 2, name: "hated it" };
    const madeSick = { id: 3, name: "made me sick" };

    const brendan = { id: 1, name: "Brendan"};
    const jamie = { id: 2, name: "Jamie" };

    const restaurants = [
        {
            id: 1,
            name: "Pizza King",
            menuItems: [
                {
                    id: 1,
                    name: "Tea",
                    person: jamie,
                    opinion: hatedIt
                },
                {
                    id: 3,
                    name: "Pepperoni Breadsticks",
                    person: brendan,
                    opinion: madeSick
                }
            ]
        },
        {
            id: 2,
            name: "Hana",
            menuItems: [
                {
                    id: 2,
                    name: "Seafood Pizza",
                    person: jamie,
                    opinion: likedIt
                },
                {
                    id: 3,
                    name: "Seafood Pizza",
                    person: brendan,
                    opinion: hatedIt
                }
            ]
        },
    ]

    if(req.url == '/restaurants') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.write(JSON.stringify(restaurants));
        res.end();
    }
    if (req.url == '/people') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify([brendan, jamie]));  
        res.end(); 
    
    }
    if(req.url == '/opinionOptions') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify([likedIt, hatedIt, madeSick]));  
        res.end(); 
    }
    else
        res.end('Invalid Request!');

});

server.listen(process.env.PORT || 5000);

console.log('Node.js web server at port 5000 is running..')