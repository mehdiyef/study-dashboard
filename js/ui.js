// import { mark_complete } from "./app.js";



function render_tip(tip) {
  const tip_para = document.createElement("p")
  tip_para.textContent = tip[0]
  tip_para.classList.add("text-red-800")

  function animation_tip() {

    setInterval(() => {
      tip_para.textContent = tip[Math.floor(Math.random() * tip.length)];
    }, 6000)
  }

  animation_tip()
  document.querySelector(".tip-container").appendChild(tip_para)
}

export function render_topics(topics) {

  if (topics.length > 0) {
    const topic_HTML = []
    topics.map((topic) => {
      const color = get_color(topic.category);
      topic_HTML.push(`
  <div class="border shadow-sm shadow-gray-500 bg-[hsl(227,90%,4%)] border-gray-600 max-w-full rounded-xl text-gray-300">

    <div class="p-5 gap-2 flex flex-col capitalize">

      <div class="border ${color.border} ${color.background} w-max rounded-sm py-1 px-3 capitalize">
        <p class="${color.text}">${topic.category}</p>
      </div>

      <h2 class="text-2xl font-bold">${topic.title}</h2>

      <p class="text-gray-400">${topic.description}</p>

      <div class="flex justify-between text-[12px]">
        <p>difficulty: <span>${topic.difficulty}</span></p>

        <div>
          <p><span>${topic.duration}</span> min</p>
        </div>
      </div>

    </div>

    <div class="mark-as border-t border-t-gray-500 p-5 flex justify-between items-center">

      <div class="flex gap-2 capitalize items-center ${topic.completed ? "text-green-600" : ""}">

        <div class="text-2xl">
          <i
            class="icon-mark fa-regular cursor-pointer ${topic.completed ? "fa-circle-check" : "fa-circle"}"
            data-id="${topic.id}"
          ></i>
        </div>

        <p>${topic.completed ? "completed" : "mark complete"}</p>

      </div>

      <div>
        <i
          class="delete-topic text-red-800 cursor-pointer fa-solid fa-trash-can"
          data-id="${topic.id}"
        ></i>
      </div>

    </div>

  </div>
`);

    })
    // console.log(topic_HTML.join(' '))
    document.querySelector(".topic-card-container").innerHTML = topic_HTML.join("")
  }



  else {
    document.querySelector(".topic-card-container").innerHTML = '<p class="text-center">No topics found...</p>'
    document.querySelector(".load-more").classList.add("hidden")
  }

}


function get_color(category) {
  switch (category) {
    case "HTML":
      return {
        border: "border-sky-900",
        background: "bg-sky-950",
        text: "text-sky-600"
      };

    case "Css":
      return {
        border: "border-purple-900",
        background: "bg-purple-950",
        text: "text-purple-600"
      };

    case "javascript":
      return {
        border: "border-orange-900",
        background: "bg-orange-950",
        text: "text-orange-600"
      };

    case "backend":
      return {
        border: "border-blue-900",
        background: "bg-blue-950",
        text: "text-blue-600"
      };

    case "Tailwind":
      return {
        border: "border-red-900",
        background: "bg-red-950",
        text: "text-red-600"
      };

    case "react":
      return {
        border: "border-cyan-900",
        background: "bg-cyan-950",
        text: "text-cyan-600"
      };

    case "git":
      return {
        border: "border-green-900",
        background: "bg-green-950",
        text: "text-green-600"
      };

    default:
      return {
        border: "border-gray-900",
        background: "bg-gray-950",
        text: "text-gray-600"
      };
  }
}

export function render_total_topic(topics) {
  document.querySelector(".total-topic").textContent = topics.length
}

export function render_completed_topic(topics) {

  document.querySelector(".completed").textContent = topics.length

}

export function render_progrss_bar(topics, completed) {

  const persent_calc = (completed.length * 100) / topics.length
  console.log(persent_calc.toFixed(2))

  const progress_bar = document.querySelector(".progress-bar")
  progress_bar.style.width = `${persent_calc}%`
  document.querySelector(".progress-num").textContent = persent_calc.toFixed(0) + "%"

  document.querySelector(".completion").textContent = persent_calc.toFixed(0)
}


export function render_average_difficulty(topics) {
  let difficulty = 0
  difficulty = topics.reduce((sum, topic) => {
    return sum += topic.difficulty
  }, 0)

  console.log(difficulty)

  document.querySelector(".average-difficulty").textContent = (difficulty / topics.length).toFixed(1)

}

export function error_display(err) {

  document.querySelector(".body").innerHTML = `

    <div class="relative pb-10 h-full mt-48 px-5">
      <p class="text-center"><span class="font-bold">Error...</span>, unable to load topics please try again...</p>

      <div class="w-full mx-auto">
      <button class="bg-blue-700 px-3 py-1 rounded-lg cursor-pointer">Retry</button>
      </div>
    </div>

`

}

export default render_tip