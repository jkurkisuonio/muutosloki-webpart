export  class MuutosRevisio {
    pvm : Date;
    muutos : string;
    tekija : string;

    constructor(pvm: Date, muutos: string, tekija: string)
    {
        this.pvm = pvm;
        this.muutos = muutos;
        this.tekija = tekija;
    }
}

