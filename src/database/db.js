//importando a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciando o obj de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports=db;

//utilizar o objeto de bdo para nossas operações
db.serialize(()=>{
    //criar uma tabela

    db.run(`
        create table if not exists places (
            id integer primary key autoincrement,
            image text,
            name text,
            address text,
            address2 text,
            state text,
            city text,
            items text
        );

    `)

//     //inserir dados na tabela

//     const query = `  insert into places (
//         image,
//         name,
//         address,
//         address2,
//         city,
//         items

//     ) values (?,?,?,?,?,?,?)

//            `;

//     const values = ` [

//     ] `;

//     function afterInsertData(err){
//         if(err){
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this);

//     }

//     db.run(query,values,afterInsertData)



//     //consultar dados na tabela

//     db.all(`select * from places`,function(err,rows){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros");
//         console.log(rows);
//     })


//     //deletar um dado na tabela

//     db.run(`delete from places where id = ?`,[1],function(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso!");
//     });



})