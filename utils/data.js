//Create a function to create mock users for testing purposes
const createUser = (userArray, int) =>{
    //Create an array of user names
    const usernames = [
        'joe45',
        'hank77',
        'the-great-james',
        'sally-forth',
        'julia_hammers985'
    ]
    //Create an array of emails
    const emails = [
        'joe@gmail.com',
        'hughug@aol.com',
        'tgj@hotmail.com',
        "onwward@upward-sideward.com",
        'hammer.away@gmail.com'
    ]
    //Pull a username and email based on where in the loop you are and make them an object
    const username = usernames[int]
    const email = emails[int]
    const user = {
        username,
        email,
    }
    //Push the object to an array
    userArray.push(user)
    //Return the array for use
    return userArray
}

//Create a function to make mock thoughts for testing purposes
const createThoughts = async (userArray, thoughtArray, i) => {
    //Create an array of thought bodies
    const thoughtBase = [
        "I like hank!",
        "Sally is cool",
        "Joe is the best",
        "Julia is the tops",
        "James is a good partner"
    ]
    //Create an array of reaction options
    const reactionOps = [
        "Ditto",
        "Liked", 
        "Disliked",
        "Yep!",
        "Nope"
    ] 
    //Randomly select a reaction and who said it, then convert that into an object
    var reactionBody = reactionOps[Math.floor(Math.random()*5)]
    var username = userArray[Math.floor(Math.random()*5)].username
    const reactions = {
        reactionBody, 
        username
    }
    //Select a thought, though put it and then make it into an oject, including its reactions
    const thoughtText = thoughtBase[i]
    username = userArray[i].username
    const thoughts = {
        thoughtText,
        username, 
        reactions,
    }
    //Push the resulting object to an array
    thoughtArray.push(thoughts)
    //Return the array for use
    return thoughtArray
}

//Export the functions for use
module.exports = {createUser, createThoughts}