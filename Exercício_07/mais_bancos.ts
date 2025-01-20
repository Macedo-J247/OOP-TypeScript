import * as fs from 'fs';

class Conta
{
    private id: string;
    private numero: string;
    private saldo: number;
    private cliente: Cliente | null;

    constructor(id: string, numero: string, saldo: number, cliente: Cliente | null = null)
    {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }

    public sacar(valor: number): boolean
    {
        if (this.saldo - valor < 0)
        {
            return false;
        }
        this.saldo -= valor;
        return true;
    }

    public depositar(valor: number): void
    {
        this.saldo += valor;
    }

    public consultarSaldo(): number
    {
        return this.saldo;
    }

    public transferir(destino: Conta, valor: number): boolean
    {
        if (this.sacar(valor))
        {
            destino.depositar(valor);
            return true;
        }
        return false;
    }

    public mudarTitular(novoTitular: Cliente): void
    {
        this.cliente = novoTitular;
    }

    public getNumero(): string
    {
        return this.numero;
    }

    public getSaldo(): number
    {
        return this.saldo;
    }
}

class ContaImposto extends Conta
{
    private _taxaDeImposto: number = 0.38 / 100;

    public sacar(valor: number): boolean
    {
        const imposto: number = valor * this._taxaDeImposto;
        const totalSaque: number = valor + imposto;

        return super.sacar(totalSaque);
    }
}

class Poupanca extends Conta
{
    private taxaJuros: number;

    constructor(id: string, numero: string, saldo: number, taxaJuros: number, cliente: Cliente | null = null)
    {
        super(id, numero, saldo, cliente);
        this.taxaJuros = taxaJuros;
    }

    public renderJuros(): void
    {
        const juros = this.consultarSaldo() * this.taxaJuros;
        this.depositar(juros);
    }

    public getTaxaJuros(): number
    {
        return this.taxaJuros;
    }
}

class Cliente
{
    private id: string;
    private nome: string;
    private cpf: string;
    private data_nascimento: Date;
    private contas: Conta[];

    constructor(id: string, nome: string, cpf: string, data_nascimento: string, contas: Conta[] = [])
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = new Date(data_nascimento);
        this.contas = contas;
    }

    public excluirConta(numeroConta: string): void
    {
        const indice = this.contas.findIndex(conta => conta.getNumero() === numeroConta);
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

    constructor()
    {
        this.contas = [];
    }

    public inserirConta(conta: Conta): void
    {
        const contaExistente = this.contas.find(c => c.getNumero() === conta.getNumero());
        if (!contaExistente)
        {
            this.contas.push(conta);
        }
        else
        {
            console.log("Conta já cadastrada.");
        }
    }

    public consultarConta(numero: string): Conta | undefined
    {
        return this.contas.find(conta => conta.getNumero() === numero);
    }

    public listarContas(): Conta[]
    {
        return this.contas;
    }

    public renderJuros(numero: string): void
    {
        const conta = this.consultarConta(numero);
        if (conta instanceof Poupanca)
        {
            conta.renderJuros();
        }
        else
        {
            console.log("A conta não é uma poupança ou não foi encontrada.");
        }
    }

    public carregarContasDoArquivo(caminho: string): void
    {
        try
        {
            const dados = fs.readFileSync(caminho, 'utf-8');
            const linhas = dados.trim().split('\n');

            linhas.forEach((linha, index) => {
                const partes = linha.split(';');
                if (partes.length < 3 || partes.length > 4)
                {
                    console.warn(`Linha ${index + 1} inválida: ${linha}`);
                    return;
                }

                const [numero, saldo, tipo, taxaJuros] = partes;
                const saldoNumero = parseFloat(saldo);
                if (isNaN(saldoNumero) || saldoNumero < 0)
                {
                    console.warn(`Saldo inválido na linha ${index + 1}: ${linha}`);
                    return;
                }

                if (tipo === 'C')
                {
                    this.contas.push(new Conta('id-' + numero, numero, saldoNumero));
                }
                else if (tipo === 'CP')
                {
                    const juros = parseFloat(taxaJuros || '0');
                    if (isNaN(juros) || juros < 0)
                    {
                        console.warn(`Taxa de juros inválida na linha ${index + 1}: ${linha}`);
                        return;
                    }
                    this.contas.push(new Poupanca('id-' + numero, numero, saldoNumero, juros));
                }
                else if (tipo === 'CI')
                {
                    this.contas.push(new ContaImposto('id-' + numero, numero, saldoNumero));
                }
                else
                {
                    console.warn(`Tipo de conta inválido na linha ${index + 1}: ${linha}`);
                }
            });
        }
        catch (erro)
        {
            console.error("Erro ao carregar contas do arquivo:", erro);
        }
    }

    public salvarContasNoArquivo(caminho: string): void
    {
        try
        {
            const dados = this.contas.map(conta => {
                if (conta instanceof Poupanca)
                {
                    return `${conta.getNumero()};${conta.getSaldo()};CP;${conta.getTaxaJuros()}`;
                }
                else if (conta instanceof ContaImposto)
                {
                    return `${conta.getNumero()};${conta.getSaldo()};CI`;
                }
                else
                {
                    return `${conta.getNumero()};${conta.getSaldo()};C`;
                }
            }).join('\n');

            fs.writeFileSync(caminho, dados, 'utf-8');
        }
        catch (erro)
        {
            console.error("Erro ao salvar contas no arquivo:", erro);
        }
    }
}
