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
    readOutZero.innerHTML = controllers.HasVote("apples");
  });

  buttonOne.addEventListener("click", function() {
    controllers.addVote("mangos");
    readOutOne.innerHTML = controllers.HasVote("mangos");
  });

  buttonTwo.addEventListener("click", function() {
    controllers.addVote("grapes");
    readOutTwo.innerHTML = controllers.HasVote("grapes");
  });

  tallyButton.addEventListener("click", function() {
    let readOut = controllers.sort();
    tallyVotes.innerHTML = "Winner is : " + readOut[0][0];

  });
};

const Controller = function(votes) {
  this.addVote = function(value) {
    votes.apply(value);
  };

  this.HasVote = function(value) {
    return votes.get(value);
  }

  this.sort = function() {
    let ballotObj = votes.ballot();
    let sortable = [];

    for(var key in ballotObj) {
      let vote = ballotObj[key].vote;
       sortable.push([key, vote]);
    };

    let sortedByVotes = sortable.sort(function(a,b) {
        return b[1]-a[1];
      });
    return sortedByVotes;
  };


};// END Controller

const Vote = function() {
  let ballot ={
    "apples":{vote: 0},
    "mangos":{vote: 0},
    "grapes":{vote:0}
  };

  this.ballot = function(value) {
    return ballot;
  }

  this.get = function(value) {
    return ballot[value].vote;
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
