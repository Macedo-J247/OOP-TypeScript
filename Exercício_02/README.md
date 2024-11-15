# Respostas das questões discursivas:

## Exercício - 02

> 1. Tipagem estática envolve a verificação dos tipos de variáveis durante a compilação, obrigando que os tipos sejam definidos e imutáveis, já a tipagem dinâmica verifica os tipos em tempo de execução, permitindo a mutabilidade dos tipos.

> 2. O principal problema da tipagem dinâmica envolve erros de tipos detectáveis apenas em tempo de execução, o que acarreta em bugs despercebidos durante o desenvolvimento, resultando em falhas mais complexas.

> 3. Exemplo:
>    ~~~javascript
>    function add(a: any, b: any): any
>      {
>        return a + b;
>      }
>
>    let result1 = add(5, 10);
>    >>> 15
>    let result2 = add("5", 10);
>    >>> 510
>    let result3 = add(true, 10);
>    >>> 11
>    ~~~

> 4. A linguagem C é considerada de tipagem fraca por causa da sua capacidade de converter automaticamente tipos diferentes e permitir operações entre eles sem muitas restrições. <br>
>    Exemplo:
>    ~~~C
>    #include <stdio.h>
>
>    int main()
>      {
>        int a = 10;
>        char b = "A";
>        int c = a + b;
>
>        printf("%d\n", c);
>
>        return 0;
>      }
>
>    >>> 75
>    ~~~

> 5. Não exatamente, a tipagem fraca diz respeito à capacidade de uma linguagem de converter automaticamente tipos diferentes e permitir que operações sejam feitas.
