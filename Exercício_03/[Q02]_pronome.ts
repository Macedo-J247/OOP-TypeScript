// 2. Crie uma função que recebe como parâmetros um nome e um pronome de tratamento opcional. Caso esse último não seja fornecido, deve ser considerado o valor "Sr". Ao final, imprima uma saudação semelhante a "Sra. Sávia".

// Função
function cumprimentar(nome: string, pronome?: string): string
    {
        return pronome ? `${pronome}. ${nome}` : `Sr(a). ${nome}`;
    }

// Testes
console.log(cumprimentar("Sávia", "Sra"));
console.log(cumprimentar("Carlos"));
console.log(cumprimentar("Thiago"));
console.log(cumprimentar("José", "Sr"));
console.log(cumprimentar("Ana"));
console.log(cumprimentar("Joana", "Sra"));
