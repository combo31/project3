"use ctrict";
// Работа с табами
// Выбираем глобальный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
  // Прописываем нужные переменные
  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
    
  //скрываем все табы на странице меню
  function hideTabContent() {
    tabsContent.forEach(item => {
      //item.style.display = 'none';
      // В2 используем классы вместо стилей
      item.classList.add('hide');
      item.classList.remove('show', 'fade'); // добавляем класс 'fade'
    });
    // убираем класс активности у всех табов меню
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active'); // точку не ставим т.к. работаем с классом
    });

  }

  // Создаем функцию которая будет показывать табы
  // + анимация переключения
  function showTabContent(i = 0) { // 0 будет по умолчанию если нужно
    //tabsContent[i].style.display = 'block';
    // В2 используем классы вместо стилей
    tabsContent[i].classList.add('show', 'fade'); // добавляем класс fade
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent(); // (0)номер первого слайда либо по умолчанию

  // Назначаем обработчик события клика(чтобы делегировать события)
  tabsParent.addEventListener('click', (event) => {
    //чтобы в последующем не писать event.target, саздаем переменную
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => { //если элемент в массиве соответствует 
        // элементу по которому кликнул пользователь, то выводим его
        if (target == item) {
          hideTabContent();
          showTabContent(i); // (i) номер элемента который совпал
        }
      });
    }
  });

  // Работа с таймером Working with a timer

  const deadline = '2021-02-11';
  // Рассчитаем временные промежутки / Let's calculate the time intervals
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor((t / (1000 * 60 * 60 * 24))),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    // Преобразуем значения в объект / Converting values to an object
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // Подставляем 0 в таймер / Substituting 0 into the timer
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  // Устанавливаем таймер на страницу / Setting the timer to the page
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    // Убираем начальные значения(мигание)/ Remove initial values (blinking)
    updateClock();

    // Обновление таймера / Timer update
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }



  setClock('.timer', deadline);

  // Модальное окно / Modal window

  const modalTrigger = document.querySelectorAll('[data-modal'), // кнопки указываем в скобках так как это атрибут
    modal = document.querySelector('.modal'); // окно
  //modalCloseBtn = document.querySelector('[data-close]');// крестик закрытия окна(удаляем, будет формироваться динамически коммит 7)

  // Открытие и закрытие окна
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');

    // Вариант с toggle
    //modal.classList.toggle('show'); // переключатель убирает/добавляет класс

    // убираем прокрутку
    document.body.style.overflow = 'hidden'; // не позволяет прокручивать страницу
    // Очистка таймера если пользователь сам открыл окно
    clearInterval(modalTimerID);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');

    // Вариант с toggle
    //modal.classList.toggle('show'); // переключатель убирает/добавляет класс

    // убираем прокрутку
    document.body.style.overflow = ''; // браузер сам восстановит скролл
  }

  //modalCloseBtn.addEventListener('click', closeModal);// удаляем (коммит 7)

  //Закрытие окна при клике в другую область экрана
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      // добавляем условие или (коммит 7)
      closeModal();
    }
  });

  // Закрытие окна при клике на 'Esc'(при открытом окне)
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { // вызываем свойство события(e) code
      closeModal();
    }
  });

  // Вызов окна при пролистывании до конца сайта / Calling a window when scrolling to the end of the site
  // Установим время вызова
  const modalTimerID = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      // Удаляем обработчик события чтобы окно не вызывалось снова
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  // Вызов окна в конце сайта
  window.addEventListener('scroll', showModalByScroll);

  /*
  Шаблонизировать карточки заказа и создавать их только передавая нужные аргументы с помощью классов
  */

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // будет массив
      this.parent = document.querySelector(parentSelector); // будет дом элемент
      this.transfer = 2.5; // конвертация в доллары
      this.changeToRUB();
    }

    changeToRUB() { //метод рассчета конвертации
      this.price = this.price * this.transfer;
    }

    render() { // метод формирования верстки для changeToRUB
      const element = document.createElement('div');
      // Применим значение по умолчанию чтобы подставлялся нужный класс
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className)); // обращаемся к этому 'div' и добавляем каждый класс который будет в этом массиве
      }


      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
      `;
      this.parent.append(element); // помещаем созданный элеменм внутрь элемента
    }
  }

  const getResource = async (url) => { // передаем адрес 
    const res = await fetch(url);

    if (!res.ok) {// если запрос не прошел
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);// создаем объект ошибки
    }

    return await res.json(); // обработка промиса в объект
  };

  // getResource('http://localhost:3000/menu')// делаем запрос
  //   .then(data => {// получаем объект
      // data.forEach(({img, altimg, title, descr, price}) => {// перебираем, деструктуризируе
      //   new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // указываем куда пушим ('.menu .container')
      // });
  //   });

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {// перебираем, деструктуризируе
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // указываем куда пушим ('.menu .container')
      });
    });

  // Второй вариант создания элементов без класса (формирование динамической верстки)

  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  //   function createCard(data) {// функция получает массив
  //     data.forEach(({img, altimg, title, descr, price}) => {// деструктуризирует на свойства
  //       const element = document.createElement('div');// создает div
  //         price = price * 2.5;
  //       element.classList.add('menu__item');// присваивает новый класс

  //       element.innerHTML = `
  //         <img src=${img} alt=${altimg}>// свойства получаем с сервера
  //         <h3 class="menu__item-subtitle">${title}</h3>
  //         <div class="menu__item-descr">${descr}</div>
  //         <div class="menu__item-divider"></div>
  //         <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price}</span> руб/день</div>
  //         </div>
  //       `;

  //       document.querySelector('.menu .container').append(element);// вставляем карточку в элемент на странице
  //     });
  //   }

  // Forms отроавка данных с формы
  const forms = document.querySelectorAll('form');
  const message = { // то что будет показываться пользователю
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => { // обработчик события при отправке
    bindPostData(item);
  });

  // Отправка в формате JSON + async / await
  const postData = async (url, data) => {// передаем адрес и данные
    const res = await fetch(url, {//await ждет окончания запроса
      method: "POST",
        headers: {
          'Content-type': 'application/json' // прописываем заголовки
        },
        body: data
    });

    return await res.json();// обработка промиса
  };

  function bindPostData(form) {// привязка постинга
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // отменяем стандартное поведение браузера

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      // FormData нужно перевести в JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));// превращаем в матрицу, потом в объект и потом в json

        postData('http://localhost:3000/requests', json) // обрабатываем полученный промис(обращаемся к json requests)
        .then(data => {
          console.log(data);
          showThanksModal(message.success); // вызываем созданную функцию
          statusMessage.remove(); // удаление блока сообщения
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset(); // очистка данных формы после отправки
        });

    });
  }

  // Красивое оформление отправки и создание формы ответа
  // скрываем первое окно и показываем другое (на его основе)
  function showThanksModal(message) { // показ окна благодарности
    const prevModalDialog = document.querySelector('.modal__dialog'); // получаем

    prevModalDialog.classList.add('hide'); // скрываем элемент перед показом окна
    openModal(); // открытие окна

    const thanksModal = document.createElement('div'); // обертка окна
    thanksModal.classList.add('modal__dialog'); // добавляем класс 
    // формируем верстку
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal); // получаем модальное окно и вставляем в него блок
    setTimeout(() => { // возвращаем все на место через какое-то время
      thanksModal.remove(); // удаление через 4 с
      prevModalDialog.classList.add('show'); // показ предыдущего контента
      prevModalDialog.classList.remove('hide'); //
      closeModal(); // закрытие окна
    }, 4000);
  }

  fetch('http://localhost:3000/menu')// обращение к json-server
    .then(data => data.json())
    .then(res => console.log(res));

  
    // Slider
  const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total');

  let slideIndex = 1;

  showSlides(slideIndex); // инициализируем первый слайд

  if (slides.length < 10) {// подставляем 0 в номер слайда
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  function showSlides(n) {
    if (n > slides.length) {//переброс в начало
      slideIndex = 1;
    }

    if (n < 1) {// переброс в конец
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');// скрываем все слайды

    slides[slideIndex - 1].style.display = 'block';// показываем первый(-0)

    if (slides.length < 10) { // подставляем 0 в номер слайда
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function plusSlides(n) {// показ следующего слайдера
    showSlides(slideIndex += n);// 
  }

  prev.addEventListener('click', () => {// обработчик стрелки вперед
    plusSlides(-1);
  });

  next.addEventListener('click', () => {// обработчик стрелки назад
    plusSlides(1);
  })

});    