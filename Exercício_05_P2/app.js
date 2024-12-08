class Conta {
    constructor(id, numero, saldo, cliente) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }
    sacar(valor) {
        if (this.saldo - valor < 0) {
            return false;
        }
        this.saldo -= valor;
        return true;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    consultarSaldo() {
        return this.saldo;
    }
    transferir(destino, valor) {
        if (this.sacar(valor)) {
            destino.depositar(valor);
            return true;
        }
        return false;
    }
}
class Cliente {
    constructor(id, nome, cpf, data_nascimento, contas) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = contas;
    }
}
class Banco {
    constructor() {
        this.clientes = [];
        this.contas = [];
        this.clientes = [];
        this.contas = [];
    }
    inserirConta(conta) {
        const contaExistente = this.contas.find(c => c.id === conta.id || c.numero === conta.numero);
        if (!contaExistente) {
            this.contas.push(conta);
        }
        else {
            console.log("Conta já cadastrada.");
        }
    }
    consultarConta(numero) {
        return this.contas.find(conta => conta.numero === numero);
    }
    consultarIndiceConta(numero) {
        return this.contas.findIndex(conta => conta.numero === numero);
    }
    alterarConta(conta) {
        const indice = this.consultarIndiceConta(conta.numero);
        if (indice !== -1) {
            this.contas[indice] = conta;
        }
    }
    excluirConta(numero) {
        const indice = this.consultarIndiceConta(numero);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        }
    }
    depositar(numero, valor) {
        const conta = this.consultarConta(numero);
        if (conta) {
            conta.depositar(valor);
        }
    }
    sacar(numero, valor) {
        const conta = this.consultarConta(numero);
        if (conta) {
            conta.sacar(valor);
        }
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        const contaOrigem = this.consultarConta(numeroOrigem);
        const contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        }
    }
    transferirParaMultiplasContas(numeroOrigem, contasDestino, valor) {
        const contaOrigem = this.consultarConta(numeroOrigem);
        if (contaOrigem) {
            const valorPorConta = valor / contasDestino.length;
            contasDestino.forEach(numeroDestino => {
                const contaDestino = this.consultarConta(numeroDestino);
                if (contaDestino) {
                    contaOrigem.sacar(valorPorConta);
                    contaDestino.depositar(valorPorConta);
                }
            });
        }
    }
    quantidadeContas() {
        return this.contas.length;
    }
    totalDinheiroDepositado() {
        return this.contas.reduce((total, conta) => total + conta.consultarSaldo(), 0);
    }
    mediaSaldoContas() {
        const totalContas = this.quantidadeContas();
        if (totalContas === 0) {
            return 0;
        }
        return this.totalDinheiroDepositado() / totalContas;
    }
    inserirCliente(cliente) {
        const clienteExistente = this.clientes.find(c => c.id === cliente.id || c.cpf === cliente.cpf);
        if (!clienteExistente) {
            this.clientes.push(cliente);
        }
        else {
            console.log("Cliente já cadastrado.");
        }
    }
    consultarCliente(cpf) {
        return this.clientes.find(cliente => cliente.cpf === cpf);
    }
    associarContaCliente(numeroConta, cpfCliente) {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.consultarConta(numeroConta);
        if (cliente && conta && !cliente.contas.includes(conta)) {
            cliente.contas.push(conta);
        }
        else {
            console.log("Cliente ou conta não encontrados, ou conta já associada ao cliente.");
        }
    }
    listarContasCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        return cliente ? cliente.contas : [];
    }
    totalizarSaldoCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        if (cliente) {
            return cliente.contas.reduce((total, conta) => total + conta.consultarSaldo(), 0);
        }
        return 0;
    }
}
const banco = new Banco();
document.getElementById('btnInserirConta').addEventListener('click', function () {
    const numeroConta = document.getElementById('numeroConta').value.trim();
    const nomeCliente = prompt('Digite o nome do cliente:').trim();
    const cpfCliente = prompt('Digite o CPF do cliente:').trim();
    const dataNascimento = prompt('Digite a data de nascimento (yyyy-mm-dd):').trim();
    if (!numeroConta || !nomeCliente || !cpfCliente || !dataNascimento) {
        alert('Todos os campos são obrigatórios para cadastrar uma conta.');
        return;
    }
    const cliente = new Cliente(Date.now(), nomeCliente, cpfCliente, new Date(dataNascimento), []);
    const conta = new Conta(Date.now(), numeroConta, 0, cliente);
    try {
        banco.inserirCliente(cliente);
        banco.inserirConta(conta);
        banco.associarContaCliente(numeroConta, cpfCliente);
        alert('Conta e cliente inseridos com sucesso!');
    }
    catch (error) {
        alert(error.message);
    }
});
document.getElementById('btnConsultarConta').addEventListener('click', function () {
    const numeroConsulta = document.getElementById('numeroConsulta').value.trim();
    const resultadoConsulta = document.getElementById('resultadoConsulta');
    if (!numeroConsulta) {
        alert('O número da conta é obrigatório para consulta.');
        return;
    }
    const conta = banco.consultarConta(numeroConsulta);
    if (conta) {
        resultadoConsulta.innerText = `Cliente: ${conta.cliente.nome} | Saldo: R$ ${conta.consultarSaldo().toFixed(2)}`;
    }
    else {
        resultadoConsulta.innerText = 'Conta não encontrada.';
    }
});
document.getElementById('btnSacar').addEventListener('click', function () {
    const numeroSaque = document.getElementById('numeroSaque').value.trim();
    const valorSaque = parseFloat(document.getElementById('valorSaque').value);
    if (!numeroSaque || isNaN(valorSaque) || valorSaque <= 0) {
        alert('Número da conta e valor válidos são obrigatórios para saque.');
        return;
    }
    try {
        banco.sacar(numeroSaque, valorSaque);
        alert('Saque realizado com sucesso!');
    }
    catch (error) {
        alert(error.message);
    }
});
document.getElementById('btnDepositar').addEventListener('click', function () {
    const numeroDeposito = document.getElementById('numeroDeposito').value.trim();
    const valorDeposito = parseFloat(document.getElementById('valorDeposito').value);
    if (!numeroDeposito || isNaN(valorDeposito) || valorDeposito <= 0) {
        alert('Número da conta e valor válidos são obrigatórios para depósito.');
        return;
    }
    try {
        banco.depositar(numeroDeposito, valorDeposito);
        alert('Depósito realizado com sucesso!');
    }
    catch (error) {
        alert(error.message);
    }
});
document.getElementById('btnTransferir').addEventListener('click', function () {
    const numeroOrigem = document.getElementById('numeroOrigem').value.trim();
    const numeroDestino = document.getElementById('numeroDestino').value.trim();
    const valorTransferencia = parseFloat(document.getElementById('valorTransferencia').value);
    if (!numeroOrigem || !numeroDestino || isNaN(valorTransferencia) || valorTransferencia <= 0) {
        alert('Números de conta e valor válidos são obrigatórios para transferência.');
        return;
    }
    try {
        banco.transferir(numeroOrigem, numeroDestino, valorTransferencia);
        alert('Transferência realizada com sucesso!');
    }
    catch (error) {
        alert(error.message);
    }
});
document.getElementById('btnListarContas').addEventListener('click', function () {
    const listaContas = document.getElementById('listaContas');
    listaContas.innerHTML = '';
    if (banco.contas.length === 0) {
        listaContas.innerText = 'Nenhuma conta cadastrada.';
        return;
    }
    banco.contas.forEach(conta => {
        const itemConta = document.createElement('div');
        itemConta.innerText = `Número: ${conta.numero} | Cliente: ${conta.cliente.nome} | Saldo: R$ ${conta.consultarSaldo().toFixed(2)}`;
        listaContas.appendChild(itemConta);
    });
});
