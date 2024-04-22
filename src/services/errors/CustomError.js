export default class CustomError {
  static createError({ name = 'Error', cause, message, code = 1 }) {
    console.log('Custom error');
    console.log(name);
    console.log(cause);
    console.log(code);
    console.log('Custom error fin');
    //  const error = new Error(message);
    const error = new Error();
    error.name = name;
    error.message = message;
    error.code = code;
    error.cause = cause //? new Error({"cause":cause})   : 'Causa no definida';
    throw error;
  }
}
