// 6. Converta em arrow function a seguinte função:

// Função a ser convertida
function ola(): void
    {
        console.log("Olá");
    }

// Arrow Function
const hello = (mensagem: string): void => console.log(mensagem);

// Teste
hello("Olá");
