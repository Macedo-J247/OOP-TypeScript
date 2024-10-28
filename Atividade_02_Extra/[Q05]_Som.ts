class ControleDeAudio
    {
        volume : number = 2;

        aumentarVolume(): void
            {
                if (this.volume < 10)
                    {
                        this.volume += 1;
                    }
            }

        diminuirVolume(): void
            {
                if (this.volume > 0)
                    {
                        this.volume -= 1;
                    }
            }

        lerVolume(): number
            {
                return this.volume;
            }
    }


let caixinha : ControleDeAudio;
caixinha = new ControleDeAudio();

caixinha.aumentarVolume();
caixinha.aumentarVolume();

console.log(`Volume da caixa --- ${caixinha.lerVolume()}`);

caixinha.diminuirVolume();

console.log(`Volume da caixa --- ${caixinha.lerVolume()}`);
