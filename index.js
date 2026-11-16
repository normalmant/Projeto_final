const express = require('express');
const app= express();
app.use(express.json());
const port=3000



const db= require("./db");
const res = require('express/lib/response');



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

//VER HORARIOS_AULAS
app.get("/horario", async (req,res)=>{
    //conectar com o Banco de Dados
    try{

        const resultado= await db.pool.query("SELECT * FROM horario_aula")
        res.status(200).json(resultado[0])

    }catch(erro){
        res.status(500).json({erro: erro.message})
    }


})

//ADICIONAR HORARIos-AUlAS
app.post("/horario", async(req,res)=>{

    try{

        const dados= req.body

        const resultado=await db.pool.query(
            "INSERT INTO horario_aula (idaula, dia_semana, ordem) VALUES(?,?,?)",
             [dados.idaula,dados.dia_semana,dados.ordem, ]
            )
            res.status(201).json({resultado:"Aula cadastrada, ID= "+resultado[0].insertId})
    }catch(erro){

        res.status(500).json({erro:erro.message})


    }


})


//APAGAR HORARIO_AULAS
app.delete("/horario/:id", async(req,res)=>
    {

        try{
            const id=req.params.id


           
            const [resultado]=await db.pool.query(
                    'DELETE FROM horario_aula WHERE ID= ?',
                    [id])

                    if(resultado.affectedRows===0){

                        return res.status(401).json({erro: `Horário não encontrada ${id}`})
                    }
                    res.status(201).json({resultado:`Aula ${id} apagada com sucesso`})
                    console.log(resultado)
            
    
        
        }catch(erro){
            res.status(500).json({erro:erro.message})
        }   

})



app.put("/horario/:id",async(req,res)=>{

    const id = req.params.id
    const {idaula, dia_semana,ordem}= req.body




    try{

    const [verificar] = await db.pool.query(
    'SELECT id FROM horario_aula WHERE idaula = ?',
    [idaula]
)

    if(verificar.length===0){
        return res.status(401).json({erro: `Não há aulas para cadastrar esse horário ${id}`})
    }



        const [resultado] = await db.pool.query(
        'UPDATE horario_aula SET idaula=?, dia_semana = ?, ordem = ? WHERE id=?',
        [idaula,dia_semana,ordem,id]
    )

         if(resultado.affectedRows===0){

        return res.status(401).json({erro: `Não foi possível fazer alterações ${id}`})
      }
         res.status(200).json({resposta: `ATUALIZAÇÃO DO ${id} FEITA COM SUCESSO`})
    } catch(erro){
        res.status(500).json({erro:`ERRO NO SERVIDOR`})
    }




})








app.listen(port, ()=>{
    console.log("API rodando na porta" + port)
})
