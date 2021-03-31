const postData = async (url, data) => { // передаем адрес и данные
	let res = await fetch(url, { //await ждет окончания запроса
		method: "POST",
		headers: {
			'Content-type': 'application/json' // прописываем заголовки
		},
		body: data
	});

	return await res.json(); // обработка промиса
};

async function getResource(url) {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return await res.json();
}

export {postData};
export {getResource};