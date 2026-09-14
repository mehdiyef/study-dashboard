import { error_display } from "./ui.js";

async function fetchData() {
  try {
    const [topics, tips] = await Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/topics.json`),
      fetch(`${import.meta.env.BASE_URL}data/tip.json`)
    ]);

    if (!topics.ok || !tips.ok) {
      throw new Error("Could not load JSON data");
    }

    return [
      await topics.json(),
      await tips.json()
    ];

  } catch (err) {
    error_display(err);
  }
}

export default fetchData;