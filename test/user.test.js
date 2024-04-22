import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing ecommerce', () => {
  before(function () {
    this.timeout(3000);
    this.cookie;
    this.mockUser = {
      first_name: 'Usario de test',
      last_name: 'Apellido de Test',
      email: 'user@user',
      password: '123qwe',
      confirmpassword: '123qwe',
      age: 57,
      role: 'user',
    };
    this.mockUserPremium = {
      first_name: 'Usario de test Premium',
      last_name: 'Apellido de Test Premium',
      email: 'userpremium@userpremium',
      password: '123qwe',
      confirmpassword: '123qwe',
      age: 57,
      role: 'premium',
    };
    this.mockUserAdmin = {
      first_name: 'Usario de test admin',
      last_name: 'Apellido de Test admin',
      email: 'useradmin@useradmin',
      password: '123qwe',
      confirmpassword: '123qwe',
      age: 57,
      role: 'admin',
    };
    this.user_id;
    this.userAdmin_id;
    this.userPremium_id;
    this.product_id;
  });
  /*===================================================================
      =                   Testing Users                                   =
      ====================================================================*/
  describe('Testing de Usuarios/Registro/Login', () => {
    //Testing Registro de Usuario
    it('Registro de usuario con rol ususario', async function () {
      //give
      const dataUser = this.mockUser;

      //then
      const { statusCode, ok, _body } = await requester
        .post('/api/users/register')
        .send(dataUser);

      //assert
      expect(statusCode).is.eqls(201);
      expect(_body).is.ok.and.to.have.property('_id');
      expect(ok).to.be.ok;
      this.user_id = _body._id;
    });

    //Testing Registro de Usuario Premium
    it('Registro de usuario con rol premium', async function () {
      //give
      const dataUser = this.mockUserPremium;
      //then
      const { statusCode, ok, _body } = await requester
        .post('/api/users/register')
        .send(dataUser);

      //assert
      expect(statusCode).is.eqls(201);
      expect(_body).is.ok.and.to.have.property('_id');
      expect(ok).to.be.ok;
      this.userPremium_id = _body._id;
    });
    //Testing Registro de Usuario Admin
    it('Registro de usuario con rol Admin', async function () {
      //give
      const dataUser = this.mockUserAdmin;
      //then
      const { statusCode, ok, _body } = await requester
        .post('/api/users/register')
        .send(dataUser);
      //   console.log(statusCode);
      //   console.log(ok);
      //   console.log(_body);
      //assert
      expect(statusCode).is.eqls(201);
      expect(_body).is.ok.and.to.have.property('_id');
      expect(ok).to.be.ok;
      this.userAdmin_id = _body._id;
    });

    // TEsting usuario existente
    it('Testimg de Error al intentar registrar usuario duplicado', async function () {
      //give
      const dataUser = this.mockUser;

      //then
      const { statusCode, ok, _body } = await requester
        .post('/api/users/register')
        .send(dataUser);
      // console.log(statusCode);
      // console.log(ok);
      // console.log(_body);
      //assert
      expect(statusCode).is.eqls(400);
      expect(_body).is.ok.and.to.have.property('message');
      expect(ok).to.be.false;
      expect(_body).to.have.property(
        'message',
        'El usuario ya existe en la base de datos.'
      );
    });

    // Testing Login
    it('Testing Login de usuario', async function () {
      //Given
      const mockLogin = {
        email: this.mockUser.email,
        password: this.mockUser.password,
      };
      //then
      const { statusCode, ok, _body, headers } = await requester
        .post('/api/users/login')
        .send(mockLogin);

      //
      // console.log(statusCode);
      // console.log(ok);
      // console.log(_body);
      // console.log(headers);

      const cookieResult = headers['set-cookie'][0];
      expect(statusCode).is.eql(200);
      const cookieData = cookieResult.split('=');
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken');
      expect(this.cookie.value).to.be.ok;
    });
  });

  //
});
