class Equipamento
    {
        ligado: boolean;
  
        constructor()
            {
                this.ligado = false; // Inicialmente desligado
            }

        liga(): void
            {
                if (!this.ligado)
                    {
                        this.ligado = true;
                        console.log("Equipamento ligado.");
                    }
                else
                    {
                        console.log("Equipamento já está ligado.");
                    }
            }

        desliga(): void
            {
                if (this.ligado)
                    {
                        this.ligado = false;
                        console.log("Equipamento desligado.");
                    }
                else
                    {
                        console.log("Equipamento já está desligado.");
                    }
            }

        inverter(): void
            {
                this.ligado = !this.ligado;
                console.log(`Equipamento ${this.ligado ? "ligado" : "desligado"}.`);
            }

        estaLigado(): boolean
            {
                return this.ligado;
            }
    }

const meuEquipamento = new Equipamento();
console.log(meuEquipamento.estaLigado());
meuEquipamento.liga();
console.log(meuEquipamento.estaLigado());
meuEquipamento.desliga();
console.log(meuEquipamento.estaLigado());
meuEquipamento.inverter();
console.log(meuEquipamento.estaLigado());
