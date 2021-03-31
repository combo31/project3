import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerID) {
	// Forms отроавка данных с формы

	const forms = document.querySelectorAll(formSelector);
	const message = { // то что будет показываться пользователю
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => { // обработчик события при отправке
		bindPostData(item);
	});

	// Отправка в формате JSON + async / await
	
	async function getResource(url) {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	function bindPostData(form) { // привязка постинга
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
			const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращаем в матрицу, потом в объект и потом в json

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
		openModal('.modal', modalTimerID); // открытие окна

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
			closeModal('.modal'); // закрытие окна
		}, 4000);
	}
}

export default forms;