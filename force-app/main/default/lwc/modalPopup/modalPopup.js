import { LightningElement,api } from 'lwc';

const CSS_CLASS="modal-hidden";

export default class ModalPopup extends LightningElement {
    showModal=false;

    @api show(){
        this.showModal=true;
    }
    handleDialogClose(){
        this.showModal=false;
    }
}