// Создаем обьект product

const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер fresh',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}


// Создаем доп продукцию

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price:  500,
        kcall: 50,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10,
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30,
    }
}


// делаем подключение к элементам

const   btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
        checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
        addCart = document.querySelector('.addCart'),
        receipt = document.querySelector('.receipt'),
        receiptOut = document.querySelector('.receipt__window-out'),
        receiptWindow = document.querySelector('.receipt__window'),
        receiptBtn = document.querySelector('.receipt__window-btn');


// перебираем все кнопки + и -

for(let i = 0; i < btnPlusOrMinus.length;i++) {
    btnPlusOrMinus[i].addEventListener('click', function() {
        plusOrMinus(this)
    })
}

//  Функция обработки кнопки + или - 

function plusOrMinus(element) {
    // closest() - подключаеться к ближайщему заданому родителю
    // getAttribute() - берет атрибут у элемента
    let parentId = element.closest('.main__product').getAttribute('id');
        out = element.closest('.main__product').querySelector('.main__product-num'),
        price = element.closest('.main__product').querySelector('.main__product-price span'),
        kcall = element.closest('.main__product').querySelector('.main__product-kcall span');


        // делаем проверку на то что нажали  на + или - 

        if(element.getAttribute('data-symbol') == '+' && product[parentId].amount < 10) {
            product[parentId].amount++;
        }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--;
        }

        // выводим  кол-во , цену и каллории в браузере

        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
}


// перебираем наши чекбоксы


for(let i = 0; i < checkExtraProduct.length;i++){
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}
 
// cоздаем функцию для добавления доп продукта

function addExtraProduct(el) {
    const   parent = el.closest('.main__product'),
            parentId = parent.getAttribute('id');
         
    // создаем новый ключ в обьекте

    product[parentId][el.getAttribute('data-extra')] = el.checked;
    
    // console.log(product[parentId]);

    const   kcall = parent.querySelector('.main__product-kcall span'),
            price = parent.querySelector('.main__product-price span'),
            elDataInfo = el.getAttribute('data-extra');

    // делаем проверку на если у нас наш доп продукт

    if(product[parentId][elDataInfo] == true) {
        product[parentId].kcall += extraProduct[elDataInfo].kcall;
        product[parentId].price += extraProduct[elDataInfo].price;
    }else {
        product[parentId].kcall -= extraProduct[elDataInfo].kcall;
        product[parentId].price -= extraProduct[elDataInfo].price;
    }

    // и выводим в браузере

    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
}


// создаем пустой массив

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;


// делаем  вывод информации на модальное окно

addCart.addEventListener('click', function () {
    for(const key in product) {
        const productobj = product[key];
        // теперь будем изменять название в главном обьект
        // console.log(productobj);
        if(productobj.amount > 0) {
            arrProduct.push(productobj);
            // console.log(arrProduct);
            for(const newKey in productobj)  {
                // если мы добавили сыр или  майонез то перезапиши ей имя
                if(productobj[newKey] === true) {
                    //  \n - экранирование
                    productobj.name += '\n' + extraProduct[newKey].name
                }
            }
        }
        productobj.price = productobj.Summ;
        productobj.kcall = productobj.Kcall;
    }

    // нам нужно посчитать общую  сумму , каллорий и название
    // перебираем то что находится в массиве

    for(let i = 0; i < arrProduct.length; i++) {
        const el = arrProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n'  + el.name  + '\n' 
    }
    // выводим нашу информацию  на сайт

    receiptOut.innerHTML  = `Вы  купили: \n ${totalName} \nКаллорийность ${totalKcall} \nСтоимость покупки ${totalPrice}сумм`

    // модальному окну даем flex b opacity чтобы мы могли их увидеть 

    receipt.style.display =  'flex';
    setTimeout(() => {
        receipt.style.opacity = '1';
    },100);
    setTimeout(function() {
        receiptWindow.style.top = '0';
    },200);
    
    //даем чтобы не была прокрутка

    document.body.style.overflow = 'hidden';
    
    
    const   outNum = document.querySelectorAll('.main__product-num'),
            outPrice = document.querySelectorAll('.main__product-price span'),
            outKcall = document.querySelectorAll('.main__product-kcall span');
    
    // перебимраем наши элементы и при нажатии обнуляем их

    for(let i = 0; i < outNum.length;i++) {
        outNum[i].innerHTML = 0;
        outPrice[i].innerHTML = 0;
        outKcall[i].innerHTML = 0;
    }

})


// делаем сброс сайта

receiptBtn.addEventListener('click', function() {
    location.reload();
})

const   block = document.querySelectorAll('.main__product-info'),
        view = document.querySelector('.view'),
        close = document.querySelector('.view__close'),
        images = document.querySelectorAll('.main__product-info img'),
        img = document.querySelector('.view img');
        
        
block.forEach(item => {
    item.addEventListener('dblclick', function(){
        view.classList.add('active');
    })
})

for(let i=0; i< block.length; i++){
    let src = images[i].getAttribute('src');
    block[i].addEventListener('click', () => {
        img.setAttribute('src', src);
    })
}

close.addEventListener('click', () => {
    view.classList.remove('active');
})

const animation = document.querySelector('.header__timer-extra'),
      changer = document.querySelector('.header__timer');


let i = 0;
function timer(){
    if( i < 99) {
        animation.innerHTML = i++;
        setTimeout(() => timer(),100);
        changer.classList.add('color1');
    }else{
        animation.innerHTML = 100;
        changer.classList.add('color2');
    }
}
timer();





