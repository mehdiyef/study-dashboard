import { error_display } from "./ui.js";

async function fetchData() {

  try {
    const [topics, tips] = await Promise.all([

      fetch("../data/topics.json"),
      fetch("../data/tip.json")

    ])
    return [await topics.json(), await tips.json()]
  }

  catch (err) {

    error_display(err);

  }


}



export default fetchData