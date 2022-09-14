const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionText = document.getElementById('questionimage')
const answerButtonsElement = document.getElementById('answer-buttons')
const img = document.querySelector("img")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  questionText.setAttribute('src' , 'imagens/')
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Esse tuíte do ex senador Magno Malta contém um exemplo de Fake news? ', 
    imagem: 'imagens/magnomaltavacinacao.png',
    answers: [
      { text: 'Sim, discursos emocionais são uma estratégia de persuasão e propogação das Fake news', correct: true },
      { text: 'Não, o entusiasmo em seu discurso é uma forma de demonstrar como o problema é real', correct: false }
    ]
  },
  {
    question: 'Este tuíte de Ricardo Barros contém um exemplo de Fake news?',
    imagem: 'imagens/ricardobarrosovotoauditável.png',
    answers: [
      { text: 'Não, mas o autor não pode ter razão em relação aos votos auditáveis', correct: false },
      { text: 'Não, o voto auditável realmente pode aumentar o nível de segurança das eleições', correct: false },
      { text: 'Sim, a distorção ou má representação de um problema é uma forma de espalhar noticias falsas', correct: true },
  
    ]
  },
  {
    question: 'Esta reportagem de "O sensacionalista" seria considerado como uma Fake news?',
    answers: [
      { text: 'Sim e a divulgação desse material foi maliciosa', correct: false },
      { text: 'É possivel dizer que sim, mas a intenção não é maliciosa', correct: true },
      { text: 'Não, vários canais como "o sensacionalista" usam de "fake news falsas" para efeito de humor', correct: true },
    ]
  },
  {
    question: 'Esta reportagem da Folha de São Paulo sobre Enéas Carneiro contém alguma Fake News',
    answers: [
      { text: 'Não, Enéas realmente superestimava o valor do Nióbio', correct: true },
      { text: 'Sim, o Nióbio e o quartzo brasileiros, ao contrário do que pensava Enéas, não tem tanto valor', correct: true },
      { text: 'Não, a privatização da Vale do Rio Doce realmente era criticável e acabou gerando problemas para os brasileiros', correct: true },
      { text: 'Sim e não... um texto pode ter partes verdadeiras e ainda propagar informações falsas', correct: true }
    ]
  },
  {
    question: 'Este horóscopo sobre o signo de Áries do site "personare.com" conta como fake news?',
    answers: [
      { text: 'Sim, o site espalha conceitos não científicos e espalha desinformação', correct: false },
      { text: 'Sim, e tudo que a reportagem disse é verdadeiro', correct: false },
      { text: 'Não, apesar de não ter base científica, o texto não aparenta intecionalidade maliciosa', correct: true },
      { text: 'Não exatamente, mas publicam material não científico para explorar um público desinformado', correct: true}

    ]
  }
]