const http = require('http')


const server = http.createServer( async (req, res) => {
    if (req.method === 'GET' && req.url === '/')
    {
        console.log("hello world")
        res.end()
    }
})

server.listen(4000, () => {
    console.log("server listening to port 4000");
})