class Conta
{
    id: string;
    numero: string;
    saldo: number;
    cliente: Cliente | null;

    constructor(id: string, numero: string, saldo: number, cliente: Cliente | null = null)
    {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
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

    mudarTitular(novoTitular: Cliente): void
    {
        this.cliente = novoTitular;
    }
}

class Cliente
{
    id: string;
    nome: string;
    cpf: string;
    data_nascimento: Date;
    contas: Conta[];

    constructor(id: string, nome: string, cpf: string, data_nascimento: string, contas: Conta[] = [])
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = new Date(data_nascimento);
        this.contas = contas;
    }

    excluirConta(numeroConta: string): void
    {
        const indice = this.contas.findIndex(conta => conta.numero === numeroConta);
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

class Banco {
    clientes: Cliente[];
    contas: Conta[];

    constructor()
    {
        this.clientes = [];
        this.contas = [];
    }

    inserirConta(conta: Conta): void
    {
        const contaExistente = this.contas.find(c => c.numero === conta.numero);
        if (!contaExistente)
        {
            this.contas.push(conta);
        }
        else
        {
            alert("Conta já cadastrada.");
        }
    }

    consultarConta(numero: string): Conta | undefined
    {
        return this.contas.find(conta => conta.numero === numero);
    }

    consultarIndiceConta(numero: string): number
    {
        return this.contas.findIndex(conta => conta.numero === numero);
    }

    alterarConta(conta: Conta): void
    {
        const indice = this.consultarIndiceConta(conta.numero);
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
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
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
        const clienteExistente = this.clientes.find(c => c.cpf === cliente.cpf);
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
        return this.clientes.find(cliente => cliente.cpf === cpf);
    }

    excluirCliente(cpf: string): void
    {
        const cliente = this.consultarCliente(cpf);
        if (cliente)
        {
            cliente.contas.forEach(conta => {
                conta.cliente = null;
            });
            const indice = this.clientes.findIndex(c => c.cpf === cpf);
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
        if (cliente && conta && !conta.cliente)
        {
            cliente.contas.push(conta);
            conta.cliente = cliente;
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
        return this.contas.filter(conta => !conta.cliente);
    }
}
