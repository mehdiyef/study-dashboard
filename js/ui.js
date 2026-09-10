// import { mark_complete } from "./app.js";

function render_tip(tip) {
  const tip_para = document.createElement("p")
  tip_para.textContent = tip;
  document.querySelector(".tip-container").appendChild(tip_para)
}

export function render_topics(topics) {
  let topic_HTML = []
  topics.map((topic) => {
    topic_HTML.push(`
                  
            <div class="border bg-[hsl(227,75%,6%)] border-gray-600  max-w-full rounded-xl text-gray-300">
              <div class="p-5 gap-2 flex flex-col capitalize">
                <div class="border border-${topic.color}-900 bg-${topic.color}-950 w-max rounded-sm py-1 px-3 capitalize">
                  <p class="text-${topic.color}-600">${topic.category}</p>
                </div>
                <h2 class="text-2xl font-bold">${topic.title}</h2>
                <p class="text-gray-400">${topic.description}</p>
                <div class="flex justify-between text-[12px]">
                  <p>difficulty: <span>${topic.difficulty}</span></p>
                  <p class=" "><span>${topic.duration}</span> min</p>
                </div>
              </div>
              <div class="mark-as border-t border-t-gray-500 p-5 flex justify-between items-center">
                <div class="flex gap-2 capitalize items-center ${topic.completed ? "text-green-600" : ""}">
                  <div class="text-2xl">
                    <i class="icon-mark fa-regular cursor-pointer ${topic.completed ? "fa-circle-check" : "fa-circle"}"
                    data-id="${topic.id}"></i>
                  </div>
                  <p>${topic.completed ? "completed" : "mark complete"}</p>
                </div>
                <div>
                  <i class="text-red-800 cursor-pointer fa-solid fa-trash-can"></i>
                </div>
              </div>
            </div>
        `)

  })


  console.log(topic_HTML.join(' '))
  document.querySelector(".topic-card-container").innerHTML = topic_HTML.join("")
}


export function render_total_topic(topics) {

}

export default render_tip