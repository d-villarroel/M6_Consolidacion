const app = require('./index.js');

const PORT = 3000;

const main = () => {
    app.listen(PORT, () => {
        console.log("Servidor escuchando en el puerto http://localhost:3000")
    })
};

main();