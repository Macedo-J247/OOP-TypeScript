class Triangulo
    {
        lado_a: number;
        lado_b: number;
        lado_c: number;

        constructor(la: number, lb: number, lc: number)
            {
                this.lado_a = la;
                this.lado_b = lb;
                this.lado_c = lc;
            }
        
        formaTriangulo(): boolean
            {
                return (
                    Math.abs(this.lado_b - this.lado_c) < this.lado_a && this.lado_a < this.lado_b + this.lado_c && Math.abs(this.lado_a - this.lado_c) < this.lado_b && this.lado_b < this.lado_a + this.lado_c && Math.abs(this.lado_a - this.lado_b) < this.lado_c && this.lado_c < this.lado_a + this.lado_b
                );
            }

        ehIsoceles(): boolean
            {
                if (!this.formaTriangulo()) return false;
                return this.lado_a === this.lado_b || this.lado_a === this.lado_c || this.lado_b === this.lado_c;
            }
        
        ehEquilatero(): boolean
            {
                if (!this.formaTriangulo()) return false;
                return this.lado_a === this.lado_b && this.lado_b === this.lado_c;
            }

        ehEscaleno(): boolean
            {
                if (!this.formaTriangulo()) return false;
                return this.lado_a !== this.lado_b && this.lado_a !== this.lado_c && this.lado_b !== this.lado_c;
            }
    }

// Triângulo Equilátero
const trianguloEquilatero = new Triangulo(3, 3, 3);
console.log(trianguloEquilatero.formaTriangulo());
console.log(trianguloEquilatero.ehEquilatero());
console.log(trianguloEquilatero.ehIsoceles());
console.log(trianguloEquilatero.ehEscaleno());

// Triângulo Isósceles
const trianguloIsoceles = new Triangulo(5, 5, 8);
console.log(trianguloIsoceles.formaTriangulo());
console.log(trianguloIsoceles.ehEquilatero());
console.log(trianguloIsoceles.ehIsoceles());
console.log(trianguloIsoceles.ehEscaleno());

// Triângulo Escaleno
const trianguloEscaleno = new Triangulo(4, 5, 6);
console.log(trianguloEscaleno.formaTriangulo());
console.log(trianguloEscaleno.ehEquilatero());
console.log(trianguloEscaleno.ehIsoceles());
console.log(trianguloEscaleno.ehEscaleno());

// Não Triângulo
const naoTriangulo = new Triangulo(1, 2, 3);
console.log(naoTriangulo.formaTriangulo());
console.log(naoTriangulo.ehEquilatero());
console.log(naoTriangulo.ehIsoceles());
console.log(naoTriangulo.ehEscaleno());
