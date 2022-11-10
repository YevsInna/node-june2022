const userBuilder = (name, age)=>{
    return {
        name,
        age,
        sleep: ()=>{
            console.log(`I want sleep`)
        }
    }
}
module.exports={
    userBuilder
}