var app = angular.module("anagramApp",[]);
app.controller("firstCtrl", anagramFunc);

function anagramFunc(){
  var index=[];
this.generateAnagrams=()=>{
var input=this.inputText;
this.renderAnagrams = [];

this.quantity=10;
this.anagrams = anagramsGenerator(input);
this.anagrams = this.anagrams.filter( function( item, index, inputArray ) {
 return inputArray.indexOf(item) == index;
    });
this.reRollFunc = ()=>{
    var shuffleArray = this.anagrams.slice();
    for (let i = shuffleArray.length; i; i--) {
      let j = Math.floor(Math.random() * i);
        [shuffleArray[i - 1], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i - 1]];
  }
  for(let i=0;i<index.length;i++){
var temp=shuffleArray[index[i]];
shuffleArray[index[i]]=this.anagrams[index[i]];
this.anagrams[index[i]]=temp;
console.log(shuffleArray[i]+' '+this.anagrams[i])

  }
  console.log(index);
  this.anagrams=shuffleArray;
}
this.stopMutation =(anagram)=>{
  index.push(this.anagrams.indexOf(anagram));
  console.log(index);
}
 }
}

function anagramsGenerator(input){
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
            for (var j = 0; j < sub.length; j++){
                newword = center + sub[j];
                output.push(newword);
            }
        }
        return output;
    }
}
