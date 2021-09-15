({
    myAction : function(component, event, helper) {

    },
    handleSubmit:function(component,event,helper){
        // var updatedRecord = JSON.parse(JSON.stringify(event.getParams()));
        // console.log('onsuccess: ', updatedRecord.id);
    },
    handleLoad:function(component,event,helper){
        console.log("handle submit event save.")
    },
    handleSuccess:function(component,event,helper){
        component.set("v.isModalOpen", false);
        var toastEvent = $A.get("e.force:showToast");
        var contactvar=event.getParams().response;
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully. " +contactvar.id,
            "type":"success"
        });
        toastEvent.fire();
        //$A.get('e.force:refreshView').fire();
        
    },
    closeModel:function(component,event,helper){
            //Cierre del modal
            
            component.set("v.isModalOpen", false);
    },
    submitDetails:function(component,event,helper){
        event.preventDefault();
        const fields = event.getParam('fields');
        component.find('recordform').submit(fields);
    },
    openflow:function(component,event,helper){
        try{
            var flow = component.find("flowData");
            flow.startFlow("testAlbertV1");
        }catch(error){
            var meesage= error;
            var ok="";
        }

    },
    handleClicksearchpj:function(component,event,helper){
        var seRealizoVisita=component.get("v.seRealizoVisita");
        console.log(seRealizoVisita);
        //de ambas formas se obtiene el valor.. Una por el id(aura:id)(find)
        //y la otra por un atributo que se encuentra en el valor(get)
        var fNameCmp = component.find("lblnumpj");
        console.log('numero a buscar : ' + fNameCmp.get("v.value"));
        var fNameAttValue = component.get("v.numpj");
        console.log('numero a Buscar: ' + fNameAttValue);

        //aca luego si llamamos al apex controller.
        try{
            var action = component.get('c.getCharacterV2'); 
            action.setParams({"numPj" : fNameAttValue});
            action.setCallback(this, function(response){
                var state = response.getState(); // get the response state
                if(state == 'SUCCESS') {
                    //deberia limpiar o refresh la data para una nueva busqueda.
                    var contactos= response.getReturnValue();
                    if(contactos.FirstName!=undefined){

                            component.set("v.personajec",contactos);
                            component.set("v.isModalOpen", true);
                            component.set("v.outInfo", false);
                            //para setear valoares se pueden de dos formas, por el aura:id=> que seria por el find
                            //o con el attributo(debe estar creado en el html de aura y colocando en el value del input)
                            //ejemplo aura:id    component.find("auraid").set("v.value", "Find Example");
                            //jemeplo atributos: component.set("v.property", "Set Ex");
                            //se realizo con attributos, porque de alguna manera con el find no seteaba los datos, depronto es por estar en un modal.. supongo..
                            
                            //Estos seteos se comentarean, porque se coloca el objeto contacto a la variable v.personajesc
                            // component.set("v.firstNameatt",contactos.FirstName);
                            // component.set("v.Personajenumatt",contactos.Personajenum__c);

                            // component.set("v.genderatt",contactos.gender__c);
                            // component.set("v.Color_de_cabelloatt",contactos.Color_de_cabello__c);
                            // component.set("v.Color_de_ojosatt",contactos.Color_de_ojos__c);

                            // component.set("v.Alturaatt",contactos.Altura__c);
                            // component.set("v.Planetaatt",contactos.Planeta__c);
                            // component.set("v.URLatt",contactos.URL__c);

                            //para el disabled tambien se puede realizar con el find.. pero obte realizarlo con atributos tambien..
                            //ejemplo por get: component.find("URLid").set("v.value",contactos.URL__c);
                            if(contactos.FirstName==null || contactos.FirstName=="n/a" ||  contactos.FirstName=="Unknow"){
                                component.set("v.FirstNameDis",false)
                            }else{
                                component.set("v.FirstNameDis",true);
                            }
                            if(contactos.Personajenum__c==null || contactos.Personajenum__c=="n/a" ||  contactos.Personajenum__c=="Unknow"){
                                component.set("v.PersonajenumDis",false)
                            }else{
                                component.set("v.PersonajenumDis",true);
                            }

                            if(contactos.gender__c==null || contactos.gender__c=="n/a" ||  contactos.gender__c=="Unknow"){
                                component.set("v.genderDis",false)
                            }else{
                                component.set("v.genderDis",true);
                            }
                            if(contactos.Color_de_cabello__c==null || contactos.Color_de_cabello__c=="n/a" ||  contactos.Color_de_cabello__c=="Unknow"){
                                component.set("v.Color_de_cabelloDis",false)
                            }else{
                                component.set("v.Color_de_cabelloDis",true);
                            }
                            if(contactos.Color_de_ojos__c==null || contactos.Color_de_ojos__c=="n/a" ||  contactos.Color_de_ojos__c=="Unknow"){
                                component.set("v.Color_de_ojosDis",false)
                            }else{
                                component.set("v.Color_de_ojosDis",true);
                            }


                            if(contactos.Altura__c==null || contactos.Altura__c=="n/a" ||  contactos.Altura__c=="Unknow"){
                                component.set("v.AlturaDis",false)
                            }else{
                                component.set("v.AlturaDis",true);
                            }
                            if(contactos.Planeta__c==null || contactos.Planeta__c=="n/a" ||  contactos.Planeta__c=="Unknow"){
                                component.set("v.PlanetaDis",false)
                            }else{
                                component.set("v.PlanetaDis",true);
                            }
                            if(contactos.URL__c==null || contactos.URL__c=="n/a" ||  contactos.URL__c=="Unknow"){
                                component.set("v.URLDis",false)
                            }else{
                                component.set("v.URLDis",true);
                            }
                        //Luego aca si
                            console.log(contactos);
                     }else{
                         //No encontro Personaje
                         component.set("v.outInfo", true);
                     }
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                     errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }catch(error){
                //error
                console.log("Error Catch: " + error);
        }
    }
})