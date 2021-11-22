window.addEventListener('load',async(e)=>{
    let free_seat=document.querySelectorAll('.seat-free');
    let input_seat=document.querySelector('input[name="seat"]');
    let booking_content=document.querySelector('.booking__content');

    let url='https://webdevflights.000webhostapp.com/public/api/flight/all';
    let id=getParamFromUrl('id');
    let date1=getParamFromUrl('date1');
    let date2=getParamFromUrl('date2');


    let isNotValidID=(id==null)||(id=='');
    let isNotValidDate1=(date1==null)||(date1=='');
    let isNotValidDate2=(date2==null)||(date2=='');

    id=isNotValidID?'FP2100':id;
    date1=(isNotValidDate1)?getDefaultDate():date1;
    date2=(isNotValidDate2)?getDefaultDate():date2;
        

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
        free_seat.forEach((el)=>{
            el.addEventListener('click',(e)=>{
                let oldPlace=document.querySelector('.seat-free.seat-selected');
                if(oldPlace!=null){
                    oldPlace.classList.remove('seat-selected');
                }
                el.classList.add('seat-selected');
                input_seat.value=e.target.dataset.place;
            },false);
        });

        document.querySelector('.booking').addEventListener('submit',async(e)=>{
            e.preventDefault();
            if (input_seat.value!=''){
                let f=document.querySelector('input[name="family"]').value;
                let i=document.querySelector('input[name="name"]').value;
                let o=document.querySelector('input[name="surname"]').value;
                let ser=document.querySelector('input[name="serial"]').value;
                let seat=document.querySelector('input[name="seat"]').value;
                document.location.href=`seat.html?id=${id}&date1=${date1}&date2=${date2}&f=${f}&i=${i}&o=${o}&ser=${ser}&seat=${seat}`;
            }
            
            booking_content.classList.remove('active');
            setTimeout(() => {
                booking_content.classList.add('active');
                
            }, 100);
        },false);
    }
    
},false);