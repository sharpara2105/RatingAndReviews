const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Register', ()  => {

    it('should get the first page', (done) => {
        chai.request(server)
            .get('http://localhost:4000')
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html;
              done();
            });
      });
});