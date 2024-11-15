// 3. Crie uma função que retorne os números de uma array passados por parâmetro separados por traço ("-") no formato de string. Para isso, use o método forEach das arrays.

// Função
function separar_numeros(lista: string[]): number[]
    {
        const resultado: number[] = [];
        lista.forEach((item) => {
            const numeros = item.split("-");
            numeros.forEach((numero) => {
                if (numero.trim() !== "")
                    {
                        resultado.push(Number(numero));
                    }
            });
        });
        return resultado;
    }

// Testes
console.log(separar_numeros(["1-2-3-4-5-6-7-8"]).join(', '));
console.log(separar_numeros(["2-4-6-8-10-12-14-16-18"]).join(', '));
console.log(separar_numeros(["-0-0-0-0-0-", "-0-0-0-1-"]).join(', '));
console.log(separar_numeros(["2-2-2", "2-2-2-2-2"]).join(', '));
console.log(separar_numeros(["-1--1----1--1-"]).join(', '));
