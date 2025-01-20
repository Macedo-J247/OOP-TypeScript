class Produto
{
    private _identificador: number;
    private _descricao: string;
    private _quantidade: number;
    private _valor_unitario: number;

    constructor(id: number, desc: string, quant: number, valor: number)
    {
        this._identificador = id;
        this._descricao = desc;
        this._quantidade = quant;
        this._valor_unitario = valor;
    }

    get identificador(): number
    {
        return this._identificador;
    }

    get descricao(): string
    {
        return this._descricao;
    }

    get quantidade(): number
    {
        return this._quantidade;
    }

    get valor_unitario(): number
    {
        return this._valor_unitario;
    }

    incrementar_quantidade(qtd: number): number
    {
        if ((this._quantidade + qtd) < 0)
        {
            console.log("Quantidade inválida.");
            return this._quantidade;
        }
        this._quantidade += qtd;
        return this._quantidade;
    }

    decrementar_quantidade(qtd: number): number
    {
        if ((this._quantidade - qtd) < 0)
        {
            console.log("Quantidade inválida.");
            return this._quantidade;
        }
        this._quantidade -= qtd;
        return this._quantidade;
    }

    exibir_detalhes(): string
    {
        return `ID: ${this._identificador}\nDescrição: ${this._descricao}\nQuantidade: ${this._quantidade}\nValor: R$${this._valor_unitario.toFixed(2)}`;
    }
}


class ProdutoPerecivel extends Produto
{
    private _validade: Date;

    constructor(id: number, desc: string, quant: number, valor: number, validade: Date)
    {
        super(id, desc, quant, valor);
        this._validade = validade;
    }

    get validade(): Date
    {
        return this._validade;
    }

    consultar_validade(): boolean
    {
        const data_atual = new Date();
        return data_atual <= this._validade;
    }

    incrementar_quantidade(qtd: number): number
    {
        if (!this.consultar_validade())
        {
            console.log("Produto vencido.");
            return this.quantidade;
        }
        return super.incrementar_quantidade(qtd);
    }

    decrementar_quantidade(qtd: number): number
    {
        if (!this.consultar_validade())
        {
            console.log("Produto vencido.");
            return this.quantidade;
        }
        return super.decrementar_quantidade(qtd);
    }

    exibir_detalhes(): string
    {
        const validade = this._validade.toLocaleDateString();
        return `${super.exibir_detalhes()}\nValidade: ${validade}`;
    }
}


class Estoque
{
    private _lote: ProdutoPerecivel[];

    constructor()
    {
        this._lote = []
    }

    consultar_produto(id: number, desc: string): boolean
    {
        return this._lote.some(
            (produto) => produto.identificador === id && produto.descricao === desc
        );
    }

    inserir_produto(produto: ProdutoPerecivel): void
    {
        if (this.consultar_produto(produto.identificador, produto.descricao))
        {
            console.log("Produto existente em estoque.");
            return;
        }
        this._lote.push(produto);
        console.log("Produto inserido em estoque.");
    }

    excluir_produto(id: number, desc: string): void
    {
        if (!this.consultar_produto(id, desc))
        {
            console.log("Produto inexistente em estoque.");
            return;
        }
        this._lote = this._lote.filter(
            (produto) => produto.identificador !== id || produto.descricao !== desc
        );
        console.log("Produto removido do estoque.");
    }

    listar_produtos_vencidos(): string
    {
        const vencidos = this._lote.filter(
            (produto) => !produto.consultar_validade()
        );
        if (vencidos.length === 0)
        {
            return "Sem produtos vencidos.";
        }
        return vencidos.map(
            (produto) => produto.exibir_detalhes()
        ).join("\n");
    }

    incrementar_estoque(id: number, desc: string, qtd: number): number
    {
        const produto = this._lote.find(
            (p) => p.identificador === id && p.descricao === desc
        );
        if (!produto)
        {
            console.log("Produto não encontrado.");
            return -1;
        }
        return produto.incrementar_quantidade(qtd);
    }

    decrementar_estoque(id: number, desc: string, qtd: number): number
    {
        const produto = this._lote.find(
            (p) => p.identificador === id && p.descricao === desc
        );
        if (!produto)
        {
            console.log("Produto não encontrado.");
            return -1;
        }
        return produto.decrementar_quantidade(qtd);
    }
}
