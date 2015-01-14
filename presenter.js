// Presenter
(function(){

	// Seed with random data.
	Quizzy.add('The answer is 2', '1', '2', '2')
	Quizzy.add('The answer is red', 'red', 'blue', 'red')
	Quizzy.add('The answer is 42', '1337', '42', '42')

	renderQuestions();

	$(document).on('new-question', renderQuestions)

	function renderQuestions () {
		$('.quizzy-quiz').empty()

		// if (sessionStorage.getItem('topScores')) var data = sessionStorage.getItem('topScores').split('|')

		Quizzy.forEach(function (question){
			// var answersToQuestion = 0
			// var correctAnswersToQuestion = 0

			// if (sessionStorage.getItem('topScores')) {
			// 	data.forEach(function(entry){
			// 		console.log(entry.split(',')[question.id + 2]) === question.correctAnswer
			// 	})
			// }

			var questionDiv = $('<div>')
			.addClass('question-' + question.id)
			.append(
				$('<h3>').html(question.id + '.)  ' + question.text)
			)

			var answer1 = $('<input type = "radio">')
				.attr('name', 'question-' + question.id)
				.attr('value', question.answer1)
					
			var answer2 = $('<input type = "radio">')
				.attr('name', 'question-' + question.id)
				.attr('value', question.answer2)

			var percentageCorrectSpan = $('<span>').addClass('percentage-correct-question-' + question.id)

			$('.quizzy-quiz').append(
				questionDiv 
			)
			$(questionDiv).append(
				answer1,
				question.answer1,
				'<br>',
				answer2,
				question.answer2,
				'<br>',
				'<br>',
				percentageCorrectSpan,
				'<br>'
			)
		})
		var name = $('<input type = "text">')
		.attr('name', 'username')
		.attr('placeholder', 'username')
		.addClass('name-field')

		var submit = $('<input type = "submit">')

		$('.quizzy-quiz').append('<br>', name, submit)
	}

	topScores()

	$(document).on('top-scores', topScores)

	function topScores () {
		$('.top-scores-table').empty()

		var thead = $('<thead>').addClass('top-scores')
		var tr = $('<tr>')
		var username = $('<td>').text('Username')
		var score = $('<td>').text('Score')
		$('.top-scores-table').append(thead)
		$(thead).append(tr)
		$(tr).append(username)
		$(tr).append(score)

		if (sessionStorage.getItem('topScores')) {
			var topScores = sessionStorage.getItem('topScores').split('|')
			topScores.pop()
			topScores.forEach(function(quizScore){
				quizScore = quizScore.split(',')

				var entry = $('<tr>')
				.html('<td>' + quizScore[0] + '</td><td>' + quizScore[1] + '</td>')

				$('.top-scores').after(entry)
			})

			Quizzy.forEach(function(question){
				var answersToQuestion = 0
				var correctAnswersToQuestion = 0

				topScores.forEach(function(entry){
					// console.log('logged answer ', entry.split(',')[question.id + 1])
					// console.log('correct answer ', question.correctAnswer)
					answersToQuestion++
					if (entry.split(',')[question.id + 1] === question.correctAnswer) correctAnswersToQuestion++
				})

				var percentageCorrect = Math.round((correctAnswersToQuestion / (answersToQuestion)) * 100)

				$('.percentage-correct-question-' + question.id).text('Users got this question right ' + percentageCorrect + '% of the time.')
			})
		}
	}
})()