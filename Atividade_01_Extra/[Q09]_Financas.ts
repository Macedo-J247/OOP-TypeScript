class SituacaoFinanceira
    {
        valorCreditos: number = 0;
        valorDebitos: number = 0;

        calcularSaldo(): number
            {
                return this.valorCreditos - this.valorDebitos
            }
    }

let conta : SituacaoFinanceira;
conta = new SituacaoFinanceira();

conta.valorCreditos = 10000
conta.valorDebitos = 3000

console.log(conta.calcularSaldo());
