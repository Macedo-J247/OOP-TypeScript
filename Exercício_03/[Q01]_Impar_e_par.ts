// 1. Crie uma função que recebe como parâmetro um número e retorne true se ele for par e false caso ímpar.

// A função
function definir_numero(num: number): string
    {
        return num % 2 === 0 ? "True" : "False";
    }

// Testes
console.log(definir_numero(0));
console.log(definir_numero(1));
console.log(definir_numero(2));
console.log(definir_numero(7));
console.log(definir_numero(10));
console.log(definir_numero(11));
console.log(definir_numero(50));
console.log(definir_numero(100));
