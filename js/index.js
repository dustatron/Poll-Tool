const View = function(controllers) {
  //buttons
  let buttonZero = document.getElementById('button-0');
  let buttonOne = document.getElementById('button-1');
  let buttonTwo = document.getElementById('button-2');
  let tallyVotes = document.getElementById('winner');

  //Html blocks
  let readOutZero = document.getElementById('vote-0');
  let readOutOne = document.getElementById('vote-1');
  let readOutTwo = document.getElementById('vote-2');
  let tallyButton = document.getElementById('tally')

  buttonZero.addEventListener("click", function() {
    controllers.addVote("apples");
  });

  buttonOne.addEventListener("click", function() {
    controllers.addVote("mangos");
  });

  buttonTwo.addEventListener("click", function() {
    controllers.addVote("grapes");
  });

  tallyButton.addEventListener("click", function() {
    let readOut = controllers.tallyVotes();
    tallyVotes.innerHTML = "";
    for (var key in readOut){
      tallyVotes.innerHTML += key+":"+readOut[key].vote+"<br/>";
    }
  });
};

const Controller = function(votes) {
  this.addVote = function(value) {
    votes.apply(value);
  };

  this.tallyVotes = function() {
    let tally = votes.ballot();
    return tally;
  };
};

const Vote = function() {
  let ballot ={
    "apples":{vote: 0},
    "mangos":{vote: 0},
    "grapes":{vote:0}
  };

  this.ballot = function(value) {
    return ballot;
  }

  this.apply = function(value) {
    let vote = ballot[value].vote;
    let count = vote + 1;
    ballot[value].vote = count;

  }
};


boot = function() {
  let votes = new Vote();
  let controllers = new Controller(votes);
  let views = new View(controllers);

};

boot();
