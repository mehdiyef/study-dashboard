import fetchData from "./api.js"
import render_tip, { render_topics } from "./ui.js"

const side_bar_btn = document.querySelector(".side-bar-btn")
const side_bar = document.querySelector(".side-bar")
const add_topic_tooltip = document.querySelector(".add-topics")
const add_form_displayer = document.querySelector(".add-topics-btn")
const add_topic_form = document.querySelector(".add-topics-form")
const side_bar_remover = document.querySelector(".side-bar-remover")
const toogle = document.querySelector(".toogle")


const title = document.querySelector(".title-input")
const catagory = document.getElementById("catagory")
const difficulty = document.getElementById("difficulty")
const discription = document.getElementById("discription")
const add_topic_button = document.getElementById("add-topics-to")

const mark_as = document.querySelectorAll(".mark-as")
const mark_icon = document.querySelectorAll(".icon-mark")

console.log(mark_as)

let is_form_displayed = false;
let is_sidebar_displayed = false;
let is_toogle_on = false;

const datas = await fetchData()

const topics = JSON.parse(localStorage.getItem("topics")) || datas[0]
const tip = datas[1]
console.log(topics)
console.log(tip)

render_tip(tip.tip)
render_topics(topics);
addMarkListeners();


add_topic_button.addEventListener("click", (e) => {
  e.preventDefault()
  topics.push({
    id: crypto.randomUUID(),
    title: title.value,
    catagory: catagory.value,
    color: get_color(catagory.value),
    difficulty: difficulty.value,
    duration: Number(difficulty.value) * 10,
    completed: false,
    description: discription.value
  })

  render_topics(topics)
  addMarkListeners()
  console.log(topics)

})

function get_color(category) {
  if (category === "JavaScript") {
    return "yellow";
  }

  if (category === "React") {
    return "blue";
  }

  if (category === "CSS") {
    return "purple";
  }

  if (category === "HTML") {
    return "orange";
  }

  return "gray";
}
// MARK AS COMPLET EVENT HANDLER
function addMarkListeners() {
  document.querySelectorAll(".icon-mark").forEach(icon => {
    icon.addEventListener("click", () => {
      mark_complete(icon.dataset.id);
    });
  });
}

// TOOGLE EVENT HANDLER

toogle.addEventListener("click", () => {
  if (!is_toogle_on) {
    toogle.classList.remove("fa-toggle-off")
    toogle.classList.add("fa-toggle-on")
    is_toogle_on = true
  }
  else {
    toogle.classList.add("fa-toggle-off")
    toogle.classList.remove("fa-toggle-on")
    is_toogle_on = false
  }
})

// ADD TOPICS EVENT HANDLER

add_form_displayer.addEventListener("mouseover", () => {
  add_topic_tooltip.classList.remove("scale-x-0")
  add_topic_tooltip.classList.add("scale-x-100")
})

add_form_displayer.addEventListener("mouseout", () => {
  add_topic_tooltip.classList.add("scale-x-0")
  add_topic_tooltip.classList.remove("scale-x-100")
})

add_form_displayer.addEventListener("click", () => {
  if (!is_form_displayed) {

    add_topic_form.classList.remove("-right-full")
    add_topic_form.classList.add("right-5")
    is_form_displayed = true

  }

  else {
    add_topic_form.classList.add("-right-full")
    add_topic_form.classList.remove("right-5")
    is_form_displayed = false
  }
})

// SIDE BAR DISPLAYER EVENT HANDLER

side_bar_btn.addEventListener("click", () => {
  if (!is_sidebar_displayed) {
    side_bar.classList.remove("-left-full")
    side_bar.classList.add("left-0")
    is_sidebar_displayed = true
  }

})

// SIDE BAR REMOVER EVENT HANDLER

side_bar_remover.addEventListener("click", () => {
  if (is_sidebar_displayed) {
    side_bar.classList.add("-left-full")
    side_bar.classList.remove("left-0")
    is_sidebar_displayed = false
  }
})

function mark_complete(id) {
  const to_be_complet = topics.find(
    topic => topic.id === Number(id)
  );

  if (!to_be_complet.completed) {
    to_be_complet.completed = true
    render_topics(topics);
    addMarkListeners();
    localStorage.setItem("topics", JSON.stringify(topics))
  }

  else {
    to_be_complet.completed = false
    render_topics(topics);
    addMarkListeners();
    localStorage.setItem("topics", JSON.stringify(topics))
  }



  console.log(to_be_complet);
}

