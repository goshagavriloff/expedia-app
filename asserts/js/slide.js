window.addEventListener('load',async(e)=>{
    let form=document.querySelector('.slider__form');
    let places=form.querySelectorAll('select');

   

    let airports=await sendFetchRequest('https://webdevflights.000webhostapp.com/public/api/airport');
    let dateInputs=[
        '.slider-date:nth-child(3)',
        '.slider-date:nth-child(4)'
    ];



    places.forEach((el)=>{
        airports.data.items.forEach((airport)=>{
            el.innerHTML+=`<option value="${airport.iata}">${airport.name}</option>`;
        });
    });

    dateInputs.forEach((selector)=>{
        el=document.querySelector(selector);
        el.querySelector('input[type="text"]').addEventListener('click',(e)=>{
            e.target.classList.toggle('active');
            e.target.nextElementSibling.click();
        },false);
    });

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        let from=form.querySelector('.slider__form-row select:nth-child(1)').value;
        let to=form.querySelector('.slider__form-row select:nth-child(2)').value;
        let date1=form.querySelector('.slider-date:nth-child(3) input[type="date"]').value;
        let date2=form.querySelector('.slider-date:nth-child(4) input[type="date"]').value;

        document.location.href=`search.html?from=${from}&to=${to}&date1=${date1}&date2=${date2}&passengers=1`;
    },false);


},false);