const quiz = [
    {
        topic: "Тема: Еда",
        correctOptions: ['пицца', 'пицца с сыром', 'сырная пицца',
        'pizza', 'cheese pizza', 'a pizza', 'slice of pizza'],
        img: 'images/pizza.jpg',
        imgAlt: 'Пицца',
        clue: "Подсказка: Любимая еда во многих странах",
        correctComment: 'Это пицца.',
        correctDisplayedAnswer: 'Правильный ответ: Пицца'
    },

    {   
        topic: "Тема: Космос",
        correctOptions: ['планета земля', 'земля', 'планета', 'наш мир', 'земной шар', 'глобус',
            'планета earth', 'earth', 'planet earth', 'the earth', 'planet', 'the planet',
            'earth globe', 'globe', 'our planet', 'blue planet'],
        img: 'images/earth.jpg',
        imgAlt: 'Земля',
        clue: "Подсказка: Планета, на которой мы живём",
        correctComment: 'Это Земля.',
        correctDisplayedAnswer: 'Правильный ответ: Земля'
    },
    
    {
        topic: "Тема: Образование",
        correctOptions: ['книга', 'учебник', 'том', 'томик', 'бук', 'книжка',
        'book', 'a book', 'the book', 'textbook', 'paperback', 'hardcover'],
        img: 'images/book.jpg',
        imgAlt: 'Книга',
        clue: "Подсказка: Источник знаний",
        correctComment: 'Это книга.',
        correctDisplayedAnswer: 'Правильный ответ: Книга'
    },

    {
        topic: "Тема: Индустрия",
        correctOptions: ['машина', "машинка", 'автомобиль', 'тачка', 'легковая машина', 'легковушка',
            'car', 'vehicle', 'automobile', 'ride', 'sedan', 'auto', 'a car', 'the car'],
        img: 'images/car.jpg',
        imgAlt: 'Машинка',
        clue: "Подсказка: На чем ездят люди",
        correctComment: 'Это машина.',
        correctDisplayedAnswer: 'Правильный ответ: Машина'
    },

    {   
        topic: "Тема: Веб",
        correctOptions: ['программирование', 'кодинг', 'код', 'написание кода', 'разработка', 'айти',
            'programming', 'coding', 'code', 'software development', 'dev', 'writing code',
            'software engineering', 'development', 'it', 'creating code'],
        img: 'images/programming.jpg',
        imgAlt: 'Программирование',
        clue: "Подсказка: Язык в айти",
        correctComment: 'Это кодинг.',
        correctDisplayedAnswer: 'Правильный ответ: Кодинг'
    },
    
    {
        topic: "Тема: Ландшафт",
        correctOptions: ['гора', 'горы', 'высокая гора', 'пик', 'вершина',
        'mountain', 'mountains', 'peak', 'summit', 'mount'],
        img: 'images/mountain.jpg',
        imgAlt: 'Гора',
        clue: "Подсказка: Её вершину видно издалека",
        correctComment: 'Это гора.',
        correctDisplayedAnswer: 'Правильный ответ: Гора'
    },

    {   
        topic: "Тема: Увлечения",
        correctOptions: [ 'логотип нетфликс', "нетфликс", 'логотип netflix', 'нетфликс логотип', 'netflix logo',
            'лого нетфликс', 'лого netflix', 'символ нетфликс', 'буква n', 'красная буква n',
            'иконка нетфликс', 'иконка netflix', 'n logo', 'netflix symbol', 'netflix'],
        img: 'images/netflix.jpg',
        imgAlt: 'Нетфликс',
        clue: "Подсказка: Популярнейший онлайн-кинотеатр",
        correctComment: 'Это Netflix.',
        correctDisplayedAnswer: 'Правильный ответ: Netflix'
    },

    {   
        topic: "Тема: Дар природы",
        correctOptions: ['вода', 'бутылка воды', 'бутылка', 'бутыль воды', 'питьевая вода', 'минеральная вода',
            'бутылочка воды', 'бутылочка', 'вода в бутылке', 'water', 'bottle of water', 'a bottle of water',
            'bottled water', 'drinking water', 'mineral water', 'small bottle of water', 'water bottle'],
        img: 'images/water.jpg',
        imgAlt: 'Водичка',
        clue: "Подсказка: Жидкость",
        correctComment: 'Это вода.',
        correctDisplayedAnswer: 'Правильный ответ: Вода'
    },
]

