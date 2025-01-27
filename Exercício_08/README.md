# Respostas das questões discursivas:

## Exercício - 08

> 1. Try-Catch-Finally: Usado para capturar e tratar exceções que ocorrem durante a execução do código, tendo o finally como opcional; <br>
>    Throw: Usado para lançar uma exceção manualmente, serve para sinalizar condições de erro específicas; <br>
>    Async/Await com Try-Catch: Usado com operações assíncronas, tratam erros de forma mais legível.

> 2. Try-Catch-Finally: Pode tornar o código mais ilegível e difícil de manter se usado em excesso, além de poder potencialmente mascarar erros; <br>
>    Throw: Pode tornar um código menos eficiente e difícil de entender, já que as exceções lançadas manualmente vão interromper o fluxo normal do programa; <br>
>    Async/Await com Try-Catch: Torna complicado lidar com múltiplas operações assíncronas e garantir que todas sejam tratadas corretamente.

> 3. O método transferir tenta primeiro sacar o valor da conta de origem usando o método sacar. O método verifica se o saldo é suficiente antes de realizar a operação. Como o saldo não é suficiente, uma exceção é lançada, e a operação é interrompida antes de atingir a conta de destino.

> 4. Sim as exceções se propagaram conforme o esperado. Os Erros são lançados diretamente no ponto de falha, se propagando até um nível onde pode ser tratada adequadamente, e possuíndo um tratamento centralizado, o sistema pode continuar funcionando mesmo após a falha.

> 5. O método é reutilizável por todo o código, além de prevenir que nenhuma operação seja realizada com valores inválidos ou negativos. A propagação permite um diagnóstico de falhas mais facilitado na depuração.
