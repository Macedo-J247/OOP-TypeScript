// 5. Crie uma função exibir que receba como parâmetro um "rest parameter" representando strings. A função deve exibir no log cada um dos elementos do "rest parameter". Chame a função usando diferentes quantidades de parâmetros.

// Função
function exibir(...dados: string[]): void
    {
        dados.forEach((str) => {
            console.log(str);
        });
    }

// Testes
exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");
exibir("T", "y", "p", "e", "S", "c", "r", "i", "p", "t");
exibir("P", "y", "t", "h", "o", "n");
exibir("J", "a", "v", "a")
