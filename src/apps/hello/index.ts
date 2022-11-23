export const sayHello = (request: any, response: any) => {
  response.status(200).send('Hello World!');
};
