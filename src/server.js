const express = require("express");
const server = express();

//pegando o bdo
const db = require("./database/db");



// configurar pasta public

server.use(express.static("public"))

//habilitar o uso do req body.

server.use(express.urlencoded({extended:true}))

//utilizando template


const nunjucks = require("nunjucks");
nunjucks.configure("src/views",{
    express:server,
    noCache: true
})



//configurar caminhos da minha aplicação
// pagina inicial

server.get("/", (req,res)=>{
    //res.sendFile(__dirname + "/views/index.html");
   return res.render("index.html")
})


server.get("/create-point",(req,res)=>{
       //res.sendFile(__dirname+"/views/create-point.html")
   return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{
   //inserindo dados no bdo



    const query = `  insert into places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items

    ) values (?,?,?,?,?,?,?);

           `

    const values =  [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ] ;

    function afterInsertData(err){
        if(err){
            return res.send(err);
        }

        console.log("Cadastrado com sucesso")
        console.log(this);
        return res.render("create-point.html",{saved:true})


    }

    db.run(query,values,afterInsertData)

})



server.get("/search",(req,res)=>{
   
   const search=req.query.search

  if(search==""){
       //pesqusa vazia
       return res.render("search-results.html",{total:0})

   }
    //pegando os dados

   // consultar dados na tabela

    db.all(`select * from places where city like '%${search}%'`,function(err,rows){
        if(err){
            return console.log(err)
        }

        const total=rows.length;

        //mostrar a pagina html com o bdo
       
        return res.render("search-results.html",{places:rows,total:total})
    })

    
})

//ligar o servidor

server.listen(3000);