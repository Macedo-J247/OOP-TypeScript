class Conta {
    id: number;
    numero: string;
    saldo: number;
    cliente: Cliente;

    constructor(id: number, numero: string, saldo: number, cliente: Cliente) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }

    sacar(valor: number): boolean {
        if (this.saldo - valor < 0) {
            return false;
        }
        this.saldo -= valor;
        return true;
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(destino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            destino.depositar(valor);
            return true;
        }
        return false;
    }
}


class Cliente
{ 
    id: number;
    nome: string;
    cpf: string;
    data_nascimento: Date;
    contas: Conta[];
    
    constructor(id: number, nome: string, cpf: string, data_nascimento: Date, contas: Conta[])
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = contas;
    }
}


class Banco {
    clientes: Cliente[] = [];
    contas: Conta[] = [];

    constructor() {
        this.clientes = [];
        this.contas = [];
    }

    inserirConta(conta: Conta): void {
        const contaExistente = this.contas.find(c => c.id === conta.id || c.numero === conta.numero);
        if (!contaExistente) {
            this.contas.push(conta);
        } else {
            console.log("Conta já cadastrada.");
        }
    }

    consultarConta(numero: string): Conta | undefined {
        return this.contas.find(conta => conta.numero === numero);
    }

    consultarIndiceConta(numero: string): number {
        return this.contas.findIndex(conta => conta.numero === numero);
    }

    alterarConta(conta: Conta): void {
        const indice = this.consultarIndiceConta(conta.numero);
        if (indice !== -1) {
            this.contas[indice] = conta;
        }
    }

    excluirConta(numero: string): void {
        const indice = this.consultarIndiceConta(numero);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        }
    }

    depositar(numero: string, valor: number): void {
        const conta = this.consultarConta(numero);
        if (conta) {
            conta.depositar(valor);
        }
    }

    inserirCliente(cliente: Cliente): void {
        const clienteExistente = this.clientes.find(c => c.id === cliente.id || c.cpf === cliente.cpf);
        if (!clienteExistente) {
            this.clientes.push(cliente);
        } else {
            console.log("Cliente já cadastrado.");
        }
    }

    consultarCliente(cpf: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.cpf === cpf);
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.consultarConta(numeroConta);

        if (cliente && conta && !cliente.contas.includes(conta)) {
            cliente.contas.push(conta);
        } else {
            console.log("Cliente ou conta não encontrados, ou conta já associada ao cliente.");
        }
    }

    listarContasCliente(cpf: string): Conta[] {
        const cliente = this.consultarCliente(cpf);
        return cliente ? cliente.contas : [];
    }

    totalizarSaldoCliente(cpf: string): number {
        const cliente = this.consultarCliente(cpf);
        if (cliente) {
            return cliente.contas.reduce((total, conta) => total + conta.consultarSaldo(), 0);
        }
        return 0;
    }
}


const banco = new Banco();

// Criar clientes
const cliente1 = new Cliente(1, 'João Silva', '123.456.789-00', new Date('1990-01-01'), []);
const cliente2 = new Cliente(2, 'Maria Oliveira', '987.654.321-00', new Date('1985-05-15'), []);

// Inserir clientes
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);

// Consultar clientes
console.log('Consultar Cliente 1:', banco.consultarCliente('123.456.789-00'));
console.log('Consultar Cliente 2:', banco.consultarCliente('987.654.321-00'));

// Criar contas
const conta1 = new Conta(1, '12345-6', 1000, cliente1);
const conta2 = new Conta(2, '65432-1', 2000, cliente2);

// Inserir contas
banco.inserirConta(conta1);
banco.inserirConta(conta2);

// Associar contas aos clientes
banco.associarContaCliente('12345-6', '123.456.789-00');
banco.associarContaCliente('65432-1', '987.654.321-00');

// Listar contas dos clientes
console.log('Contas do Cliente 1:', banco.listarContasCliente('123.456.789-00'));
console.log('Contas do Cliente 2:', banco.listarContasCliente('987.654.321-00'));

// Totalizar saldo dos clientes
console.log('Saldo total do Cliente 1:', banco.totalizarSaldoCliente('123.456.789-00'));
console.log('Saldo total do Cliente 2:', banco.totalizarSaldoCliente('987.654.321-00'));

// Alterar conta
const novaConta1 = new Conta(1, '12345-6', 1500, cliente1);
banco.alterarConta(novaConta1);
console.log('Conta 1 alterada:', banco.consultarConta('12345-6'));

// Excluir conta
banco.excluirConta('65432-1');
console.log('Contas após exclusão da Conta 2:', banco.consultarConta('65432-1'));

// Depositar em uma conta
banco.depositar('12345-6', 500);
console.log('Saldo após depósito na Conta 1:', banco.consultarConta('12345-6')?.saldo);
