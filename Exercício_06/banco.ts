class Conta
{
    private id: number;
    private numero: string;
    private saldo: number;
    private cliente: Cliente;

    constructor(
        id: number, 
        numero: string, 
        saldo: number, 
        cliente: Cliente
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

    get getCliente(): Cliente
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
}


class Cliente
{
    private id: number;
    private nome: string;
    private cpf: string;
    private dataNascimento: Date;
    private contas: Conta[];

    constructor(
        id: number, 
        nome: string, 
        cpf: string, 
        dataNascimento: Date, 
        contas: Conta[]
    )
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
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
}


class Banco
{
    private contas: Conta[] = [];
    public clientes: Cliente[] = [];

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
        const contaExistente = this.contas.find(c => c.getId === conta.getId || c.getNumero === conta.getNumero);
        if (!contaExistente)
        {
            this.contas.push(conta);
        } 
        else 
        {
            console.log("Conta já cadastrada.");
        }
    }

    consultarConta(numero: string): Conta | undefined
    {
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

    quantidadeContas(): number
    {
        return this.contas.length;
    }

    totalDinheiroDepositado(): number
    {
        return this.contas.reduce((total, conta) => total + conta.consultarSaldo(), 0);
    }

    mediaSaldoContas(): number
    {
        const totalContas = this.quantidadeContas();
        if (totalContas === 0)
        {
            return 0;
        }
        return this.totalDinheiroDepositado() / totalContas;
    }

    inserirCliente(cliente: Cliente): void
    {
        const clienteExistente = this.clientes.find(c => c.getId === cliente.getId || c.getCpf === cliente.getCpf);
        if (!clienteExistente)
        {
            this.clientes.push(cliente);
        }
        else
        {
            console.log("Cliente já cadastrado.");
        }
    }

    consultarCliente(cpf: string): Cliente | undefined
    {
        return this.clientes.find(cliente => cliente.getCpf === cpf);
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void
    {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.consultarConta(numeroConta);

        if (cliente && conta && !cliente.getContas.includes(conta))
        {
            cliente.getContas.push(conta);
        }
        else
        {
            console.log("Cliente ou conta não encontrados, ou conta já associada ao cliente.");
        }
    }

    listarContasCliente(cpf: string): Conta[]
    {
        const cliente = this.consultarCliente(cpf);
        return cliente ? cliente.getContas : [];
    }

    totalizarSaldoCliente(cpf: string): number
    {
        const cliente = this.consultarCliente(cpf);
        if (cliente)
        {
            return cliente.getContas.reduce((total, conta) => total + conta.consultarSaldo(), 0);
        }
        return 0;
    }
}
