class Conta {
    constructor(id, numero, saldo, cliente = null) {
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
    mudarTitular(novoTitular) {
        this.cliente = novoTitular;
    }
}

class Cliente {
    constructor(id, nome, cpf, data_nascimento, contas = []) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = new Date(data_nascimento);
        this.contas = contas;
    }
    excluirConta(numeroConta) {
        const indice = this.contas.findIndex(conta => conta.numero === numeroConta);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        } else {
            console.log("Conta não encontrada para o cliente.");
        }
    }
}

class Banco {
    constructor() {
        this.clientes = [];
        this.contas = [];
    }

    // Inserir uma nova conta
    inserirConta(conta) {
        const contaExistente = this.contas.find(c => c.numero === conta.numero);
        if (!contaExistente) {
            this.contas.push(conta);
        } else {
            alert("Conta já cadastrada.");
        }
    }

    // Consultar uma conta
    consultarConta(numero) {
        return this.contas.find(conta => conta.numero === numero);
    }

    // Consultar o índice de uma conta
    consultarIndiceConta(numero) {
        return this.contas.findIndex(conta => conta.numero === numero);
    }

    // Alterar uma conta
    alterarConta(conta) {
        const indice = this.consultarIndiceConta(conta.numero);
        if (indice !== -1) {
            this.contas[indice] = conta;
        }
    }

    // Excluir uma conta
    excluirConta(numero) {
        const indice = this.consultarIndiceConta(numero);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        }
    }

    // Depositar em uma conta
    depositar(numero, valor) {
        const conta = this.consultarConta(numero);
        if (conta) {
            conta.depositar(valor);
        }
    }

    // Sacar de uma conta
    sacar(numero, valor) {
        const conta = this.consultarConta(numero);
        if (conta) {
            conta.sacar(valor);
        }
    }

    // Transferir entre contas
    transferir(numeroOrigem, numeroDestino, valor) {
        const contaOrigem = this.consultarConta(numeroOrigem);
        const contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        }
    }

    // Transferir para múltiplas contas
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

    // Inserir um novo cliente
    inserirCliente(cliente) {
        const clienteExistente = this.clientes.find(c => c.cpf === cliente.cpf);
        if (!clienteExistente) {
            this.clientes.push(cliente);
        } else {
            alert("Cliente já cadastrado.");
        }
    }

    // Consultar um cliente pelo CPF
    consultarCliente(cpf) {
        return this.clientes.find(cliente => cliente.cpf === cpf);
    }

    // Excluir um cliente
    excluirCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        if (cliente) {
            cliente.contas.forEach(conta => {
                conta.cliente = null;
            });
            const indice = this.clientes.findIndex(c => c.cpf === cpf);
            if (indice !== -1) {
                this.clientes.splice(indice, 1);
            }
        } else {
            alert("Cliente não encontrado.");
        }
    }

    // Associar uma conta a um cliente
    associarContaCliente(numeroConta, cpfCliente) {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.consultarConta(numeroConta);
        if (cliente && conta && !conta.cliente) {
            cliente.contas.push(conta);
            conta.cliente = cliente;
            alert("Cliente vinculado à conta com sucesso!");
        } else {
            alert("Cliente ou conta não encontrados, ou conta já possui um titular.");
        }
    }

    // Listar todas as contas
    listarContas() {
        return this.contas;
    }

    // Listar contas sem titular
    listarContasSemTitular() {
        return this.contas.filter(conta => !conta.cliente);
    }
}
