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
  let tallyButton = document.getElementById('tally');
  let alerts = document.getElementById('alert');

  buttonZero.addEventListener("click", function() {
    controllers.addVote("apples");
    readOutZero.innerHTML = controllers.HasVote("apples");
    outOfVotes(controllers.alertStatus());
  });

  buttonOne.addEventListener("click", function() {
    controllers.addVote("mangos");
    readOutOne.innerHTML = controllers.HasVote("mangos");
    outOfVotes(controllers.alertStatus());
  });

  buttonTwo.addEventListener("click", function() {
    controllers.addVote("grapes");
    readOutTwo.innerHTML = controllers.HasVote("grapes");
    outOfVotes(controllers.alertStatus());
  });

  tallyButton.addEventListener("click", function() {
    let readOut = controllers.sort();
    tallyVotes.innerHTML = "First Place is : " + readOut[0][0] + " <br /> Second Place is : " + readOut[1][0];
  });

  let outOfVotes = function(value) {
    console.log(value);
    if(value){
      alerts.className = "alert-on";
    } else {
    }
  };
};

const Controller = function(votes, views) {
  let VotesRemaining = 10;
  let alertOn = false;

  this.addVote = function(value, element) {
    if(VotesRemaining > 0){
    VotesRemaining = VotesRemaining -1;
    votes.apply(value);
  } else {
    alertOn = true;
  }
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

  this.alertStatus = function() {
    return alertOn;
  }

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
