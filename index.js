const express = require('express');
const app= express();
app.use(express.json());
const port=3000



const db= require("./db")



app.get("/aula", async (req,res)=>{
    //conectar com o Banco de Dados
    try{

        const resultado= await db.pool.query("SELECT * FROM aula")
        res.status(200).json(resultado[0])

    }catch(erro){
        res.status(500).json({erro: erro.message})
    }


})





app.post("/aula", async(req,res)=>{

    try{

        const dados= req.body

        const resultado=await db.pool.query(
            "INSERT INTO aula (serie, turma, componente, professor) VALUES(?,?,?,?)",
             [dados.serie,dados.turma,dados.componente, dados.professor]
            )
            res.status(201).json({resultado:"Aula cadastrada, ID= "+resultado[0].insertId})







    }catch(erro){

        res.status(500).json({erro:erro.message})


    }


})









app.listen(port, ()=>{
    console.log("API rodando na porta" + port)
})
