import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MuutoslokiWebPartStrings';
import Muutosloki from './components/Muutosloki';
import { IMuutoslokiProps } from './components/IMuutoslokiProps';
import {IMuutoslokiState} from './components/IMuutoslokiState';

// @pnp/sp imports  

import { sp, Web } from '@pnp/sp';

import { MuutosRevisio } from './components/MuutosRevisio';


export interface IMuutoslokiWebPartProps {
  description: string;
}

export default class MuutoslokiWebPart extends  BaseClientSideWebPart<IMuutoslokiWebPartProps> {

  public onInit(): Promise<void> {  
    return super.onInit().then(_ => {  
      sp.setup({  
        spfxContext: this.context  
      });  
    });  
  }

  




  public render(): void {
    const element: React.ReactElement<IMuutoslokiProps> = React.createElement(
      Muutosloki,
      {
        description: this.properties.description,
        pageContext: this.context.pageContext,
        muutos: []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
