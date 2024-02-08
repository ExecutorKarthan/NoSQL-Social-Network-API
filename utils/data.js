const createUser = (array, int) =>{
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
    var username = usernames[Math.floor(Math.random()*5)]
    const reaction1 = {
        reactionBody, 
        username
    }

    reactionBody = reactionOps[Math.floor(Math.random()*5)]
    username = usernames[Math.floor(Math.random()*5)]
    const reaction = {
        reactionBody, 
        username
    }

    const reactions = {
        reactionBody, 
        username
    }

    const thoughtText = thoughtBase[int]
    const thoughts = {thoughtText, 
        username, 
        reactions,
    }
    //const friends = [usernames[Math.floor(Math.random()*5)], usernames[Math.floor(Math.random()*5)]]
    const email = emails[int]
    username = usernames[int]
    const user = {
        username,
        email,
        thoughts,
        //friends
    }

    array.push(user)
    
    return array
}

module.exports = {createUser}