# Respostas das questões discursivas:

## Exercício - 04

> 1. (F) Objetos são modelos para classes;<br>
>    (F) Atributos de uma classe devem ser obrigatoriamente inicializados para que as classes compilem;<br>
>    (F) Uma variável declarada dentro de um método deve ser inicializada para que a classe seja compilável;<br>
>    (F) ;<br>
>    (V) Construtores são rotinas especiais que servem para inicializar e configurar os objetos no momento da instanciação;<br>
>    (V) Construtores não possuem tipo de retorno e podem ou não ter parâmetros;<br>
>    (V) Uma classe pode ter várias instâncias.

> 2. Sim, variáveis de instância não inicializadas explicitamente, em TypeScript, resultam em `undefined`, que resulta em erro ao tentar incrementar-lo.

> 3. Resposta:
>    ```JavaScript
>    class Hotel
>      {
>        quantReservas: number;
>
>        constructor(quantReservas: number)
>          {
>            this.quantReservas = quantReservas;
>          }
>
>        adicionarReserva(): void
>          {
>            this.quantReservas++;
>          }
>      }
>    let hotel: Hotel = new Hotel(2);
>    console.log(hotel.quantReservas);
>    >>> 2
>    ```

> 4. O construtor da classe exige um parâmetro para a inicialização, mas o ao instanciar, nenhum argumento foi passado.<br>
> Solução:
>    ```JavaScript
>    class Radio
>      {
>        volume: number:
>        constructor(volume: number)
>          {
>            this.volume = volume;
>          }
>      }
>
>    let r: Radio = new Radio(0);
>    r.volume = 10;
>    ```

> 5. A) 140, 140 e 140. Todas as variáveis referenciam o mesmo objeto. <br>

> 5. B) O objeto para o qual `c1` apontava será coletado pelo `garbage collector`, por não haver mais referências a ele.

> 11.  Retornar códigos de erro como na questão 9 é útil para fornecer feedback explicitamente sobre o sucesso ou falaha de uma operação, permitindo que o código chamador tome decisões com base nos resultados.
