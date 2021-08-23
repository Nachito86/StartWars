import { LightningElement,wire } from 'lwc';

import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import PERSONAJENUM_FIELD from '@salesforce/schema/Contact.Personajenum__c';
import getContacts from '@salesforce/apex/CharacterController.getContacts';

const COLUMNS = [
    { label: 'Nombre', fieldName: FIRST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Apellido', fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Numero Personaje', fieldName: PERSONAJENUM_FIELD.fieldApiName, type: 'text' }
];


export default class ContactList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)contacts;
}

