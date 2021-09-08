public with sharing class CharacterController {
  
    //este es llamando por un LWC por eso se coloca el Cacheable
    @AuraEnabled(Cacheable=true)
    public static  Contact getCharacter(String numPj) {

        return CallStartWarsApi.getCharacter(numPj);
       
    }
    //Esto se realiza porque est se llama desde un Aura component
    @AuraEnabled
    public static  Contact getCharacterV2(String numPj) {

        return CallStartWarsApi.getCharacter(numPj);
       
    }
     
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> lst_contact=[SELECT Id,FirstName,LastName,Personajenum__c from Contact where Personajenum__c !=null ];

        return lst_contact;
    }
   
}
