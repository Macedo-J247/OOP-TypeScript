class Postagem
{
    id: number;
    texto: string;
    quantidade_curtidas: number;

    constructor(id: number, texto: string)
    {
        this.id = id;
        this.texto = texto;
        this.quantidade_curtidas = 0;
    }

    curtir(): void
    {
        this.quantidade_curtidas += 1;
    }

    toString(): string
    {
        return `Postagem: ${this.texto} | Curtidas: ${this.quantidade_curtidas}`;
    }
}


class Microblog
{
    postagens: Postagem[];

    constructor()
    {
        this.postagens = [];
    }

    incluirPostagem(postagem: Postagem): void
    {
        this.postagens.push(postagem);
    }

    excluirPostagem(id: number): void
    {
        this.postagens = this.postagens.filter(postagem => postagem.id !== id);
    }

    postagemMaisCurtida(): Postagem | null {
        if (this.postagens.length === 0)
        {
            return null;
        }
        return this.postagens.reduce((maisCurtida, postagem) => 
            postagem.quantidade_curtidas > maisCurtida.quantidade_curtidas ? postagem : maisCurtida
        );
    }

    curtirPostagem(id: number): void {
        const postagem = this.postagens.find(postagem => postagem.id === id);
        if (postagem)
        {
            postagem.curtir();
        }
    }

    toString(): string
    {
        return this.postagens.map(postagem => postagem.toString()).join('\n');
    }
}


const microblog = new Microblog();
const postagem1 = new Postagem(1, "Primeira postagem");
const postagem2 = new Postagem(2, "Segunda postagem");

microblog.incluirPostagem(postagem1);
microblog.incluirPostagem(postagem2);
console.log(microblog.toString());

microblog.curtirPostagem(1);
microblog.curtirPostagem(1);
microblog.curtirPostagem(2);
console.log(microblog.toString());

console.log(microblog.postagemMaisCurtida()?.toString());

microblog.excluirPostagem(1); console.log(microblog.toString());
