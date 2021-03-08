import * as React from 'react';
import styles from './Muutosloki.module.scss';
import { IMuutoslokiProps } from './IMuutoslokiProps';
import { IMuutoslokiState } from './IMuutoslokiState';
import { escape } from '@microsoft/sp-lodash-subset';
import 'office-ui-fabric-react/dist/css/fabric.css';



// @pnp/sp imports  
import { List, sp } from '@pnp/sp';
import { MuutosRevisio } from './MuutosRevisio';




export default class Muutosloki extends React.Component<IMuutoslokiProps, IMuutoslokiState> {

  
  muutos: Array<MuutosRevisio>;

  constructor(props: IMuutoslokiProps, state: IMuutoslokiState) {
    super(props);

    this.state = {
      department: "",
      freeText: "",
      muutos: new Array<MuutosRevisio>(),
      pvm: [],
      tekija: []
           
    };
  }

  componentDidMount() { 
    let reactcontexthandler=this;    
    let muutos = new Array<MuutosRevisio>();    
    
  sp.web.lists.getById(this.props.pageContext.list.id.toString())  
  .items.getById(this.props.pageContext.listItem.id)
  .select('Versions')  
  .expand('Versions')
  .select("Created,Muutos")  
  .get().then(x => { 
   let vanhamuutos = "";
    x.Versions.forEach((y: { Muutos: string; Vapaateksti: string; Editor: { LookupValue: string; Email: any; }; Created: string; }) => {
      if (y.Muutos !== null) {
                              console.log("-----------------");
                               if (y.Muutos !== vanhamuutos)
                               {
                                if (y.Editor) console.log("Muokkaaja: ", y.Editor.LookupValue + " sposti: ", y.Editor.Email);
                                if (y.Created) { 
                                                console.log("Muokattu:", y.Created);
                                                console.log("Muutos: ", y.Muutos);                                                
                                                muutos.push(new MuutosRevisio(new Date(y.Created), y.Muutos, y.Editor.LookupValue));                                                    
                                                vanhamuutos = y.Muutos;    
                                              }
                                console.log("Y: ", y);
                                
                              }
                            }
    });    
    
    reactcontexthandler.setState({muutos: muutos});
    console.log("Muutos on : ", muutos);
  }); 
}


public render(): React.ReactElement<IMuutoslokiProps>    
{
  function _alertClicked(): void {
    alert('Clicked');
  }
  
console.log("Render funktio:", this.state.muutos);
return ( 
  <div className="ms-Grid" >    
     
      <div className="ms-Grid-row">
      <b>
      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"> Pvm: </div>
      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"> Muokkaaja: </div>
      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"> Muutos: </div>
      </b>
      </div>
      <div className="ms-Grid-row">
        <hr/>
      </div>
    {
    this.state.muutos.map(function (x, key) {    
    return (
      <div className="ms-Grid-row">            
                                                        
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">                  
               
               { new Intl.DateTimeFormat("fi-FI", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(x.pvm)}
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">                  
              {x.tekija}
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">                  
              {x.muutos}
       
          </div>
        </div>                   
         )
    })
  }     


</div>
)
}


}
