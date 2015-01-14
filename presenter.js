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


		Quizzy.forEach(function (question){
			var questionDiv = $('<div>')
			.addClass('question ' + question.id)
			.append(
				$('<h3>').html(question.id + '.)  ' + question.text)
			)

			var answer1 = $('<input type = "radio">')
				.attr('name', 'question-' + question.id)
				.attr('value', question.answer1)
					
			var answer2 = $('<input type = "radio">')
				.attr('name', 'question-' + question.id)
				.attr('value', question.answer2)


			$('.quizzy-quiz').append(
				questionDiv 
			)
			$(questionDiv).append(
				answer1,
				question.answer1,
				'<br>',
				answer2,
				question.answer2,
				'<br><br>'
			)
		})
		var name = $('<input type = "text">')
		.attr('name', 'username')
		.attr('placeholder', 'username')
		.addClass('name-field')

		var submit = $('<input type = "submit">')

		$('.quizzy-quiz').append(name)
		$('.quizzy-quiz').append(submit)
	}

	topScores()

	$(document).on('top-scores', topScores)

	function topScores () {
		$('.top-scores-table').html('<thead class="top-scores"><tr><td>Username</td><td>Score</td></tr></thead>')

		if (sessionStorage.getItem('topScores')) {
			var topScores = sessionStorage.getItem('topScores').split('|')
			topScores.pop()
			topScores.forEach(function(quizScore){
				quizScore = quizScore.split(',')

				var entry = $('<tr>')
				.html('<td>' + quizScore[0] + '</td><td>' + quizScore[1] + '</td>')

				$('.top-scores').after(entry)
			})
		}
	}
})()