const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');

chai.use(chaiHttp);

let token;
let movieId;

describe('/api/movies Test',() => {
});