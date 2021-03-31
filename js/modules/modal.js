// Открытие и закрытие окна
function openModal(modalSelector, modalTimerID) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');

	// Вариант с toggle
	//modal.classList.toggle('show'); // переключатель убирает/добавляет класс

	// убираем прокрутку
	document.body.style.overflow = 'hidden'; // не позволяет прокручивать страницу
	console.log(modalTimerID);
	if (modalTimerID) {
		clearInterval(modalTimerID);
	}
	// Очистка таймера если пользователь сам открыл окно
	clearInterval(modalTimerID);
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');

	// Вариант с toggle
	//modal.classList.toggle('show'); // переключатель убирает/добавляет класс

	// убираем прокрутку
	document.body.style.overflow = ''; // браузер сам восстановит скролл
}

function modal(triggerSelector, modalSelector, modalTimerID) {
	// Модальное окно / Modal window

	const modalTrigger = document.querySelectorAll(triggerSelector), // кнопки указываем в скобках так как это атрибут

		modal = document.querySelector(modalSelector); // окно
	//modalCloseBtn = document.querySelector('[data-close]');// крестик закрытия окна(удаляем, будет формироваться динамически коммит 7)

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
	});

	//Закрытие окна при клике в другую область экрана
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			// добавляем условие или (коммит 7)
			closeModal(modalSelector);
		}
	});

	// Закрытие окна при клике на 'Esc'(при открытом окне)
	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) { // вызываем свойство события(e) code
			closeModal(modalSelector);
		}
	});

	// Вызов окна при пролистывании до конца сайта / Calling a window when scrolling to the end of the site
	// Установим время вызова
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerID);
			// Удаляем обработчик события чтобы окно не вызывалось снова
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// Вызов окна в конце сайта
	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};