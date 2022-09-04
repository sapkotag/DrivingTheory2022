const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const instructionsText = document.getElementById('instructions')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let score = 0
let total_questions = 0

if (startButton){
  startButton.addEventListener('click', startGame)
}

if (nextButton){
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
}

function setCategory(cat){
  sessionStorage.setItem("category",cat)
}

function startGame() {
  if (startButton.innerText == 'Restart'){
    startButton.innerText = 'Start'
    self.location="index.html";
  }else{
    score = 0
    total_questions = 0
    startButton.classList.add('hide')
    instructionsText.classList.add('hide')
    let questions = []
    if (sessionStorage.getItem("category") == 'accidents'){
      questions = questionsAccidents
    }else if (sessionStorage.getItem("category") == 'alertness') {
      questions = questionsAlertness
    }else if (sessionStorage.getItem("category") == 'attitude') {
      questions = questionsAttitude
    }else if (sessionStorage.getItem("category") == 'documents') {
      questions = questionsDocuments
    }else if (sessionStorage.getItem("category") == 'dualCarriageway') {
      questions = questionsDualCarriageway
    }else if (sessionStorage.getItem("category") == 'hazardAwareness') {
      questions = questionsHazardAwareness
    }else if (sessionStorage.getItem("category") == 'miscellaneous') {
      questions = questionsMiscellaneous
    }else if (sessionStorage.getItem("category") == 'otherTypes') {
      questions = questionsOtherTypes
    }else if (sessionStorage.getItem("category") == 'roadAndTraffic') {
      questions = questionsRoadAndTraffic
    }else if (sessionStorage.getItem("category") == 'rulesOfTheRoad') {
      questions = questionsRulesOfTheRoad
    }else if (sessionStorage.getItem("category") == 'safetyMargins') {
      questions = questionsSafetyMargins
    }else if (sessionStorage.getItem("category") == 'safetyAndYourVehicle') {
      questions = questionsSafetyAndYourVehicle
    }else if (sessionStorage.getItem("category") == 'vehicleLoading') {
      questions = questionsVehicleLoading
    }else if (sessionStorage.getItem("category") == 'vehicleHandling') {
      questions = questionsVehicleHandling
    }else if (sessionStorage.getItem("category") == 'vulnerableRoadUsers') {
      questions = questionsVulnerableRoadUsers
    }else {
      questions = questionsAll
    }
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    answerButtonsElement.classList.remove('hide')
    setNextQuestion()
  }
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question //+ sessionStorage.getItem("category")
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
  if (selectedButton.dataset.correct){
    score++
  }
  total_questions++
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (sessionStorage.getItem("category") == 'mock'){
    if (49 < currentQuestionIndex + 1) {
      scorePercent = (score/50)*100
      let passOrFail = "failed"
      if (scorePercent >= 86){
        passOrFail = "passed"
      }
      questionElement.innerText = "You got " + score + " questions correct out of 50 (" + Math.round(scorePercent) + "%). \n You have " + passOrFail + "."
      startButton.innerText = 'Restart'
      answerButtonsElement.classList.add('hide')
      startButton.classList.remove('hide')
    }else {
      nextButton.classList.remove('hide')
    }
  }else if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    scorePercent = (score/total_questions)*100
    let passOrFail = "failed"
    if (scorePercent >= 86){
      passOrFail = "passed"
    }
    questionElement.innerText = "You got " + score + " questions correct out of " + total_questions + " (" + Math.round(scorePercent) + "%). \n You have " + passOrFail + "."
    startButton.innerText = 'Restart'
    answerButtonsElement.classList.add('hide')
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

const questionsAccidents = [
  {
    question: "You arrive at an accident. A motorcyclist is unconscious. Your FIRST priority is the casualty’s",
    answers: [
      { text: "Bruising", correct: false },
      { text: "Breathing", correct: true },
      { text: "Bleeding", correct: false },
      { text: "Broken bones", correct: false }
    ]
  },
  {
    question: "You arrive at an accident where someone is suffering from severe burns. You should:",
    answers: [
      { text: "Apply lotions to the injury", correct: false },
      { text: "Douse the burns with cool liquid", correct: true },
      { text: "Burst any blisters", correct: false },
      { text: "Remove anything stuck to the burns", correct: false }
    ]
  },
  {
    question: "You arrive at the scene of a motorcycle accident. The rider is injured. When should the helmet be removed?",
    answers: [
      { text: "Always, unless they are in shock", correct: false },
      { text: "Only when the motorcyclist asks", correct: false },
      { text: "Always straight away", correct: false },
      { text: "Only when it is essential", correct: true }
    ]
  },
  {
    question: "You arrive at the scene of a motorcycle accident. No other vehicle is involved. The rider is unconscious, lying in the middle of the road. The first thing you should do is:",
    answers: [
      { text: "Warn other traffic", correct: true },
      { text: "Clear the road of debris", correct: false },
      { text: "Give the rider reassurance", correct: false },
      { text: "Move the rider out of the road", correct: false }
    ]
  },
  {
    question: "At the scene of an accident you should:",
    answers: [
      { text: "Go to those casualties who are screaming", correct: false },
      { text: "Leave vehicle engines switched on", correct: false },
      { text: "Not put yourself at risk", correct: true },
      { text: "Pull everybody out of their vehicles", correct: false }
    ]
  },
  {
    question: "At an accident a small child is not breathing. When giving a mouth to mouth you should breathe",
    answers: [
      { text: "Sharply", correct: false },
      { text: "Gently", correct: true },
      { text: "Heavily", correct: false },
      { text: "Rapidly", correct: false }
    ]
  },
  {
    question: "On the dual carriageway the hard shoulder should be used",
    answers: [
      { text: "When an emergency arises", correct: true },
      { text: "For a short rest when tired", correct: false },
      { text: "To check a road atlas", correct: false },
      { text: "To answer a mobile phone", correct: false }
    ]
  },
  {
    question: "At an accident you suspect a casualty has back injuries. The area is safe. You should:",
    answers: [
      { text: "Not move them", correct: true },
      { text: "Raise their legs", correct: false },
      { text: "Offer them a cigarette", correct: false },
      { text: "Offer them a drink", correct: false }
    ]
  },
  {
    question: "When should you switch on your hazard warning lights?",
    answers: [
      { text: "When you are parked on double yellow lines", correct: false },
      { text: "When you are towing a broken down vehicle", correct: false },
      { text: "When you cannot avoid causing an obstruction", correct: true },
      { text: "When you are driving slowly due to bad weather", correct: false }
    ]
  },
  {
    question: "At an accident a casualty is unconscious but still breathing. You should only move them if",
    answers: [
      { text: "Bystanders advise you to", correct: false },
      { text: "Bystanders will help you to", correct: false },
      { text: "An ambulance is on its way", correct: false },
      { text: "There is further danger", correct: true }
    ]
  },
  {
    question: "You arrive at a scene of an accident. A passenger is bleeding badly from an arm wound. What should you do?",
    answers: [
      { text: "Get them a drink", correct: false },
      { text: "Dab the wound", correct: false },
      { text: "Apply pressure over the wound and raise the arm", correct: true },
      { text: "Apply pressure over the wound and keep the arm down", correct: false }
    ]
  },
  {
    question: "You arrive at the scene of an accident. There has been an engine fire and someone’s hands and arms have been burnt. You should NOT:",
    answers: [
      { text: "Douse the burn thoroughly with cool liquid", correct: false },
      { text: "Remove anything sticking to the burn", correct: true },
      { text: "Reassure them constantly", correct: false },
      { text: "Lay the casualty down", correct: false }
    ]
  }
]

const questionsAlertness = [
  {
    question: "In which of these following situations should you avoid overtaking?",
    answers: [
      { text: "Approaching a dip in the road", correct: true },
      { text: "On a 30 mph road", correct: false },
      { text: "In a one-way street", correct: false },
      { text: "Just after a bend", correct: false }
    ]
  },
  {
    question: "What does the abbreviation MSM mean?",
    answers: [
      { text: "Mirror, speed, manoeuvre", correct: false },
      { text: "Manoeuvre, signal, mirror", correct: false },
      { text: "Mirror, signal, manoeuvre", correct: true },
      { text: "Manoeuvre, speed, mirror", correct: false }
    ]
  },
  {
    question: "You are driving in the dark and are dazzled by the headlights of an oncoming car. You should",
    answers: [
      { text: "Flash your headlights", correct: false },
      { text: "Close your eyes", correct: false },
      { text: "Pull down the sun visor", correct: false },
      { text: "Slow down or stop", correct: true }
    ]
  },
  {
    question: "What is the safest way to use a mobile phone in a car?",
    answers: [
      { text: "Find a suitable place to stop", correct: true },
      { text: "Direct your call thought the operator", correct: false },
      { text: "Use hands-free equipment", correct: false },
      { text: "Drive slowly on a quiet road", correct: false }
    ]
  },
  {
    question: "Objects or articles hanging from your interior mirror may",
    answers: [
      { text: "Help your concentration", correct: false },
      { text: "Improve your driving", correct: false },
      { text: "Distract your attention", correct: true },
      { text: "improve your view", correct: false }
    ]
  },
  {
    question: "Using a mobile phone while you are driving",
    answers: [
      { text: "Could distract your attention from the road", correct: true },
      { text: "Will affect your vehicle", correct: false },
      { text: "Is acceptable in a vehicle with power steering", correct: false },
      { text: "Will reduce your field of vision", correct: false }
    ]
  },
  {
    question: "If your mobile phone rings while you are driving what should you do?",
    answers: [
      { text: "Pull up at the nearest kerb", correct: false },
      { text: "Stop immediately", correct: false },
      { text: "Pull up in a suitable place.", correct: true },
      { text: "Answer it immediately", correct: false }
    ]
  },
  {
    question: "To answer your mobile phone when driving, you should:",
    answers: [
      { text: "Reduce your speed wherever you are", correct: false },
      { text: "Keep the call time to a minimum", correct: false },
      { text: "Stop in a proper and convenient place", correct: true },
      { text: "Slow down and allow others to overtake", correct: false }
    ]
  },
  {
    question: "You want to use a mobile phone whilst driving the car. You should only use the phone:",
    answers: [
      { text: "If you are driving on a motorway", correct: false },
      { text: "After stopping in a suitable place", correct: true },
      { text: "If you feel your driving will be unaffected", correct: false },
      { text: "When driving on a quiet, minor roads", correct: false }
    ]
  },
  {
    question: "To overtake safely, which one of the following applies?",
    answers: [
      { text: "Check the speed and position of following traffic", correct: true },
      { text: "Cut back in sharply when you have passed the vehicle", correct: false },
      { text: "Get in close behind before to move out", correct: false },
      { text: "Steer round the vehicle sharply", correct: false }
    ]
  },
  {
    question: "You are driving along a narrow country road. When passing the cyclist you should drive",
    answers: [
      { text: "Slowly, leaving plenty of room", correct: true },
      { text: "Quickly, leaving plenty of room", correct: false },
      { text: "Quickly, sounding the horn as you pass", correct: false },
      { text: "Slowly, sounding the horn as you pass", correct: false }
    ]
  },
  {
    question: "If you are turning left into a side road what hazards should you be especially aware of?",
    answers: [
      { text: "Pedestrians", correct: true },
      { text: "Traffic congestion", correct: false },
      { text: "One way street", correct: false },
      { text: "Parked vehicles.", correct: false }
    ]
  },
  {
    question: "You should not use a mobile phone whilst driving",
    answers: [
      { text: "Because it might distract your attention from the road ahead", correct: true },
      { text: "Unless you are able to drive one handed", correct: false },
      { text: "Until you are satisfied that no other traffic is near", correct: false },
      { text: "Because reception is poor when the engine is running", correct: false }
    ]
  },
  {
    question: "Your vehicle is fitted with a hands-free phone system. Using this equipment whilst driving",
    answers: [
      { text: "Is quite safe as long as you slow down", correct: false },
      { text: "Could be very good for road safety", correct: false },
      { text: "Is recommended by The Highway Code", correct: false },
      { text: "Could distract your attention from the road", correct: true }
    ]
  },
  {
    question: "When following a large vehicle you should stay well back because",
    answers: [
      { text: "It helps the large vehicle to stop more easily", correct: false },
      { text: "It helps you to keep out of the wind", correct: false },
      { text: "It allows the driver to see you in the mirror", correct: true },
      { text: "It allows you to corner more quickly", correct: false }
    ]
  },
  {
    question: "When driving you are most likely to lose concentration if you",
    answers: [
      { text: "Switch on the heated rear window", correct: false },
      { text: "Use a mobile phone", correct: true },
      { text: "Look at the door mirrors", correct: false },
      { text: "Listen to radio broadcasting", correct: false }
    ]
  },
  {
    question: "You are driving on a wet road and you have to stop your vehicle in an emergency. You should:",
    answers: [
      { text: "Select reverse gear", correct: false },
      { text: "Keep both hands on the wheel", correct: true },
      { text: "Give an arm signal", correct: false },
      { text: "Apply the handbrake and footbrake together", correct: false }
    ]
  },
  {
    question: "You should ONLY use a mobile or cellular phone when:",
    answers: [
      { text: "Receiving a call", correct: false },
      { text: "Suitably parked", correct: true },
      { text: "Driving at less than 30 mph", correct: false },
      { text: "Driving an automatic vehicle", correct: false }
    ]
  },
  {
    question: "Why should you be parked before using a mobile phone?",
    answers: [
      { text: "Because the car electrics will be affected", correct: false },
      { text: "Because reception is better when stopped", correct: false },
      { text: "So control of your vehicle is not affected", correct: true },
      { text: "So a proper conversation can be held", correct: false }
    ]
  },
  {
    question: "As a driver what do you understand by the term 'Blind Spot'?",
    answers: [
      { text: "An area not covered by your headlights", correct: false },
      { text: "An area covered by your right hand mirror", correct: false },
      { text: "An area not seen in your mirrors", correct: true },
      { text: "An area covered by your left hand mirror", correct: false }
    ]
  },
  {
    question: "Why would a pedestrian dress their dog in a yellow or burgundy coat; what are they warning you about?",
    answers: [
      { text: "Deaf", correct: true },
      { text: "Dog training", correct: false },
      { text: "Colour blind", correct: false },
      { text: "Elderly", correct: false }
    ]
  },
  {
    question: "What does tailgating mean?",
    answers: [
      { text: "Reversing into a parking space", correct: false },
      { text: "Following another vehicle too closely.", correct: true },
      { text: "Using the rear door of a hatchback car", correct: false },
      { text: "Driving with rear fog lights on.", correct: false }
    ]
  },
  {
    question: "What speed limit may you find in some narrow residential streets?",
    answers: [
      { text: "35 mph", correct: false },
      { text: "25 mph", correct: false },
      { text: "30 mph", correct: false },
      { text: "20 mph", correct: true }
    ]
  },
  {
    question: "What should you do if a driver pulls out of a side road in front of you and you have to brake hard?",
    answers: [
      { text: "Ignore the error and stay calm", correct: true },
      { text: "Overtake as soon as possible", correct: false },
      { text: "Flash your lights to show your annoyance", correct: false },
      { text: "Sound your horn to show your annoyance", correct: false }
    ]
  },
  {
    question: "Before making a U-turn in the road, you should always:",
    answers: [
      { text: "Select a higher gear than normal", correct: false },
      { text: "Look over your shoulder for final confirmation", correct: true },
      { text: "Signal so that other drivers can slow down", correct: false },
      { text: "Give another signal as well as using your indicators", correct: false }
    ]
  },
  {
    question: "Why have red routes been introduced in major cities?",
    answers: [
      { text: "Raise the speed limit", correct: false },
      { text: "Allow lorries to load more freely.", correct: false },
      { text: "Help the traffic flow", correct: true },
      { text: "Provide better parking", correct: false }
    ]
  },
  {
    question: "When turning your car in the road, you must:",
    answers: [
      { text: "Overhang the kerb", correct: false },
      { text: "Check all around for other road users", correct: true },
      { text: "Use an available driveway", correct: false },
      { text: "Keep your hand on the handbrake", correct: false }
    ]
  },
  {
    question: "You arrive at the scene of a motorcycle accident and the rider is injured. When should the helmet be removed?",
    answers: [
      { text: "Always, unless they are in shock.", correct: false },
      { text: "Only when the motorcyclist asks", correct: false },
      { text: "Always straight away.", correct: false },
      { text: "Only when it is essential.", correct: true }
    ]
  },
  {
    question: "Using a hands-free phone is likely to",
    answers: [
      { text: "Improve your safety", correct: false },
      { text: "Reduce your view", correct: false },
      { text: "Increase your concentration", correct: false },
      { text: "Divert your attention", correct: true }
    ]
  }
]


const questionsAttitude = [
  {
    question: "Which of the following are at greatest risk from other road users?",
    answers: [
      { text: "Learner car drivers", correct: false },
      { text: "Lorry drivers", correct: false },
      { text: "Motorcycles", correct: true },
      { text: "Busy bus drivers", correct: false }
    ]
  },
  {
    question: "You are driving in traffic at the speed limit for the road. The driver behind is going to overtake. You should:",
    answers: [
      { text: "Keep a steady course and allow the driver behind to overtake", correct: true },
      { text: "Move closer to the car ahead, so the driver behind has no room to overtake", correct: false },
      { text: "Wave the driver behind to overtake when it is safe", correct: false },
      { text: "Accelerate to get away from the driver behind", correct: false }
    ]
  },
  {
    question: "You are driving behind a large vehicle. It signals left but steers to the right. You should:",
    answers: [
      { text: "Overtake on the right of it", correct: false },
      { text: "Slow down and let the vehicle turn", correct: true },
      { text: "Hold your speed and sound your horn", correct: false },
      { text: "Drive on, keeping to the left", correct: false }
    ]
  },
  {
    question: "When being followed by an ambulance showing a flashing blue light you should:",
    answers: [
      { text: "Pull over as soon as safely possible to let it pass", correct: true },
      { text: "Accelerate fast to get away from it", correct: false },
      { text: "Maintain your speed and course", correct: false },
      { text: "Brake harshly and immediately stop in the road", correct: false }
    ]
  },
  {
    question: "When are you permitted to exceed the maximum speed limit?",
    answers: [
      { text: "When the road is clear", correct: false },
      { text: "At no time", correct: true },
      { text: "When overtaking", correct: false },
      { text: "Between midnight and 6 am", correct: false }
    ]
  },
  {
    question: "You may use the 'Two-Second Rule'",
    answers: [
      { text: "When emerging on wet roads", correct: false },
      { text: "Before restarting the engine after it has stalled", correct: false },
      { text: "To keep a safe gap from the vehicle in front", correct: true },
      { text: "Before using the Mirror-Signal-manoeuvre routine", correct: false }
    ]
  },
  {
    question: "Why should you use your horn?",
    answers: [
      { text: "To greet other road users", correct: false },
      { text: "To allow you right of way", correct: false },
      { text: "To alert others of danger", correct: true },
      { text: "To signal your annoyance", correct: false }
    ]
  },
  {
    question: "You are driving on a clear night. There is a steady stream of oncoming cars. The national speed limit applies. Which lights should you use?",
    answers: [
      { text: "Sidelights", correct: false },
      { text: "Dipped headlights", correct: true },
      { text: "Fog lights", correct: false },
      { text: "Full beam headlight", correct: false }
    ]
  },
  {
    question: "Which of the following cars will use blue flashing beacons?",
    answers: [
      { text: "Motorway maintenance", correct: false },
      { text: "Breakdown recovery", correct: false },
      { text: "Doctor on call", correct: false },
      { text: "Police patrol", correct: true }
    ]
  },
  {
    question: "You are in a line of traffic. The driver behind you is following very closely. What action should you take?",
    answers: [
      { text: "Ignore the following driver and continue to drive within the speed limit", correct: false },
      { text: "Slow down, gradually increasing the gap between you and the vehicle in front", correct: true },
      { text: "Move over to a position just left of the centre line of the road", correct: false },
      { text: "Signal left and wave the following driver past", correct: false }
    ]
  },
  {
    question: "You are approaching a zebra crossing.Pedestrians are waiting to cross. You should:",
    answers: [
      { text: "Use your headlights to indicate they can cross", correct: false },
      { text: "Give way to elderly and infirm only", correct: false },
      { text: "Wave at them to cross the road", correct: false },
      { text: "Slow down and prepare to stop", correct: true }
    ]
  },
  {
    question: "You are driving at the legal speed limit. A vehicle behind tries to overtake. Should you try to prevent the driver overtaking?",
    answers: [
      { text: "No, unless it is safe to do so", correct: false },
      { text: "No, not at any time", correct: true },
      { text: "Yes, because the other driver is breaking the law", correct: false },
      { text: "Yes, because the other driver is acting dangerously", correct: false }
    ]
  },
  {
    question: "When at a pelican crossing the amber light means you MUST",
    answers: [
      { text: "Stop and wait, proceed when the red light is on.", correct: false },
      { text: "Give way to pedestrians waiting to cross", correct: false },
      { text: "Give way to pedestrians already on the crossing", correct: false },
      { text: "Stop and wait, proceed only when the green light is on.", correct: true }
    ]
  },
  {
    question: "You are driving a slow moving car on a narrow winding road.You should",
    answers: [
      { text: "Keep well out to stop vehicles overtaking dangerously", correct: false },
      { text: "Give a left signal when it is safe for vehicles to overtake you", correct: false },
      { text: "Wave following vehicles past you if you think they can overtake quickly", correct: false },
      { text: "Pull in safely when you can, to let following vehicles overtake", correct: true }
    ]
  },
  {
    question: "You are driving at the legal speed limit. A vehicle comes up quickly behind, flashing its headlights. You should:",
    answers: [
      { text: "Allow the vehicle to overtake", correct: true },
      { text: "Touch the brakes to show your brake lights", correct: false },
      { text: "Accelerate to make a gap behind you", correct: false },
      { text: "Maintain your speed to prevent the vehicle from overtaking", correct: false }
    ]
  },
  {
    question: "You are waiting in a traffic queue at night.To avoid dazzling the drivers behind, you should:",
    answers: [
      { text: "Use both the handbrake and footbrake", correct: false },
      { text: "Apply the footbrake only", correct: false },
      { text: "Switch off your headlights", correct: false },
      { text: "Apply the handbrake only", correct: true }
    ]
  },
  {
    question: "You are approaching a pelican crossing. The amber light is showing. You MUST:",
    answers: [
      { text: "Encourage pedestrians to cross", correct: false },
      { text: "Not move until the green light appears", correct: false },
      { text: "Stop even if the crossing is clear", correct: true },
      { text: "Give way to pedestrians who are crossing", correct: false }
    ]
  },
  {
    question: "At Pedestrian (zebra) crossing you should",
    answers: [
      { text: "Wave pedestrians to cross if you intend to wait for them", correct: false },
      { text: "Always leave it clear in traffic queues", correct: true },
      { text: "Rev your engine to encourage pedestrians to cross quickly", correct: false },
      { text: "Park only on the zigzag lines on the left", correct: false }
    ]
  },
  {
    question: "You are following a lorry or truck. You should keep well back from it to:",
    answers: [
      { text: "Stop following traffic from rushing through the junction", correct: false },
      { text: "Prevent traffic behind you from overtaking", correct: false },
      { text: "Allow you to hurry through the traffic lights if they change", correct: false },
      { text: "Give you a good view of the road ahead", correct: true }
    ]
  },
  {
    question: "When you are overtaking a horse and rider you should:",
    answers: [
      { text: "Sound your horn as a warning", correct: false },
      { text: "Go past as quickly as possible", correct: false },
      { text: "Flash your headlights as a warning", correct: false },
      { text: "Go past slowly and carefully", correct: true }
    ]
  },
  {
    question: "A pelican crossing that crosses the road in a STRAIGHT line and has a central traffic island MUST be treated as:",
    answers: [
      { text: "Two separate crossings", correct: false },
      { text: "One crossing in daylight only", correct: false },
      { text: "One complete crossing", correct: true },
      { text: "Two crossings during darkness", correct: false }
    ]
  },
  {
    question: "'Tailgating' usually means",
    answers: [
      { text: "Following another vehicle too closely", correct: true },
      { text: "Reversing into a parking space", correct: false },
      { text: "Using the rear door of a hatchback car", correct: false },
      { text: "Driving with rear fog lights on", correct: false }
    ]
  },
  {
    question: "You have stopped at a pedestrian (zebra) crossing to allow pedestrians to cross.You should:",
    answers: [
      { text: "Wait, revving your engine", correct: false },
      { text: "Wait until they have crossed", correct: true },
      { text: "Signal to pedestrians to cross", correct: false },
      { text: "Edge your vehicle forward slowly", correct: false }
    ]
  },
  {
    question: "You are following a vehicle on a wet and slippery road. You should leave a time gap of at least",
    answers: [
      { text: "One second", correct: false },
      { text: "Four seconds", correct: true },
      { text: "Three seconds", correct: false },
      { text: "Two seconds", correct: false }
    ]
  },
  {
    question: "You wish to turn right ahead. Why should you take up the proper position in good time?",
    answers: [
      { text: "To give a better view into the road that you are joining", correct: false },
      { text: "To help other road users know what you intend to do", correct: true },
      { text: "To allow other drivers to pull out in front of you", correct: false },
      { text: "To allow drivers to pass you on the right", correct: false }
    ]
  },
  {
    question: "When should you give signals?",
    answers: [
      { text: "At all times in order to alert other road users of your intended actions.", correct: true },
      { text: "To give you priority over other traffic when changing lanes or before pulling out.", correct: false },
      { text: "Only when joining a dual carriageway from a slip road so you don't have to give way", correct: false },
      { text: "In traffic only during the hours of darkness or in bad weather.", correct: false }
    ]
  },
  {
    question: "You should ONLY flash your headlights to other road users",
    answers: [
      { text: "To show that you are giving way", correct: false },
      { text: "To show that you are about to reverse", correct: false },
      { text: "To let them know that you are there", correct: true },
      { text: "To tell the that you have right of way", correct: false }
    ]
  },
  {
    question: "You are driving along the road. A van cuts in close in front of you. What should you do?",
    answers: [
      { text: "Accelerate to get closer to the van", correct: false },
      { text: "Drop back to leave the correct separation distance", correct: true },
      { text: "Give a long blast on the horn", correct: false },
      { text: "Flash your headlights several times", correct: false }
    ]
  },
  {
    question: "You should never wave or urge people across at pedestrian crossing because",
    answers: [
      { text: "They may not be ready to cross", correct: false },
      { text: "It is safer for you to carry on", correct: false },
      { text: "There may be another vehicle coming", correct: true },
      { text: "They may not be looking", correct: false }
    ]
  },
  {
    question: "In fast moving traffic a two-second gap may be enough only when conditions are:",
    answers: [
      { text: "Foggy", correct: false },
      { text: "Wet", correct: false },
      { text: "Dry", correct: true },
      { text: "Damp", correct: false }
    ]
  },
  {
    question: "Which of the following statements relates to Tailgating",
    answers: [
      { text: "Park too close to the tail lift platform of a truck.", correct: false },
      { text: "Driving too close to the vehicle in front creating a hazardous situation in that if it had to stop suddenly, you will be unable to avoid a collision.", correct: true },
      { text: "Driving so close and in such a way that you bully and intimidate the vehicle in front to force it to speed up or get out of your way", correct: false },
      { text: "Swerving from lane to lane and getting as close to the vehicle in front so you get to your destination faster.", correct: false }
    ]
  },
  {
    question: "You are driving along a narrow country road. A horse and rider are approaching. What should you do?",
    answers: [
      { text: "Rev your engine", correct: false },
      { text: "Drive slowly and allow enough room", correct: true },
      { text: "Increase your speed and sound the horn", correct: false },
      { text: "Flash your headlights", correct: false }
    ]
  },
  {
    question: "You are driving a slow moving car on a narrow road. When traffic wishes to overtake you should",
    answers: [
      { text: "Stop immediately and wave it on", correct: false },
      { text: "Put your hazard warning lights on", correct: false },
      { text: "Take no action", correct: false },
      { text: "Pull in safely as soon as you can do so", correct: true }
    ]
  },
  {
    question: "A bus has stopped at a bus stop ahead of you. Its right-hand indicator is flashing. You should",
    answers: [
      { text: "Slow down and give way if it is safe to do so", correct: true },
      { text: "Sound your horn and keep going", correct: false },
      { text: "Slow down and then sound your horn", correct: false },
      { text: "Flash your headlights and slow down", correct: false }
    ]
  },
  {
    question: "A car pulls out in front of you at a junction. What should you do?",
    answers: [
      { text: "Slow down and be ready to stop", correct: true },
      { text: "Swerve past it and blow your horn", correct: false },
      { text: "Accelerate past it immediately", correct: false },
      { text: "Flash your headlights and drive up close behind", correct: false }
    ]
  },
  {
    question: "You are driving a slow moving car on a narrow winding road. In order to let other vehicles overtake you should",
    answers: [
      { text: "Keep left and hold your speed", correct: false },
      { text: "Wave to them to pass", correct: false },
      { text: "Show a left turn signal", correct: false },
      { text: "Pull in safely when you can", correct: true }
    ]
  },
  {
    question: "You stopped for pedestrians waiting to cross at a zebra crossing. They did not start to cross. What should you do?",
    answers: [
      { text: "Wave them to cross", correct: false },
      { text: "Sound your horn", correct: false },
      { text: "Drive on", correct: false },
      { text: "Be patient and wait", correct: true }
    ]
  },
  {
    question: "Following a large vehicle too closely is unwise because:",
    answers: [
      { text: "Your engine will overheat", correct: false },
      { text: "Your view ahead is increased", correct: false },
      { text: "Your view ahead is reduced", correct: true },
      { text: "Your brakes will overheat", correct: false }
    ]
  },
  {
    question: "A two - second gap between yourself and the car in front is usually sufficient when conditions are:",
    answers: [
      { text: "Foggy", correct: false },
      { text: "Damp", correct: false },
      { text: "Wet", correct: false },
      { text: "Good", correct: true }
    ]
  },
  {
    question: "You are driving at night on an dark, unlit road following a slower moving vehicle. You should:",
    answers: [
      { text: "Flash your headlights", correct: false },
      { text: "Switch off you headlights", correct: false },
      { text: "Use dipped beam headlights", correct: true },
      { text: "Use full beam headlights", correct: false }
    ]
  },
  {
    question: "A long, heavy lorry is taking a long time to overtake. What should you do?",
    answers: [
      { text: "Change direction", correct: false },
      { text: "Speed up", correct: false },
      { text: "Slow down", correct: true },
      { text: "Hold your speed", correct: false }
    ]
  }
]


const questionsDocuments = [
  {
    question: "Apart from suffering any punishment according to law, what will a disqualified driver has to do to obtain a driving licence?",
    answers: [
      { text: "Simply re-sit and pass the test of skills and behaviour.", correct: false },
      { text: "Re-apply as for a new driver after expiry of disqualification period and must re-sit and pass both the theory test and test of skills and behaviour.", correct: true },
      { text: "Wait for any disqualification period to pass and apply for a duplicate driving licence.", correct: false },
      { text: "Pay any outstanding fines, submit a new licence application and re-sit and pass the theory test at any time during disqualification period.", correct: false }
    ]
  },
  {
    question: "What is the legal minimum insurance cover you must have to drive on public roads?",
    answers: [
      { text: "Fully comprehensive", correct: false },
      { text: "Personal injury cover", correct: false },
      { text: "Third party only", correct: true },
      { text: "Third party, fire and theft", correct: false }
    ]
  },
  {
    question: "To supervise a learner driver you must:",
    answers: [
      { text: "Be an approved driving instructor", correct: false },
      { text: "Be at least 23", correct: false },
      { text: "Hold an advanced driving certificate", correct: false },
      { text: "Have held a full licence for at least 5 years", correct: true }
    ]
  },
  {
    question: "A VRT certificate is normally valid for:",
    answers: [
      { text: "10,000 miles", correct: false },
      { text: "One year after the date it was issued", correct: false },
      { text: "Two years after the date it was issued", correct: true },
      { text: "30,000 miles", correct: false }
    ]
  },
  {
    question: "Who is responsible for ensuring that a vehicle is fully road worthy when driven on a public road?",
    answers: [
      { text: "Your mechanic.", correct: false },
      { text: "Nobody in particular.", correct: false },
      { text: "The VRT tester.", correct: false },
      { text: "You, the driver.", correct: true }
    ]
  },
  {
    question: "What is the maximum number of penalty points that will automatically disqualify a driver who holds a probational driving licence?",
    answers: [
      { text: "4 points a year over a 3 year period.", correct: false },
      { text: "15 points over a five 5 year period.", correct: false },
      { text: "18 points over a two year period.", correct: false },
      { text: "12 points at any time during a 3 year period.", correct: true }
    ]
  },
  {
    question: "Before driving anyone else's motor vehicle you should make sure that:",
    answers: [
      { text: "Your own vehicle has insurance cover", correct: false },
      { text: "The vehicle owner has third party insurance cover", correct: false },
      { text: "The vehicle is insured for your use", correct: true },
      { text: "The owner has left the insurance documents in the vehicle", correct: false }
    ]
  }
]

const questionsDualCarriageway = [
  {
    question: "You are driving on a dual carriageway. You have to slow down quickly due to a hazard. You should:",
    answers: [
      { text: "Switch on your headlights", correct: false },
      { text: "Flash your headlights", correct: false },
      { text: "Sound your horn", correct: false },
      { text: "Switch on your hazard lights", correct: true }
    ]
  },
  {
    question: "You are driving on a dual carriageway and the car ahead shows its hazard lights for a short time. This tells you that:",
    answers: [
      { text: "The driver wants you to overtake", correct: false },
      { text: "Traffic ahead is slowing or stopping suddenly", correct: true },
      { text: "The other car is going to change lanes", correct: false },
      { text: "There is a police speed check up ahead", correct: false }
    ]
  },
  {
    question: "After a breakdown you need to rejoin the main carriageway of a multilane- carriageway from the hard shoulder. You should:",
    answers: [
      { text: "Gain speed on the harder shoulder before moving out onto the carriageway", correct: true },
      { text: "Move out onto the carriageway then build up your speed", correct: false },
      { text: "Wait on the hard shoulder until someone flashes their headlights at you", correct: false },
      { text: "Move out onto the carriageway using your hazard lights", correct: false }
    ]
  },
  {
    question: "You are intending to leave the multi-lane carriageway at the next exit. Before you reach the exit, you should normally position your vehicle:",
    answers: [
      { text: "On the hard shoulder", correct: false },
      { text: "In the left-hand lane", correct: true },
      { text: "In the middle lane", correct: false },
      { text: "In any lane", correct: false }
    ]
  },
  {
    question: "The minimum safe time gap to keep between you and the vehicle in front in good conditions at least:",
    answers: [
      { text: "Four seconds", correct: false },
      { text: "One second", correct: false },
      { text: "Two seconds", correct: true },
      { text: "Three seconds", correct: false }
    ]
  },
  {
    question: "What should you use the hard shoulder of a multi-lane carriageway for?",
    answers: [
      { text: "Joining the dual carriageway", correct: false },
      { text: "Stopping when you are tired", correct: false },
      { text: "Stopping in an emergency", correct: true },
      { text: "Leaving the dual carriageway", correct: false }
    ]
  },
  {
    question: "When joining a dual carriageway, you must always:",
    answers: [
      { text: "Give way to traffic already on the dual carriageway", correct: true },
      { text: "Come to a stop before joining the dual carriageway", correct: false },
      { text: "Stop at the end of the acceleration", correct: false },
      { text: "Use the hard shoulder", correct: false }
    ]
  },
  {
    question: "A fundamental rule when driving on a dual carriageway is:",
    answers: [
      { text: "Use the lane that has least traffic", correct: false },
      { text: "Overtake on the side that is clearest", correct: false },
      { text: "Keep to the left lane unless overtaking", correct: true },
      { text: "Try to keep above 50 kph to prevent congestion", correct: false }
    ]
  },
  {
    question: "You are driving on a multi-lane carriageway. By mistake, you go past the exit that you wanted to take. You should:",
    answers: [
      { text: "Carry on to the next exit", correct: true },
      { text: "Carefully reverse on the hard shoulder", correct: false },
      { text: "Carefully reverse in the left-hand lane", correct: false },
      { text: "Make a U-turn at the next gap in the central reservation", correct: false }
    ]
  },
  {
    question: "As soon as you join a dual carriageway you should normally:",
    answers: [
      { text: "Keep in the left lane", correct: true },
      { text: "Try to overtake", correct: false },
      { text: "Readjust your mirrors", correct: false },
      { text: "Position your vehicle in the centre lane", correct: false }
    ]
  }
]

const questionsHazardAwareness = [
  {
    question: "You become ill. A doctor prescribes drugs, which are likely to affect your driving. You should:",
    answers: [
      { text: "Drive only if someone is with you", correct: false },
      { text: "Not drive yourself", correct: true },
      { text: "Never drive at more than 30 kph", correct: false },
      { text: "Drive normally", correct: false }
    ]
  },
  {
    question: "Your doctor has given you a course of medicine. Why should you ask if it is OK to drive?",
    answers: [
      { text: "You will have to let your insurance company know about the medicine", correct: false },
      { text: "Drugs make you a better driver by quickening your reactions", correct: false },
      { text: "Some types of medicine can cause your reactions to slow down", correct: true },
      { text: "The medicine you take may affect your hearing", correct: false }
    ]
  },
  {
    question: "A car driver pulls out causing you to brake. You should:",
    answers: [
      { text: "Overtake and sound your horn", correct: false },
      { text: "Drive close behind and sound your horn", correct: false },
      { text: "Flag the driver down and explain the mistake", correct: false },
      { text: "Keep calm and not retaliate", correct: true }
    ]
  },
  {
    question: "A driver can only read a number plate at the required distance with glasses on. The glasses should be worn:",
    answers: [
      { text: "Only when driving long distances", correct: false },
      { text: "Only when reversing", correct: false },
      { text: "Only in poor visibility", correct: false },
      { text: "All the time when driving", correct: true }
    ]
  },
  {
    question: "Another driver does something that upsets you. You should:",
    answers: [
      { text: "Flash your headlights several times", correct: false },
      { text: "Try not to react", correct: true },
      { text: "Let them know how you feel", correct: false },
      { text: "Sound your horn", correct: false }
    ]
  },
  {
    question: "If you are feeling tired it is best to stop as soon as you can. Until then you should:",
    answers: [
      { text: "Gently tap the steering wheel", correct: false },
      { text: "Keep changing speed to improve concentration", correct: false },
      { text: "Ensure a supply of fresh air", correct: true },
      { text: "Increase your speed to find a stopping place quickly", correct: false }
    ]
  },
  {
    question: "An elderly person's driving ability could be affected because they may be unable to:",
    answers: [
      { text: "Understand road signs", correct: false },
      { text: "React very quickly", correct: true },
      { text: "Give signals correctly", correct: false },
      { text: "Obtain car insurance", correct: false }
    ]
  },
  {
    question: "What advice should you give to a driver who has had a few alcoholic drinks at a party?",
    answers: [
      { text: "Wait a short while and then drive home", correct: false },
      { text: "Go home by public transport", correct: true },
      { text: "Have a strong cup of coffee and then drive home", correct: false },
      { text: "Drive home carefully and slowly", correct: false }
    ]
  },
  {
    question: "You MUST wear glasses or contact lenses when driving on public roads if:",
    answers: [
      { text: "You cannot read a vehicle number plate from distance of 20.5 meters (67 feet) without them", correct: true },
      { text: "There is an eyesight problem in your family", correct: false },
      { text: "You cannot read a vehicle number plate from a distance of 36 meters (120 feet) without them", correct: false },
      { text: "You are the holder of an orange badge", correct: false }
    ]
  },
  {
    question: "When must you stop at a stop sign?",
    answers: [
      { text: "Only when the area is busy", correct: false },
      { text: "When turning right only", correct: false },
      { text: "During rush hours only", correct: false },
      { text: "At all times", correct: true }
    ]
  },
  {
    question: "You are invited to a pub lunch. You know that you will have to drive in the evening. What is your best course of action?",
    answers: [
      { text: "Eat a hot meal with your alcohol drinks", correct: false },
      { text: "Have some milk before drinking alcohol", correct: false },
      { text: "Avoid mixing your alcoholic drinks", correct: false },
      { text: "Not drink any alcohol at all", correct: true }
    ]
  },
  {
    question: "You take the wrong route and find you are on a one-way street. You should:",
    answers: [
      { text: "Turn round in a side road", correct: false },
      { text: "Reverse into a driveway", correct: false },
      { text: "Continue to the end of the road", correct: true },
      { text: "Reverse out of the road", correct: false }
    ]
  },
  {
    question: "You go to a social event and need to drive a short time after. What precautions should you take?",
    answers: [
      { text: "Avoid drinking alcohol on an empty stomach", correct: false },
      { text: "Drink plenty of milk before drinking alcohol", correct: false },
      { text: "Avoid drinking alcohol completely", correct: true },
      { text: "Drink plenty of coffee after drinking alcohol", correct: false }
    ]
  },
  {
    question: "You are taking drugs that are likely to affect your driving. What should you do?",
    answers: [
      { text: "Only drive if accompanied by a full licence-holder", correct: false },
      { text: "Seek medical advice before driving", correct: true },
      { text: "Limit your driving to essential journeys", correct: false },
      { text: "Drive only for short distances", correct: false }
    ]
  },
  {
    question: "You have been taking medicine for a few days, which made you feel drowsy. Today you feel better but still need to take the medicine. You should only drive:",
    answers: [
      { text: "If your journey is necessary", correct: false },
      { text: "If someone goes with you", correct: false },
      { text: "After checking with your doctor", correct: true },
      { text: "At night on quiet roads", correct: false }
    ]
  },
  {
    question: "What is the maximum permissible alcohol level above which, a driver must not drive?",
    answers: [
      { text: "Breath alcohol level of 25 mg/100ml or blood alcohol level of 70mm/100ml.", correct: false },
      { text: "Breath alcohol level of 20 mg/100ml or blood alcohol level of 60mm/100ml.", correct: false },
      { text: "Breath alcohol level of 35 mg/100ml or blood alcohol level of 80mm/100ml.", correct: true },
      { text: "Breath alcohol level of 35 mg/100ml or blsood alcohol level of 90mm/100ml.", correct: false }
    ]
  },
  {
    question: "Your reaction will be much slower when driving:",
    answers: [
      { text: "In fog", correct: false },
      { text: "Too quickly", correct: false },
      { text: "If tired", correct: true },
      { text: "In rain", correct: false }
    ]
  },
  {
    question: "You are about to drive home. You cannot find the glasses you need to wear when driving. You should:",
    answers: [
      { text: "Drive home at night", correct: false },
      { text: "Drive home slowly, keeping to quite roads", correct: false },
      { text: "Borrow a friend's glasses and drive home", correct: false },
      { text: "Find a way of getting home without driving", correct: true }
    ]
  },
  {
    question: "How does alcohol affect your driving?",
    answers: [
      { text: "It increases your awareness", correct: false },
      { text: "It speeds up your reactions", correct: false },
      { text: "It improves your coordination", correct: false },
      { text: "It reduces your concentration", correct: true }
    ]
  },
  {
    question: "A driver pulls out of a side road in front of you. You have to brake hard. You should",
    answers: [
      { text: "Sound your horn to show your annoyance", correct: false },
      { text: "Ignore the error and stay calm", correct: true },
      { text: "Flash your lights to show your annoyance", correct: false },
      { text: "Overtake as soon as possible", correct: false }
    ]
  }
]

const questionsMiscellaneous = [
  {
    question: "If a trailer swerves or snakes when you are towing it you should",
    answers: [
      { text: "Let go of the steering wheel and let it correct itself", correct: false },
      { text: "Brake hard and hold the pedal down", correct: false },
      { text: "Ease off the accelerator and reduce your speed", correct: true },
      { text: "Increase your speed as quickly as possible", correct: false }
    ]
  },
  {
    question: "A learner driver you are following stalls at a junction. What should you do?",
    answers: [
      { text: "Be patient and wait for them to move on", correct: true },
      { text: "Shout instructions", correct: false },
      { text: "Steer around them and drive on", correct: false },
      { text: "Sound your horn and flash your lights", correct: false }
    ]
  },
  {
    question: "Anti-lock brakes prevent wheels from locking. This means the tyres are less likely to",
    answers: [
      { text: "Puncture", correct: false },
      { text: "Skid", correct: true },
      { text: "Wear", correct: false },
      { text: "Aquaplane", correct: false }
    ]
  },
  {
    question: "You are following a slow-moving vehicle on a narrow country road. There is a junction just ahead on the right. What should you do?",
    answers: [
      { text: "Stay behind until you are past the junction", correct: true },
      { text: "Accelerate quickly to pass before the junction", correct: false },
      { text: "Slow down and prepare to overtake on the left", correct: false },
      { text: "Overtake after checking your mirrors and signalling", correct: false }
    ]
  },
  {
    question: "You are planning a long journey. Do you need to plan rest stops?",
    answers: [
      { text: "No, you will be less tired if you get there as soon as possible", correct: false },
      { text: "Yes, regular stops help concentration", correct: true },
      { text: "No, only fuel stops will be needed", correct: false },
      { text: "Yes, you should plan to stop every half hour", correct: false }
    ]
  },
  {
    question: "You are towing a caravan. Which is the safest type of rear-view mirror to use?",
    answers: [
      { text: "Extended-arm side mirrors", correct: true },
      { text: "Ordinary interior mirror", correct: false },
      { text: "Ordinary door mirrors", correct: false },
      { text: "Interior wide-angle mirror", correct: false }
    ]
  },
  {
    question: "You are travelling at the legal speed limit. A vehicle comes up quickly behind, flashing its headlights. You should",
    answers: [
      { text: "Allow the vehicle to overtake", correct: true },
      { text: "Touch the brakes sharply to show your brake lights", correct: false },
      { text: "Maintain your speed to prevent the vehicle from overtaking", correct: false },
      { text: "Accelerate to make a gap behind you", correct: false }
    ]
  },
  {
    question: "What is the meaning of a number 20 inside a red circle?",
    answers: [
      { text: "Minimum speed 20 mph", correct: false },
      { text: "Entry into a 20 mph zone", correct: true },
      { text: "End of a 20 mph zone", correct: false },
      { text: "Speed camera ahead", correct: false }
    ]
  },
  {
    question: "Why are place names printed on the road surface?",
    answers: [
      { text: "To restrict the flow of traffic", correct: false },
      { text: "To enable you to change lanes early", correct: true },
      { text: "To warn you of oncoming traffic", correct: false },
      { text: "To prevent you changing lanes", correct: false }
    ]
  },
  {
    question: "You are approaching an unmarked crossroads. How should you deal with this type of junction?",
    answers: [
      { text: "Slow down and keep to the right", correct: false },
      { text: "Accelerate looking to the left", correct: false },
      { text: "Accelerate and keep to the middle", correct: false },
      { text: "Slow down and look both ways", correct: true }
    ]
  },
  {
    question: "When driving at 60mph on a dry road what would be the shortest overall stopping distance?",
    answers: [
      { text: "96 metres", correct: false },
      { text: "53 metres", correct: false },
      { text: "58 metres", correct: false },
      { text: "73 metres", correct: true }
    ]
  },
  {
    question: "What should you use the horn for?",
    answers: [
      { text: "To greet other road users", correct: false },
      { text: "To signal you annoyance", correct: false },
      { text: "To allow you right of way", correct: false },
      { text: "To alert others to your presence", correct: true }
    ]
  },
  {
    question: "You are driving on an icy road. How can you avoid wheelspin?",
    answers: [
      { text: "Use the handbrake if the wheels start to slip", correct: false },
      { text: "Brake gently and repeatedly", correct: false },
      { text: "Drive in a low gear at all times", correct: false },
      { text: "Drive at a slow speed in as high gear as possible", correct: true }
    ]
  },
  {
    question: "'Tailgating' means",
    answers: [
      { text: "Following another vehicle too closely", correct: true },
      { text: "Reversing into a parking space", correct: false },
      { text: "Driving with rear fog lights on", correct: false },
      { text: "Using the rear door of a hatchback car", correct: false }
    ]
  },
  {
    question: "What is the national speed limit for cars in the left-hand lane of a three-laned motorway?",
    answers: [
      { text: "60 mph", correct: false },
      { text: "50 mph", correct: false },
      { text: "70 mph", correct: true },
      { text: "80 mph", correct: false }
    ]
  },
  {
    question: "You are about to drive home but you can't find the glasses you need to wear. You should:",
    answers: [
      { text: "Find a way of getting home without driving", correct: true },
      { text: "Only drive on minor roads", correct: false },
      { text: "Drive home at night so that the lights will help you", correct: false },
      { text: "Drive home without going faster than 30 mph", correct: false }
    ]
  },
  {
    question: "An elderly person's driving ability could be affected because they may be unable to",
    answers: [
      { text: "Give signals correctly", correct: false },
      { text: "React very quickly", correct: true },
      { text: "Understand road signs", correct: false },
      { text: "Obtain car insurance", correct: false }
    ]
  },
  {
    question: "What is the most likely cause of high fuel consumption?",
    answers: [
      { text: "Harsh braking and accelerating", correct: true },
      { text: "Poor steering control", correct: false },
      { text: "Accelerating around bends", correct: false },
      { text: "Staying in high gears", correct: false }
    ]
  },
  {
    question: "What colour are the reflective studs between a motorway and its slip road?",
    answers: [
      { text: "Green", correct: true },
      { text: "Orange", correct: false },
      { text: "Blue", correct: false },
      { text: "Red", correct: false }
    ]
  },
  {
    question: "If you start to feel tired whilst driving you should",
    answers: [
      { text: "Increase your speed to reduce your journey time", correct: false },
      { text: "Stop at a safe place and rest", correct: true },
      { text: "Decrease your speed", correct: false },
      { text: "Turn on the radio and listen to loud music", correct: false }
    ]
  },
  {
    question: "Why, on a windy day, should you allow extra room when overtaking a motor cyclist?",
    answers: [
      { text: "The rider may be forced to stop suddenly", correct: false },
      { text: "The rider may be blown into your path", correct: true },
      { text: "You will have less control over your vehicle", correct: false },
      { text: "You will be travelling faster than normal", correct: false }
    ]
  },
  {
    question: "In windy conditions you need to take extra care when",
    answers: [
      { text: "Turning into a narrow road", correct: false },
      { text: "Passing pedal cyclists", correct: true },
      { text: "Using the brakes", correct: false },
      { text: "Making a hill start", correct: false }
    ]
  },
  {
    question: "When driving through a Ford or flood water, what gear should you use?",
    answers: [
      { text: "Reverse", correct: false },
      { text: "Fifth", correct: false },
      { text: "First or second", correct: true },
      { text: "Fourth", correct: false }
    ]
  },
  {
    question: "In normal conditions the braking distance when travelling at 50 mph is",
    answers: [
      { text: " 38 metres", correct: true },
      { text: "25 metres", correct: false },
      { text: "14 metres", correct: false },
      { text: "16 metres", correct: false }
    ]
  },
  {
    question: "After how many years does a car first need a MOT certificate?",
    answers: [
      { text: "Three years", correct: true },
      { text: "Two years", correct: false },
      { text: "Four years", correct: false },
      { text: "One year", correct: false }
    ]
  },
  {
    question: "There has been a collision. A motorcyclist is lying injured and unconscious. Unless it's essentially why should you usually NOT attempt to remove their helmet?",
    answers: [
      { text: "Because they may not want you to", correct: false },
      { text: "This could result in more serious injury", correct: true },
      { text: "Because you could scratch the helmet", correct: false },
      { text: "They will get too cold if you do this", correct: false }
    ]
  },
  {
    question: "When driving in falling snow you should",
    answers: [
      { text: "Brake gently in plenty of time", correct: true },
      { text: "Brake firmly and quickly", correct: false },
      { text: "Be ready to steer sharply", correct: false },
      { text: "Use sidelights only", correct: false }
    ]
  },
  {
    question: "Before reversing you should always check:",
    answers: [
      { text: "Your side mirrors", correct: false },
      { text: "All round", correct: true },
      { text: "The area behind you", correct: false },
      { text: "Your rear view mirror", correct: false }
    ]
  },
  {
    question: "You can use the engine of your vehicle as a brake by",
    answers: [
      { text: "By travelling with the clutch pressed down", correct: false },
      { text: "By selecting a lower gear", correct: true },
      { text: "By turning the engine off", correct: false },
      { text: "By selecting fifth gear", correct: false }
    ]
  },
  {
    question: "Where are you most likely to be affected by a side wind?",
    answers: [
      { text: "On a narrow country lane", correct: false },
      { text: "On a long, straight road", correct: false },
      { text: "On a busy stretch of road", correct: false },
      { text: "On an open stretch of road", correct: true }
    ]
  },
  {
    question: "At which pedestrian crossing are cyclists allowed to ride across?",
    answers: [
      { text: "Pelican", correct: false },
      { text: "Toucan", correct: true },
      { text: "Puffin", correct: false },
      { text: "Zebra", correct: false }
    ]
  },
  {
    question: "On a motorway what is used to reduce traffic bunching?",
    answers: [
      { text: "Lane closures", correct: false },
      { text: "Contraflow systems", correct: false },
      { text: "National speed limits", correct: false },
      { text: "Variable speed limits", correct: true }
    ]
  },
  {
    question: "You are turning left into a side road. What hazards should you be especially aware of?",
    answers: [
      { text: "Pedestrians", correct: true },
      { text: "One-way street", correct: false },
      { text: "Traffic congestion", correct: false },
      { text: "Parked vehicles", correct: false }
    ]
  },
  {
    question: "How can you help to prevent your car radio from being stolen?",
    answers: [
      { text: "Park near a busy junction", correct: false },
      { text: "Park in an unlit area", correct: false },
      { text: "Hide the radio with a blanket", correct: false },
      { text: "Install a security-coded radio", correct: true }
    ]
  },
  {
    question: "You lose your way on a busy road. What is the best action to take?",
    answers: [
      { text: "Shout to other drivers to ask them the way", correct: false },
      { text: "Check a map, and keep going with the traffic flow", correct: false },
      { text: "Turn into a side road, stop and check a map", correct: true },
      { text: "Stop at traffic lights and ask pedestrians", correct: false }
    ]
  },
  {
    question: "Whilst driving on the motorway you have to slow down quickly due to a hazard. What should you do?",
    answers: [
      { text: "Sound your horn", correct: false },
      { text: "Switch on your hazard lights", correct: true },
      { text: "Switch on your fog light", correct: false },
      { text: "Switch on the headlights to full beam", correct: false }
    ]
  },
  {
    question: "You stop at a pelican crossing. The amber light begins to flash as a pedestrian steps onto the crossing. You should",
    answers: [
      { text: "Move on as soon as the lights turn green", correct: false },
      { text: "Give way to the pedestrian", correct: true },
      { text: "Continue ahead", correct: false },
      { text: "Beep your horn at the pedestrian", correct: false }
    ]
  },
  {
    question: "You keep well back while waiting to overtake a large vehicle. A car fills the gap. You should",
    answers: [
      { text: "Flash your headlights", correct: false },
      { text: "Drop further back", correct: true },
      { text: "Start to overtake", correct: false },
      { text: "Sound your horn", correct: false }
    ]
  },
  {
    question: "It is illegal to drive with tyres that",
    answers: [
      { text: "Have a large, deep cut in the side wall", correct: true },
      { text: "Are of different makes", correct: false },
      { text: "Were bought second-hand", correct: false },
      { text: "Are more than three years old", correct: false }
    ]
  },
  {
    question: "Triangular road signs give:",
    answers: [
      { text: "Instructions", correct: false },
      { text: "Warnings", correct: true },
      { text: "Directions", correct: false },
      { text: "Information", correct: false }
    ]
  },
  {
    question: "When driving through a tunnel you should",
    answers: [
      { text: " Always use your windscreen wipers", correct: false },
      { text: "Use your air conditioning system", correct: false },
      { text: "Switch on your rear fog lights", correct: false },
      { text: "Look out for variable message signs", correct: true }
    ]
  },
  {
    question: "The reflective studs between a motorway and its slip road are what colour?",
    answers: [
      { text: "Purple", correct: false },
      { text: "Blue", correct: false },
      { text: "Red", correct: false },
      { text: "Green", correct: true }
    ]
  },
  {
    question: "You are carrying a child in your car. They are under three years of age. Which of these is a suitable restraint?",
    answers: [
      { text: "An adult lap belt", correct: false },
      { text: "An adult holding a child", correct: false },
      { text: "A child seat", correct: true },
      { text: "An adult seat belt", correct: false }
    ]
  },
  {
    question: "You must NOT sound your horn",
    answers: [
      { text: "Between 11.30 pm and 7 am in a built-up area", correct: true },
      { text: "Between 10 pm and 6 am in a built-up area", correct: false },
      { text: "Between 11.30 pm and 6 am on any road", correct: false },
      { text: "At any time in a built-up area", correct: false }
    ]
  },
  {
    question: "Anti-lock brakes are most useful when you are",
    answers: [
      { text: "Driving on worn tyres", correct: false },
      { text: "Braking gently", correct: false },
      { text: "Braking excessively", correct: true },
      { text: "Driving normally", correct: false }
    ]
  },
  {
    question: "Supertrams or Light Rapid Transit (LRT) systems are environmentally friendly because",
    answers: [
      { text: "They use quieter roads", correct: false },
      { text: "They do not operate during rush hour", correct: false },
      { text: "They use electric power", correct: true },
      { text: "They use diesel power", correct: false }
    ]
  },
  {
    question: "You are turning left on a slippery road. The back of your vehicle slides to the right. You should",
    answers: [
      { text: "Steer carefully to the left", correct: false },
      { text: "Brake firmly and not turn the steering wheel", correct: false },
      { text: "Steer carefully to the right", correct: true },
      { text: "Brake firmly and steer to the left", correct: false }
    ]
  },
  {
    question: "When driving through a ford or floodwater, what gear should you be in?",
    answers: [
      { text: "Fifth", correct: false },
      { text: " First or second", correct: true },
      { text: "Third", correct: false },
      { text: "Fourth", correct: false }
    ]
  },
  {
    question: "When travelling in very heavy rain your overall stopping distance is likely to be",
    answers: [
      { text: "Trebled", correct: false },
      { text: "Doubled", correct: true },
      { text: "Quadrupled", correct: false },
      { text: "The same as normal", correct: false }
    ]
  },
  {
    question: "You are waiting to emerge at a junction. Parked vehicles restrict your view. What can help you to see traffic on the road you are joining?",
    answers: [
      { text: "Making eye contact with other road users", correct: false },
      { text: "Checking for traffic in your interior mirror", correct: false },
      { text: "Reflections of traffic in shop windows", correct: true },
      { text: "Looking for traffic behind you", correct: false }
    ]
  },
  {
    question: "Which of the following is the main cause of rear-end collisions?",
    answers: [
      { text: "Driving too close to the vehicle in front", correct: true },
      { text: "A wet road surface", correct: false },
      { text: "Pedestrians crossing the road unexpectedly", correct: false },
      { text: "Traffic lights", correct: false }
    ]
  },
  {
    question: "Your overall stopping distance will be much longer when:",
    answers: [
      { text: "Driving in fog", correct: false },
      { text: "Driving in strong winds", correct: false },
      { text: "Driving in rain", correct: true },
      { text: "Driving on a very hot day", correct: false }
    ]
  },
  {
    question: "When the fluid level in your battery is low you should top it up with",
    answers: [
      { text: "Distilled water", correct: true },
      { text: "Battery acid", correct: false },
      { text: "Water that has been boiled", correct: false },
      { text: "Tap water", correct: false }
    ]
  },
  {
    question: "You are carrying a child using a rear-facing baby seat. You want to put it on the front passenger seat. What MUST you do before setting off?",
    answers: [
      { text: "Recline the front passenger seat", correct: false },
      { text: "Deactivate all front and rear airbags", correct: false },
      { text: "Make sure all the child safety locks are off", correct: false },
      { text: "Make sure any front passenger airbag is deactivated", correct: true }
    ]
  },
  {
    question: "When overtaking which routine should you use?",
    answers: [
      { text: "Speed, mirrors, look, signal, manoeuvre", correct: false },
      { text: "Look, mirrors, position, mirrors, signal, manoeuvre", correct: false },
      { text: "Mirrors, position, speed, look, mirrors, signal, manoeuvre", correct: true },
      { text: "Mirrors, speed, position, look, mirrors, signal, manoeuvre", correct: false }
    ]
  },
  {
    question: "You are on a well-lit motorway at night. You must",
    answers: [
      { text: "Always use your rear fog lights", correct: false },
      { text: "Use your headlights only in bad weather", correct: false },
      { text: "Use only your sidelights", correct: false },
      { text: "Always use your headlights", correct: true }
    ]
  },
  {
    question: "You are trying to move off on snow. You should use",
    answers: [
      { text: "The handbrake and footbrake together", correct: false },
      { text: "A high engine speed", correct: false },
      { text: "The highest gear you can", correct: true },
      { text: "The lowest gear you can", correct: false }
    ]
  },
  {
    question: "You are travelling in heavy rain. Your overall stopping distance is likely to be :",
    answers: [
      { text: "Up to ten times greater", correct: false },
      { text: "Halved", correct: false },
      { text: "Doubled", correct: true },
      { text: "No different", correct: false }
    ]
  },
  {
    question: "In which of these situations should you avoid overtaking?",
    answers: [
      { text: "In a one-way street", correct: false },
      { text: "Approaching a dip in the road", correct: true },
      { text: "On a 30 mph road", correct: false },
      { text: "Just after a bend", correct: false }
    ]
  },
  {
    question: "You take some cough medicine given to you by a friend. What should you do before driving?",
    answers: [
      { text: "Check the label to see if the medicine will affect your driving", correct: true },
      { text: "Drink some strong coffee one hour before driving", correct: false },
      { text: "Ask your friend if taking the medicine affected their driving", correct: false },
      { text: "Drive a short distance to see if the medicine is affecting your driving", correct: false }
    ]
  },
  {
    question: "You need to top up your battery. What level should you fill to?",
    answers: [
      { text: "Just below the cell plates", correct: false },
      { text: "Half-way up the battery", correct: false },
      { text: "The top of the battery", correct: false },
      { text: "Just above the cell plates", correct: true }
    ]
  },
  {
    question: "As a driver, how can you help the environment?",
    answers: [
      { text: "By driving faster", correct: false },
      { text: "By reducing your speed", correct: true },
      { text: "By using leaded fuel", correct: false },
      { text: "By driving with your windows down", correct: false }
    ]
  },
  {
    question: "You have a collision whilst your car is moving. What is the FIRST thing you must do?",
    answers: [
      { text: "Call your insurance company", correct: false },
      { text: "Call the emergency services", correct: false },
      { text: "Stop at the scene of the accident", correct: true },
      { text: "Stop only if someone waves at you", correct: false }
    ]
  },
  {
    question: "You are travelling on a well-lit road at night in a built up area. By using dipped headlights you will be able to",
    answers: [
      { text: "Be easily seen by others", correct: true },
      { text: "See further along the road", correct: false },
      { text: "Go at a much faster speed", correct: false },
      { text: "Switch to main beam quickly", correct: false }
    ]
  },
  {
    question: "Motorcyclists will often look round over their right shoulder just before turning right. This is because",
    answers: [
      { text: "They need to listen for following traffic", correct: false },
      { text: "They need to check for traffic in their blind area", correct: true },
      { text: "Motorcycles do not have mirrors", correct: false },
      { text: "Look around helps them balance as they turn", correct: false }
    ]
  },
  {
    question: "After buying a secondhand vehicle you should tell the licensing authority",
    answers: [
      { text: "Before an MOT", correct: false },
      { text: "After 14 days", correct: false },
      { text: "When you sell the vehicle", correct: false },
      { text: "Immediately", correct: true }
    ]
  },
  {
    question: "You engine catches fire what should you do first?",
    answers: [
      { text: "Call the fire brigade", correct: true },
      { text: "Lift the bonnet and disconnect the battery", correct: false },
      { text: "Lift the bonnet and warn other traffic", correct: false },
      { text: "Call a breakdown service", correct: false }
    ]
  },
  {
    question: "You have been convicted of driving whilst unfit through drink or drugs. You will find this is likely to cause the cost of one of the following to rise considerably. Which one?",
    answers: [
      { text: "Road fund licence", correct: false },
      { text: "Vehicle test certificate", correct: false },
      { text: "Driving licence", correct: false },
      { text: "Insurance premiums", correct: true }
    ]
  },
  {
    question: "It is essential that tyre pressures be checked regularly. When should this be done?",
    answers: [
      { text: "After a long journey", correct: false },
      { text: "After filling the vehicle with fuel", correct: false },
      { text: "When the tyres are cold", correct: true },
      { text: "When the tyres are hot", correct: false }
    ]
  },
  {
    question: "You are driving through a tunnel. There has been a collision and the car in front is on fire and blocking the road. What should you do?",
    answers: [
      { text: "Switch on the hazard warning lights", correct: true },
      { text: "Lock all the doors and windows", correct: false },
      { text: "Overtake and continue as quickly as you can", correct: false },
      { text: "Stop and then reverse out of the tunnel", correct: false }
    ]
  },
  {
    question: "Your mobile phone rings while you are travelling. You should",
    answers: [
      { text: "Stop immediately", correct: false },
      { text: "Pull up at the nearest curb", correct: false },
      { text: "Answer it immediately", correct: false },
      { text: "Pull up in a suitable place", correct: true }
    ]
  },
  {
    question: "What is the safest way to us a mobile phone in you vehicle?",
    answers: [
      { text: "Use hands-free equipment", correct: false },
      { text: "Drive slowly on a quiet road", correct: false },
      { text: "Direct your call through the operator", correct: false },
      { text: "Find a suitable place to stop", correct: true }
    ]
  },
  {
    question: "Travelling on a wet motorway with road spray you should",
    answers: [
      { text: "Turn on your hazard lights", correct: false },
      { text: "Turn your headlights to dipped mode", correct: true },
      { text: "Turn on your rear fog lights", correct: false },
      { text: "Turn on your front fog lights", correct: false }
    ]
  },
  {
    question: "You start to feel tired whilst driving, you should?",
    answers: [
      { text: "Stop at a safe place and rest", correct: true },
      { text: "Decrease your speed", correct: false },
      { text: "Increase your speed to reduce your journey time", correct: false },
      { text: "Turn on the radio and listen to loud music", correct: false }
    ]
  },
  {
    question: "You must not reverse",
    answers: [
      { text: "Into a side road", correct: false },
      { text: "For more than a car's length", correct: false },
      { text: "In built-up areas", correct: false },
      { text: "For longer than necessary", correct: true }
    ]
  },
  {
    question: "A police officer asks to see your documents. You do not have them with you. You may be asked to take them to the police station with",
    answers: [
      { text: "21 days", correct: false },
      { text: "7 days", correct: true },
      { text: "14 days", correct: false },
      { text: "5 days", correct: false }
    ]
  },
  {
    question: "Are passengers allowed to ride in a caravan that is being towed?",
    answers: [
      { text: "Yes, if they are over fourteen", correct: false },
      { text: "Only if all the seats in the towing vehicle are full", correct: false },
      { text: "No, not at any time", correct: true },
      { text: "Only if a stabiliser is fitted", correct: false }
    ]
  },
  {
    question: "While driving a vehicle, at what distance MUST you be able to read a number plate?",
    answers: [
      { text: "30 metres (98 feet)", correct: false },
      { text: "10 metres (33 feet)", correct: false },
      { text: "20.5 metres (67 feet)", correct: true },
      { text: "15 metres (49 feet)", correct: false }
    ]
  },
  {
    question: "When are you allowed to use a motorway hard shoulder?",
    answers: [
      { text: "To read a map", correct: false },
      { text: "To rest", correct: false },
      { text: "When your vehicle breaks down", correct: true },
      { text: "To overtake slow moving traffic", correct: false }
    ]
  },
  {
    question: "You are on a road that has no traffic signs. There are streetlights. What is the speed limit?",
    answers: [
      { text: "20 mph", correct: false },
      { text: "40 mph", correct: false },
      { text: "50 mph", correct: false },
      { text: "30 mph", correct: true }
    ]
  },
  {
    question: "Traffic calming measures are used to",
    answers: [
      { text: "Help parking", correct: false },
      { text: "Help overtaking", correct: false },
      { text: "Slow traffic down", correct: true },
      { text: "Stop road rage", correct: false }
    ]
  },
  {
    question: "You are on a long, downhill slope. What should you do to help control the speed of your vehicle?",
    answers: [
      { text: "Apply the parking brake gently", correct: false },
      { text: "Grip the handbrake firmly", correct: false },
      { text: "Select a lower gear", correct: true },
      { text: "Select neutral", correct: false }
    ]
  },
  {
    question: "When may you reverse from a side-road into a main road?",
    answers: [
      { text: "Only if the main road is clear of traffic", correct: false },
      { text: "At any time", correct: false },
      { text: "Only if both roads are clear of traffic", correct: false },
      { text: "Not at any time", correct: true }
    ]
  },
  {
    question: "A horse rider is in the left-hand lane approaching a roundabout. You should expect the rider to",
    answers: [
      { text: "Go in any direction", correct: true },
      { text: "Turn right", correct: false },
      { text: "Go ahead", correct: false },
      { text: "Turn left", correct: false }
    ]
  },
  {
    question: "The aim of an Active Traffic Management scheme on a motorway is to",
    answers: [
      { text: "Reduce congestion", correct: true },
      { text: "Prevent overtaking", correct: false },
      { text: "Prevent tailgating", correct: false },
      { text: "Reduce rest stops", correct: false }
    ]
  },
  {
    question: "When you are NOT sure it is safe to reverse your vehicle you should",
    answers: [
      { text: "Get out and check", correct: true },
      { text: "Reverse slowly", correct: false },
      { text: "Use your horn", correct: false },
      { text: "Rev your engine", correct: false }
    ]
  },
  {
    question: "Why could keeping the clutch down or selecting neutral for long periods of time be dangerous?",
    answers: [
      { text: "You will have less steering and braking control", correct: true },
      { text: "Fuel spillage will occur", correct: false },
      { text: "Engine damage may be caused", correct: false },
      { text: "It will wear tyres out more quickly", correct: false }
    ]
  },
  {
    question: "Any load that is carried on a roof rack should be",
    answers: [
      { text: "Visible in your exterior mirror", correct: false },
      { text: "Securely fastened when driving", correct: true },
      { text: "Loaded towards the rear of the vehicle", correct: false },
      { text: "Covered with plastic sheeting", correct: false }
    ]
  },
  {
    question: "Before overtaking a large vehicle you should keep well back. Why is this?",
    answers: [
      { text: "To leave a gap in case the vehicle stops and rolls back", correct: false },
      { text: "To give acceleration space to overtake quickly on blind spots", correct: false },
      { text: "To get the best view of the road ahead", correct: true },
      { text: "To offer other drivers a safe gap if they want to overtake you", correct: false }
    ]
  },
  {
    question: "A strong crosswind is least likely to affect which of these vehicles?",
    answers: [
      { text: "Motorcycles", correct: false },
      { text: "High-sided vehicles", correct: false },
      { text: "Cars", correct: true },
      { text: "Cyclists", correct: false }
    ]
  },
  {
    question: "What should you do when overtaking a motorcyclist in strong winds?",
    answers: [
      { text: "Pass immediately", correct: false },
      { text: "Pass quickly", correct: false },
      { text: "Pass wide", correct: true },
      { text: "Pass close", correct: false }
    ]
  },
  {
    question: "Catalytic converters are fitted to make the",
    answers: [
      { text: "Exhaust fumes cleaner", correct: true },
      { text: "Exhaust systems easier to replace", correct: false },
      { text: "Engines run quietly", correct: false },
      { text: "Engines produce more power", correct: false }
    ]
  },
  {
    question: "A driver does something that upsets you. You should",
    answers: [
      { text: "Try not to react", correct: true },
      { text: "Flash your headlights several times", correct: false },
      { text: "Sound your horn", correct: false },
      { text: "Let them know how you feel", correct: false }
    ]
  },
  {
    question: "A toucan crossing is different from other crossings because",
    answers: [
      { text: "Cyclists can use it", correct: true },
      { text: "A traffic warden controls it", correct: false },
      { text: "Moped riders can use it", correct: false },
      { text: "Two flashing lights control it", correct: false }
    ]
  },
  {
    question: "You are approaching traffic lights that have been on green for sometime. You should",
    answers: [
      { text: "Maintain your speed", correct: false },
      { text: "Accelerate hard", correct: false },
      { text: "Brake hard", correct: false },
      { text: "Be ready to stop", correct: true }
    ]
  },
  {
    question: "Rapid acceleration and heavy braking can lead to",
    answers: [
      { text: "Reduced exhaust emissions", correct: false },
      { text: "Increased road safety", correct: false },
      { text: "Increased fuel consumption", correct: true },
      { text: "Reduced pollution", correct: false }
    ]
  },
  {
    question: "A trailer must stay securely hitched up to the towing vehicle. What additional safety device can be fitted to the trailer braking system?",
    answers: [
      { text: "Breakaway cable", correct: true },
      { text: "Jockey wheel", correct: false },
      { text: "Stabiliser", correct: false },
      { text: "Corner steadies", correct: false }
    ]
  },
  {
    question: "You are allowed to stop on a motorway when you",
    answers: [
      { text: "Need to use a mobile telephone", correct: false },
      { text: "Are told to do so by flashing red lights", correct: true },
      { text: "Need to walk and get some fresh air", correct: false },
      { text: "Wish to pick up hitchhikers", correct: false }
    ]
  },
  {
    question: "What does the term 'blind spot' mean for a driver?",
    answers: [
      { text: "An area covered by your left-hand mirror", correct: false },
      { text: "An area not covered by your mirrors", correct: true },
      { text: "An area covered by your right-hand mirror", correct: false },
      { text: "An area not covered by your headlights", correct: false }
    ]
  },
  {
    question: "What is the most common cause of skidding?",
    answers: [
      { text: "Worn tyres", correct: false },
      { text: "Other vehicles", correct: false },
      { text: "Driver error", correct: true },
      { text: "Pedestrians", correct: false }
    ]
  },
  {
    question: "When following a vehicle on a wet road you should leave a time gap of at least:",
    answers: [
      { text: "4 seconds", correct: true },
      { text: "2 seconds", correct: false },
      { text: "1 second", correct: false },
      { text: "5 seconds", correct: false }
    ]
  },
  {
    question: "You are driving in busy traffic. You want to pull up on the left just after a junction on the left. When should you signal?",
    answers: [
      { text: "As you are passing or just after the junction", correct: true },
      { text: "Just before you reach the junction", correct: false },
      { text: "It would be better not to signal at all", correct: false },
      { text: "Well before you reach the junction", correct: false }
    ]
  },
  {
    question: "The age group most likely to be involved in road accidents is",
    answers: [
      { text: "55 to 66-year olds", correct: false },
      { text: "30 to 45-year-olds", correct: false },
      { text: "17 to 25-year-olds", correct: true },
      { text: "46 to 55-year-olds", correct: false }
    ]
  },
  {
    question: "Why should you make sure your indicators are cancelled after turning?",
    answers: [
      { text: "To avoid misleading other road users", correct: true },
      { text: "To avoid damage to the indicator relay", correct: false },
      { text: "To avoid flattening the battery", correct: false },
      { text: "To avoid dazzling other road users", correct: false }
    ]
  },
  {
    question: "You intend to turn right into a side road. Just before turning you should check for motorcyclists who might be",
    answers: [
      { text: "Emerging from the side road", correct: false },
      { text: "Overtaking on your right", correct: true },
      { text: "Following you closely", correct: false },
      { text: "Overtaking you on the left", correct: false }
    ]
  },
  {
    question: "You are driving down a long steep hill. You suddenly notice that your brakes are not working as well as normal. What is the usual cause of this?",
    answers: [
      { text: "Oil on the brakes", correct: false },
      { text: "The brakes overheating", correct: true },
      { text: "Badly adjusted", correct: false },
      { text: "Air in the brake fluid", correct: false }
    ]
  },
  {
    question: "For which of these must you show on your motor insurance certificate?",
    answers: [
      { text: "When buying or selling a vehicle", correct: false },
      { text: "When a police office asks for it", correct: true },
      { text: "When having an MOT inspection", correct: false },
      { text: "When you are taking your driving test", correct: false }
    ]
  },
  {
    question: "When are passengers allowed to ride in a caravan that is being towed?",
    answers: [
      { text: "When travelling on minor roads", correct: false },
      { text: "When travelling on motorways", correct: false },
      { text: "Never", correct: true },
      { text: "When they are over 18 years old", correct: false }
    ]
  },
  {
    question: "The vehicle you are driving pulls to one side when you brake. What is the most likely cause of the problem?",
    answers: [
      { text: "Incorrect tyre pressure", correct: false },
      { text: "Low levels of power steering fluid", correct: false },
      { text: "A faulty handbrake", correct: false },
      { text: "Poorly adjusted brakes", correct: true }
    ]
  },
  {
    question: "What does tailgating mean?",
    answers: [
      { text: "Driving with your headlights on full beam", correct: false },
      { text: "Skidding on a dry road", correct: false },
      { text: "Following another vehicle too closely", correct: true },
      { text: "Bumping another car whilst parking", correct: false }
    ]
  },
  {
    question: "Motorcars must first have an MOT certificate when they are",
    answers: [
      { text: "Three years old", correct: true },
      { text: "Seven years old", correct: false },
      { text: "Five years old", correct: false },
      { text: "One year old", correct: false }
    ]
  },
  {
    question: "The purpose of a catalytic converter is to",
    answers: [
      { text: "Reduce oil consumption", correct: false },
      { text: "Increase acceleration", correct: false },
      { text: "Reduce fuel consumption", correct: false },
      { text: "Reduce toxic exhaust gases", correct: true }
    ]
  },
  {
    question: "Following a collision someone has suffered a burn. The burn needs to be cooled. What is the shortest time it should be cooled for?",
    answers: [
      { text: "10 minutes", correct: true },
      { text: "5 minutes", correct: false },
      { text: "20 minutes", correct: false },
      { text: "15 minutes", correct: false }
    ]
  },
  {
    question: "The reaction time of most drivers is over:",
    answers: [
      { text: "0.5 second", correct: true },
      { text: "1 second", correct: false },
      { text: "3 seconds", correct: false },
      { text: "2 seconds", correct: false }
    ]
  },
  {
    question: "You wish to make a right turn ahead. Why should you take up the correct position in good time?",
    answers: [
      { text: "To allow other drivers to pull out in front of you", correct: false },
      { text: "To allow other drivers to pass you on the right", correct: false },
      { text: "To give a better view into the road that you are joining", correct: false },
      { text: "To help other road users know what you intend to do", correct: true }
    ]
  },
  {
    question: "You should never wave people across at pedestrian crossings because",
    answers: [
      { text: "There may be another vehicle coming", correct: true },
      { text: "It is safer for you to carry on", correct: false },
      { text: "They may not be looking", correct: false },
      { text: "They may not be ready to cross", correct: false }
    ]
  },
  {
    question: "To correct a rear-wheel skid you should",
    answers: [
      { text: "Not steer at all", correct: false },
      { text: "Apply your handbrake", correct: false },
      { text: "Steer away from it", correct: false },
      { text: "Steer into it", correct: true }
    ]
  },
  {
    question: "Why are vehicles fitted with rear fog lights?",
    answers: [
      { text: "To warn drivers following closely to drop back", correct: false },
      { text: "To make them more visible in thick fog", correct: true },
      { text: "To use if broken down in a dangerous position", correct: false },
      { text: "To be seen when driving at high speed", correct: false }
    ]
  },
  {
    question: "On a motorway traffic signs are mostly which colour?",
    answers: [
      { text: "Purple", correct: false },
      { text: "Green", correct: false },
      { text: "Red", correct: false },
      { text: "Blue", correct: true }
    ]
  },
  {
    question: "In what situation are other drivers allowed to flash their headlights at you?",
    answers: [
      { text: "To tell you that they are giving way to you", correct: false },
      { text: "To warn you when you're breaking the speed limit", correct: false },
      { text: "To warn you of their presence", correct: true },
      { text: "To warn you danger is ahead", correct: false }
    ]
  },
  {
    question: "You are driving on a clear night. The road is busy with traffic. Which lights should you use?",
    answers: [
      { text: "Full beam headlights", correct: false },
      { text: "Dipped headlights", correct: true },
      { text: "Sidelights", correct: false },
      { text: "Interior light", correct: false }
    ]
  },
  {
    question: "When driving in snow it is best to keep in as high a gear as possible. Why is this?",
    answers: [
      { text: "To help you slow down quickly when you brake", correct: false },
      { text: "So that wheelspin does not cause your engine to run too fast", correct: false },
      { text: "To leave a lower gear available in case of wheelspin", correct: false },
      { text: "To help prevent wheelspin", correct: true }
    ]
  },
  {
    question: "You are driving along a wet road. How can you tell if your vehicle is aquaplaning?",
    answers: [
      { text: "The steering will feel very light", correct: true },
      { text: "The steering will feel very heavy", correct: false },
      { text: "The engine noise will increase", correct: false },
      { text: "The engine will stall", correct: false }
    ]
  },
  {
    question: "To help keep your vehicle secure at night where should you park?",
    answers: [
      { text: "Near a police station", correct: false },
      { text: "On a red route", correct: false },
      { text: "In a well-lit area", correct: true },
      { text: "In a quiet road", correct: false }
    ]
  },
  {
    question: "Which of the following should you do before stopping?",
    answers: [
      { text: "Sound the horn", correct: false },
      { text: "Use the mirrors", correct: true },
      { text: "Select a higher gear", correct: false },
      { text: "Flash your headlights", correct: false }
    ]
  },
  {
    question: "Driving towards a zebra crossing you see an elderly woman waiting to cross. What should you do?",
    answers: [
      { text: "Be prepared to stop", correct: true },
      { text: "Speed up", correct: false },
      { text: "Beep your horn to acknowlege her", correct: false },
      { text: "Flash your headlights at her and wave her to cross", correct: false }
    ]
  },
  {
    question: "When MUST you use dipped headlights during the day?",
    answers: [
      { text: "All the time", correct: false },
      { text: "Along narrow streets", correct: false },
      { text: "When parking", correct: false },
      { text: "In poor visibility", correct: true }
    ]
  },
  {
    question: "At toucan crossings, apart from pedestrians you should be aware of",
    answers: [
      { text: "Cyclists riding across", correct: true },
      { text: "Buses pulling out", correct: false },
      { text: "Emergency vehicles emerging", correct: false },
      { text: "Trams crossing in front", correct: false }
    ]
  },
  {
    question: "The safest place to park your vehicle at night is",
    answers: [
      { text: "On a drivway", correct: false },
      { text: "On a quiet side street", correct: false },
      { text: "In a garage", correct: true },
      { text: "In a carpark", correct: false }
    ]
  },
  {
    question: "It is very windy. You are behind a motorcyclist who is overtaking a high-sided vehicle. What should you do?",
    answers: [
      { text: "Keep close to the motorcyclist", correct: false },
      { text: "Stay level with the motorcyclist", correct: false },
      { text: "Keep well back", correct: true },
      { text: "Overtake the motorcyclist immediately", correct: false }
    ]
  },
  {
    question: "What is the main cause of skidding?",
    answers: [
      { text: "Driving too fast", correct: false },
      { text: "The driver", correct: true },
      { text: "Damaged brakes", correct: false },
      { text: "The weather", correct: false }
    ]
  },
  {
    question: "You think the driver in the vehicle in front has forgotten to cancel their right indicator. You should",
    answers: [
      { text: "Stay behind and not overtake", correct: true },
      { text: "Flash your lights to alert the driver", correct: false },
      { text: "Overtake on the left if there is room", correct: false },
      { text: "Sound your horn before overtaking", correct: false }
    ]
  },
  {
    question: "A cycle lane is marked by a solid white line. You must not drive or park in it",
    answers: [
      { text: "If a cyclist is using it", correct: false },
      { text: "During the rush hour", correct: false },
      { text: "During its period of operation", correct: true },
      { text: "At any time", correct: false }
    ]
  },
  {
    question: "How can you use the engine of your vehicle to control your speed?",
    answers: [
      { text: "By changing to a lower gear", correct: true },
      { text: "By changing to a higher gear", correct: false },
      { text: "By selecting neutral", correct: false },
      { text: "By selecting reverse gear", correct: false }
    ]
  },
  {
    question: "In good conditions, what is the typical stopping distance at 70 mph?",
    answers: [
      { text: "60 metres (197 feet)", correct: false },
      { text: "73 metres (240 feet)", correct: false },
      { text: "96 metres (315 feet)", correct: true },
      { text: "53 metres (175 feet)", correct: false }
    ]
  },
  {
    question: "How can you stop a caravan snaking from side to side?",
    answers: [
      { text: "Stop as quickly as you can", correct: false },
      { text: "Slow down very gradually", correct: true },
      { text: "Turn the steering wheel slowly to each side", correct: false },
      { text: "Accelerate to increase your speed", correct: false }
    ]
  },
  {
    question: "You are parking on a two-way road at night. The speed limit is 40 mph. You should park on the",
    answers: [
      { text: "Left with parking lights on", correct: true },
      { text: "Left with no lights on", correct: false },
      { text: "Right with parking lights on", correct: false },
      { text: "Right with dipped headlights on", correct: false }
    ]
  },
  {
    question: "Which vehicle may have to use a different course to normal at roundabouts?",
    answers: [
      { text: "Long vehicle", correct: true },
      { text: "Sports car", correct: false },
      { text: "Estate car", correct: false },
      { text: "Van", correct: false }
    ]
  },
  {
    question: "Car passengers MUST wear a seat belt if one is available, unless they are",
    answers: [
      { text: "Exempt for medical reasons", correct: true },
      { text: "In a vehicle fitted with airbags", correct: false },
      { text: "Travelling within a congestion charging zone", correct: false },
      { text: "Sitting in the rear seat", correct: false }
    ]
  },
  {
    question: "On a road where trams operate, which of these vehicles will be most at risk from tram rails?",
    answers: [
      { text: "Cycles", correct: true },
      { text: "Lorries", correct: false },
      { text: "Buses", correct: false },
      { text: "Cars", correct: false }
    ]
  },
  {
    question: "Road humps, chicanes, and road narrowings are",
    answers: [
      { text: "Traffic calming measures", correct: true },
      { text: "Always at major road works", correct: false },
      { text: "Used to increase traffic speed", correct: false },
      { text: "At toll-bridge approaches only", correct: false }
    ]
  },
  {
    question: "You are on a country road. What should you expect to see coming towards you on YOUR side of the road?",
    answers: [
      { text: "Horse riders", correct: false },
      { text: "Bicycles", correct: false },
      { text: "Pedestrians", correct: true },
      { text: "Motorcyclists", correct: false }
    ]
  },
  {
    question: "What is the national speed limit for cars and motorcycles when travelling in the right-hand lane of a motorway?",
    answers: [
      { text: "50 mph", correct: false },
      { text: "70 mph", correct: true },
      { text: "60 mph", correct: false },
      { text: "80 mph", correct: false }
    ]
  },
  {
    question: "You are turning right onto a dual carriageway. What should you do before emerging?",
    answers: [
      { text: "Check that the central reservation is wide enough for your vehicle", correct: true },
      { text: "Stop, apply the handbrake then select a low gear", correct: false },
      { text: "Position your vehicle well to the left of the side of the road", correct: false },
      { text: "Make sure that you leave enough room for a vehicle behind", correct: false }
    ]
  },
  {
    question: "When may you use hazard warning lights?",
    answers: [
      { text: "When you are being towed", correct: false },
      { text: "When you have broken down", correct: true },
      { text: "To park alongside another car", correct: false },
      { text: "To park on double yellow lines", correct: false }
    ]
  },
  {
    question: "To help prevent your vehicle's radio from being stolen you can",
    answers: [
      { text: "Install a security coded radio", correct: true },
      { text: "Install a cheap, no frills radio", correct: false },
      { text: "Park in a quiet area", correct: false },
      { text: "Park in a busy area", correct: false }
    ]
  },
  {
    question: "What is most likely to cause high fuel consumption?",
    answers: [
      { text: "Poor steering control", correct: false },
      { text: "Aggressive braking", correct: false },
      { text: "Driving above 50 mph", correct: true },
      { text: "Staying in high gears", correct: false }
    ]
  },
  {
    question: "An MOT certificate is normally valid for",
    answers: [
      { text: "One year after the date it was issued", correct: true },
      { text: "10,000 miles", correct: false },
      { text: "Three years after the date it was issued", correct: false },
      { text: "30,000 miles", correct: false }
    ]
  },
  {
    question: "Vehicle excise duty is often called 'Road Tax' or 'The Tax Disc'. You must",
    answers: [
      { text: "Keep it with your registration document", correct: false },
      { text: "Carry it on you at all times", correct: false },
      { text: "Keep it concealed safely in your vehicle", correct: false },
      { text: "Display it clearly on your vehicle", correct: true }
    ]
  },
  {
    question: "When travelling on ice braking distances can be",
    answers: [
      { text: "Twice as great than normal", correct: false },
      { text: "Seven times greater than normal", correct: false },
      { text: "Ten times greater than normal", correct: true },
      { text: "Eight times greater than normal", correct: false }
    ]
  },
  {
    question: "You are parking your car. You have some valuables, which you are unable to take with you. What should you do?",
    answers: [
      { text: "Lock then out of sight", correct: true },
      { text: "Park in an unlit side road", correct: false },
      { text: "Put them under the driver's seat", correct: false },
      { text: "Park near a police station", correct: false }
    ]
  },
  {
    question: "A provisional licence holder must not drive a motorcar",
    answers: [
      { text: "Alone", correct: true },
      { text: "With passengers in the back", correct: false },
      { text: "On a dual carriageway", correct: false },
      { text: "At night", correct: false }
    ]
  },
  {
    question: "When should you use front fog lights?",
    answers: [
      { text: "When visibility is reduced to 100 metres or less", correct: true },
      { text: "After dusk", correct: false },
      { text: "When overtaking at night", correct: false },
      { text: "When visibilty is reduced to 150 metres or less", correct: false }
    ]
  },
  {
    question: "Planning your journey to avoid busy times has a number of advantages. One of these is",
    answers: [
      { text: "Your journey will take longer", correct: false },
      { text: "Your stress levels will be greater", correct: false },
      { text: "You will have a more pleasant journey", correct: true },
      { text: "You will cause more pollution", correct: false }
    ]
  },
  {
    question: "What is the nearest you can park your vehicle to a junction?",
    answers: [
      { text: "22 metres", correct: false },
      { text: "15 metres", correct: false },
      { text: "20 metres", correct: false },
      { text: "10 metres", correct: true }
    ]
  },
  {
    question: "The road is icy. You should drive slowly",
    answers: [
      { text: "In the highest gear possible", correct: true },
      { text: "In the lowest gear possible", correct: false },
      { text: "With your left foot on the brake", correct: false },
      { text: "With the handbrake partly on", correct: false }
    ]
  },
  {
    question: "You are approaching a crossroads. The traffic lights have failed. What should you do?",
    answers: [
      { text: "Brake and stop only for large vehicles", correct: false },
      { text: "Be prepared to stop for any traffic", correct: true },
      { text: "Brake sharply to a stop before looking", correct: false },
      { text: "Be prepared to brake sharply to a stop", correct: false }
    ]
  },
  {
    question: "How should you correct a rear wheel skid?",
    answers: [
      { text: "Brake hard and not steer at all", correct: false },
      { text: " Remove your hand's from the steering wheel and let the vehicle steer itself", correct: false },
      { text: "Steer into it", correct: true },
      { text: "Steer away from it", correct: false }
    ]
  },
  {
    question: "You are waiting to emerge from a minor road. A large vehicle is approaching from the right. You have time to turn, but you should wait. Why?",
    answers: [
      { text: "The large vehicle can easily hide vehicles from the left", correct: false },
      { text: "The large vehicle can easily hide an overtaking vehicle", correct: true },
      { text: "The large vehicle is difficult to steer in a straight line", correct: false },
      { text: "The large vehicle can turn suddenly", correct: false }
    ]
  },
  {
    question: "You are travelling along the left-hand lane of a three-lane motorway. Traffic is joining from a slip road. You should",
    answers: [
      { text: "Maintain a steady speed", correct: false },
      { text: "Move to another lane", correct: true },
      { text: "Switch on your hazard lights", correct: false },
      { text: "Race the other vehicles", correct: false }
    ]
  },
  {
    question: "You are signalling to turn right in busy traffic. How would you confirm your intention safely?",
    answers: [
      { text: "Give an arm signal", correct: true },
      { text: "Sound the horn", correct: false },
      { text: "Position over the centre line", correct: false },
      { text: "Flash your headlights", correct: false }
    ]
  },
  {
    question: "The fluid level in your battery is low. What should you top it up with?",
    answers: [
      { text: "Engine oil", correct: false },
      { text: "Engine coolant", correct: false },
      { text: "Distilled water", correct: true },
      { text: "Battery acid", correct: false }
    ]
  },
  {
    question: "A pedestrian with a white stick and red band is",
    answers: [
      { text: "Blind only", correct: false },
      { text: "Deaf and dumb", correct: false },
      { text: "Deaf and blind", correct: true },
      { text: "Over 65 years old", correct: false }
    ]
  },
  {
    question: "At which type of crossing are cyclists allowed to ride across with pedestrians?",
    answers: [
      { text: "Puffin", correct: false },
      { text: "Zebra", correct: false },
      { text: "Toucan", correct: true },
      { text: "Pelican", correct: false }
    ]
  },
  {
    question: "At an incident it is important to look after any casualties. When the area is safe you should",
    answers: [
      { text: "Give them a drink", correct: false },
      { text: "Get them out of the vehicle", correct: false },
      { text: "Keep them in the vehicle", correct: true },
      { text: "Give them something to eat", correct: false }
    ]
  },
  {
    question: "When you apply to renew your vehicle Excise Duty (tax disc) you must have",
    answers: [
      { text: "The handbook", correct: false },
      { text: "Valid insurance", correct: true },
      { text: "A valid driving licence", correct: false },
      { text: "The old tax disc", correct: false }
    ]
  },
  {
    question: "In front of you is a class 3 powered vehicle (powered wheeled) driven by a disabled person. These vehicles have a maximum speed of",
    answers: [
      { text: "18 mph (29 km/h)", correct: false },
      { text: "38 mph (61 km/h)", correct: false },
      { text: "28 mph (45 km/h)", correct: false },
      { text: "8 mph (12 km/h)", correct: true }
    ]
  },
  {
    question: "In which place must you NOT park?",
    answers: [
      { text: "In a country lane", correct: false },
      { text: "At a bus stop", correct: true },
      { text: "In a one-way street", correct: false },
      { text: "Near a police station", correct: false }
    ]
  },
  {
    question: "Overloading your vehicle can seriously affect?",
    answers: [
      { text: "The steering", correct: true },
      { text: "Your comfort", correct: false },
      { text: "The Handling", correct: false },
      { text: "Your ability to change gears", correct: false }
    ]
  },
  {
    question: "You should never reverse",
    answers: [
      { text: "At night", correct: false },
      { text: "Into a side road", correct: false },
      { text: "For longer than necessary", correct: true },
      { text: "On a main road", correct: false }
    ]
  },
  {
    question: "At which pedestrian crossings are cyclists permitted to cross?",
    answers: [
      { text: "Pelican", correct: false },
      { text: "Puffin", correct: false },
      { text: "Zebra", correct: false },
      { text: "Toucan", correct: true }
    ]
  },
  {
    question: "You are following a vehicle on a wet road. You should leave a time gap of at least",
    answers: [
      { text: "One second", correct: false },
      { text: "Two seconds", correct: false },
      { text: "Three seconds", correct: false },
      { text: "Four seconds", correct: true }
    ]
  },
  {
    question: "In freezing conditions you should expect stopping distances to increase by up to",
    answers: [
      { text: "Five times", correct: false },
      { text: "Seven times", correct: false },
      { text: "Four times", correct: false },
      { text: "Ten times", correct: true }
    ]
  },
  {
    question: "The reaction time of most drivers is over?",
    answers: [
      { text: "2 seconds", correct: false },
      { text: "3 seconds", correct: false },
      { text: "0.5 second", correct: true },
      { text: "1 second", correct: false }
    ]
  },
  {
    question: "It is illegal to drive with tyres that -",
    answers: [
      { text: "Are of different makes", correct: false },
      { text: "Have a large, deep cut in the sidewall", correct: true },
      { text: "Were bought second-hand", correct: false },
      { text: "Are more than three years old", correct: false }
    ]
  },
  {
    question: "You are away from home and have to park your vehicle overnight. Where should you leave it?",
    answers: [
      { text: "Opposite another parked vehicle", correct: false },
      { text: "Opposite a traffic island", correct: false },
      { text: "In a secure car park", correct: true },
      { text: "In a quiet road", correct: false }
    ]
  },
  {
    question: "When following a vehicle on a wet road you should leave a time gap of at least?",
    answers: [
      { text: "1 second", correct: false },
      { text: "3 seconds", correct: false },
      { text: "2 seconds", correct: false },
      { text: "4 seconds", correct: true }
    ]
  },
  {
    question: "You are parked in a busy high street. What is the safest way to turn your vehicle around so you can go the opposite way?",
    answers: [
      { text: "Do a U-turn", correct: false },
      { text: "Find a quiet side road to turn around in", correct: true },
      { text: "Get someone to stop the traffic", correct: false },
      { text: "Drive into a side road and reverse into the main road", correct: false }
    ]
  },
  {
    question: "When being followed by an ambulance showing a flashing blue beacon you should",
    answers: [
      { text: "Maintain your speed and course", correct: false },
      { text: "Pull over as soon as safely possible to let it pass", correct: true },
      { text: "Accelerate hard to get away from it", correct: false },
      { text: "Brake harshly and immediately stop in the road", correct: false }
    ]
  },
  {
    question: "A driver has had a few alcoholic drinks, what advice should you give them?",
    answers: [
      { text: "Drink several cups of coffee before driving home", correct: false },
      { text: "Take a short sleep before driving home", correct: false },
      { text: "Do not drive home", correct: true },
      { text: "Take extra care when driving home", correct: false }
    ]
  },
  {
    question: "Whilst driving, the fog clears and you can see more clearly. You must remember to",
    answers: [
      { text: "Close any open windows", correct: false },
      { text: "Reduce your speed", correct: false },
      { text: "Switch off the fog lights", correct: true },
      { text: "Switch off the demister", correct: false }
    ]
  },
  {
    question: "A flashing green beacon on a vehicle means",
    answers: [
      { text: "Road safety patrol operating", correct: false },
      { text: "Doctor on an emergency call", correct: true },
      { text: "Gritting in progress", correct: false },
      { text: "Police on non-urgent duties", correct: false }
    ]
  },
  {
    question: "A long, heavily laden lorry is taking a long time to overtake you. What should you do?",
    answers: [
      { text: "Slow down", correct: true },
      { text: "Speed up", correct: false },
      { text: "Hold you speed", correct: false },
      { text: "Change direction", correct: false }
    ]
  },
  {
    question: "You MUST obey signs giving orders. These signs are mostly in",
    answers: [
      { text: "Green rectangles", correct: false },
      { text: "Red Triangles", correct: false },
      { text: "Red circles", correct: true },
      { text: "Blue rectangles", correct: false }
    ]
  },
  {
    question: "On a three-lane motorway which lane should you normally use?",
    answers: [
      { text: "Right", correct: false },
      { text: "Centre", correct: false },
      { text: "Either the right or centre", correct: false },
      { text: "Left", correct: true }
    ]
  },
  {
    question: "You see a vehicle coming towards you on a single-track road. You should",
    answers: [
      { text: "Put on your hazard warning lights", correct: false },
      { text: "Stop at a passing place", correct: true },
      { text: "Do an emergency stop", correct: false },
      { text: "Go back to the main road", correct: false }
    ]
  },
  {
    question: "Why should you always reduce your speed when travelling in fog?",
    answers: [
      { text: "The brakes do not work as well", correct: false },
      { text: "You will be dazzled by oncoming headlights", correct: false },
      { text: "The engine will take longer to warm up", correct: false },
      { text: "It is more difficult to see events ahead", correct: true }
    ]
  },
  {
    question: "The national speed limit for cars and motorcycles on a single carriageway road is",
    answers: [
      { text: "40 mph", correct: false },
      { text: "50 mph", correct: false },
      { text: "60 mph", correct: true },
      { text: "30 mph", correct: false }
    ]
  },
  {
    question: "A basic rule on motorways is",
    answers: [
      { text: "Try to keep above 50 mph to prevent congestion", correct: false },
      { text: "Use the lane that has least traffic", correct: false },
      { text: "Keep to the left hand-lane unless overtaking", correct: true },
      { text: "Overtake on the side that is clearest", correct: false }
    ]
  },
  {
    question: "You go to a social event and need to drive a short time afterwards. What precaution should you take?",
    answers: [
      { text: "Drink plenty of milk before drinking alcohol", correct: false },
      { text: "Drink plenty of coffee after drinking alcohol", correct: false },
      { text: "Avoid drinking alcohol completely", correct: true },
      { text: "Avoid drinking alcohol on an empty stomach", correct: false }
    ]
  },
  {
    question: "You turn into a side road. Pedestrians have started to cross the road. You should",
    answers: [
      { text: "Drive around them", correct: false },
      { text: "Proceed regardless", correct: false },
      { text: "Give way to them", correct: true },
      { text: "Flash your lights and wave them across", correct: false }
    ]
  },
  {
    question: "At a puffin crossing which light won't you see?",
    answers: [
      { text: "Green", correct: false },
      { text: "Red", correct: false },
      { text: "Flashing amber", correct: true },
      { text: "Steady amber", correct: false }
    ]
  },
  {
    question: "When emerging from junctions, which is most likely to obstruct your view?",
    answers: [
      { text: "Steering wheel", correct: false },
      { text: "Windscreen pillars", correct: true },
      { text: "Windscreen wipers", correct: false },
      { text: "Interior mirror", correct: false }
    ]
  },
  {
    question: "Before you make a U-turn in the road, you should",
    answers: [
      { text: "Look over your shoulder for a final check", correct: true },
      { text: "Give an arm signal as well as using your indicators", correct: false },
      { text: "Signal so that other drivers can slow down for you", correct: false },
      { text: "Select a higher gear than normal", correct: false }
    ]
  },
  {
    question: "You are approaching two cyclists. They approach a roundabout in the left-hand lane. In which direction should you expect the cyclists to go?",
    answers: [
      { text: "Any direction", correct: true },
      { text: "Right", correct: false },
      { text: "Straight ahead", correct: false },
      { text: "Left", correct: false }
    ]
  },
  {
    question: "You are in a line of traffic. The driver behind you is following very closely. What action should you take?",
    answers: [
      { text: "Move over to a position just left of the centre line of the road", correct: false },
      { text: "Signal left and wave the following driver past", correct: false },
      { text: "Slow down, gradually increasing the gap between you and the vehicle in front", correct: true },
      { text: "Ignore the following driver and continue to travel within the speed limit", correct: false }
    ]
  },
  {
    question: "Why are mirrors often slightly curved (convex)?",
    answers: [
      { text: "They make following traffic look bigger", correct: false },
      { text: "They totally cover blind spots", correct: false },
      { text: "They give a wider field of vision", correct: true },
      { text: "They make it easier to judge the speed of following traffic", correct: false }
    ]
  },
  {
    question: "You are on a dual carriageway. Ahead you see a vehicle with an amber flashing light. What could this be?",
    answers: [
      { text: "A doctor on call", correct: false },
      { text: "A disabled person`s vehicle", correct: true },
      { text: "An ambulance", correct: false },
      { text: "A fire engine", correct: false }
    ]
  },
  {
    question: "The main purpose of a box junction is",
    answers: [
      { text: "To stop you turning right at a crossroads", correct: false },
      { text: "To slow traffic down", correct: false },
      { text: "To speed traffic up", correct: false },
      { text: "To prevent junctions becoming blocked by queuing traffic", correct: true }
    ]
  },
  {
    question: "Which of the following types of glasses should NOT be worn when driving at night?",
    answers: [
      { text: "Tinted", correct: true },
      { text: "Bi-focal", correct: false },
      { text: "Half-moon", correct: false },
      { text: "Round", correct: false }
    ]
  },
  {
    question: "The most important reason for having a properly adjusted head restraint is to",
    answers: [
      { text: "Make you more comfortable", correct: false },
      { text: "Help you to avoid neck injury", correct: true },
      { text: "Help you to relax", correct: false },
      { text: "Help you to maintain your driving position", correct: false }
    ]
  },
  {
    question: "You stop for pedestrians waiting to cross at a zebra crossing. They do not start to cross. What should you do?",
    answers: [
      { text: "Sound your horn", correct: false },
      { text: "Be patient and wait", correct: true },
      { text: "Carry on", correct: false },
      { text: "Wave then to cross", correct: false }
    ]
  },
  {
    question: "Immediately after joining a motorway you should:",
    answers: [
      { text: "Move to the right hand lane", correct: false },
      { text: "Try to overtake", correct: false },
      { text: "Move to the centre lane", correct: false },
      { text: "Keep in the left lane to get used to the speed", correct: true }
    ]
  },
  {
    question: "You are in a one-way street and want to turn right. You should position yourself",
    answers: [
      { text: "In the right-hand lane", correct: true },
      { text: "In either lane, depending on the traffic", correct: false },
      { text: "In the left-hand lane", correct: false },
      { text: "Just left of the centre line", correct: false }
    ]
  },
  {
    question: "A casualty is not breathing normally. At what rate should chest compressions should be given?",
    answers: [
      { text: "50 per minute", correct: false },
      { text: "200 per minute", correct: false },
      { text: "100 per minute", correct: true },
      { text: "250 per minute", correct: false }
    ]
  },
  {
    question: "After passing your driving test, you suffer from ill health. This affects your driving. You MUST",
    answers: [
      { text: "Always drive accompanied", correct: false },
      { text: "Inform the licensing authority", correct: true },
      { text: "Avoid using motorways", correct: false },
      { text: "Inform your local police station", correct: false }
    ]
  },
  {
    question: "There is a police car following you. The police officer flashes the headlights and points to the left. What should you do?",
    answers: [
      { text: "Turn left at the next junction", correct: false },
      { text: "Move over to the left", correct: false },
      { text: "Pull up on the left", correct: true },
      { text: "Stop immediately", correct: false }
    ]
  },
  {
    question: "Whilst driving you have an accident in which someone is injured. You must report this to the police within",
    answers: [
      { text: "24 hours", correct: true },
      { text: "36 hours", correct: false },
      { text: "12 hours", correct: false },
      { text: "7 days", correct: false }
    ]
  },
  {
    question: "A newly qualified driver must",
    answers: [
      { text: "Be accompanied on a motorway", correct: false },
      { text: "Have valid motor insurance", correct: true },
      { text: "Display green L-Plates", correct: false },
      { text: "Not exceed 40 mph for 12 months", correct: false }
    ]
  },
  {
    question: "When going straight ahead at a roundabout you should",
    answers: [
      { text: "Indicate left when approaching the roundabout", correct: false },
      { text: "Indicate right when approaching the roundabout", correct: false },
      { text: "Indicate left before leaving the roundabout", correct: true },
      { text: "Not indicate at any time", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT allowed to travel in the right-hand lane of a three-lane motorway?",
    answers: [
      { text: "A motorcycle", correct: false },
      { text: "A mini bus", correct: false },
      { text: "An estate car", correct: false },
      { text: "A vehicle towing a trailor", correct: true }
    ]
  },
  {
    question: "For a driver, what doe the term Blind Spot mean?",
    answers: [
      { text: "An area immediately behind the car", correct: false },
      { text: "The area covered by the rear view mirror", correct: false },
      { text: "An area not seen in your mirrors", correct: true },
      { text: "The area covered by your left mirror", correct: false }
    ]
  },
  {
    question: "You are following a learner driver who stalls at a junction. You should",
    answers: [
      { text: "Be patient as you expect them to make mistakes", correct: true },
      { text: "Start to rev your engine if they take too long to restart", correct: false },
      { text: "Stay very close behind and flash your headlights", correct: false },
      { text: "Immediately steer around them and drive on", correct: false }
    ]
  },
  {
    question: "Some two-way roads are divided into three lanes. Why are these particularly dangerous?",
    answers: [
      { text: "Traffic can travel faster in poor weather conditions", correct: false },
      { text: "Traffic in both directions can use the middle lane to overtake", correct: true },
      { text: "Traffic uses the middle lane for emergencies only", correct: false },
      { text: "Traffic can overtake on the left", correct: false }
    ]
  },
  {
    question: "Unbalanced wheels on a car may cause",
    answers: [
      { text: "The tyres to wear out", correct: false },
      { text: "The steering to vibrate", correct: true },
      { text: "Poor acceleration", correct: false },
      { text: "Poor braking", correct: false }
    ]
  },
  {
    question: "Before starting a journey it is wise to plan your route. How can you do this?",
    answers: [
      { text: "Look in your vehicle handbook", correct: false },
      { text: "Contact your local garage", correct: false },
      { text: "Check your vehicle registration document", correct: false },
      { text: "Look at a map", correct: true }
    ]
  },
  {
    question: "Which type of crossing can detect when people are on them?",
    answers: [
      { text: "Toucan", correct: false },
      { text: "Puffin", correct: true },
      { text: "Pelican", correct: false },
      { text: "Zebra", correct: false }
    ]
  },
  {
    question: "You will use more fuel if your tyres are",
    answers: [
      { text: "Over-inflated", correct: false },
      { text: "New and hardly used", correct: false },
      { text: "Under-inflated", correct: true },
      { text: "Of different makes", correct: false }
    ]
  },
  {
    question: "How should you react to drivers who appear to be inexperienced?",
    answers: [
      { text: "Sound your horn and warn them of your presence", correct: false },
      { text: "Flash your headlights to indicate that it is safe for them to proceed", correct: false },
      { text: "Be patient and prepare for them to react more slowly", correct: true },
      { text: "Overtake them as soon as possible", correct: false }
    ]
  },
  {
    question: "You have too much oil in your engine. What could this cause?",
    answers: [
      { text: "Engine overheating", correct: false },
      { text: "Chain wear", correct: false },
      { text: "Oil leaks", correct: true },
      { text: "Low oil pressure", correct: false }
    ]
  },
  {
    question: "When correcting a rear-wheel skid you should",
    answers: [
      { text: "Brake sharply", correct: false },
      { text: "roll with it", correct: false },
      { text: "Steer into the skid", correct: true },
      { text: "Steer away from the skid", correct: false }
    ]
  },
  {
    question: "At the scene of an accident you have to treat someone for shock. What should you do?",
    answers: [
      { text: "Keep reassuring them until qualified help arrives", correct: true },
      { text: "Give them liquids to drink", correct: false },
      { text: "Sing to them", correct: false },
      { text: "Try and cool them down", correct: false }
    ]
  },
  {
    question: "You have driven through a flood. What is the first thing you should do?",
    answers: [
      { text: "Check your exhaust", correct: false },
      { text: "Stop and dry the brakes", correct: false },
      { text: "Test your brakes", correct: true },
      { text: "Stop and check the tyres", correct: false }
    ]
  },
  {
    question: "At what age does a car need its first MOT certificate?",
    answers: [
      { text: "3 years old", correct: true },
      { text: "2 years old", correct: false },
      { text: "5 years old", correct: false },
      { text: "4 years old", correct: false }
    ]
  },
  {
    question: "A driver's behaviour has upset you. It may help if you",
    answers: [
      { text: "Gesture to them with your hand", correct: false },
      { text: "Shout abusive language", correct: false },
      { text: "Follow their car, flashing your headlights", correct: false },
      { text: "Stop and take a break", correct: true }
    ]
  },
  {
    question: "At a pelican crossing the flashing amber light means you MUST",
    answers: [
      { text: "Give way to pedestrians already on the crossing", correct: true },
      { text: "Stop and wait for the red light", correct: false },
      { text: "Stop and wait for the green light", correct: false },
      { text: "Give way to pedestrians waiting to cross", correct: false }
    ]
  },
  {
    question: "Your vehicle has broken down on an automatic railway level crossing. What should you do FIRST?",
    answers: [
      { text: "Try to push the vehicle clear of the crossing as soon as possible", correct: false },
      { text: "Walk along the track to give warning to any approaching trains", correct: false },
      { text: "Get everyone out of the vehicle and clear of the crossing", correct: true },
      { text: "Telephone your vehicle recovery service to move it", correct: false }
    ]
  },
  {
    question: "'Red Routes' in major cities have been introduced to",
    answers: [
      { text: "Help the traffic flow", correct: true },
      { text: "Allow lorries to load more freely", correct: false },
      { text: "Raise the speed limits", correct: false },
      { text: "Provide better parking", correct: false }
    ]
  },
  {
    question: "A strong cross wind is least likely to affect which of these vehicles?",
    answers: [
      { text: "High-sided vehicles", correct: false },
      { text: "Cyclists", correct: false },
      { text: "Cars", correct: true },
      { text: "Motorcycles", correct: false }
    ]
  },
  {
    question: "The right hand lane on a three-lane motorway is used for",
    answers: [
      { text: "Overtaking", correct: true },
      { text: "Crusing at low speeds", correct: false },
      { text: "High-sided vehicles", correct: false },
      { text: "Crusing at high speeds", correct: false }
    ]
  },
  {
    question: "You are driving past parked cars. You notice a bicycle wheel sticking out between them. What should you do?",
    answers: [
      { text: "Accelerate past quickly and sound your horn", correct: false },
      { text: "Slow down and be prepared to stop for a cyclist", correct: true },
      { text: "Slow down and wave the cyclist across", correct: false },
      { text: "Brake sharply and flash your headlights", correct: false }
    ]
  },
  {
    question: "When driving down a steep hill what should you do in order to control your speed?",
    answers: [
      { text: "Select neural and let the car freewheel down the hill", correct: false },
      { text: "Select a high gear and use the brakes carefully", correct: false },
      { text: "Activate cruise control", correct: false },
      { text: "Select a low gear and use the brakes carefully", correct: true }
    ]
  },
  {
    question: "You may remove your seatbelt when carrying out a manoeuvre that involves",
    answers: [
      { text: "A hill start", correct: false },
      { text: "Reversing", correct: true },
      { text: "Driving slowly", correct: false },
      { text: "An emergency stop", correct: false }
    ]
  },
  {
    question: "You see a pedestrian with a white stick and red band. This means that the person is",
    answers: [
      { text: "Deaf and blind", correct: true },
      { text: "Deaf only", correct: false },
      { text: "Blind only", correct: false },
      { text: "Physically disabled", correct: false }
    ]
  },
  {
    question: "It is essential that tyre pressures be checked regularly. When should this be done?",
    answers: [
      { text: "After travelling at high speed", correct: false },
      { text: "After any length journey", correct: false },
      { text: "When tyres are hot", correct: false },
      { text: "When tyres are cold", correct: true }
    ]
  },
  {
    question: "Which of these is LEAST likely to be affected by crosswinds?",
    answers: [
      { text: "Cars", correct: true },
      { text: "High-sided vehicles", correct: false },
      { text: "Cyclists", correct: false },
      { text: "Motorcyclists", correct: false }
    ]
  },
  {
    question: "To drive on the road learners MUST",
    answers: [
      { text: "Have no penalty points on their licence", correct: false },
      { text: "Have a signed, valid provisional licence", correct: true },
      { text: "Have taken professional instruction", correct: false },
      { text: "Apply for a driving test within 12 months", correct: false }
    ]
  },
  {
    question: "Using rear fog lights in clear daylight will",
    answers: [
      { text: "Make following drivers keep back", correct: false },
      { text: "Give extra protection", correct: false },
      { text: "Be useful when towing a trailer", correct: false },
      { text: "Dazzle other drivers", correct: true }
    ]
  },
  {
    question: "You are taking drugs that are likely to affect you driving. What should you do?",
    answers: [
      { text: "Only drive if accompanied by a full licence holder", correct: false },
      { text: "Drive only for short distances", correct: false },
      { text: "Limit your driving to essential journeys", correct: false },
      { text: "Seek medical advice before driving", correct: true }
    ]
  },
  {
    question: "Signals are normally given by direction indicators and",
    answers: [
      { text: "Brake lights", correct: true },
      { text: "Sidelights", correct: false },
      { text: "Interior lights", correct: false },
      { text: "Fog lights", correct: false }
    ]
  },
  {
    question: "Coasting your vehicle whilst driving will..",
    answers: [
      { text: "Decrease the control you have over the vehicle", correct: true },
      { text: "Increase the control you have over the vehicle", correct: false },
      { text: "Reduce the vehicle's braking distance", correct: false },
      { text: "Make the car use more fuel", correct: false }
    ]
  },
  {
    question: "When should you especially check the engine oil level?",
    answers: [
      { text: "Every 5000 miles", correct: false },
      { text: "Before starting a long journey", correct: true },
      { text: "Before an MOT test", correct: false },
      { text: "On a cold morning", correct: false }
    ]
  },
  {
    question: "What is the national speed limit for towing a trailor on a motorway?",
    answers: [
      { text: "40 mph", correct: false },
      { text: "50 mph", correct: false },
      { text: "60 mph", correct: true },
      { text: "70 mph", correct: false }
    ]
  },
  {
    question: "At a crossroads there are no signs or road markings. Two vehicles approach. Which has priority?",
    answers: [
      { text: "Oncoming vehicles turning right", correct: false },
      { text: "Neither of the vehicles", correct: true },
      { text: "The vehicle travelling the fastest", correct: false },
      { text: "Vehicles approaching from the right", correct: false }
    ]
  },
  {
    question: "Motorcyclists are particularly vulnerable",
    answers: [
      { text: "On dual carriageways", correct: false },
      { text: "On motorways", correct: false },
      { text: "When moving off", correct: false },
      { text: "When approaching junctions", correct: true }
    ]
  },
  {
    question: "At a puffin crossing, which colour follows the green signal?",
    answers: [
      { text: "Flashing amber", correct: false },
      { text: "Flashing green", correct: false },
      { text: "Steady red", correct: false },
      { text: "Steady amber", correct: true }
    ]
  },
  {
    question: "Your anti-lock brakes warning light stays on. What should you do?",
    answers: [
      { text: "Check the handbrake is working", correct: false },
      { text: "Perform an emergency stop", correct: false },
      { text: "Have the brakes checked immediately", correct: true },
      { text: "Check the brake fluid level", correct: false }
    ]
  }
]

const questionsOtherTypes = [
  {
    question: "When about to overtake a long vehicle or lorry you should:",
    answers: [
      { text: "Drive close to the lorry in order to pass more quickly", correct: false },
      { text: "Stay well back from the lorry to obtain a better view", correct: true },
      { text: "Sound the horn to warn the driver that you are there", correct: false },
      { text: "Flash your lights and wait for the driver to signal when it is safe", correct: false }
    ]
  },
  {
    question: "You are driving behind a long vehicle. It approaches a crossroads and signals left, but moves out to the right. You should:-",
    answers: [
      { text: "Assume the signal is wrong and it is really turning right", correct: false },
      { text: "Overtake as it starts to slow down", correct: false },
      { text: "Get closer in order to pass it quickly", correct: false },
      { text: "Stay well back and give it room", correct: true }
    ]
  },
  {
    question: "You are driving behind a large articulated vehicle (trailer). It is going to turn left into a narrow road. What action should it take?",
    answers: [
      { text: "Pass on the left as the vehicle moves out", correct: false },
      { text: "Move out and overtake on the offside", correct: false },
      { text: "Be prepared to stop behind it", correct: true },
      { text: "Overtake quickly before the lorry moves out", correct: false }
    ]
  },
  {
    question: "What does tailgating mean?",
    answers: [
      { text: "When a driver is following another vehicle too closely", correct: true },
      { text: "When stationary vehicles are too close in a queue", correct: false },
      { text: "When a vehicle is with its back doors open", correct: false },
      { text: "When a vehicle delivering goods has its tailgate down", correct: false }
    ]
  },
  {
    question: "You are following a large lorry on a wet road. Spray makes it difficult to see. You should:",
    answers: [
      { text: "Keep close to the lorry, away from the spray", correct: false },
      { text: "Speed up and overtake quickly", correct: false },
      { text: "Drop back until you can see better", correct: true },
      { text: "Put your headlights on full beam", correct: false }
    ]
  },
  {
    question: "You are driving downhill. There is a car parked on the other side of the road partly blocking the road. Large, slow lorries are coming towards you. You should:",
    answers: [
      { text: "Keep going because you have the right of way", correct: false },
      { text: "Slow down and give way", correct: true },
      { text: "Speed up and get past quickly", correct: false },
      { text: "Pull over on the right behind the parked car", correct: false }
    ]
  },
  {
    question: "Which of these vehicles is LEAST likely to be affected by strong crosswinds?",
    answers: [
      { text: "Cyclists", correct: false },
      { text: "Cars", correct: true },
      { text: "Motorcyclists", correct: false },
      { text: "High-sided vehicles", correct: false }
    ]
  },
  {
    question: "It is very windy. You are behind a motorcyclist who is overtaking a high vehicle. What should you do?",
    answers: [
      { text: "Stay level with the motorcycle", correct: false },
      { text: "Keep well back", correct: true },
      { text: "Overtake the motorcyclist immediately", correct: false },
      { text: "Keep close to the motorcyclist", correct: false }
    ]
  },
  {
    question: "You are approaching a small roundabout. The long vehicle in front is signaling left but is positioned over to the right. You should:",
    answers: [
      { text: "Sound your horn", correct: false },
      { text: "Follow the same course as the lorry", correct: false },
      { text: "Keep well back", correct: true },
      { text: "Overtake on the left", correct: false }
    ]
  },
  {
    question: "Why is passing or overtaking a lorry more risky than passing a car?",
    answers: [
      { text: "Lorries may suddenly pull up", correct: false },
      { text: "Lorries climb hills more slowly", correct: false },
      { text: "The brakes of lorries are not as good", correct: false },
      { text: "Lorries are longer than cars", correct: true }
    ]
  },
  {
    question: "Before overtaking a large vehicle or lorry you should keep well back. Why is this?",
    answers: [
      { text: "To give acceleration space to overtake quickly on blind bends", correct: false },
      { text: "To offer other drivers a safe gap if they want to overtake you", correct: false },
      { text: "To leave a gap in case stops and rolls back", correct: false },
      { text: "To get the best view of the road ahead", correct: true }
    ]
  },
  {
    question: "You are driving on a dual-carriageway with surface spray. You should:",
    answers: [
      { text: "Your sidelights", correct: false },
      { text: "Your rear fog lights", correct: false },
      { text: "Your dipped headlights", correct: true },
      { text: "Your hazard flashers", correct: false }
    ]
  },
  {
    question: "You wish to overtake a long, slow moving vehicle or lorry on a busy road with oncoming traffic. You should:",
    answers: [
      { text: "Follow it closely and keep moving out to see the road ahead", correct: false },
      { text: "Keep well back until you can see that it is clear", correct: true },
      { text: "Flash your headlights for the oncoming traffic to give way", correct: false },
      { text: "Stay behind until the driver waves you past", correct: false }
    ]
  },
  {
    question: "It is very blustery and windy. You are about to overtake a motorcyclist. You should:",
    answers: [
      { text: "Sound your horn", correct: false },
      { text: "Allow extra room", correct: true },
      { text: "Overtake slowly", correct: false },
      { text: "Keep close as you pass", correct: false }
    ]
  },
  {
    question: "When you approach a bus that is about to move off from a bus stop you should:",
    answers: [
      { text: "Signal left and wave the bus on", correct: false },
      { text: "Allow it to pull away, if it is safe to do so", correct: true },
      { text: "Flash your headlights as you approach", correct: false },
      { text: "Get past before it moves", correct: false }
    ]
  },
  {
    question: "The road is wet and slippery. Why might a motorcyclist steer round drain covers on a bend?",
    answers: [
      { text: "To avoid puncturing the tyres on the edge of the drain covers", correct: false },
      { text: "To help judge the bend using the drain covers as marker points", correct: false },
      { text: "To prevent the motorcycle sliding on the metal drain covers", correct: true },
      { text: "To avoid splashing pedestrians on the pavements", correct: false }
    ]
  },
  {
    question: "You are waiting to emerge left from a minor road. A large vehicle is approaching from the right. You have time to turn, but you should wait. Why?",
    answers: [
      { text: "The large vehicle can turn suddenly", correct: false },
      { text: "The large vehicle can easily hide vehicles from the left", correct: false },
      { text: "The large vehicle is difficult to steer in a straight line", correct: false },
      { text: "The large vehicle can easily hide an overtaking vehicle", correct: true }
    ]
  },
  {
    question: "You keep well back while waiting to overtake a large lorry. Another car fills the gap. You should:",
    answers: [
      { text: "Sound your horn", correct: false },
      { text: "Flash your headlights", correct: false },
      { text: "Drop back further", correct: true },
      { text: "Start to overtake", correct: false }
    ]
  },
  {
    question: "You are driving behind a long vehicle approaching a crossroads. The driver signals right but moves close to the left-hand kerb. What should you do?",
    answers: [
      { text: "Overtake on the righthand side", correct: false },
      { text: "Report the driver to the police", correct: false },
      { text: "Warn the driver of the wrong signal", correct: false },
      { text: "Wait behind the long vehicle", correct: true }
    ]
  }
]
const questionsRoadAndTraffic = [
  {
    question: "What shape is a STOP sign?",
    answers: [
      { text: "Triangular", correct: false },
      { text: "Circular", correct: false },
      { text: "Octagonal", correct: true },
      { text: "Square", correct: false }
    ]
  },
  {
    question: "At a mini-roundabout you should:",
    answers: [
      { text: "Give way to traffic from the right", correct: true },
      { text: "Give way to traffic from the left", correct: false },
      { text: "Give way to traffic from the other way", correct: false },
      { text: "Stop even when clear", correct: false }
    ]
  },
  {
    question: "You are approaching a red traffic light. The signal will change from red to:",
    answers: [
      { text: "Green, then amber", correct: false },
      { text: "Amber, then green", correct: false },
      { text: "Red and amber, then green", correct: true },
      { text: "Green and amber, then green", correct: false }
    ]
  },
  {
    question: "You MUST obey signs giving orders. These signs are mostly in:",
    answers: [
      { text: "Red circles", correct: true },
      { text: "Red triangles", correct: false },
      { text: "Blue rectangles", correct: false },
      { text: "Green rectangles", correct: false }
    ]
  },
  {
    question: "You see a traffic light with a steady amber light ahead. Which light(s) will come on next?",
    answers: [
      { text: "Green alone", correct: false },
      { text: "Green and amber together", correct: false },
      { text: "Red alone", correct: true },
      { text: "Red and amber together", correct: false }
    ]
  },
  {
    question: "What does a circular traffic sign with a blue background do?",
    answers: [
      { text: "Give motorway information", correct: false },
      { text: "Give directions to a car park", correct: false },
      { text: "Give an instruction", correct: true },
      { text: "Give warning of a motorway ahead", correct: false }
    ]
  },
  {
    question: "Why should you make sure that you have cancelled your indicators after turning?",
    answers: [
      { text: "To avoid flattening the battery", correct: false },
      { text: "To avoid dazzling other road users", correct: false },
      { text: "To avoid misleading other road users", correct: true },
      { text: "To avoid damage to the indicator relay", correct: false }
    ]
  },
  {
    question: "At traffic lights, amber on its own means:",
    answers: [
      { text: "Prepare to go", correct: false },
      { text: "Go if the way is clear", correct: false },
      { text: "Stop at the stop line", correct: true },
      { text: "Go if no pedestrians are crossing", correct: false }
    ]
  },
  {
    question: "You are waiting a T-junction. A vehicle is coming from the right with the left signal flashing. What should you do?",
    answers: [
      { text: "Wait until the vehicle starts to turn in", correct: true },
      { text: "Move out and accelerate hard", correct: false },
      { text: "Move out slowly", correct: false },
      { text: "Pull out before the vehicle reaches the junction", correct: false }
    ]
  },
  {
    question: "A red traffic light means:",
    answers: [
      { text: "You should stop unless turning left", correct: false },
      { text: "Proceed with caution", correct: false },
      { text: "Stop, if you are able to brake safely", correct: false },
      { text: "You must stop and wait behind the stop line", correct: true }
    ]
  },
  {
    question: "You want to turn right at a junction but you think that your indicators cannot be seen clearly. What should you do?",
    answers: [
      { text: "Stay in the left-hand lane", correct: false },
      { text: "Give an arm signal as well as an indicator signal", correct: true },
      { text: "Keep well over to the right", correct: false },
      { text: "Get out and check if your indicators can be seen", correct: false }
    ]
  },
  {
    question: "What do zigzag lines at pedestrian crossings mean?",
    answers: [
      { text: "No parking at any time", correct: true },
      { text: "Sounding horns is not allowed", correct: false },
      { text: "Parking allowed only for a short time", correct: false },
      { text: "Slow down to 20kph", correct: false }
    ]
  },
  {
    question: "What does a sign with a brown background show?",
    answers: [
      { text: "Minor routes", correct: false },
      { text: "Tourist directions", correct: true },
      { text: "Motorway routes", correct: false },
      { text: "Primary roads", correct: false }
    ]
  },
  {
    question: "You are approaching traffic lights. Red and amber are showing. This means:",
    answers: [
      { text: "The lights are about are about to change to red", correct: false },
      { text: "Wait for the green light before you pass the lights", correct: true },
      { text: "There is a fault with the lights - take care", correct: false },
      { text: " Pass the lights if the road is clear", correct: false }
    ]
  },
  {
    question: "What MUST you do when you see a stop sign?",
    answers: [
      { text: "Stop, ONLY if a red light is showing", correct: false },
      { text: "Stop, ONLY if children are waiting to cross", correct: false },
      { text: "Stop, ONLY if traffic is approaching", correct: false },
      { text: "Stop, even if the road is clear", correct: true }
    ]
  },
  {
    question: "What are triangular signs for?",
    answers: [
      { text: "To give order", correct: false },
      { text: "To give information", correct: false },
      { text: "To give warnings", correct: true },
      { text: "To give directions", correct: false }
    ]
  },
  {
    question: "You are to turn right in busy traffic. How would you confirm your intention safely?",
    answers: [
      { text: "Flash your headlamp", correct: false },
      { text: "Sound the horn", correct: false },
      { text: "Give an arm signal also", correct: true },
      { text: "Position over the centre line at an angle", correct: false }
    ]
  },
  {
    question: "You are at a junction controlled by traffic lights. When should you NOT proceed at green?",
    answers: [
      { text: "When you intend to turn right", correct: false },
      { text: "When your exit from the junction is blocked", correct: true },
      { text: "When pedestrians are waiting to cross", correct: false },
      { text: "When you think the lights may be about to change", correct: false }
    ]
  },
  {
    question: "You see some lines across the road at the entrance to a roundabout. What does it mean?",
    answers: [
      { text: "Traffic from the left has right of way", correct: false },
      { text: "Give way to traffic from the right", correct: true },
      { text: "You have right of way", correct: false },
      { text: "Stop at the line", correct: false }
    ]
  },
  {
    question: "When may you sound the horn on your vehicle?",
    answers: [
      { text: "To make slower drivers move over", correct: false },
      { text: "To warn others of your presence", correct: true },
      { text: "To attract a friend's attention", correct: false },
      { text: "To give you right of way", correct: false }
    ]
  },
  {
    question: "What is the maximum speed limit in a built up area unless indicated otherwise?",
    answers: [
      { text: "30mph", correct: true },
      { text: "50mph", correct: false },
      { text: "60mph", correct: false },
      { text: "40mph", correct: false }
    ]
  }
]

const questionsRulesOfTheRoad = [
  {
    question: "You see a sign that has the number 30 in a red circle ahead of you. It means:",
    answers: [
      { text: "Do not exceed 30 kph after passing it", correct: true },
      { text: "Start to slow down to 30 kph after passing it", correct: false },
      { text: "You are leaving the 30 kph speed limit area", correct: false },
      { text: "The minimum speed limit ahead is 30 kph", correct: false }
    ]
  },
  {
    question: "Who has priority at an unmarked crossroads?",
    answers: [
      { text: "The driver who is going faster", correct: false },
      { text: "The driver of the larger vehicle", correct: false },
      { text: "No one", correct: true },
      { text: "The driver on the wider road", correct: false }
    ]
  },
  {
    question: "What is the national speed limit, unless otherwise indicated, on dual carriageways for cars and motorcycles?",
    answers: [
      { text: "50 mph", correct: false },
      { text: "80 mph", correct: false },
      { text: "70 mph", correct: true },
      { text: "100 mph", correct: false }
    ]
  },
  {
    question: "Where may you overtake on a one-way Street?",
    answers: [
      { text: "Either on the right or the left", correct: true },
      { text: "Only on the right-hand side", correct: false },
      { text: "Overtaking is not allowed", correct: false },
      { text: "Only on the left-hand side", correct: false }
    ]
  },
  {
    question: "You are intending to turn right at a junction. An oncoming driver is also turning right. It will normally be safer to:",
    answers: [
      { text: "Keep the other vehicle to your LEFT and turn in front of it (nearside to nearside)", correct: false },
      { text: "Carry on and turn at the next junction instead", correct: false },
      { text: "Hold back, wait for the other driver to turn first", correct: false },
      { text: "Keep the other vehicle to your RIGHT and turn behind it (offside to offside)", correct: true }
    ]
  },
  {
    question: "There is a tractor ahead of you. You wish to overtake but you are NOT sure if it is safe to do so. You should:",
    answers: [
      { text: "Sound your horn to the slow vehicle to pull over", correct: false },
      { text: "Speed through but flash your lights to oncoming traffic", correct: false },
      { text: "Not overtake if you are in doubt", correct: true },
      { text: "Follow another overtaking vehicle through", correct: false }
    ]
  },
  {
    question: "You are looking for somewhere to park your vehicle. The area is full EXCEPT for spaces marked 'disabled use'. You can:",
    answers: [
      { text: "Use these spaces, disabled or not", correct: false },
      { text: "Park if you stay with your vehicle", correct: false },
      { text: "Not park there unless permitted", correct: true },
      { text: "Use these spaces when elsewhere is full", correct: false }
    ]
  },
  {
    question: "You are finding it difficult to find a parking place in a busy town. You can see there is space on the zigzag lines of a zebra crossing. Can you park there?",
    answers: [
      { text: "Yes, in order to drop off a passenger", correct: false },
      { text: "Yes, if you don't block people from crossing", correct: false },
      { text: "No, unless you stay with your car", correct: false },
      { text: "No, not under any circumstances", correct: true }
    ]
  },
  {
    question: "Someone is waiting to cross at a zebra crossing. They are standing on the pavement. You should normally:",
    answers: [
      { text: "Ignore them as they are still on the pavement", correct: false },
      { text: "Stop before you reach the zigzag lines and let them cross", correct: false },
      { text: "Stop, let them cross, wait patiently", correct: true },
      { text: "Go on quickly before they step onto the crossing", correct: false }
    ]
  },
  {
    question: "At a crossroads there are no signs or road markings. Two vehicles approach. Which has priority?",
    answers: [
      { text: "The vehicle on the widest road", correct: false },
      { text: "Vehicles approaching from the right", correct: false },
      { text: "Neither vehicle", correct: true },
      { text: "The vehicle the fastest", correct: false }
    ]
  },
  {
    question: "You are on a busy main road and find that you are in a wrong direction. What should you do?",
    answers: [
      { text: "Turn round in a side road", correct: true },
      { text: "Turn into a side road on the road on the right and reverse into the main road.", correct: false },
      { text: "Make a 'three point' turn in the main road", correct: false },
      { text: "Make a U-turn in the main road", correct: false }
    ]
  },
  {
    question: "You are going along a single-track road with passing places only on the right. The driver behind wishes to overtake. You should:",
    answers: [
      { text: "Drive into a passing place on your right", correct: false },
      { text: "Switch on your hazard warning lights", correct: false },
      { text: "Wait opposite a passing place on your right", correct: true },
      { text: "Speed up to get away from the following driver", correct: false }
    ]
  },
  {
    question: "You may only enter a box junction when:",
    answers: [
      { text: "You need to turn left", correct: false },
      { text: "The traffic lights show green", correct: false },
      { text: "Your exit road is clear", correct: true },
      { text: "There are less than two vehicles in front of you", correct: false }
    ]
  },
  {
    question: "While driving, you intend to turn left into a minor road. On the approach you should:",
    answers: [
      { text: "Keep well to the left of the road", correct: true },
      { text: "Keep just left of the middle of the road", correct: false },
      { text: "Swing out wide just before turning", correct: false },
      { text: "Keep in the middle of the road", correct: false }
    ]
  },
  {
    question: "You are reversing your vehicle into a side road. When would the greatest hazard to passing traffic occur?",
    answers: [
      { text: "After you've completed the manoeuvre", correct: false },
      { text: "When the front of your vehicle swings out", correct: true },
      { text: "After you've entered the side road", correct: false },
      { text: "Just before you actually begin to manoeuvre", correct: false }
    ]
  },
  {
    question: "You may remove your seat belt temporarily when carrying out a manoeuvre that involves:",
    answers: [
      { text: "An emergency stop", correct: false },
      { text: "Reversing", correct: true },
      { text: "Driving slowly", correct: false },
      { text: "A hill start", correct: false }
    ]
  },
  {
    question: "When going straight ahead at a roundabout you should:",
    answers: [
      { text: "Indicate right when approaching the roundabout", correct: false },
      { text: "Indicate left before leaving the roundabout", correct: true },
      { text: "Indicate left when approaching the roundabout", correct: false },
      { text: "Not indicate at any time", correct: false }
    ]
  },
  {
    question: "You are approaching a busy junction. There are several lanes with road markings. At the last moment you realise that you are in the wrong lane. You should:",
    answers: [
      { text: "Continue in that lane", correct: true },
      { text: "Stop until the area has cleared", correct: false },
      { text: "Use clear arm signals to cut across", correct: false },
      { text: "Force your way across", correct: false }
    ]
  },
  {
    question: "You are entering an area of roadworks. There is a temporary speed limit displayed. You must",
    answers: [
      { text: "Accept the speed limit as advisable", correct: false },
      { text: "Obey the limit only during rush hour", correct: false },
      { text: "Not exceed the speed limit", correct: true },
      { text: "Obey the limit except for overnight", correct: false }
    ]
  },
  {
    question: "You must not reverse:",
    answers: [
      { text: "In a built-up area", correct: false },
      { text: "For longer than necessary", correct: true },
      { text: "For more than a car's length", correct: false },
      { text: "Into a side road", correct: false }
    ]
  },
  {
    question: "What are the maximum national speed limits for cars and motorcycles in built-up areas and elsewhere?",
    answers: [
      { text: "40kph and 70kph", correct: false },
      { text: "50kph and 80kph", correct: false },
      { text: "30mph and 70mph", correct: true },
      { text: "45mph and 100mph", correct: false }
    ]
  },
  {
    question: "Signals are normally given by direction indicators and:",
    answers: [
      { text: "Fog lights", correct: false },
      { text: "Brake lights", correct: true },
      { text: "Side lights", correct: false },
      { text: "Interior lights", correct: false }
    ]
  },
  {
    question: "You are driving at night with full-beam headlights on. A vehicle is overtaking you. You should dip your lights",
    answers: [
      { text: "Before the vehicles starts to pass you", correct: false },
      { text: "As soon as the vehicle passes you", correct: true },
      { text: "Only if the other driver dips his headlights", correct: false },
      { text: "Some time after the vehicles has passed you", correct: false }
    ]
  },
  {
    question: "What is the national speed limit on motorways, unless otherwise indicated, for cars and motorcycles?",
    answers: [
      { text: "50mph", correct: false },
      { text: "70mph", correct: true },
      { text: "60mph", correct: false },
      { text: "80mph", correct: false }
    ]
  },
  {
    question: "When you are NOT sure that it is safe to reverse your vehicle you should:",
    answers: [
      { text: "Use your horn", correct: false },
      { text: "Reverse slowly", correct: false },
      { text: "Rev your engine", correct: false },
      { text: "Get out and check", correct: true }
    ]
  },
  {
    question: "The dual carriageway you are turning right onto has a narrow central reverse. You should:",
    answers: [
      { text: "Proceed to central reverse and wait", correct: false },
      { text: "Stop in the first lane so that other vehicles give way", correct: false },
      { text: "Wait until the road is clear in both directions", correct: true },
      { text: "Emerge slightly to show your intentions", correct: false }
    ]
  },
  {
    question: "You are going straight ahead at a roundabout. How should you signal?",
    answers: [
      { text: "Signal right on the approach and then left to leave the roundabout", correct: false },
      { text: "Signal left just after you pass the exit before the one you will take", correct: true },
      { text: "Signal left as you leave the roundabouts", correct: false },
      { text: "Signal left on the approach to the roundabout and keep the signal on until you leave", correct: false }
    ]
  },
  {
    question: "Which vehicle might have to use a different course than normal at roundabouts?",
    answers: [
      { text: "Estate car", correct: false },
      { text: "Long vehicle", correct: true },
      { text: "Van", correct: false },
      { text: "Sports car", correct: false }
    ]
  },
  {
    question: "You meet an obstruction on your side of the road. You should:",
    answers: [
      { text: "Accelerate to get past first", correct: false },
      { text: "Drive on; it is your right of way", correct: false },
      { text: "Give way to oncoming traffic", correct: true },
      { text: "Wave oncoming vehicles through", correct: false }
    ]
  },
  {
    question: "You are parked in a busy high street. What is the safest way to turn your vehicle around to go the opposite way?",
    answers: [
      { text: "Get someone to stop the traffic", correct: false },
      { text: "Find a quiet side road to turn round in", correct: true },
      { text: "Do a U-turn", correct: false },
      { text: "Drive into a side road and reverse into the main road", correct: false }
    ]
  },
  {
    question: "You may drive over a footpath:",
    answers: [
      { text: "To gain lawful access into a property", correct: true },
      { text: "To overtake slow-moving traffic", correct: false },
      { text: "When the pavement is very wide", correct: false },
      { text: "If no pedestrians are near", correct: false }
    ]
  },
  {
    question: "What lights and why must you put them on when going through a tunnel?",
    answers: [
      { text: "Main-beam to see clearly where you are going.", correct: false },
      { text: "Hazard warning lights so nobody drives too near.", correct: false },
      { text: "Dipped-beam to help you see and also be clearly seen by others.", correct: true },
      { text: "Dipped-beam and front and/or rear Fog lights to see and be seen clearly.", correct: false }
    ]
  },
  {
    question: "You are leaving your vehicle parked on a road. When may you leave the engine running?",
    answers: [
      { text: "When in a 20 mph zone", correct: false },
      { text: "If you will be parked for less than five minutes", correct: false },
      { text: "Not on any occasion", correct: true },
      { text: "If the battery is flat", correct: false }
    ]
  }
]

const questionsSafetyMargins = [
  {
    question: "Your indicators may be difficult to see in bright sunlight. What should you do?",
    answers: [
      { text: "Give an arm signal as well as using your indicator", correct: true },
      { text: "Don't signal", correct: false },
      { text: "Turn as quickly as you can", correct: false },
      { text: "Touch the brake several times to show the stop lamp(s)", correct: false }
    ]
  },
  {
    question: "Coasting the car:",
    answers: [
      { text: "Improves the driver's control", correct: false },
      { text: "Makes steering easier", correct: false },
      { text: "Reduces the driver's control", correct: true },
      { text: "Uses more fuel", correct: false }
    ]
  },
  {
    question: "You are driving in heavy rain. Your steering suddenly becomes very light. You should",
    answers: [
      { text: "Steer towards the side of the road", correct: false },
      { text: "Brake firmly to reduce speed", correct: false },
      { text: "Ease off the accelerator", correct: true },
      { text: "Apply gentle acceleration", correct: false }
    ]
  },
  {
    question: "When approaching a right-hand bend you should keep well to the left. Why this?",
    answers: [
      { text: "To let faster traffic from behind overtake", correct: false },
      { text: "To overcome the effect of the road's slope", correct: false },
      { text: "To improve your view of the road", correct: true },
      { text: "To be positioned safely if the vehicle skids", correct: false }
    ]
  },
  {
    question: "Your overall stopping distance will be longer when driving:",
    answers: [
      { text: "In the rain", correct: true },
      { text: "In fog", correct: false },
      { text: "In strong winds", correct: false },
      { text: "At night", correct: false }
    ]
  },
  {
    question: "What is the most common reason a car skids?",
    answers: [
      { text: "Driver error", correct: true },
      { text: "Worn tyres", correct: false },
      { text: "Other vehicles", correct: false },
      { text: "Pedestrians", correct: false }
    ]
  },
  {
    question: "When braking hard in a straight line, most of the weight of the vehicle will shift onto the",
    answers: [
      { text: "Front wheels", correct: true },
      { text: "Left wheels", correct: false },
      { text: "Right wheels", correct: false },
      { text: "Rear wheels", correct: false }
    ]
  },
  {
    question: "Braking hard at a high speed on a sharp bend can make your vehicle",
    answers: [
      { text: "Corner safely", correct: false },
      { text: "Unstable", correct: true },
      { text: "Stall", correct: false },
      { text: "More stable", correct: false }
    ]
  },
  {
    question: "When should you use front and rear fog lights?",
    answers: [
      { text: "When it is raining and just in case the roads are slippery.", correct: false },
      { text: "During any time of the day or night to make sure that other road users see me.", correct: false },
      { text: "When the road is unlit by street lamps or they are not working.", correct: false },
      { text: "When visibility is considerably reduced because of fog.", correct: true }
    ]
  },
  {
    question: "How can you use the engine of your vehicle as a brake?",
    answers: [
      { text: "By selecting neutral gear", correct: false },
      { text: "By changing to a lower gear", correct: true },
      { text: "By selecting reverse gear", correct: false },
      { text: "By changing to a higher gear", correct: false }
    ]
  },
  {
    question: "The 'two-second rule' allows you to:",
    answers: [
      { text: "Keep a safe distance from the car in front", correct: true },
      { text: "Check your blind spot", correct: false },
      { text: "Keep the correct distance from the kerb", correct: false },
      { text: "Check your mirrors", correct: false }
    ]
  },
  {
    question: "'Only a fool breaks the Two-Second Rule' refers to:",
    answers: [
      { text: "The separation distance when riding in good conditions", correct: true },
      { text: "Restarting a stalled engine in busy traffic", correct: false },
      { text: "The time you should keep your foot down at a junction", correct: false },
      { text: "The time recommended when using the choke", correct: false }
    ]
  },
  {
    question: "You are about to go down a steep hill. To control the speed of your car you should:",
    answers: [
      { text: "Select a low gear and avoid using the brakes", correct: false },
      { text: "Select a low gear and use the brakes carefully", correct: true },
      { text: "Select a high gear and use the brakes firmly", correct: false },
      { text: "Select a high gear and use the brakes carefully", correct: false }
    ]
  },
  {
    question: "You are on a long, downhill slope. What should you do to help control the speed of your car?",
    answers: [
      { text: "Select neutral", correct: false },
      { text: "Apply the parking brake gently", correct: false },
      { text: "Select a lower gear", correct: true },
      { text: "Grip the handbrake firmly", correct: false }
    ]
  },
  {
    question: "You are driving in a built-up residential area. You should:",
    answers: [
      { text: "Stop and check both pavements", correct: false },
      { text: "Move across to the lefthand side of the road", correct: false },
      { text: "Wait for any pedestrians to cross", correct: false },
      { text: "Slow your vehicle right down", correct: true }
    ]
  },
  {
    question: "If your car is fitted with anti-lock brakes, and you need to stop in an emergency. You should:",
    answers: [
      { text: "Brake normally and avoid turning the steering wheel", correct: false },
      { text: "Apply the handbrake to reduce the stopping distance", correct: false },
      { text: "Keep pushing and releasing the foot brake quickly to prevent skidding", correct: false },
      { text: "Press the brake pedal rapidly and firmly until you have stopped", correct: true }
    ]
  },
  {
    question: "If you are on good, dry road surface and your vehicle has good brakes and tyres, what is the overall stopping distance at 48 kph?",
    answers: [
      { text: "96 metres (315 feet)", correct: false },
      { text: "53 metres (174 feet)", correct: false },
      { text: "23 metres (75 feet)", correct: true },
      { text: "36 metres (118 feet)", correct: false }
    ]
  },
  {
    question: "You are on a fast, open road and driving in good conditions. For safely, the distance between you and the vehicle in front should be:",
    answers: [
      { text: "One car length", correct: false },
      { text: "A two-second time gap", correct: false },
      { text: "Two car lengths", correct: false },
      { text: "2 metre (6 feet 6 inches)", correct: true }
    ]
  },
  {
    question: "You are turning left on a slippery road. The back of your vehicle slides to the right. You should:",
    answers: [
      { text: "Brake firmly and not turn the steering wheel", correct: false },
      { text: "Steer carefully to the left", correct: false },
      { text: "Steer carefully to the right", correct: true },
      { text: "Brake firmly and steer to the left", correct: false }
    ]
  },
  {
    question: "You have driven your car through a flood. What is the first thing you should do?",
    answers: [
      { text: "Stop and check the tyres", correct: false },
      { text: "Switch on your windscreen wipers", correct: false },
      { text: "Test your brakes", correct: true },
      { text: "Stop and dry the brakes", correct: false }
    ]
  },
  {
    question: "If you are at a junction with limited visibility, you should:",
    answers: [
      { text: "Creep forward, looking to the right", correct: false },
      { text: "Creep forward, looking to the left", correct: false },
      { text: "Be ready to move off quickly", correct: false },
      { text: "Creep forward, looking both ways", correct: true }
    ]
  },
  {
    question: "The main cause of skidding is:",
    answers: [
      { text: "The vehicle", correct: false },
      { text: "The driver", correct: true },
      { text: "The road", correct: false },
      { text: "The weather", correct: false }
    ]
  },
  {
    question: "Your vehicle does not have anti-lock brakes. If you are braking on a wet road and your vehicle begins to skid. What is the FIRST thing you should do?",
    answers: [
      { text: "Quickly pull up the handbrake", correct: false },
      { text: "Release the footbrake fully", correct: true },
      { text: "Gently use the accelerator", correct: false },
      { text: "Push harder on the brake pedal", correct: false }
    ]
  },
  {
    question: "Vehicles fitted with an anti-lock brake system",
    answers: [
      { text: "Are impossible to skid", correct: false },
      { text: "Are not fitted with a handbrake", correct: false },
      { text: "Accelerate much faster", correct: false },
      { text: "Can be steered while you are braking", correct: true }
    ]
  },
  {
    question: "Anti-lock brakes reduce the chances of a skid occurring particularly when:",
    answers: [
      { text: "Breaking during normal driving", correct: false },
      { text: "Driving down steep hills", correct: false },
      { text: "Breaking in an emergency", correct: true },
      { text: "Driving on good road surfaces", correct: false }
    ]
  }
]

const questionsSafetyAndYourVehicle = [
  {
    question: "Why do VRT tests include an exhaust emission test?",
    answers: [
      { text: "To discover which fuel supplier is used the most", correct: false },
      { text: "To help protect the environment against pollution", correct: true },
      { text: "To recover the cost of expensive garage equipment", correct: false },
      { text: "To make sure diesel and petrol engines emit the same fumes", correct: false }
    ]
  },
  {
    question: "Road humps, chicanes, and narrowing are:",
    answers: [
      { text: "At toll-bridge approaches only", correct: false },
      { text: "Traffic calming measures", correct: true },
      { text: "Always at major road works", correct: false },
      { text: "Used to increase traffic speed", correct: false }
    ]
  },
  {
    question: "To avoid spilling after refueling, you should make sure that:",
    answers: [
      { text: "You have used a locking filler cap", correct: false },
      { text: "You check your fuel gauge is working", correct: false },
      { text: "Your tank is only 3/4 full", correct: false },
      { text: "Your filler cap is securely fastened", correct: true }
    ]
  },
  {
    question: "When a roof rack is not in use it should be removed. Why?",
    answers: [
      { text: "It will waste fuel", correct: true },
      { text: "It will affect your braking", correct: false },
      { text: "It is illegal", correct: false },
      { text: "It will affect the suspension", correct: false }
    ]
  },
  {
    question: "What will cause high consumption of fuel?",
    answers: [
      { text: "Harsh braking and accelerating", correct: true },
      { text: "Accelerating around bends", correct: false },
      { text: "Driving in high bends", correct: false },
      { text: "Poor steering control", correct: false }
    ]
  },
  {
    question: "If you cannot see clearly behind when reversing, what should you do?",
    answers: [
      { text: "Open the door and look behind", correct: false },
      { text: "Look in the nearside mirror", correct: false },
      { text: "Ask someone to guide you", correct: true },
      { text: "Open your window to look behind", correct: false }
    ]
  },
  {
    question: "It is important that tyre pressures are regularly checked. When should this be done?",
    answers: [
      { text: "After driving at high speed", correct: false },
      { text: "After any lengthy journey", correct: false },
      { text: "When tyres are cold", correct: true },
      { text: "When tyres are hot", correct: false }
    ]
  },
  {
    question: "You should NOT sound your horn",
    answers: [
      { text: "Between 11.30 pm and 7 am in a built-up area", correct: true },
      { text: "At any time in a built-up area", correct: false },
      { text: "Between 11.00 and 6 am in a built-up area", correct: false },
      { text: "Between 10 pm and 6 am in a built-up area", correct: false }
    ]
  },
  {
    question: "It is very important that tyre pressures are correct. They should be checked at least",
    answers: [
      { text: "Once a week", correct: true },
      { text: "Every time the vehicle is serviced", correct: false },
      { text: "Once a month", correct: false },
      { text: "Every time the vehicle has an MOT test", correct: false }
    ]
  },
  {
    question: "Which of these, if allowed to get low, is dangerous?",
    answers: [
      { text: "Antifreeze level", correct: false },
      { text: "Battery water level", correct: false },
      { text: "Radiator coolant level", correct: false },
      { text: "Brake fluid level", correct: true }
    ]
  },
  {
    question: "In some residential roads you will find a speed limit of:",
    answers: [
      { text: "40 mph", correct: false },
      { text: "25 mph", correct: true },
      { text: "60 mph", correct: false },
      { text: "50 mph", correct: false }
    ]
  },
  {
    question: "Driving with under-inflated (low) tyres can affect",
    answers: [
      { text: "Engine temperatures", correct: false },
      { text: "Fuel consumption", correct: true },
      { text: "Oil pressure", correct: false },
      { text: "judgement of the driver", correct: false }
    ]
  },
  {
    question: "Excessive or uneven wear in one or more tyres can be caused by faults in the:",
    answers: [
      { text: "Steering Wheel", correct: false },
      { text: "Exhaust system", correct: false },
      { text: "Braking system", correct: true },
      { text: "Gearbox", correct: false }
    ]
  },
  {
    question: "Your car is fitted with power assisted steering. This will make the steering seem",
    answers: [
      { text: "Noisier", correct: false },
      { text: "Heavier", correct: false },
      { text: "Quieter", correct: false },
      { text: "Lighter", correct: true }
    ]
  },
  {
    question: "To help the environment you should NOT:",
    answers: [
      { text: "Use your car for very short journeys", correct: true },
      { text: "Empty the boot of unnecessary weight", correct: false },
      { text: "Walk, cycle, or use public transport", correct: false },
      { text: "Remove your roof rack when unloaded", correct: false }
    ]
  },
  {
    question: "The legal minimum depth of tread for car tyres over three quarters of its breadth is:",
    answers: [
      { text: "4mm", correct: false },
      { text: "1mm", correct: false },
      { text: "1.6mm", correct: true },
      { text: "2.5mm", correct: false }
    ]
  },
  {
    question: "You are testing the suspension of your car. You notice that your vehicle keeps bouncing when you press down on the front wing. What does this mean?",
    answers: [
      { text: "Worn shock absorbers", correct: true },
      { text: "Steering wheel not located centrally", correct: false },
      { text: "Worn tyres", correct: false },
      { text: "Tyres under-inflated", correct: false }
    ]
  },
  {
    question: "New petrol-engined cars have to be fitted with catalytic converters. The reason for this is to",
    answers: [
      { text: "Reduce harmful exhaust emissions", correct: true },
      { text: "Allow the exhaust system to be recycled", correct: false },
      { text: "Prolong the life of the exhaust system", correct: false },
      { text: "Control exhaust noise levels", correct: false }
    ]
  },
  {
    question: "Care should be taken when refueling with diesel, because when split it is",
    answers: [
      { text: "Odourless", correct: false },
      { text: "Sticky", correct: false },
      { text: "Slippery", correct: true },
      { text: "Clear", correct: false }
    ]
  },
  {
    question: "What can cause heavy or difficult steering?",
    answers: [
      { text: "Badly worn brakes", correct: false },
      { text: "Driving on mud", correct: false },
      { text: "Over-inflated tyres", correct: false },
      { text: "Under-inflated tyres", correct: true }
    ]
  },
  {
    question: "When MUST you use dipped lights during the day?",
    answers: [
      { text: "In poor visibility", correct: true },
      { text: "When parking", correct: false },
      { text: "All the time", correct: false },
      { text: "Along narrow streets", correct: false }
    ]
  },
  {
    question: "There is vibration on your steering wheel as you drive at certain speeds. You should check that the:",
    answers: [
      { text: "Wheels are balanced", correct: true },
      { text: "Doors are closed", correct: false },
      { text: "Exhaust is not loose", correct: false },
      { text: "Engine oil level is correct", correct: false }
    ]
  },
  {
    question: "A police officer orders you to stop and he finds you have a faulty tyre. Who is responsible for the tyre?",
    answers: [
      { text: "You, the driver", correct: true },
      { text: "Whoever issued the VRT certificate", correct: false },
      { text: "Whoever services the car", correct: false },
      { text: "The previous owner", correct: false }
    ]
  },
  {
    question: "A roof rack that is fitted to your car will:",
    answers: [
      { text: "Improve the road handling", correct: false },
      { text: "Make your car go faster", correct: false },
      { text: "Increase fuel consumption", correct: true },
      { text: "Reduce fuel consumption", correct: false }
    ]
  },
  {
    question: "Your vehicle pulls to one side when braking heavily. You should",
    answers: [
      { text: "Use your handbrake at the same time", correct: false },
      { text: "Have the fault checked by a competent mechanic as soon as possible", correct: true },
      { text: "Change the tyres around", correct: false },
      { text: "Pump the pedal when braking and steer in opposite direction", correct: false }
    ]
  },
  {
    question: "You will help your environment if you:",
    answers: [
      { text: "Walk or cycle when you can", correct: true },
      { text: "Reduce the tyre pressure", correct: false },
      { text: "Drive continually using full choke", correct: false },
      { text: "Accelerate and brake sharply", correct: false }
    ]
  },
  {
    question: "If you notice a strong smell of petrol as you are driving along you should",
    answers: [
      { text: "Carry on at a reduced speed", correct: false },
      { text: "Stop at a suitable place and investigate the problem", correct: true },
      { text: "Expect it to stop in a few miles", correct: false },
      { text: "Not worry, as it is only exhaust fumes", correct: false }
    ]
  },
  {
    question: "A properly adjusted head rest will:",
    answers: [
      { text: "Help you to maintain your driving position", correct: false },
      { text: "Make you more comfortable", correct: false },
      { text: "Help you to relax", correct: false },
      { text: "Help you to avoid neck injury", correct: true }
    ]
  },
  {
    question: "If daytime visibility is poor but not seriously reduced, you should switch on:",
    answers: [
      { text: "Headlights and fog lights", correct: false },
      { text: "Front fog lights", correct: false },
      { text: "Dipped headlights", correct: true },
      { text: "Rear fog lights", correct: false }
    ]
  },
  {
    question: "What will reduce the risk of neck injury resulting from a car collision?",
    answers: [
      { text: "An air-sprung seat", correct: false },
      { text: "Anti-lock brakes", correct: false },
      { text: "A properly adjusted head restraint", correct: true },
      { text: "A collapsible steering wheel", correct: false }
    ]
  },
  {
    question: "The main cause of brake pedal fade is:",
    answers: [
      { text: "The brakes out of adjustment", correct: false },
      { text: "The brakes overheating", correct: true },
      { text: "Air in brake fluid", correct: false },
      { text: "Oil in the brakes", correct: false }
    ]
  },
  {
    question: "Which one is adversely affected if the tyres are under-inflated?",
    answers: [
      { text: "Accerating", correct: false },
      { text: "Parking", correct: false },
      { text: "Braking", correct: true },
      { text: "Changing gear", correct: false }
    ]
  },
  {
    question: "You enter a road where there are road humps. You should:",
    answers: [
      { text: "Accelerate quickly between each one", correct: false },
      { text: "Always keep to the maximum legal speed", correct: false },
      { text: "Drive slowly at school times only", correct: false },
      { text: "Maintain a reduced speed throughout", correct: true }
    ]
  },
  {
    question: "Your anti-lock brakes warning light stays on. You should:",
    answers: [
      { text: "Have the brakes checked immediately", correct: true },
      { text: "Check the brake fluid", correct: false },
      { text: "Check that the handbrake is released", correct: false },
      { text: "Check the footbrake free play", correct: false }
    ]
  },
  {
    question: "Hazard lights should be used when vehicles are:",
    answers: [
      { text: "Reversing into a side road", correct: false },
      { text: "Broken down and causing an obstruction", correct: true },
      { text: "Faulty and moving slowly", correct: false },
      { text: "Being towed along a road", correct: false }
    ]
  },
  {
    question: "When may you use hazard lights?",
    answers: [
      { text: "To park on double yellows lines", correct: false },
      { text: "When you have broken down in traffic", correct: true },
      { text: "To park alongside another car", correct: false },
      { text: "When you are being towed", correct: false }
    ]
  }
]

const questionsVehicleLoading = [
  {
    question: "Any load that is carried on a roof rack MUST be:",
    answers: [
      { text: "Securely fastened when driving", correct: true },
      { text: "Carried only when strictly necessary", correct: false },
      { text: "As light as possible", correct: false },
      { text: "Covered with plastic sheeting", correct: false }
    ]
  },
  {
    question: "What do child locks in a vehicle do?",
    answers: [
      { text: "Lock the rear windows in the up position", correct: false },
      { text: "Stop children from opening rear doors", correct: true },
      { text: "Lock the seat belt buckles in place", correct: false },
      { text: "Stop the rear seats from tipping forward", correct: false }
    ]
  },
  {
    question: "A heavy load on your roof rack will:",
    answers: [
      { text: "Make the steering lighter", correct: false },
      { text: "Reduce the stopping distance", correct: false },
      { text: "Improve the road holding", correct: false },
      { text: "Reduce stability", correct: true }
    ]
  },
  {
    question: "Who is responsible for making sure that a vehicle is not overloaded?",
    answers: [
      { text: "The person who loaded the vehicle", correct: false },
      { text: "The driver or rider of the vehicle", correct: true },
      { text: "The owner of the items being carried", correct: false },
      { text: "The owner of the vehicle", correct: false }
    ]
  }
]

const questionsVehicleHandling = [
  {
    question: "You are following other vehicles in fog with your lights on. How else can you reduce the chances of being involved in an accident?",
    answers: [
      { text: "Use your main beam instead of dipped headlights", correct: false },
      { text: "Keep together with the faster vehicles", correct: false },
      { text: "Reduce your speed and increase the gap", correct: true },
      { text: "Keep close to the vehicle in front", correct: false }
    ]
  },
  {
    question: "You are on a narrow road at night. A slower-moving vehicle ahead has been signalling right for some time. What should you do?",
    answers: [
      { text: "Overtake on the left", correct: false },
      { text: "Wait for the signal to be cancelled before overtaking", correct: true },
      { text: "Signal right and sound your horn", correct: false },
      { text: "Flash your headlights before overtaking", correct: false }
    ]
  },
  {
    question: "Front and rear fog lights MUST be:",
    answers: [
      { text: "Used outside built up areas only", correct: false },
      { text: "Switched off if visibility is not seriously reduced", correct: true },
      { text: "Switched off in night-time fog", correct: false },
      { text: "Connected to an audible warning signal", correct: false }
    ]
  },
  {
    question: "Front fog lights may be used ONLY if :",
    answers: [
      { text: "Visibility is seriously reduced", correct: true },
      { text: "They prevent headlights glare on a wet road", correct: false },
      { text: "Fitted by manufacturer", correct: false },
      { text: "You wish to overtake in bad weather", correct: false }
    ]
  },
  {
    question: "Why should you always reduce your speed when driving in fog?",
    answers: [
      { text: "Because the brakes do not work as well", correct: false },
      { text: "Because it is more difficult to see events ahead", correct: true },
      { text: "Because the engine`s colder", correct: false },
      { text: "Because you could be dazzled by other people`s fog lights", correct: false }
    ]
  },
  {
    question: "You are in very heavy downpour. Your overall stopping distance is likely to be:",
    answers: [
      { text: "No different", correct: false },
      { text: "Halved", correct: false },
      { text: "Up to ten times greater", correct: false },
      { text: "Doubled", correct: true }
    ]
  },
  {
    question: "You should avoid 'coasting' your car because it could:",
    answers: [
      { text: "Reduce steering control", correct: true },
      { text: "Flatten the battery", correct: false },
      { text: "Increase tyre wear", correct: false },
      { text: "Damage the suspension", correct: false }
    ]
  },
  {
    question: "You are approaching a bend at a high speed. You should begin to brake.",
    answers: [
      { text: "After the bend", correct: false },
      { text: "On the bend", correct: false },
      { text: "After changing gears", correct: false },
      { text: "Before the bend", correct: true }
    ]
  },
  {
    question: "Front fog lights may be used ONLY if:",
    answers: [
      { text: "Visibility is seriously reduced", correct: true },
      { text: "An audible warning device is used", correct: false },
      { text: "They are not as bright as the headlights", correct: false },
      { text: "They are fitted above the bumper", correct: false }
    ]
  },
  {
    question: "Motorcyclists are more at risk to be injured from other road users because they",
    answers: [
      { text: "Are more difficult to see than other drivers", correct: true },
      { text: "Are less experienced that other drivers", correct: false },
      { text: "Are always faster than other drivers", correct: false },
      { text: "Are more likely to break down than other motorists", correct: false }
    ]
  },
  {
    question: "You are driving in very wet weather. Your vehicle begins to slide. This affect is called:",
    answers: [
      { text: "Aquaplaning", correct: true },
      { text: "Weaving", correct: false },
      { text: "Fading", correct: false },
      { text: "Hosing", correct: false }
    ]
  },
  {
    question: "Why is coasting wrong or dangerous?",
    answers: [
      { text: "It will make the engine stall", correct: false },
      { text: "It will cause the car to skid", correct: false },
      { text: "The engine will run faster", correct: false },
      { text: "There is no engine braking", correct: true }
    ]
  },
  {
    question: "To correct a rearwheel skid you should:",
    answers: [
      { text: "Apply your handbrake", correct: false },
      { text: "Not steer at all", correct: false },
      { text: "Steer into it", correct: true },
      { text: "Steer away from it", correct: false }
    ]
  },
  {
    question: "Fog lights should be used ONLY when",
    answers: [
      { text: "Driving after midnight", correct: false },
      { text: "Visibility is seriously reduced", correct: true },
      { text: "In very light rain", correct: false },
      { text: "Daylight is fading", correct: false }
    ]
  },
  {
    question: "You are overtaking a car at night. You must be sure that:",
    answers: [
      { text: "You have switched your lights to full beam before overtaking", correct: false },
      { text: "Your rear fog lights are switched on", correct: false },
      { text: "You do not dazzle other road users", correct: true },
      { text: "You flash your headlamps before overtaking", correct: false }
    ]
  },
  {
    question: "Front fog lights may be used ONLY if:",
    answers: [
      { text: "Visibility is seriously poor", correct: true },
      { text: "They were fitted by the vehicle manufacturer", correct: false },
      { text: "They are operated with rear fog lights", correct: false },
      { text: "Your headlights are not working", correct: false }
    ]
  },
  {
    question: "You are following a vehicle at a safe distance on a wet and slippery road. Another driver overtakes you and pulls into the gap you have left. What should you do?",
    answers: [
      { text: "Flash your headlights as a warning", correct: false },
      { text: "Stay close to the other vehicle until it moves on", correct: false },
      { text: "Drop back to regain a safe distance", correct: true },
      { text: "Try to overtake safely as soon as you can", correct: false }
    ]
  },
  {
    question: "Using front/rear fog lights in good visibility will:",
    answers: [
      { text: "Improve your visibility", correct: false },
      { text: "Dazzle other drivers", correct: true },
      { text: "Increase your awareness", correct: false },
      { text: "Flatten the battery", correct: false }
    ]
  },
  {
    question: "Which statement represents being in safe control of your vehicle?",
    answers: [
      { text: "One hand on the steering wheel and the other simply hanging out of the window to catch the breeze and look cool or wave to friends.", correct: false },
      { text: "One hand on the steering wheel and the other being used to hold a mobile phone.", correct: false },
      { text: "Both hands on the steering wheel at all times , and only when a change of gear or operation of controls is necessary that one hand is taken off the steering wheel.", correct: true },
      { text: "One hand on the steering wheel and the other grasping the gear lever for the most part to facilitate instant gear changes.", correct: false }
    ]
  },
  {
    question: "At night, you are dazzled by headlights coming towards you. You should:",
    answers: [
      { text: "Slow down or stop", correct: true },
      { text: "Pull down your sun visor", correct: false },
      { text: "Put your hand over your eyes", correct: false },
      { text: "Switch on your main beam headlights", correct: false }
    ]
  },
  {
    question: "You are driving in fog. Why should you keep well back from the vehicle in front?",
    answers: [
      { text: "In case it stops suddenly", correct: true },
      { text: "In case its fog lights dazzle you", correct: false },
      { text: "In case its brake lights dazzle you", correct: false },
      { text: "In case it changes direction suddenly", correct: false }
    ]
  },
  {
    question: "Using rear fog lights in clear daylight or tunnels will:",
    answers: [
      { text: "Be useful when towing a trailer", correct: false },
      { text: "Make following drivers keep back", correct: false },
      { text: "Give extra protection", correct: false },
      { text: "Dazzle others drivers", correct: true }
    ]
  },
  {
    question: "You are driving in the left-hand lane of a dual carriageway. Another car overtakes and pulls in front of you leaving you without enough separation distance. You should:",
    answers: [
      { text: "Continue as you are", correct: false },
      { text: "Sound your horn", correct: false },
      { text: "Move to the right-hand lane", correct: false },
      { text: "Drop back", correct: true }
    ]
  },
  {
    question: "You see a vehicle coming towards you on a single-track road. You should:",
    answers: [
      { text: "Do an emergency stop", correct: false },
      { text: "Put on your hazard warning lights", correct: false },
      { text: "Stop at a passing place", correct: true },
      { text: "Reverse back to the main road", correct: false }
    ]
  },
  {
    question: "You are driving in thick fog using fog lights. When visibility improves you MUST:",
    answers: [
      { text: "Keep them on", correct: false },
      { text: "Maintain your speed", correct: false },
      { text: "Switch them off", correct: true },
      { text: "Increase your speed", correct: false }
    ]
  },
  {
    question: "Front fog lights may be used ONLY",
    answers: [
      { text: "If they are not as bright as the headlights", correct: false },
      { text: "During 'lighting up' times only", correct: false },
      { text: "When visibility is seriously reduced", correct: true },
      { text: "Between dusk and dawn", correct: false }
    ]
  },
  {
    question: "What is the first thing to do before starting your vehicle?",
    answers: [
      { text: "Putting your seat belt on", correct: false },
      { text: "By putting key in the switch before starting", correct: false },
      { text: "Looking at the inside view mirror", correct: false },
      { text: "Checking your vehicle", correct: true }
    ]
  },
  {
    question: "You have to make a journey in foggy conditions. You should:",
    answers: [
      { text: "Keep two seconds behind other vehicles", correct: false },
      { text: "Leave plenty of time for your journey", correct: true },
      { text: "Never use demisters and windscreens wipers.", correct: false },
      { text: "Follow closely other vehicle's tail lights", correct: false }
    ]
  }
]

const questionsVulnerableRoadUsers = [
  {
    question: "Where should you take particular care to look out for motorcyclists and cyclists?",
    answers: [
      { text: "On dual carriageways", correct: false },
      { text: "At zebra crossings", correct: false },
      { text: "At junctions", correct: true },
      { text: "On one-way streets", correct: false }
    ]
  },
  {
    question: "What is the most common cause of road accidents?",
    answers: [
      { text: "Driver error", correct: true },
      { text: "Mechanical failure", correct: false },
      { text: "Weather conditions", correct: false },
      { text: "Road conditions", correct: false }
    ]
  },
  {
    question: "You are driving on a quiet country road. What should you expect to see coming towards you on YOUR side of the road?",
    answers: [
      { text: "Horse riders", correct: false },
      { text: "Pedestrians", correct: true },
      { text: "Motorcycles", correct: false },
      { text: "Bicycles", correct: false }
    ]
  },
  {
    question: "You are at the front of a queue of traffic waiting to turn right into a side road. Why is it important to check your right mirror just before turning?",
    answers: [
      { text: "To check for emerging traffic", correct: false },
      { text: "To look for pedestrians about to cross", correct: false },
      { text: "To make sure the side road is clear", correct: false },
      { text: "To check for overtaking vehicles", correct: true }
    ]
  },
  {
    question: "When you are overtaking a cyclist in the road, you should leave as much room as you would give to a car. What is the main reason for this?",
    answers: [
      { text: "The cyclist might have to make a right turn", correct: false },
      { text: "The cyclist might change lanes", correct: false },
      { text: "The cyclist might get off the bike", correct: false },
      { text: "The cyclist might swerve", correct: true }
    ]
  },
  {
    question: "You are driving in town. There is a bus at the bus stop on the other side of the road. Why should you be careful?",
    answers: [
      { text: "Pedestrians may come from behind the bus", correct: true },
      { text: "The bus may move off suddenly", correct: false },
      { text: "The bus may remain stationary", correct: false },
      { text: "The bus may have broken down", correct: false }
    ]
  },
  {
    question: "You are following a learner driver who stalls at a junction. What should you do?",
    answers: [
      { text: "Start to rev your engine if they take too long to restart", correct: false },
      { text: "Immediately steer around them and drive on", correct: false },
      { text: "Be patient as you expect them to make mistake", correct: true },
      { text: "Drive up close behind and flash your headlights", correct: false }
    ]
  },
  {
    question: "Which type of vehicle is most affected by strong winds?",
    answers: [
      { text: "Tractor", correct: false },
      { text: "Motorcycle", correct: true },
      { text: "Tanker", correct: false },
      { text: "Car", correct: false }
    ]
  },
  {
    question: "You want to turn from a junction but your view is partly restricted by parked vehicles. What should you do?",
    answers: [
      { text: "Move out quickly, but be prepared to stop", correct: false },
      { text: "Sound your horn and pull out if there is no reply", correct: false },
      { text: "Stop, then move slowly forward until you have a clear view", correct: true },
      { text: "Stop, get out and look along the main road to check", correct: false }
    ]
  },
  {
    question: "You are driving behind three cyclists. They approach a roundabout in the lefthand lane. In which direction should you expect the cyclists to go?",
    answers: [
      { text: "Right", correct: false },
      { text: "Left", correct: false },
      { text: "Straight ahead", correct: false },
      { text: "Any direction", correct: true }
    ]
  },
  {
    question: "Motorcyclists often look round over their right shoulder just before turning right. This is because",
    answers: [
      { text: "Looking around helps them balance as they turn", correct: false },
      { text: "They need to check for traffic in their blind area", correct: true },
      { text: "They need to listen for following traffic", correct: false },
      { text: " Motorcycles do not have mirrors", correct: false }
    ]
  },
  {
    question: "You are driving past a lane of parked cars and you notice a ball bouncing out into the road ahead. What should you do?",
    answers: [
      { text: "Continue driving at the same speed and sound your horn", correct: false },
      { text: "Stop and wave the children across to fetch their ball", correct: false },
      { text: "Continue driving at the same speed and flash your headlights", correct: false },
      { text: "Slow down and be prepared to stop for children", correct: true }
    ]
  },
  {
    question: "Motorcycles ride in day light with their headlights switched on because",
    answers: [
      { text: "There is a speed trap ahead", correct: false },
      { text: "They need to be seen", correct: true },
      { text: "It is legal requirement", correct: false },
      { text: "There are speed humps ahead", correct: false }
    ]
  },
  {
    question: "What action should you take when elderly people are crossing the road?",
    answers: [
      { text: "Wave them across so they know that you have seen them", correct: false },
      { text: "Tap the horn in case they are hard of hearing", correct: false },
      { text: "Be patient and allow them to cross in their own time", correct: true },
      { text: "Rev the engine to let them know that you are waiting", correct: false }
    ]
  },
  {
    question: "If you see a pedestrian carrying a white stick, this shows that the person is:This shows that the person is:",
    answers: [
      { text: "Blind", correct: true },
      { text: "Elderly", correct: false },
      { text: "Disabled", correct: false },
      { text: "Deaf", correct: false }
    ]
  },
  {
    question: "If you are driving behind a cyclist and you wish to turn left just ahead. You should:",
    answers: [
      { text: "Overtake the cyclist before the junction", correct: false },
      { text: "Hold back until the cyclist has passed the junction", correct: true },
      { text: "Pull alongside the cyclist and stay level until after the junction", correct: false },
      { text: "Go around the cyclist on the junction", correct: false }
    ]
  },
  {
    question: "You should never attempt to overtake cyclists",
    answers: [
      { text: "When approaching a roundabout", correct: false },
      { text: "On narrow road", correct: false },
      { text: "Just before you turn left", correct: true },
      { text: "On a right hand bend", correct: false }
    ]
  },
  {
    question: "In daylight, an approaching motorcyclist is using a dipped headlight. Why?",
    answers: [
      { text: "The rider is inviting you to proceed", correct: false },
      { text: "So that the rider can be seen more easily", correct: true },
      { text: "To improve the rider's vision", correct: false },
      { text: "To stop the battery overcharging", correct: false }
    ]
  },
  {
    question: "You are about to reverse into a side road and a pedestrian wishes to cross behind you. You should:",
    answers: [
      { text: "Wave to the pedestrian to cross", correct: false },
      { text: "Wave to the pedestrian to stop", correct: false },
      { text: "Reverse before the pedestrian starts to cross", correct: false },
      { text: "Give way to the pedestrian", correct: true }
    ]
  },
  {
    question: "You want to turn right from a main road into a side road. Just before you turn you should",
    answers: [
      { text: "Stop and set the handbrake", correct: false },
      { text: "Cancel your right-turn signal", correct: false },
      { text: "Check for traffic overtaking on your right", correct: true },
      { text: "Select first gear", correct: false }
    ]
  },
  {
    question: "You intend to turn right into a side road. Just before turning you should check for motorcyclists who may be:",
    answers: [
      { text: "Overtaking on your left", correct: false },
      { text: "Following you closely", correct: false },
      { text: "Overtaking on your right", correct: true },
      { text: "Emerging from the side road", correct: false }
    ]
  },
  {
    question: "You are driving on a narrow country road. Where would you find it most difficult to see horses and riders ahead of you?",
    answers: [
      { text: "On right-hand bends", correct: false },
      { text: "On left-hand bends", correct: true },
      { text: "When downhill", correct: false },
      { text: "When uphill", correct: false }
    ]
  },
  {
    question: "How should you overtake horse riders?",
    answers: [
      { text: "Speed is not important but allow plenty of room", correct: false },
      { text: "Use your horn just once to warn them", correct: false },
      { text: "Quickly", correct: false },
      { text: "Drive slowly and leave plenty of room", correct: true }
    ]
  },
  {
    question: "You are driving past parked cars. You notice a wheel of a bicycle sticking out between them. What should you do?",
    answers: [
      { text: "Brake sharply and flash your headlights", correct: false },
      { text: "Slow down and be prepared to stop for a cyclist", correct: true },
      { text: "Accelerate past quickly and sound your horn", correct: false },
      { text: "Slow down and wave the cyclist across", correct: false }
    ]
  },
  {
    question: "You are following a motorcyclist on an uneven and bumpy road. You should:",
    answers: [
      { text: "Be careful, they may misjudge your speed", correct: true },
      { text: "Speed up to get past them quickly", correct: false },
      { text: "Expect them to wait for you to pass", correct: false },
      { text: "Stop and wave them across the road", correct: false }
    ]
  },
  {
    question: "You are waiting to come out of a side road. Why should you watch carefully for motorcycles?",
    answers: [
      { text: "Motorcycles have right of way", correct: false },
      { text: "Motorcycles are small and hard to see", correct: true },
      { text: "Motorcycles are usually faster than cars", correct: false },
      { text: "Police patrols often use motorcycles", correct: false }
    ]
  },
  {
    question: "You are driving and ahead of you there is a vehicle with a flashing amber beacon. This means it is:",
    answers: [
      { text: "A school crossing patrol", correct: false },
      { text: "A doctor's car", correct: false },
      { text: "Slow moving", correct: true },
      { text: "Broken down", correct: false }
    ]
  },
  {
    question: "What should a driver do at a pelican crossing when the red and amber lights are on?",
    answers: [
      { text: "Give way to any pedestrians on the crossing", correct: false },
      { text: "Signal the pedestrian to cross", correct: false },
      { text: "Wait for the red-andamber light before proceeding", correct: false },
      { text: "Always wait for the green light before proceeding", correct: true }
    ]
  },
  {
    question: "You are driving towards a pedestrian(zebra) crossing. Waiting to cross is a person in a wheelchair. You should:",
    answers: [
      { text: "Wave to the person to wait", correct: false },
      { text: "Wave to the person to cross", correct: false },
      { text: "Be prepared to stop", correct: true },
      { text: "Continue on your way", correct: false }
    ]
  },
  {
    question: "An injured motorcyclist is lying unconscious in the road. What should you do?",
    answers: [
      { text: "Remove the safety helmet", correct: false },
      { text: "Seek medical assistance", correct: true },
      { text: "Move them to the pavement", correct: false },
      { text: "Ignore them", correct: false }
    ]
  },
  {
    question: "If a friend wants to teach you to drive a car, they must:",
    answers: [
      { text: "Be over 23 and have held a full licence for at least 5 years", correct: true },
      { text: "Be over 21 and have had a full license for at least three years.", correct: false },
      { text: "Be over 18 and have fully comprehensive insurance", correct: false },
      { text: "Be over 18 and hold an advanced driver's certificate", correct: false }
    ]
  },
  {
    question: "You are driving behind a moped or small motorcycle. You want to turn left just ahead. You should:",
    answers: [
      { text: "Sound your horn as a warning and pull in front of the moped", correct: false },
      { text: "Stay behind until the moped has passed the junction", correct: true },
      { text: "Overtake the moped before the junction", correct: false },
      { text: "Pull alongside the moped and stay level until just before the junction", correct: false }
    ]
  },
  {
    question: "You are dazzled at night by the lights of the vehicle behind you. You should:",
    answers: [
      { text: "Set your mirror to dazzle the other driver", correct: false },
      { text: "Set your mirror to anti-dazzle", correct: true },
      { text: "Brake sharply to a stop", correct: false },
      { text: "Switch your rear lights on and off", correct: false }
    ]
  },
  {
    question: "If you are following a car driven by an elderly driver, you should:",
    answers: [
      { text: "Flash your lights and overtake", correct: false },
      { text: "Expect the driver to drive badly", correct: false },
      { text: "Stay close behind and drive carefully", correct: false },
      { text: "Be aware that the driver's reactions may not be as fast as yours", correct: true }
    ]
  },
  {
    question: "You notice horse riders ahead of you. What should you do FIRST?",
    answers: [
      { text: "Accelerate around them", correct: false },
      { text: "Be prepared to slow down", correct: true },
      { text: "Pull out to the middle of the road", correct: false },
      { text: "Signal right", correct: false }
    ]
  },
  {
    question: "You are turning left at a junction. Pedestrians have suddenly started to cross the road. You should:",
    answers: [
      { text: "Give way to them", correct: true },
      { text: "Blow your horn and proceed", correct: false },
      { text: "Go on, giving them plenty of room", correct: false },
      { text: "Stop and wave at them to cross", correct: false }
    ]
  },
  {
    question: "Why should you allow extra room when overtaking a motorcyclist on a windy day?",
    answers: [
      { text: "The rider may be blown across in front of you", correct: true },
      { text: "The rider may be traveling faster than normal", correct: false },
      { text: "The rider may stop suddenly", correct: false },
      { text: "The rider may turn off suddenly to get out of the wind", correct: false }
    ]
  },
  {
    question: "You are approaching this roundabout and see the cyclist signal right. Why is the cyclist keeping to the left?",
    answers: [
      { text: "The cyclist is going to turn left instead", correct: false },
      { text: "It is quicker route for cyclist", correct: false },
      { text: "The cyclist is slower and more vulnerable", correct: true },
      { text: "The cyclist thinks The highway Code does not apply to bicycles", correct: false }
    ]
  },
  {
    question: "You are coming up to a roundabout and a cyclist is signaling to turn right. What should you do",
    answers: [
      { text: "Overtake on the right", correct: false },
      { text: "Signal the cyclist to move across", correct: false },
      { text: "Give a horn warning", correct: false },
      { text: "Give the cyclist plenty of room", correct: true }
    ]
  },
  {
    question: "You want to reverse into a side road. You are not sure that the area behind your car is clear. What should you do?",
    answers: [
      { text: "Get out and check", correct: true },
      { text: "Carry on, assuming it is clear", correct: false },
      { text: "Look through the rear window only", correct: false },
      { text: "Check the mirrors only", correct: false }
    ]
  },
  {
    question: "Who is especially in danger of not being seen as you reverse your car?",
    answers: [
      { text: "Children", correct: true },
      { text: "Car drivers", correct: false },
      { text: "Motorcyclists", correct: false },
      { text: "Cyclists", correct: false }
    ]
  },
  {
    question: "An injured motorcyclist is lying unconscious in the road. You should",
    answers: [
      { text: "Remove the safety helmet", correct: false },
      { text: "Seek medical assistance", correct: true },
      { text: "Move the person off the road", correct: false },
      { text: "Remove the leather jacket", correct: false }
    ]
  },
  {
    question: "A horse rider is in the left-hand lane approaching a roundabout. The driver behind should expect the rider to:",
    answers: [
      { text: "Turn right", correct: false },
      { text: "Go ahead", correct: false },
      { text: "Turn left", correct: false },
      { text: "Go in any direction", correct: true }
    ]
  },
  {
    question: "You see a group of horse riders as you approach a roundabout. They are indicating right but keeping well to the left. You should:",
    answers: [
      { text: "Keep close of them", correct: false },
      { text: "Cut in front of them", correct: false },
      { text: "Stay well back", correct: true },
      { text: "Proceed as normal", correct: false }
    ]
  },
  {
    question: "You should NEVER attempt to overtake a cyclist",
    answers: [
      { text: "On a dual carriageway", correct: false },
      { text: "Just before you turn right", correct: false },
      { text: "Just before you turn left", correct: true },
      { text: "On a one-way street", correct: false }
    ]
  },
  {
    question: "As you approach a pelican crossing the lights change to green but elderly people are halfway across. You should:",
    answers: [
      { text: "Rev your engine to make them hurry", correct: false },
      { text: "Flash your lights in case they have not heard you", correct: false },
      { text: "Wave them to cross as quickly as they can", correct: false },
      { text: "Wait because they will take longer to cross", correct: true }
    ]
  },
  {
    question: "You are following a motorcyclist on an uneven road. You should:",
    answers: [
      { text: "Overtake immediately", correct: false },
      { text: "Allow the same room as normal because motorcyclists are not affected by road surfaces", correct: false },
      { text: "Allow extra room in case they swerve to avoid pot-holes", correct: true },
      { text: "Allow less room to ensure that you can be seen in their mirrors", correct: false }
    ]
  },
  {
    question: "Your car hits a pedestrian at 60 kph. The pedestrian will:",
    answers: [
      { text: "Certainly survive", correct: false },
      { text: "Probably survive", correct: false },
      { text: "Probably be killed", correct: true },
      { text: "Certainly be killed", correct: false }
    ]
  },
  {
    question: "Why should you particularly look for motorcyclists and cyclists at any junction?",
    answers: [
      { text: "They are harder to see", correct: true },
      { text: "They might not see you turn", correct: false },
      { text: "They may want to turn into the side road", correct: false },
      { text: "They may slow down to let you turn", correct: false }
    ]
  },
  {
    question: "You are driving in slow-moving queues of traffic. Just before changing lane you should:",
    answers: [
      { text: "Look for motorcyclists filtering through the traffic", correct: true },
      { text: "Give a 'slowing down' arm signal", correct: false },
      { text: "Change down to first gear", correct: false },
      { text: "Sound the horn", correct: false }
    ]
  },
  {
    question: "You have a collision while your car is moving. What is the first important thing you must do?",
    answers: [
      { text: "Call your insurance company", correct: false },
      { text: "Stop at the scene of the accident", correct: true },
      { text: "Call the emergency services", correct: false },
      { text: "Stop only if there are injured people", correct: false }
    ]
  },
  {
    question: "When emerging from a side road into a queue of traffic which cars can be especially difficult to see?",
    answers: [
      { text: "Tractors", correct: false },
      { text: "Cars", correct: false },
      { text: "Motorcycles", correct: true },
      { text: "Milk floats", correct: false }
    ]
  },
  {
    question: "Motorcyclists should wear bright clothing mainly so that",
    answers: [
      { text: "The colours are popular", correct: false },
      { text: "They must do so by law", correct: false },
      { text: "Other road users can see them more easily", correct: true },
      { text: "It helps keep them cool in summer", correct: false }
    ]
  }
]

const questionsAll = questionsAccidents.concat(questionsAlertness, questionsAttitude, questionsDocuments, questionsDualCarriageway, questionsHazardAwareness, questionsMiscellaneous, questionsOtherTypes, questionsRoadAndTraffic, questionsRulesOfTheRoad, questionsSafetyMargins, questionsSafetyAndYourVehicle,questionsVehicleLoading, questionsVehicleHandling, questionsVulnerableRoadUsers)
