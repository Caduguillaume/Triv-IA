const card = document.getElementById("quizCard");
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const answerElem = document.getElementById("answer");
const themes = ["geo", "hist", "science", "sports", "art", "divert"];
let currentTheme = "";
let currentQuestion = { question: "Choisir un thème", answer: "", type: "open", options: [] };

const questions = {
    geo: [
        { 
            type: "openMulti", 
            question: "Citez 3 des 5 membres permanents de l'ONU", 
            answer: ["États-Unis", "Russie", "France", "Chine", "Royaume-Uni"] 
        },
        { type: "qcu", question: "Parmi ces propositions, quel est le plus grand océan ?", options: ["Atlantique", "Pacifique", "Indien", "Arctique"], answer: "Pacifique" },
        { type: "vraiFaux", question: "Vrai ou faux : Paris est la capitale de la France ?", answer: "Vrai" },
        { type: "open", question: "Quel est le pays du Taj Mahal ?", answer: "Inde" }
    ],
    hist: [
        { type: "qcu", question: "Qui a écrit 'Les Misérables' ?", options: ["Zola", "Balzac", "Victor Hugo", "Maupassant"], answer: "Victor Hugo" },
        { type: "vraiFaux", question: "Vrai ou faux : Napoléon a été exilé à Sainte-Hélène ?", answer: "Vrai" }
    ]
};

// Fonction pour changer de thème et charger une question
function setTheme(theme) {
    card.classList.remove(...themes);
    card.classList.add(theme);

    if (theme === currentTheme) {
        loadNewQuestion(theme);
    } else {
        currentTheme = theme;
        if (card.classList.contains("flip")) {
            card.classList.remove("flip");
            setTimeout(() => loadNewQuestion(theme), 300);
        } else {
            loadNewQuestion(theme);
        }
    }
}

// Fonction pour charger une nouvelle question
function loadNewQuestion(theme) {
    let newQuestion;
    let filteredQuestions = questions[theme].filter(q => q.question !== currentQuestion.question);

    if (filteredQuestions.length > 0) {
        let randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        newQuestion = filteredQuestions[randomIndex];
    } else {
        newQuestion = questions[theme][Math.floor(Math.random() * questions[theme].length)];
    }

    currentQuestion = newQuestion;
    questionElem.textContent = currentQuestion.question;
    answerElem.textContent = ""; // Cacher la réponse avant de retourner la carte
    optionsElem.innerHTML = ""; // Réinitialiser les propositions

    // Ajouter les options si c'est un QCM ou QCU
    if (currentQuestion.type === "qcm" || currentQuestion.type === "qcu") {
        currentQuestion.options.forEach(option => {
            let optionElem = document.createElement("div");
            optionElem.textContent = option;
            optionsElem.appendChild(optionElem);
        });
    }
}

// Fonction pour retourner la carte
function flipCardFunction() {
    card.classList.toggle("flip");

    if (card.classList.contains("flip")) {
        setTimeout(() => {
            answerElem.textContent = currentQuestion.answer;
        }, 300);
    }
}
