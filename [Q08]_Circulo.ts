class Circulo
    {
        raio: number = 0;

        calcularArea(): number
            {
                return 3.14 * this.raio ** 2
            }

        calcularPerimetro(): number
            {
                return 2 * 3.14 * this.raio 
            }
    }

let redondo : Circulo;
redondo = new Circulo();

redondo.raio = 9;

console.log(redondo.calcularArea());
console.log(redondo.calcularPerimetro());
