class ControleDeAudio:
    def __init__(self):
        self.volume = 2

    def aumentarVolume(self):
        if self.volume < 10:
            self.volume += 1

    def diminiuirVolume(self):
        if self.volume > 0:
            self.volume -= 1

    def lerVolume(self):
        return self.volume

    def __str__(self):
        return f'Volume ---- [{self.volume}]'


def main():
    caixinha: ControleDeAudio = ControleDeAudio()

    while True:
        option = int(input('''[1] --- Ler Volume
[2] --- Aumentar Volume 
[3] --- Diminuir Volume
[0] --- Sair
> '''))
        if option == 0:
            break
        elif option == 1:
            print(f'Volume da caixa --- {caixinha.lerVolume()}')
        elif option == 2:
            caixinha.aumentarVolume()
        elif option == 3:
            caixinha.diminiuirVolume()
        else:
            print('Opção inválida.\n')

    print(caixinha)


if __name__ == '__main__':
    main()
