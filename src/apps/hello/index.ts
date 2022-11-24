export const sayHello = (_request: any, response: any) => {
  response.status(200).send('Hello World!');
};
