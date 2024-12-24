class Hora
{
    private hora: number;
    private minutos: number;
    private segundos: number;

    constructor(
        hora: number,
        minutos: number,
        segundos: number
    )
    {
        this.hora = hora;
        this.minutos = minutos;
        this.segundos = segundos;
    }

    public getHora(): number
    {
        return this.hora;
    }

    public getMinutos(): number
    {
        return this.minutos;
    }

    public getSegundos(): number
    {
        return this.segundos;
    }

    public getHoraCompleta(): string
    {
        const formatar = (valor: number) => valor.toString().padStart(2, '0');
        return `${formatar(this.hora)}:${formatar(this.minutos)}:${formatar(this.segundos)}`;
    }
}

const horaAtual = new Hora(14, 30, 45);

console.log(horaAtual.getHora());
console.log(horaAtual.getMinutos());
console.log(horaAtual.getSegundos());
console.log(horaAtual.getHoraCompleta());
