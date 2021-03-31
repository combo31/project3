function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	// Tabs
	// Прописываем нужные переменные
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

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
			item.classList.remove(activeClass); // точку не ставим т.к. работаем с классом
		});

	}

	// Создаем функцию которая будет показывать табы
	// + анимация переключения
	function showTabContent(i = 0) { // 0 будет по умолчанию если нужно
		//tabsContent[i].style.display = 'block';
		// В2 используем классы вместо стилей
		tabsContent[i].classList.add('show', 'fade'); // добавляем класс fade
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent(); // (0)номер первого слайда либо по умолчанию

	// Назначаем обработчик события клика(чтобы делегировать события)
	tabsParent.addEventListener('click', function (event) {
		//чтобы в последующем не писать event.target, саздаем переменную
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => { //если элемент в массиве соответствует 
				// элементу по которому кликнул пользователь, то выводим его
				if (target == item) {
					hideTabContent();
					showTabContent(i); // (i) номер элемента который совпал
				}
			});
		}
	});
}

export default tabs;