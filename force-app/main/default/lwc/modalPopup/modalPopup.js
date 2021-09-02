import { LightningElement,api,track } from 'lwc';



export default class ModalPopup extends LightningElement {
  
    @api contact;
    @api readonlyvar;

    handleSuccess(event) {
        const selectEvent=new CustomEvent('creadopj',{
            detail:event.detail.id
        });
        this.dispatchEvent(selectEvent);
    }

    handleCrear(event){
        //ambas formas se pueden.
        //this.template.querySelector('lightning-record-edit-form').submit();
        this.template.querySelector('[data-id="formcontact"]').submit();
       
    }

     handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.contact =false;
     }
    
     erroralguardar(event){
       //se creo para cuando hay error, pero no se le ha encontrado finalidad
     }


}