const shuffledQuiz = [...quiz].sort(() => Math.random() - 0.5);

const container = document.getElementById('container');
const body = document.getElementById('body');

const result = document.createElement('h5');
result.classList.add('result');

const comment = document.createElement('p');
comment.classList.add('comment');

const streakDiv = document.createElement('div');
streakDiv.classList.add('streakDiv');

const streakIcon = document.createElement('img');
streakIcon.classList.add('streakIcon');
streakIcon.src = 'images/fire.png';

const streakApplication = document.createElement('h5');
streakApplication.classList.add('streakText');

streakDiv.appendChild(streakIcon);
streakDiv.appendChild(streakApplication);
container.appendChild(streakDiv); // Или container.appendChild(...), если хочешь внутрь
streakDiv.style.display = 'none';

let currentQuestionIndex = 0;
let index = currentQuestionIndex + 1;
let score = 0;
let userAnswer = '';
let streakCount = 0
let questionIdCounter = 1

let time = 10; // всего 10 секунд
let currentTime = time;

// отрисовка главного меню
createMenu()

// создаёт главное меню
function createMenu () {
    container.innerHTML = ''
    document.body.style.backgroundColor = '#773434ff'

    const header = document.createElement('h1')
    header.classList.add('menuHeader')
    header.textContent = 'Картинка-Угадайка'

    const description = document.createElement('p')
    description.classList.add('menuDescription')
    description.textContent = 'Привет! Ваша задача угадать картинку! \n Готовы ли вы угадывать картинки?'

    const buttonRow = document.createElement('div')
    buttonRow.classList.add('menuButton-row')

    const yesBtn = document.createElement('button')
    yesBtn.classList.add('menuYesBtn')
    yesBtn.textContent = 'Да'
    yesBtn.addEventListener('click', () => {
        startQuiz()
    });

    const noBtn = document.createElement('button')
    noBtn.classList.add('menuNoBtn')
    noBtn.textContent = 'Не'
    noBtn.addEventListener('click', () => {
        console.log('see you later!')
    });

    container.appendChild(header)
    container.appendChild(description)
    container.appendChild(buttonRow) 
    buttonRow.appendChild(yesBtn)
    buttonRow.appendChild(noBtn)
}

// Начинает викторину
function startQuiz() {
    document.body.style.backgroundColor = '#1a1a1a'
    score = 0
    streakCount = 0
    currentQuestionIndex = 0;
    questionIdCounter = 1
    index = currentQuestionIndex + 1
    showQuestion(currentQuestionIndex)
};

