import { MuutosRevisio } from "./MuutosRevisio";

export interface IMuutoslokiState {
    department: string;
    freeText: string;   
    pvm: string[];
    tekija: string[];

    muutos: MuutosRevisio[];
}
