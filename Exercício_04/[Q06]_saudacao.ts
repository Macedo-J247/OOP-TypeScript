class Saudacao
    {
        texto: string;
        destinatario: string;

        constructor(txt: string, dest: string)
            {
                this.texto = txt;
                this.destinatario = dest;
            }

        obter_saudacao(): string
            {
                return `${this.texto}, ${this.destinatario}.`;
            }
    }

const bom_dia = new Saudacao("Bom dia", "Caro Leitor");
console.log(bom_dia.obter_saudacao());
