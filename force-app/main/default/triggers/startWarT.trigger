trigger startWarT on Contact (before insert) {

    Map<String,Contact> numpjs= new Map<String,Contact>();
    Set<String> idCOntacts= new Set<String>();
   for(Contact cc:  Trigger.new){
    if(cc.Personajenum__c!=null){
        numpjs.put(cc.Personajenum__c,cc);
        idCOntacts.add(cc.Personajenum__c);
    }
   }
  
        List<Contact> contacts= [SELECT Id,Name,Altura__c,	Color_de_cabello__c,Color_de_ojos__c,URL__c,Personajenum__c,Planeta__c,FirstName,LastName
                                    FROM Contact  WHERE Personajenum__c in:idCOntacts
                                ]; 
                                
        System.debug('Parse: '+contacts);
        //validaciones
        if(contacts.size()>0){
            for(contact c1:contacts){
                if(c1.Personajenum__c==numpjs.get(c1.Personajenum__c).Personajenum__c){
                    Contact erro= numpjs.get(c1.Personajenum__c);
                    erro.addError('ya exixte un contacto con el id.');// sobre la isntancia delñ objeto
                }
            }
        }else{
            //deja crear, seguir el proceso..
            System.debug('DejaCrear');
        }
            
    
}
    

