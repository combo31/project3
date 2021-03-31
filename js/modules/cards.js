import {getResource} from '../services/services';

function cards() {
	// Cards
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

	// const getResource = async (url) => { // передаем адрес 
	//   const res = await fetch(url);

	//   if (!res.ok) {// если запрос не прошел
	//     throw new Error(`Could not fetch ${url}, status: ${res.status}`);// создаем объект ошибки
	//   }

	//   return await res.json(); // обработка промиса в объект
	// };

	getResource('http://localhost:3000/menu') // делаем запрос
		.then(data => { // получаем объект
			data.forEach(({img, altimg, title, descr, price}) => { // перебираем, деструктуризируе
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // указываем куда пушим ('.menu .container')
			});
		});

}

export default cards;