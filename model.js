// Model IIFE
(function(){
	// Private
	var quiz = []
	var questionCounter = 1

	// Public
	window.Quizzy = {}

	// Transaction Script
	Quizzy.add = function (text, answer1, answer2, correctAnswer){
		if (! text){
			return { error: 'text_required' }
		}
		if (! answer1){
			return { error: 'answer1_required' }
		}
		if (! answer2){
			return { error: 'answer2_required' }
		}
		if (! correctAnswer){
			return { error: 'correctAnswer_required'}
		}

		var question = {
			id: questionCounter,
			answered: false,
			text: text,
			answer1: answer1,
			answer2: answer2,
			correctAnswer: correctAnswer
		}

		quiz.push(question)
		questionCounter++

		$(document).trigger('new-question')

		return { success: true }
	}

	Quizzy.find = function (id){
		for (var i = 0; i < quiz.length; i++){
			if (quiz[i]. id === id){return quiz[i]}
		}
	}

	Quizzy.markComplete = function (questionId, isAnswered) {
		var question = Quizzy.find(questionId)
		if (question){question.answered = !!isAnswered}
	}
	
	Quizzy.forEach = function(callback){
		for (var i = 0; i < quiz.length; i++){
			callback( extend({}, quiz[i]))
		}
	}

})()