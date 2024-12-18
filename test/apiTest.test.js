const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas del metodo GET', () => {
    it('Deberia devolver el listado de animes', async () => {
        const res = await chai.request(app).get('/api/anime');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Listado de animes');   
    })
})


describe('Pruebas del metodo GET con parámetro', () => {
    it('Debería devolver información del anime solicitado por nombre', async () => {
        const parametro = 'naruto'; 
        const res = await chai.request(app).get(`/api/anime/${parametro}`);
        expect(res).to.have.status(200); 
        expect(res.body).to.be.an('object'); 
        expect(res.body.message).to.equal('Detalle anime'); 
    });

    it('Debería devolver información del anime solicitado por ID', async () => {
        const id = '4'; 
        const res = await chai.request(app).get(`/api/anime/${id}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Detalle anime');
    });

});

describe('Pruebas del método PUT', () => {
    it('Debería actualizar la información del anime', async () => {
        const id = '5'; 
        const datosActualizados = {
            genero: 'Acción y Aventura',
            año: '2004'
        };
        const res = await chai.request(app)
            .put(`/api/anime/${id}`)
            .send(datosActualizados); 
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Anime actualizado exitosamente');
    });
});

describe('Pruebas del método DELETE', () => {
    it('Debería eliminar el anime según el ID', async () => {
        const id = 4; 
        const res = await chai.request(app).delete(`/api/anime/${id}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Anime eliminado con exito');
    });
});