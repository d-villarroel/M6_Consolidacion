const express = require ('express');
const anime = require ('./db/anime.json');
const fs = require('fs/promises');
const exp = require('constants');
const app = express();


//midd
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/api/anime", async (req, res) => {
    res.send({code:200, message: "Listado de animes", data: anime});
})


app.get("/api/anime/:parametro", (req, res) => {
    try {
        const parametro = req.params.parametro.toLocaleLowerCase();

        const animeItem = anime[parametro] || Object.values(anime).find(animObj => animObj.nombre.toLocaleLowerCase() === parametro)

        if (animeItem){
            res.send({code:200, message: "Detalle anime",  data: animeItem})
        }else{
            res.status(400).send({code:400, message: "Anime no encontrado", })
        }
    } catch (error) {
        res.status(500).send({code:500, message: "Error interno del sevidor"});
    }
})

app.put("/api/anime/:id", async (req, res) => {
    try {
        const data = await fs.readFile("./db/anime.json", "utf8")
        const animeData = JSON.parse(data);

        const idActualizar = req.params.id;
        const actualizar = req.body;

        if(animeData[idActualizar]){
            Object.keys(actualizar).forEach(key => {
                animeData[idActualizar][key] = actualizar[key]
            })
            await fs.writeFile("./db/anime.json", JSON.stringify(animeData, null, 2))
            res.send({code: 200, message: "Anime actualizado exitosamente"})
        }else{
            res.status(400).send({code:400, message: "Anime no encontrado"})
        }
    } catch (error) {
        res.status(500).send({code: 500, message: "Error interno del servidor", error})
    }
})

app.post('/api/anime', async (req, res) => {
    try {
        const nuevoAnime = req.body;
        const data = await fs.readFile("./db/anime.json", 'utf8');
        const animeData = JSON.parse(data);
        const numeroMayor = Math.max(...Object.keys(animeData).map(Number));
        const proximoNumero = numeroMayor +1;
        animeData[proximoNumero] = nuevoAnime;

        await fs.writeFile("./db/anime.json", JSON.stringify(animeData, null, 2), 'utf8');
        res.send({code: 200, message: "Anime creado Exitosamente"})
    } catch (error) {
        res.status(500).send({code:500, message: "Error en el servidor", error})
    }
})

app.delete('/api/anime/:id', async (req, res) => {
    try {
        const data = await fs.readFile("./db/anime.json", "utf8");
        const animeData = JSON.parse(data);

        let id = req.params.id;

        console.log(id)
        if(animeData[id]){
            delete animeData[id];
            await fs.writeFile("./db/anime.json", JSON.stringify(animeData, null, 2), 'utf8');
            res.send({code:200, message: "Anime eliminado con exito"})
        }else{
            res.status(404).send({code:404, message: "Anime no encontrado"})
        }
    } catch (error) {
        res.status(500).send({code: 500, message: "Error interno del servidor", error})
    }
})


module.exports = app;