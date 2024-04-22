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
        .post('/api/extend/users/register')
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
        .post('/api/extend/users/register')
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
        .post('/api/extend/users/register')
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
        .post('/api/extend/users/register')
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
        .post('/api/extend/users/login')
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

  /*===================================================================
    =                   Testing Products                                =
    ====================================================================*/
  describe('Testing de Products', () => {
    // Test getAll
    it('Test para recuperar un arreglo con todos los products en la ruta /api/products', async function () {
      //Given
      const isArray = true;
      //Then
      const { statusCode, ok, _body } = await requester.get('/api/products');

      //Assert
      //   console.log(statusCode)
      expect(statusCode).is.eql(200);
      //    console.log(ok)
      expect(ok).is.ok;
      //
      //   console.log(_body)
      expect(_body).is.ok.and.to.have.property('docs');
    });

    //TEST ALTA EN LA BD
    it('Test que verifica el ingreso de un producto en la BD', async function () {
      //given
      const data = {
        title: 'Product test 01',
        description: 'Detalle del producto test01',
        code: 'test-001',
        price: 123.45,
        stock: 1250,
        category: 'Category test',
        owner: this.mockUserAdmin.email,
      };

      //then
      //Hacer el login como admin
      const result = await requester
        .post('/api/extend/users/login')
        .send(this.mockUserAdmin);
      const cookieResult = result.headers['set-cookie'][0];
      expect(result.statusCode).is.eql(200);
      const cookieData = cookieResult.split('=');
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken');
      expect(this.cookie.value).to.be.ok;

      const { statusCode, ok, _body } = await requester
        .post('/api/products')
        .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
        .send(data);
      console.log('**** body');
      console.log(_body);
      this.product_id = _body._id;
      this.product_id;
      //   console.log('**** Product_id')
      //   console.log(this.product_id)
      //const result = await requester.post('/api/products').send(data)
      //assert
      expect(statusCode).is.eqls(201);
      expect(_body).is.ok.and.to.have.property('_id');
      expect(ok).to.be.ok;
    });

    //TEST ERROR EN ALTA
    it('Test que verifica error de ingreso de un producto en la BD por no tener autorizacion', async function () {
      //given
      const data = {
        title: 'Product test 01',
        description: 'Detalle del producto test01',
        code: 'test-001',
        price: 123.45,
        stock: 1250,
        category: 'Category test',
        owner: this.mockUser.email,
      };

      //then
      //Hacer el login con rol de usuario
      const result = await requester
        .post('/api/extend/users/login')
        .send(this.mockUser);
      const cookieResult = result.headers['set-cookie'][0];
      expect(result.statusCode).is.eql(200);
      const cookieData = cookieResult.split('=');
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken');
      expect(this.cookie.value).to.be.ok;

      const { statusCode, ok, _body } = await requester
        .post('/api/products')
        .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
        .send(data);

      //const result = await requester.post('/api/products').send(data)
      //assert
      // console.log(statusCode);
      // console.log(ok);
      // console.log(_body);

      expect(statusCode).is.eqls(403);
      expect(_body).is.ok.and.to.have.property('error');
      expect(ok).to.be.false;
    });
  });

  //

  /*===================================================================
    =                   Testing CArts                                =
    ====================================================================*/
  describe('Testing de Carts', () => {
    // Test getAll
    it('Test para REgistrar un carrito en /api/carts', async function () {
      //Given
      const newCart = {
        products: [
          {
            product: this.product_id,
            quantity: 1,
          },
        ],
        user: {
          email: this.mockUser.email,
        },
      };
      //Then
      const result = await requester
        .post('/api/extend/users/login')
        .send(this.mockUser);
      const cookieResult = result.headers['set-cookie'][0];
      expect(result.statusCode).is.eql(200);
      const cookieData = cookieResult.split('=');
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken');
      expect(this.cookie.value).to.be.ok;

      //Assert
      console.log('****  new cart');
      console.log(newCart);
      const { statusCode, ok, _body } = await requester
        .post('/api/carts')
        .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
        .send(newCart);

      console.log(statusCode);
      console.log(ok);
      console.log(_body);
    });
  });

  //
});
