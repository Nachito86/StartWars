import { publish, MessageContext } from 'lightning/messageService';
import { LightningElement,wire,api  } from 'lwc';
 import PJ_START_WAR_MESSAGE from '@salesforce/messageChannel/Contact';
 
 

export default class PjStartWar extends LightningElement {

    @api contacts;
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
    @wire(MessageContext) messageContext;
    connectedCallback(){
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
    }

    handleSuccess(event) {
        this.contacts =null;
        this.messagenocontacts='Personaje creado, por favor digite otro número';
        const message = {
            refreshdata: true,
            };
        publish(this.messageContext, PJ_START_WAR_MESSAGE, message); 
        //this.contactid = event.detail.id;
        const toastEvent = new ShowToastEvent({
            title: "Contact created handle",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
       
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
      }
}