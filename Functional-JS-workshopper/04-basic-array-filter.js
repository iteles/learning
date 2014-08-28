//The filter() method creates a new array with all elements that pass the test implemented by the provided function.

function getShortMessages(messages) {

//THIS SOLUTION IS NOT CORRECT YET!!

    function over50(input){
      return input.length<=50;
    }

    return messages.filter(over50);
}

module.exports = getShortMessages;
