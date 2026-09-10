async function fetchData() {

    try {
        const [topics, tips] = await Promise.all([
            fetch("../data/topics.json"),
            fetch("../data/tip.json")
        ])
        return [await topics.json(), await tips.json()]
    }
    catch(err){
        console.log(err)
    }


}



export default fetchData