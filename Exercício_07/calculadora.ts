class Calculator
{
    private _operando_um: number;
    private _operando_dois: number;

    constructor(operando_one: number, operando_two: number)
    {
        this._operando_um = operando_one;
        this._operando_dois = operando_two;
    }

    public soma(): number
    {
        return this._operando_um + this._operando_dois;
    }
}


const calculadora = new Calculator(10, 20);
console.log(`Soma = ${calculadora.soma()}`)
