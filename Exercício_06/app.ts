class Conta
{
    private id: number;
    private numero: string;
    private saldo: number;
    private cliente: Cliente | null;

    constructor(
        id: number, 
        numero: string, 
        saldo: number,
        cliente: Cliente | null = null
    )
    {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }

    get getId(): number 
    {
        return this.id;
    }

    get getNumero(): string 
    {
        return this.numero;
    }

    get getSaldo(): number
    {
        return this.saldo;
    }

    get getCliente(): Cliente | null 
    {
        return this.cliente;
    }

    sacar(valor: number): boolean 
    {
        if (this.saldo - valor < 0) 
        {
            return false;
        }
        this.saldo -= valor;
        return true;
    }

    depositar(valor: number): void
    {
        this.saldo += valor;
    }

    consultarSaldo(): number 
    {
        return this.saldo;
    }

    transferir(destino: Conta, valor: number): boolean 
    {
        if (this.sacar(valor))
        {
            destino.depositar(valor);
            return true;
        }
        return false;
    }

    mudarTitular(novoTitular: Cliente | null): void
    {
        this.cliente = novoTitular;
    }
}

class Cliente 
{
    private id: number;
    private nome: string;
    private cpf: string;
    private dataNascimento: Date;
    private contas: Conta[];

    constructor(
        id: number, nome: 
        string, cpf: string, 
        dataNascimento: string, 
        contas: Conta[] = []
    ) 
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = new Date(dataNascimento);
        this.contas = contas;
    }

    get getId(): number 
    {
        return this.id;
    }

    get getNome(): string 
    {
        return this.nome;
    }

    get getCpf(): string 
    {
        return this.cpf;
    }

    get getDataNascimento(): Date 
    {
        return this.dataNascimento;
    }

    get getContas(): Conta[] 
    {
        return this.contas;
    }

    excluirConta(numeroConta: string): void 
    {
        const indice = this.contas.findIndex(conta => conta.getNumero === numeroConta);
        if (indice !== -1) 
        {
            this.contas.splice(indice, 1);
        } 
        else 
        {
            console.log("Conta não encontrada para o cliente.");
        }
    }
}

class Banco 
{
    private contas: Conta[];
    private clientes: Cliente[];

    constructor() 
    {
        this.contas = [];
        this.clientes = [];
    }

    private consultarIndiceConta(numero: string): number 
    {
        return this.contas.findIndex(conta => conta.getNumero === numero);
    }

    inserirConta(conta: Conta): void 
    {
        const contaExistente = this.contas.find(c => c.getNumero === conta.getNumero);
        if (!contaExistente) 
        {
            this.contas.push(conta);
        } 
        else 
        {
            alert("Conta já cadastrada.");
        }
    }

    consultarConta(numero: string): Conta | undefined {
        return this.contas.find(conta => conta.getNumero === numero);
    }

    alterarConta(conta: Conta): void 
    {
        const indice = this.consultarIndiceConta(conta.getNumero);
        if (indice !== -1) 
        {
            this.contas[indice] = conta;
        }
    }

    excluirConta(numero: string): void 
    {
        const indice = this.consultarIndiceConta(numero);
        if (indice !== -1) 
        {
            this.contas.splice(indice, 1);
        }
    }

    depositar(numero: string, valor: number): void 
    {
        const conta = this.consultarConta(numero);
        if (conta) 
        {
            conta.depositar(valor);
        }
    }

    sacar(numero: string, valor: number): void 
    {
        const conta = this.consultarConta(numero);
        if (conta) 
        {
            conta.sacar(valor);
        }
    }

    transferir(numeroOrigem: string, numeroDestino: string, valor: number): void 
    {
        const contaOrigem = this.consultarConta(numeroOrigem);
        const contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) 
        {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    transferirParaMultiplasContas(numeroOrigem: string, contasDestino: string[], valor: number): void
    {
        const contaOrigem = this.consultarConta(numeroOrigem);
        if (contaOrigem)
        {
            const valorPorConta = valor / contasDestino.length;
            contasDestino.forEach(numeroDestino => {
                const contaDestino = this.consultarConta(numeroDestino);
                if (contaDestino) 
                {
                    contaOrigem.sacar(valorPorConta);
                    contaDestino.depositar(valorPorConta);
                }
            });
        }
    }

    inserirCliente(cliente: Cliente): void
    {
        const clienteExistente = this.clientes.find(c => c.getCpf === cliente.getCpf);
        if (!clienteExistente)
        {
            this.clientes.push(cliente);
        }
        else
        {
            alert("Cliente já cadastrado.");
        }
    }

    consultarCliente(cpf: string): Cliente | undefined
    {
        return this.clientes.find(cliente => cliente.getCpf === cpf);
    }

    excluirCliente(cpf: string): void
    {
        const cliente = this.consultarCliente(cpf);
        if (cliente)
        {
            cliente.getContas.forEach(conta => {
                conta.mudarTitular(null);
            });
            const indice = this.clientes.findIndex(c => c.getCpf === cpf);
            if (indice !== -1)
            {
                this.clientes.splice(indice, 1);
            }
        }
        else
        {
            alert("Cliente não encontrado.");
        }
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void 
    {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.consultarConta(numeroConta);
        if (cliente && conta && !conta.getCliente) 
        {
            cliente.getContas.push(conta);
            conta.mudarTitular(cliente);
            alert("Cliente vinculado à conta com sucesso!");
        } 
        else 
        {
            alert("Cliente ou conta não encontrados, ou conta já possui um titular.");
        }
    }

    listarContas(): Conta[] 
    {
        return this.contas;
    }

    listarContasSemTitular(): Conta[] 
    {
        return this.contas.filter(conta => !conta.getCliente);
    }
}


const cliente1 = new Cliente(1, "João Silva", "12345678900", "1990-01-01");
const cliente2 = new Cliente(2, "Maria Oliveira", "98765432100", "1985-05-15");

const conta1 = new Conta(1, "001", 1000);
const conta2 = new Conta(2, "002", 2000);
const conta3 = new Conta(3, "003", 3000);

const banco = new Banco();

banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);

banco.inserirConta(conta1);
banco.inserirConta(conta2);
banco.inserirConta(conta3);

banco.associarContaCliente("001", "12345678900");
banco.associarContaCliente("002", "98765432100");


banco.depositar("001", 500);
banco.sacar("002", 100);
banco.transferir("001", "003", 300);


console.log("Contas sem titular:", banco.listarContasSemTitular());


console.log("Contas do cliente 1:", cliente1.getContas);
console.log("Contas do cliente 2:", cliente2.getContas);

banco.excluirCliente("12345678900");
console.log("Contas do cliente 1 após exclusão:", cliente1.getContas);
console.log("Contas sem titular após exclusão:", banco.listarContasSemTitular());
