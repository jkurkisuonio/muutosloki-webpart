import { PageContext } from '@microsoft/sp-page-context';
import { MuutosRevisio } from './MuutosRevisio';

export interface IMuutoslokiProps {
  description: string;  
  pageContext: PageContext;
  //muutos: string[];
  //pvm: string[];
  //tekija: string[];
  muutos: Array<MuutosRevisio>[];
}
