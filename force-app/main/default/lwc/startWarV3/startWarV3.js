//  import { publish, MessageContext } from 'lightning/messageService';
//  import PJ_START_WAR_MESSAGE from '@salesforce/messageChannel/PjStartWar__c';

import { LightningElement,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import GetCharacter from '@salesforce/apex/CharacterController.getCharacter';

export default class StartWarV3 extends LightningElement {
    
    @track contactid;
    @track contacts;
    error;
    @track numeroP;
    arr_from_json;
    @track messagenocontacts='Por favor digite un número de Personaje';
    //Campos StartWars
    @track titlecard='Creacion de personajes: ';
    //campos readOnly
    readonlyvar={
        FirstName:false,
        Personajenum:false,
        gender:false,
        colorDeCabello:false,
        Color_de_ojos:false,
        Altura:false,
        Planeta:false,
        URL:false
    }
    
    refreshdata=false;
    numPj='';
    onNameChange(event) {
        this.numPj = event.target.value;
	}
    
    handleClick() {
        GetCharacter({  numPj: this.numPj })
            .then((result) => {
                if(result.FirstName!=undefined){
                    //se deberia actualizar una variable de Error...
                
                 this.contacts = result;
                 //validaciones ReadOnly
                 this.readonlyvar.FirstName=this.contacts.FirstName==null?
                                            false:this.contacts.FirstName=='n/a'?
                                                false:this.contacts.FirstName=='Unknow'?false:true;

                this.readonlyvar.Personajenum=this.contacts.Personajenum__c==null?false:this.contacts.Personajenum__c=='n/a'?false:this.contacts.Personajenum__c=='Unknow'?false:true;
                this.readonlyvar.Color_de_cabello=this.contacts.Color_de_cabello__c==null?false:this.contacts.Color_de_cabello__c=='n/a'?false:this.contacts.Color_de_cabello__c=='Unknow'?false:true;
                this.readonlyvar.Color_de_ojos=this.contacts.Color_de_ojos__c==null?false:this.contacts.Color_de_ojos__c=='n/a'?false:this.contacts.Color_de_ojos__c=='Unknow'?false:true;
                this.readonlyvar.Altura=this.contacts.Altura__c==null?false:this.contacts.Altura__c=='n/a'?false:this.contacts.Altura__c=='Unknow'?false:true;
                this.readonlyvar.Planeta=this.contacts.Planeta__c==null?false:this.contacts.Planeta__c=='n/a'?false:this.contacts.Planeta__c=='Unknow'?false:true;
                this.readonlyvar.URL=this.contacts.URL__c==null?false:this.contacts.URL__c=='n/a'?false:this.contacts.URL__c=='Unknow'?false:true;
                 this.readonlyvar.gender=this.contacts.gender==null?false:this.contacts.gender=='n/a'?false:this.contacts.gender=='Unknow'?false:true;
                 //final de validaciones ReanOnly
                if(result.FirstName!=null){
                  this.titlecard='Creacion de personaje: ' + result.FirstName;
                  }
                }else{
                    //colocar otra variable para mostrar un template..
                    this.contacts =null;
                    this.messagenocontacts='No se encuentro Personaje, digite otro número.';
                   
                }
                  
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });
    }
    //Eventos del Form-record
    handleSuccess(event) {
        this.contacts =null;
        this.messagenocontacts='Personaje creado, por favor digite otro número';
        // const message = {
        //     refreshdata: true,
        //     };
        // publish(this.messageContext, PJ_START_WAR_MESSAGE, message); 
        //this.contactid = event.detail.id;
        const toastEvent = new ShowToastEvent({
            title: "Contact created handle",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    erroralguardar(event){
        this.delayTimeout = setTimeout(() => {
            this.contacts =null;
		}, 5000);
      
    }
}