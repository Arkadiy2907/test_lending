"use strict";

const modalWindow = document.querySelector('.modalWindow');
const modalWindowContentPart1 = document.querySelector('.modalWindow__part1__content');
const modalWindowAnswer = document.querySelector('.modalWindow__part__answer');
const modalWindowContentPart1Close = document.querySelector('.modalWindow__part1__content__close');
const modalWindowAnswerCloseBtn = document.querySelector('.modalWindow__part__answer__close__btn');
const modalWindowAnswerClose = document.querySelector('.modalWindow__part__answer__close');
const modalWindowFooterContentClose = document.querySelector('.modalWindow__footer__content__close');
const modalWindowFooterContent = document.querySelector('.modalWindow__footer__content');

let url = new URL(document.location);

function openModalWinContent(contentPart) {
	modalWindow.style.display = "block";
	contentPart.style.display = "flex";
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = "17px";
};

function closeModalWinContent() {
	modalWindow.style.display = "none";
	modalWindowContentPart1.style.display = "none";
	modalWindowAnswer.style.display = "none";
	modalWindowFooterContent.style.display = "none";
	document.body.style.overflow = "";
	document.body.style.paddingRight = "0";
};

function openModalWinAnswer() {
	modalWindow.style.display = "block";
	modalWindowContentPart1.style.display = "none";
	modalWindowFooterContent.style.display = "none";
	modalWindowAnswer.style.display = "flex";
};

document.getElementById("btn__part1").addEventListener('click', openModalWinContent.bind(null, modalWindowContentPart1));
document.getElementById("btn__footer").addEventListener('click', openModalWinContent.bind(null, modalWindowFooterContent));

modalWindow.onclick = function (e) {
	if (e.target == modalWindowContentPart1Close ||
		e.target == modalWindowAnswerCloseBtn ||
		e.target == modalWindowAnswerClose ||
		e.target == modalWindowFooterContentClose) {
		closeModalWinContent();
	} else {
		e.preventDefault();
	};
};


// ============================ correct format 

let form = document.forms.formPart1,
	userName = form.elements.userName,
	tel = form.elements.tel,
	email = form.elements.email;

let form5 = document.forms.form5,
	tel5 = form5.elements.tel5;

let formFooter = document.forms.formFooter,
	userNameFooter = formFooter.elements.userNameFooter,
	telFooter = formFooter.elements.telFooter;


function ShowError(input, message) {
	let formControl = input.parentElement;
	formControl.className = "form-control error";

	let small = formControl.querySelector('small');
	small.innerText = message;
};

function ShowSuccess(input) {
	let formControl = input.parentElement;
	formControl.className = "form-control success";
};

function CheckName(input) {
	let regex = /^[а-яА-Я ]{2,30}$/;
	if (regex.test(input.value.trim())) {
		ShowSuccess(input);
		return true;
	} else {
		ShowError(input, "неверное имя, пример: Вася");
		return false;
	};
};

function CheckEmail(input) {
	let char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (char.test(input.value.trim())) {
		ShowSuccess(input);
		return true;
	} else {
		ShowError(input, "не верный формат записи");
		return false;
	}
};

function CheckTelephone(input) {
	let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	if (regex.test(input.value.trim())) {
		ShowSuccess(input);
		return true;
	} else {
		ShowError(input, `не верный формат записи, пример: 12223334455`);
		return false;
	};
};

function CheckLenght(input, min, max) {
	if (input.value.length < min) {
		ShowError(input, `минимальное количество ${min} символов`);
		return false;
	} else if (input.value.length > max) {
		ShowError(input, `максимальное количество ${max} символов`);
		return false;
	} else {
		ShowSuccess(input);
		return true;
	};
};

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function checkInputPart1(userName, tel, email) {
	if (CheckLenght(userName, 2, 15) && CheckName(userName) && CheckTelephone(tel) && CheckEmail(email)) {
		return true;
	} else {
		return false;
	};
};

function checkInputPart5(tel) {
	if (CheckTelephone(tel)) {
		return true;
	} else {
		return false;
	};
};

function checkInputFooter(userName, tel) {
	if (CheckLenght(userName, 2, 15) && CheckName(userName) && CheckTelephone(tel)) {
		return true;
	} else {
		return false;
	};
};

function sendOrder(x) {
	Array.from(x.elements).forEach((input, name) => {
		url.searchParams.set(`${name}`, `${input.value}`);
	});
};

function clearInputs(x) {
	Array.from(x.elements).forEach((input) => {
		input.value = '';
	});
};

document.querySelector('.modalWindow__part1__content__btn').addEventListener('click', function (e) {
	if (checkInputPart1(userName, tel, email)) {
		sendOrder(form);
		clearInputs(form);
		openModalWinAnswer();
	} else {
		e.preventDefault();
	};
});

document.querySelector('.btn__part5').addEventListener('click', function (e) {
	if (checkInputPart5(tel5)) {
		sendOrder(form5);
		clearInputs(form5);
		openModalWinAnswer();
		e.preventDefault();
	} else {
		e.preventDefault();
	};
});

document.querySelector('.modalWindow__footer__content__btn').addEventListener('click', function (e) {
	if (checkInputFooter(userNameFooter, telFooter)) {
		sendOrder(formFooter);
		clearInputs(formFooter);
		openModalWinAnswer();
		e.preventDefault();
	} else {
		e.preventDefault();
	};
});

