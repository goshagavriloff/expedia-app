window.addEventListener('load',async(e)=>{

    let burger=document.querySelector('.menu__burger');
    let menu=document.querySelector('.menu');
    let body=document.querySelector('body');



    burger.addEventListener('click',(e)=>{

        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('lock');

    },false);

},false);

window.sendFetchRequest=async(url)=> {
    let json;
    let response=await fetch(url);
    
    if (response.ok) { 
        json = await response.json();
    } 
    
    return json;
}

window.getParamFromUrl=(param)=>{
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(param);

}

window.printFlights=(data,objData={name:"",from:getDefaultDate(),to:getDefaultDate()})=>{
    window.printFlightsHeader(objData);
    window.printFlightsRows(data,objData);
}

window.printFlightsHeader=(objData)=>{
    document.querySelector('.flights').innerHTML+=`
    <h3>${objData.name}</h3>
    <div class="flight__list">
    <div class="flight__row">
        <div class="flight__col"><p>Рейс</p></div>
        <div class="flight__col"><p>Откуда</p></div>
        <div class="flight__col"><p>Куда</p></div>
        <div class="flight__col"><p>Время отправления</p></div>
        <div class="flight__col"><p>Время прибытия</p></div>
        <div class="flight__col"><p>Цена</p></div>
    </div>
</div>`;
}

window.printFlightsRows=(data,objData)=>{
    data.forEach((el)=>{
        document.querySelector('.flight__list:last-child').innerHTML+=
        `<div class="flight__row" data-flight="${el.flight_code}" data-fromtime="${objData.from}" data-backtime="${objData.to}">
            <div class="flight__col"><p>${el.flight_code}</p></div>
            <div class="flight__col"><p>${el.from.city}</p></div>
            <div class="flight__col"><p>${el.to.city}</p></div>
            <div class="flight__col"><p>${el.from.time}</p></div>
            <div class="flight__col"><p>${el.to.time}</p></div>
            <div class="flight__col"><p>${el.cost}</p></div>
        </div>`;
    });
}

window.clickFlightRow=()=>{
    document.querySelectorAll('.flight__row').forEach((el)=>{
        el.addEventListener('click',(e)=>{
            document.location.href=`booking.html?id=${el.dataset.flight}&date1=${el.dataset.fromtime}&date2=${el.dataset.backtime}`;
        },false);
    });
}


window.getDefaultDate=()=>{
    let date=new Date();
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
  
    return `${yy}-${mm}-${dd}`;
  }

  window.checkValidDate=(date1,date2)=>{
    let date_1=parseValidDate(date1);
    let date_2=parseValidDate(date2);
    return date_1<=date_2;
  }

  window.parseValidDate=(date)=>{
      let arr=date.match(/\d+/g);
    return new Date(arr[0],arr[1],arr[2]);

  }