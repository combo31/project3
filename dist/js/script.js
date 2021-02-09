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

      });
