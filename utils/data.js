const createUser = (userArray, int) =>{
    const usernames = [
        'joe45',
        'hank77',
        'the-great-james',
        'sally-forth',
        'julia_hammers985'
    ]
    
    const emails = [
        'joe@gmail.com',
        'hughug@aol.com',
        'tgj@hotmail.com',
        "onwward@upward-sideward.com",
        'hammer.away@gmail.com'
    ]
    
    const username = usernames[int]
    const email = emails[int]
    const user = {
        username,
        email,
    }

    userArray.push(user)
    
    return userArray
}

const  createThoughts = async (userArray, thoughtArray, i) => {

    const thoughtBase = [
        "I like hank!",
        "Sally is cool",
        "Joe is the best",
        "Julia is the tops",
        "James is a good partner"
    ]
    
    const reactionOps = [
        "Ditto",
        "Liked", 
        "Disliked",
        "Yep!",
        "Nope"
    ] 
    
    var reactionBody = reactionOps[Math.floor(Math.random()*5)]
    var username = userArray[Math.floor(Math.random()*5)].username

    const reactions = {
        reactionBody, 
        username
    }

    const thoughtText = thoughtBase[i]
    username = userArray[i].username
    const thoughts = {
        thoughtText,
        username, 
        reactions,
    }

    thoughtArray.push(thoughts)

    return thoughtArray
}

module.exports = {createUser, createThoughts}