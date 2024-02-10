//Define a function to format the timestamp
function formatTime(timestamp){
    //Convert the date into a string, then split the string
    let rawDateArr = timestamp.toDateString().split(" ")
    //Save the date into components
    let month = rawDateArr[1]
    let day = rawDateArr[2]
    let year = rawDateArr[3]
    //Check the day and slice off the leading 0 if needed
    if(parseInt(day) < 10){
      day = day.slice(1)
    }
    //Format the minutes/hours cleanly
    let hourMin = timestamp.toLocaleTimeString('en-US')
    //Select the correct ending (10th vs 3rd) for the day number
    let dayEnding = "th"
    if (parseInt(day)%10 < 3){
      if(parseInt(day)%10 == 1){
        dayEnding = "st"
      }
      if(parseInt(day)%10 == 2){
        dayEnding = "nd"
      }
      if(parseInt(day)%10 == 3){
        dayEnding = "rd"
      }
    }
    //Return the processed date out of the function
    return `${month} ${day}${dayEnding}, ${year} at ${hourMin}`
  }

//Export the module for use
module.exports = formatTime;