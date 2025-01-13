class Veiculo
{
    private _placa: String;
    private _ano: number;
}


class Carro extends Veiculo
{
    private _modelo: String;
}


class CarroEletrico extends Carro
{
    private _autonomia_bateria: number;
}
