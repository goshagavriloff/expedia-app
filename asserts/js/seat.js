window.addEventListener('load',async(e)=>{
    let url='https://webdevflights.000webhostapp.com/public/api/flight/all';
    let id=getParamFromUrl('id');
    let date1=getParamFromUrl('date1');
    let date2=getParamFromUrl('date2');
    let family=getParamFromUrl('f');
    let name=getParamFromUrl('i');
    let surname=getParamFromUrl('o');
    let ser=getParamFromUrl('ser');
    let seat=getParamFromUrl('seat');

    let isNotValidID=(id==null)||(id=='');
    let isNotValidDate1=(date1==null)||(date1=='');
    let isNotValidDate2=(date2==null)||(date2=='');
    let isValidFamily=(family==null)||(family=='');
    let isValidName=(name==null)||(name=='');
    let isValidSurname=(surname==null)||(surname=='');
    let isValidSer=(ser==null)||(ser=='');
    let isValidSeat=(seat==null)||(seat=='');

    id=isNotValidID?'FP2100':id;
    date1=(isNotValidDate1)?getDefaultDate():date1;
    date2=(isNotValidDate2)?getDefaultDate():date2;
    family=isValidFamily?"Гаврилов":family;
    name=isValidName?"Василий":name;
    surname=isValidSurname?"Олегович":surname;
    ser=isValidSer?"1234567":ser;
    seat=isValidSeat?"1A":seat;

    let flight__list=await sendFetchRequest(url);

    let data=flight__list.data.flights_to.filter((el)=>{
        return el.flight_code==id;
    });
    if (data[0]!=null){

        document.querySelector('.info__flight').innerHTML=`
        <p>Номер рейса:<span>${data[0].flight_code}</span></p>
        <p>Маршрут:<span>${data[0].from.city},${data[0].from.airport} -> ${data[0].to.city},${data[0].to.airport}</span></p>
        <p>Время вылета:<span>${date1} ${data[0].from.time}</span></p>
        <p>Время прилета:<span>${date2} ${data[0].to.time}</span></p>
        `;

    }
    document.querySelector('.info__contact').innerHTML=`
    <p>Фамилия:<span>${family}</span></p>
    <p>Имя:<span>${name}</span></p>
    <p>Отчество:<span>${surname}</span></p>
    <p>Серия/номер паспорта:<span>${ser}</span></p>
    `;
    document.querySelector('.info__seat').innerHTML=`ВАШЕ МЕСТО В САМОЛЕТЕ: ${seat}`;
},false);