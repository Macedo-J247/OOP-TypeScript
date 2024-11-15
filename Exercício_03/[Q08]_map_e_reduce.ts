// 8. Crie um exemplo usando a função map para dobrar os elementos de uma array e reduce para totalizar a soma dos elementos de uma array.

// Array
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Função map para dobrar os elementos
const dobrados = numeros.map((numero) => numero * 2);

// Função reduce para somar os elementos
const somados = numeros.reduce((total, numero) => total + numero, 0);

// Testes
console.log(numeros.join(', '));
console.log(dobrados.join(', '));
console.log(somados);
