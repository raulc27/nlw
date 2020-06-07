const express = require("express");
const server = express();

// configurar pasta public

server.use(express.static("public"))

//configurar caminhos da minha aplicação
// pagina inicial

server.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})


//ligar o servidor

server.listen(3000);