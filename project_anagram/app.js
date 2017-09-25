var app = angular.module("anagramApp", []);
app.controller("firstCtrl", anagramFunc);
//controller function to define the dynamic properties of App
function anagramFunc($http) {
  var index = [];
  this.renderAnagrams = [];
  this.quantity = 10;
  //function to generate gibberish anagrams by using another function called anagramsGenerator below by passing input value
  this.generateAnagrams = () => {
    var input = this.inputText;
    this.anagrams = anagramsGenerator(input);
  }
  // re roll function to reroll the anagrams array by using shuffling of the array
  this.reRollFunc = () => {
    shuffleArray = [];
    //shuffle the array by taking a copy of anagrams array
    var shuffleArray = this.anagrams.slice();
    console.log(shuffleArray);
    //iterating through the array and shuffling the array by swaping random values
    for (let i = shuffleArray.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [shuffleArray[i - 1], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i - 1]];
    }
    //making sure the selected values doesn't swap with the reroll and replacing them back in  the shuffleArray
    for (let i = 0; i < index.length; i++) {
      var temp = this.anagrams[index[i]];
      shuffleArray[index[i]] = this.anagrams[index[i]];
      this.anagrams[index[i]] = temp;
    }
    //making anagrams array and shuffleArray equal
    this.anagrams = shuffleArray;
  }
  //I hope this can be done by making a api request for eg.anagramica is a site which provides apis for the anagrams for the given string,
  //  or else we can create node backend and using npm module called anagramica anade create a response for the meaningful anagrams or else we
  // can use a file called dictionary.txt to list all english words and then use them to get all matching anagrams for a given string
  this.viableAnagrams = () => {
    // $http({
    //   url: "http://www.anagramica.com/lookup/:word",
    //   method: "GET",
    //   data: []
    // }).success(function(data) {
    //   console.log(data);
    // });
  }
  // used to track checkboxes by their index and store then indexes in a array to use them to swap in the shuffleArray
  this.stopMutation = (anagram) => {
    index.push(anagram);
    console.log(index);
  }
  // used to sort the array by name
  this.sortBy = function(propertyName) {
    this.reverse = (this.propertyName === propertyName) ? !this.reverse : false;
    this.propertyName = propertyName;
  };
}
// used to generate anagrams by using each letter in a string to create a different word and create all patterns of a word or string to create another word or string(permutations)
function anagramsGenerator(input) {
  if (input.length < 2) {
    return [input];
  } else {
    var output = [];
    var left, center, right;
    var short, sub, newword;
    for (var i = 0; i < input.length; i++) {
      left = input.slice(0, i);
      center = input[i];
      right = input.slice(i + 1, input.length + 1);
      short = left + right;
      sub = anagramsGenerator(short);
      for (var j = 0; j < sub.length; j++) {
        newword = center + sub[j];
        output.push(newword);
      }
    }
    return output;
  }
}
