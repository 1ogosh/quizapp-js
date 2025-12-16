
"use strict";


const $ = document.querySelector.bind(document);

const quiz = $(".quiz");
const warning = $('.warning');
const btnNext = $('.quiz__next-btn');
let count = 0;
let userScore = 0;

if (typeof questions !== 'undefined' && questions.length > 0) {
        quiz.classList.remove('hidden');
        showQestions(count);
} else {
        warning.classList.remove('hidden');
}

function showQestions(index) {
        const title = $(".quiz__title");
        const list = $(".quiz__list");
        const total = $(".quiz__total");
        const progress = $(".quiz__progress-inner");

        title.innerHTML = `${questions[index].question}`;
        list.innerHTML = '';
        questions[index].options.forEach(item => {
                const text = `<li class="quiz_option">${item}</li>`;
                list.insertAdjacentHTML("beforeend", text)
        });

        const options = list.querySelectorAll("quiz_option");
        options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));

        total.innerHTML = `${index + 1} из ${questions.length}`;
        progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;
}

function optionSelected(answear) {
        const userAnswear = answear.textContent;
        const correctAnswear = questions[count].answear;
        const options = document.querySelectorAll(".quiz__option");
        const iconCorrect = "<span'>&#10004;</span>";
        const iconInCorrect = "<span'>&#9940;</span>";
}

