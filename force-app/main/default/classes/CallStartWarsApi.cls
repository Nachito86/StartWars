public with sharing class CallStartWarsApi {
   
    
    public static Contact  getCharacter(String numPj) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://swapi.dev/api/people/'+numPj+'/?format=json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        String jsonCharacter='';
        String urlplanet='';

        CharacterIv2 c= new CharacterIv2();
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object>  results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(results);//Albert
            c.name = (String) results.get('name');
            c.height = (String) results.get('height');
            c.gender = (String) results.get('gender');
            c.Color_de_cabello = (String) results.get('hair_color');
            c.Color_de_ojos = (String) results.get('eye_color');
            c.URLStart = (String) results.get('url');
            String urlworld=(String)results.get('homeworld')+'?format=json';
            c.Planeta = getWorld(urlworld);
            c.Personajenum = (String) results.get('gender');
            String JSONString = JSON.serialize(c);
            jsonCharacter=JSONString;
        }

        Contact Pjcontact= new Contact();
        Pjcontact.FirstName= c.name;
        Pjcontact.Personajenum__c=numPj;
        Pjcontact.gender__c=c.gender;
        Pjcontact.Color_de_cabello__c=c.Color_de_cabello;
        Pjcontact.Color_de_ojos__c=c.Color_de_ojos;
        Pjcontact.Altura__c=c.height;
        Pjcontact.Planeta__c=c.Planeta;
        Pjcontact.URL__c=c.URLStart;
        Pjcontact.gender__c=c.gender;

        return Pjcontact;
    }

     
    private static String getWorld(String url) {
        String nameWorld='';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
            Map<String, Object>  results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            nameWorld=(String)results.get('name');
        }
           return nameWorld;
     }


    //esta no se utiliza, porque se reemplazo para retornar Contact; pero si se quisiera utilizar en LWC a sus propiedades se les tienes que colocar @AuraEnable
     public with sharing class CharacterIv2 {
        @AuraEnabled()
        public string name {get; set;}
        @AuraEnabled()
       public string height {get; set;}
       @AuraEnabled()
       public string gender {get; set;}
       @AuraEnabled()
       public string Color_de_cabello {get; set;}
       @AuraEnabled()
       public string Color_de_ojos {get; set;}
       @AuraEnabled()
       public string URLStart {get; set;}
       @AuraEnabled()
       public string Planeta {get; set;}
       @AuraEnabled()
       public string Personajenum {get; set;}
    }
}
