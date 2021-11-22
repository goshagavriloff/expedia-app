window.addEventListener('load',async(e)=>{
    let url='https://webdevflights.000webhostapp.com/public/api/flight';
    let isFrom=getParamFromUrl('from');
    let isTo=getParamFromUrl('to');
    let isDate1=getParamFromUrl('date1');
    let isDate2=getParamFromUrl('date2');

    let isNotValid=(isFrom==null)||(isTo==null)||(isDate1==null)||(isDate2==null)||(isFrom=='')||(isTo=='')||(isDate1=='')||(isDate2=='');

    url+=(isNotValid)?'/all':`?from=${isFrom}&to=${isTo}&date1=${isDate1}&date2=${isDate2}&passengers=1`;
    
    let flight__list=await sendFetchRequest(url);

    let dataTo=flight__list.data.flights_to;
    let dataBack=(isNotValid)?[]:flight__list.data.flights_back;

    isDate1=(isNotValid)?getDefaultDate():isDate1;
    isDate2=(isNotValid)?getDefaultDate():isDate2;
    let isValidDate=checkValidDate(isDate1,isDate2);
   
    
    if (((dataTo[0]==null)&&(dataBack[0]==null))||(!isValidDate)){
        document.location.href='404.html';
    }

    if(isNotValid){
        printFlights(dataTo);  
    } else{
        let nameTo=`${dataTo[0].from.city} -> ${dataTo[0].to.city}`;
        let nameFrom=`${dataBack[0].from.city} -> ${dataBack[0].to.city}`;
        
        let objDataTo={name:nameTo,from:isDate1,to:isDate2};
        let objDataFrom={name:nameFrom,from:isDate1,to:isDate2};

        printFlights(dataTo,objDataTo); 
        printFlights(dataBack,objDataFrom); 
    }
    clickFlightRow();
    
},false);