class Jogador
    {
        forca: number;
        nivel: number;
        pontos: number;

        constructor(forca: number, nivel: number, pontos: number)
            {
                this.forca = forca;
                this.nivel = nivel;
                this.pontos = pontos;
            }

        calcularAtaque(): number
            {
                return this.forca * this.nivel;
            }

        atacar(atacado: Jogador): void
            {
                if (atacado.estaVivo())
                    {
                        const dano = this.calcularAtaque();
                        atacado.pontos -= dano;
                    }
            }

        estaVivo(): boolean
            {
                return this.pontos > 0;
            }

        toString(): string
            {
                return `Jogador [força=${this.forca}, nível=${this.nivel}, pontos=${this.pontos}]`;
            }
    }

const jogador1 = new Jogador(10, 5, 100);
const jogador2 = new Jogador(8, 6, 80);

jogador1.atacar(jogador2);
jogador2.atacar(jogador1);

console.log(jogador1.toString());
console.log(jogador2.toString());
