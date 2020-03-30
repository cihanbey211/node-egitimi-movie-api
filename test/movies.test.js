const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');

chai.use(chaiHttp);

let token;
let movieId;

describe('/api/movies Test',() => {
	before((done) => {
		chai.request(server)
		.post('/getToken')
		.send({username:"cihanbey412",password:"e8f8d808"})
		.end((error,response) => {
			token = response.body.token;
			done();
		});
	});
	describe('/GET movies test',() => {
		it('Tüm filmleri getir.',(done) => {
			chai.request(server)
			.get('/api/movies')
			.set('x-access-token',token)
			.end((error,response) => {
				response.should.have.status(200);
				response.body.should.be.a('array');
				done();
			});
		});
	});
	describe('/POST movie',() => {
		it('Film ekleme testi',(done) => {
			const randomName = Math.floor(Math.random() * 100) + 1;
			const movie = {
				title: randomName,
				director_id: "5e7a51b40e354d2fc063dbb0",
				category: "Deneme",
				country: "Turkey",
				year: 1999,
				imdb_score: 8
			}
			chai.request(server)
			.post('/api/movies')
			.send(movie)
			.set('x-access-token',token)
			.end((error,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('title');
				movieId = response.body._id;
				done();
			});
		});
	});
	describe('/GET movie detail',() => {
		it('Sağlanan ID ile film çekme',(done) => {
			chai.request(server)
			.get('/api/movies/'+movieId)
			.set('x-access-token',token)
			.end((error,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('title');
				done();
			});
		});
	});
	describe('/PUT movie edit',() => {
		it('Film düzenleme',(done) => {
			const movie = {
				title: "Deneme",
				director_id: "5e7a51b40e354d2fc063dbb0",
				category: "asd",
				country: "dsa",
				year:1996,
				imdb_score: 12
			}
			chai.request(server)
			.put('/api/movies/'+movieId)
			.send(movie)
			.set('x-access-token',token)
			.end((error,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('title').eql(movie.title);
				done();
			});
		});
	});
	describe('/DELETE movie delete',() => {
		it('Film silme testi',(done) => {
			chai.request(server)
			.delete('/api/movies/'+movieId)
			.set('x-access-token',token)
			.end((error,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('status').eql(1);
				done();
			});
		});
	});
});