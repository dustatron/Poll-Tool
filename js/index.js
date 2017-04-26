const View = function(controllers) {
  //buttons
  let buttonZero = document.getElementById('button-0');
  let buttonOne = document.getElementById('button-1');
  let buttonTwo = document.getElementById('button-2');
  let winner = document.getElementById('winner');
  let submitButton = document.getElementById('submit-button');

  //Html blocks
  let readOutZero = document.getElementById('vote-0');
  let readOutOne = document.getElementById('vote-1');
  let readOutTwo = document.getElementById('vote-2');
  let tallyButton = document.getElementById('tally');
  let alerts = document.getElementById('alert');
  let tallySection = document.getElementById('tally-section');
  let voteSection = document.getElementById('vote-section');
  let addSection = document.getElementById('add-section');
  let otherSection = document.getElementById('other-section');
  let listOut = document.getElementById('list-out');


  let allSections = [voteSection, addSection, tallySection, otherSection];

  //nav bar
  let homeNav = document.getElementById('home-nav');
  let tallyNav = document.getElementById('tally-nav');
  let addNav = document.getElementById('add-nav');
  let otherNav = document.getElementById('other-nav');


///// buttons

  submitButton.addEventListener("click", function() {
    let addName = document.getElementById('addName').value;
    controllers.addToBallot(addName);
  })



////// NAV SHOW HIDE ////
  homeNav.addEventListener("click" ,function() {
    hideAll();
    voteSection.className = "show";
    print();

  })

  tallyNav.addEventListener("click" ,function() {
    let readOut = controllers.sort();
    hideAll();
    winner.innerHTML = "First Place is : " + readOut[0].name + " <br /> Second Place is : " + readOut[1].name;
    tallySection.className = "show";

  })

  addNav.addEventListener("click" ,function() {
    hideAll();
    addSection.className = "show";

  })

  otherNav.addEventListener("click" ,function() {
    hideAll();
    otherSection.className = "show";

  })

///// Helper functions ////
  let print = function() {
    let listItems = controllers.ballotNow();
    let counter = 0
    listOut.innerHTML ="";

    listItems.forEach(function(value) {
      let button = 'button-'+counter+
      counter ++;
      listOut.innerHTML += '<li> <button id="'+counter+'" class="vote-button btn btn-danger" type="button" name="button">' + value.name + '</button> <span id="vote-'+counter+'">  :Vote Count</span> '+ value.vote + "</li>";
    }); //END forEach

    voteButtons();

};

  let voteButtons = function() {
    elementList = document.querySelectorAll('.vote-button');
    elementList.forEach(function(key) {
      console.log(key);
      let keyId = key.id -1;
      console.log(keyId);
      key.addEventListener("click", function() {
        controllers.addVote(keyId);
        outOfVotes();
        print();
      });
    });

  };

  let hideAll = function() {
    allSections.forEach(function(callback){
      callback.className = "hide";
    });
  };

  let outOfVotes = function() {
    if(controllers.alertStatus()){
      alerts.className = "alert-on";
    } else {
    }
  };

  print();
}; /// END OF VIEW

const Controller = function(votes, views) {
  let VotesRemaining = 10;
  let alertOn = false;

  this.ballotNow = function() {
    return votes.ballot();
  };

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

    let sortedByVotes = ballotObj.sort(function(a,b) {
        return b.vote-a.vote;
      });

    return sortedByVotes;
  };

  this.alertStatus = function() {
    return alertOn;
  };

  this.addToBallot = function(name) {
    votes.add(name);
  };


};// END Controller

const Vote = function() {
  let ballot =[
    {
    name: "apples",
    vote: 0
    },
    {
    name: "mangos",
    vote: 0
    },
    {
    name: "grapes",
    vote: 0
    },
];

  this.ballot = function(value) {
    return ballot;
  };

  this.get = function(value) {
    return ballot[value].vote;
  };

  this.apply = function(value) {
    ballot[value].vote ++;
    console.log(ballot[value].vote);
    //ballot[0].vote = count;

  };

  this.add = function(name) {
    let newName = {name : name, vote: 0};
    console.log(name);
    ballot.push(newName);
    console.log(ballot);
  };
};


boot = function() {
  let votes = new Vote();
  let controllers = new Controller(votes);
  let views = new View(controllers);

};

boot();
