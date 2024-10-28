class Retangulo
    {
        l1: number = 0;
        l2: number = 0;

        calcularArea(): number
            {
                return this.l1 * this.l2
            }

        calcularPerimetro(): number
            {
                return 2 * (this.l1 + this.l2)
            }

        verificarquadrado(): boolean
            {
                return this.l1 == this.l2
            }
    }

    
let r1 : Retangulo;
r1 = new Retangulo();

let r2 : Retangulo;
r2 = new Retangulo;

r1.l1 = 20;
r1.l2 = 20;

r2.l1 = 10;
r2.l2 = 20;

console.log("[r1] Esse retângulo é um quadrado?", r1.verificarquadrado());
console.log("[r2] Esse retângulo é um quadrado?", r2.verificarquadrado());
