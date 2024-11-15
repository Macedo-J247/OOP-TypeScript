// 7. Dado método filter das arrays, crie uma implementação usando arrow function que filtre todos os elementos pares dessa array:

// A array
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Arrow function
const pares = array.filter((numero) => numero % 2 === 0);

// Teste
console.log(pares.join(', '));