// Показывает вопрос, его ID, инпут филд, картинку
function showQuestion(index) {
    container.innerHTML = ''

    const questionId = document.createElement('p')
    questionId.classList.add('questionId')
    questionId.textContent = `Вопрос №${questionIdCounter}`

    const question = document.createElement('h1')
    question.classList.add('question')
    question.textContent = 'Что на этой картинке?'

    const clue = document.createElement('p')
    clue.classList.add('clue')
    clue.textContent = shuffledQuiz[index].clue

    container.appendChild(questionId)
    container.appendChild(question)
    container.appendChild(clue)

    const img = document.createElement('img');
    img.classList.add('imgQuiz')
    img.src = shuffledQuiz[index].img;
    img.alt = shuffledQuiz[index].imgAlt;
    container.appendChild(img)

    const inputField = document.createElement('input')
    inputField.placeholder = 'Ответьте наугад...' 
    inputField.classList.add('inputField')

    const submitBtn = document.createElement('button')
    submitBtn.classList.add('submitBtn')
    
    inputField.addEventListener('input', () => {
        if (inputField.value !== '') {
            if (document.querySelector('.submitBtn') === null) {
                submitBtn.textContent = 'Угадать'
                submitBtn.addEventListener('click', () => {
                    checkAnswer(inputField.value, index)
                    inputField.remove()
                    question.remove()
                    clue.remove()
                    submitBtn.remove()
                    img.style.filter = 'blur(0px)'
                    inputField.value = ''
                });
                container.appendChild(submitBtn)
            } else if (document.querySelector('.submitBtn') !== null) {
                console.log('already exists')
            }
        }
    });

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(inputField.value, index)
            inputField.remove()
            question.remove()
            clue.remove()
            submitBtn.remove()
            img.style.filter = 'blur(0px)'
            inputField.value = ''
        }
    });
    container.appendChild(inputField)

    if (streakCount >= 3) {
        container.appendChild(streakDiv)
    }

    // 1. Прогресс контейнер
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');

    // 2. Сам прогресс-бар (заливка)
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressContainer.appendChild(progressBar);

    // 3. Добавляем в container
    container.appendChild(progressContainer);

    // 4. Запускаем таймер
    let timeLeft = 100; // проценты (100%)
    let timerInterval = setInterval(() => {
        timeLeft -= 1; // уменьшаем на 1%
        progressBar.style.width = `${timeLeft}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            // Время вышло — считаем ответ неправильным и скрываем инпут
            inputField.style.display = 'none';
            submitBtn.style.display = 'none';
            progressContainer.remove()
            checkAnswer('', index); // Пустой ответ — засчитывается как неправильный
        }
    }, 100); // 100мс * 100 = 10 секунд

    // 5. Остановить таймер при ответе
    submitBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        progressContainer.remove()
    });

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            clearInterval(timerInterval);
            progressContainer.remove()
        }
    });

    displayResult ()
};

// Проверяет ответ пользователя и на каком он сейчас вопросе 
function checkAnswer (userAnswer, indexOfQuiz) {
    const answerDiv = document.createElement('div')
    answerDiv.classList.add('answerDiv')

    const displayedUserAnswer = document.createElement('p')
    displayedUserAnswer.classList.add('displayedUserAnswer')

    if (shuffledQuiz[indexOfQuiz].correctOptions.includes(userAnswer.toLowerCase().trim())) {
        score += 1
        streakCount += 1

        const correctIcon = document.createElement('img')
        correctIcon.classList.add('correctIcon')
        correctIcon.src = 'images/correct.png'
        correctIcon.alt = 'Correct!'

        const correctUserAnswer = document.createElement('p')
        correctUserAnswer.classList.add('correctUserAnswer')
        correctUserAnswer.textContent = `Это ${userAnswer.toLowerCase()}.`

        answerDiv.appendChild(correctIcon)
        answerDiv.appendChild(correctUserAnswer)
        container.appendChild(answerDiv)
        
        displayStreak()

        if (indexOfQuiz !== quiz.length-1) {
            const nextQuestionBtn = document.createElement('button')
            nextQuestionBtn.classList.add('nextQuestionBtn')
            nextQuestionBtn.textContent = 'Следующий вопрос'
            nextQuestionBtn.addEventListener('click', () => {
                showNextQuestion()
            });
            container.appendChild(nextQuestionBtn)
        } else if (indexOfQuiz === quiz.length-1) {
            const seeFinalResultsBtn = document.createElement('button')
            seeFinalResultsBtn.classList.add('seeFinalResultsBtn')
            seeFinalResultsBtn.textContent = "Посмотреть итоги"
            seeFinalResultsBtn.addEventListener('click', () => {
                showFinalResult()
            });
            container.appendChild(seeFinalResultsBtn)
        }

    } else {
        streakCount = 0
        streakApplication.textContent = 'Серия закончена'

        const falseIcon = document.createElement('img')
        falseIcon.classList.add('falseIcon')
        falseIcon.src = 'images/false.png'
        falseIcon.alt = 'Correct!'

        const falseUserAnswer = document.createElement('p')
        falseUserAnswer.classList.add('falseUserAnswer')
        falseUserAnswer.textContent = `${shuffledQuiz[indexOfQuiz].correctComment}`

        answerDiv.appendChild(falseIcon)
        answerDiv.appendChild(falseUserAnswer)
        container.appendChild(answerDiv)

        displayedUserAnswer.textContent = `Ваш ответ: ${userAnswer}`
        container.appendChild(displayedUserAnswer)

        if (indexOfQuiz !== quiz.length-1) {
            const nextQuestionBtn = document.createElement('button')
            nextQuestionBtn.classList.add('nextQuestionBtn')
            nextQuestionBtn.textContent = 'Следующий вопрос'
            nextQuestionBtn.addEventListener('click', () => {
                showNextQuestion()
            });
            container.appendChild(nextQuestionBtn)
        } else if (indexOfQuiz === quiz.length-1) {
            const seeFinalResultsBtn = document.createElement('button')
            seeFinalResultsBtn.classList.add('seeFinalResultsBtn')
            seeFinalResultsBtn.textContent = "Посмотреть итоги"
            seeFinalResultsBtn.addEventListener('click', () => {
                showFinalResult()
            });
            container.appendChild(seeFinalResultsBtn)
        }
    }
}

// Показывает streak
function displayStreak () {
    if (streakCount >= Math.floor((1/3) * shuffledQuiz.length)) {
        streakIcon.style.width = '30px'
        streakIcon.style.height = '30px'
        if (streakCount >= Math.floor((2/3) * shuffledQuiz.length)) {
            streakIcon.style.width = '50px'
            streakIcon.style.height = '50px'
            if (streakCount === quiz.length) {
                streakIcon.style.width = '60px'
                streakIcon.style.height = '60px'
            }
        }
        streakApplication.textContent = `Серия очков: ${streakCount}`
        streakDiv.style.display = 'flex' 
    }
}

// Показывает сколько очков у пользователя на текущем этапе
function displayResult () {
    result.textContent = 'ОЧКОВ: ' + score
    container.appendChild(result)
}

// Показывает следующий вопрос
function showNextQuestion () {
    questionIdCounter += 1
    showQuestion(index++)
}

// Отрисовывает окончательные результаты и в зависимости от кол-ва очков даёт комментарий
function showFinalResult () {
    container.innerHTML = ''

    document.body.style.backgroundColor = '#773434ff'

    const finalResult = document.createElement('h1')
    finalResult.classList.add('finalResult')
    finalResult.textContent = 'Ваш конечный результат: ' + score
    comment.textContent = 'Можно сделать лучше!'
    container.appendChild(finalResult)
    container.appendChild(comment)
    
    if (score === quiz.length) {
        const imgCongrats = document.createElement('img')
        imgCongrats.classList.add('imgCongrats')
        imgCongrats.src = 'images/congratulations.png'
        imgCongrats.alt = 'Поздравление'
        container.appendChild(imgCongrats)
        comment.textContent = 'Поздравляем! Вы набрали максимум баллов'
        container.appendChild(comment)
    } else if (score >= 5 && score < quiz.length) {
        comment.textContent = 'Совсем неплохо!!'
        container.appendChild(finalResult)
        container.appendChild(comment)
    } else if (score === 0) {
        const imgLoser = document.createElement('img')
        imgLoser.classList.add('imgLoser')
        imgLoser.src = 'images/cry.png'
        imgLoser.alt = 'Проиграл!'
        container.appendChild(imgLoser)
        comment.textContent = 'Могли бы сделать и лучше :('
        container.appendChild(comment)
    }

    const finalResultButtonRow = document.createElement('div')
    finalResultButtonRow.classList.add('finalResultButtonRow')
    container.appendChild(finalResultButtonRow)

    const menuBtn = document.createElement('button')
    menuBtn.classList.add('menuBtn')
    menuBtn.textContent = 'Меню'
    menuBtn.addEventListener('click', () => {
        createMenu ()
    });

    const restartBtn = document.createElement('button')
    restartBtn.classList.add('restartBtn')
    restartBtn.textContent = 'Заново'
    restartBtn.addEventListener('click', () => {
        startQuiz()
    });

    finalResultButtonRow.appendChild(menuBtn)
    finalResultButtonRow.appendChild(restartBtn)
}