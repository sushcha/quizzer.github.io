(function () {
var questions = [{
    question: "How many Premier League titles did David Beckham win while at Manchester United?",
    choices: ["Two", "Four", "Five", "Six", "Eight"],
    correctAnswer: 3,
    image: "http://www.thesportsbank.net/core/wp-content/uploads/2013/11/Manchester-United-David-Beckham+cropped.jpg",
    hint: "David Beckham played for United for 10 years. And he was successful more than half the time."
  }, {
    question: "When was the Premier League founded?",
    choices: ["1992", "1888", "1905", "1970", "1918"],
    correctAnswer: 0,
    image: "http://www.mtrstore.com/634-2250-thickbox/77cm-large-premier-league-trophy.jpg",
    hint: "Premier League was formed on February 20, 19xx, after clubs in the Football League First Division decided to break away from the Football League, which was originally founded in 1888"
  }, {
    question: "Which English soccer referee made history by taking charge of 2010 UEFA Champions League Final and 2010 FIFA World Cup Final?",
    choices: ["Mike Dean", "Chris Foy", "Howard Webb", "Martin Atkinson"],
    correctAnswer: 2,
    image: "http://i.telegraph.co.uk/multimedia/archive/02406/Mark_Clattenburg_2406911b.jpg",
    hint: "Highly controversial referee"
  }, {
    question: "Liverpool Football Club won a treble in 2000-01 season, which among the following cups didn't they win?",
    choices: ["Carling Cup", "UEFA Cup", "FA Cup", "League Cup", "World Cup"],
    correctAnswer: 0,
    image: "http://i.telegraph.co.uk/multimedia/archive/01122/gerrard7_1122921c.jpg",
    hint: "They couldn't have possibly won the World Cup"
  }, {
    question: "Which country did England beat in the 1966 FIFA World Cup Final?",
    choices: ["West Germany", "Portugal", "Uruguay", "Argentina", "Wales"],
    correctAnswer: 0,
    image: "http://www.coomberaudio.com/uploads/images/Kerry/About_us/1966%20FIFA%20world%20champions.jpg",
    hint:"They won the last world cup"
  }, {
    question: "Who among the following players has scored the most goals for England football national team?",
    choices: ["Michael Owen", "Wayne Rooney", "Alan Shearer", "Bobby Charlton"],
    correctAnswer: 3,
    image: "http://www.awards-trophies-supplier.co.uk/images/900/900/6966.jpg",
    hint:"Newcastle legend - NOT"
  }];

var questionCounter = 0;
var selections = [];
var quiz = $('#quiz');

displayNext();


  $('#next').click(function(e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');

    }else {
      questionCounter++;
      displayNext();
    }

  });

  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  

  function createQuestionElement(index) {
  var qElement = $('<div>', {id : "question"});

  var header = $('<h2> Question ' + parseInt(index+1) + '</h2>');
  qElement.append(header);

  var image = $('<img>' ,{src: questions[index].image, class:"image"});
  qElement.append(image);

  var question = $('<p>').append(questions[index].question);
  qElement.append(question);

  var radioButtons = createRadioButtons(index);
  qElement.append(radioButtons);

  $('#hint').click(function() {
    var zip = showHint(index);
    qElement.append(zip);
    $('#hint').hide();
    
  })
  
  return qElement;
}

function createRadioButtons(index) {
  var radioList = $('<ul>');
  var item;
  var input = '';
  for( var i=0; i<questions[index].choices.length;i++){
    var item = $('<li>');
    var input = '<input type="radio" name="answer" value=' + i + '>' + questions[index].choices[i] + '</input>';
    item.append(input);
    radioList.append(item);
  }
  return radioList;
}


function showHint(index) {
  var hint = $('<p>').append(questions[index].hint);
  return hint;
  }



function choose() {
  selections[questionCounter] = +$('input[name = "answer"]:checked').val();
}


function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
      $('#hint').show();


    });
  }

  function displayScore() {
    var score = $('<p>', {id: 'question'});

    var numCorrect = 0;
    for (var i =0; i< selections.length; i++) {
      if(selections[i] === questions[i].correctAnswer) {
        numCorrect++;

      }
    }
    
    if(numCorrect == 1) {
    score.append('You got ' + numCorrect + ' question right out of ' + questions.length);
    return score;
  }else {
    score.append('You got ' + numCorrect + ' questions right out of ' + questions.length);
  return score;
  }
  
  }

  

})();