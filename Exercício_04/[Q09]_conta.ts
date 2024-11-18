class Conta
    {
        numero: string;
        saldo: number;

        constructor(numero: string, saldo: number)
            {
                this.numero = numero;
                this.saldo = saldo;
            }

        sacar(valor: number): boolean
            {
                if (this.saldo - valor < 0)
                    {
                        return false;
                    }
                this.saldo -= valor;
                return true;
            }

        depositar(valor: number): void
            {
                this.saldo += valor;
            }

        consultarSaldo(): number
            {
                return this.saldo;
            }

        transferir(destino: Conta, valor: number): boolean
            {
                if (this.sacar(valor))
                    {
                        destino.depositar(valor);
                        return true;
                    }
                return false;
            }
    }

// Testes
let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 100);

console.log(c1.sacar(50));
console.log(c1.consultarSaldo());
console.log(c1.sacar(60));
console.log(c1.consultarSaldo());

console.log(c1.transferir(c2, 30));
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());

console.log(c1.transferir(c2, 50));
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
