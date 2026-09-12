import fetchData from "./api.js"
import render_tip, { render_topics, render_total_topic, render_completed_topic, render_progrss_bar, render_average_difficulty } from "./ui.js"


const side_bar_btn = document.querySelector(".side-bar-btn")
const side_bar = document.querySelector(".side-bar")
const add_topic_tooltip = document.querySelector(".add-topics")
const add_form_displayer = document.querySelector(".add-topics-btn")
const add_topic_form = document.querySelector(".add-topics-form")
const side_bar_remover = document.querySelector(".side-bar-remover")
const toogle = document.querySelector(".toogle")
// const load_more = document.querySelector(".load-more")
const catagory_list = document.querySelector(".catagory-list")
const sort = document.querySelector(".sort")

const search_input = document.querySelector(".search-input")

const title = document.querySelector(".title-input")
const catagory = document.getElementById("catagory")
const difficulty = document.getElementById("difficulty")
const discription = document.getElementById("discription")
const add_topic_button = document.getElementById("add-topics-to")

const mark_as = document.querySelectorAll(".mark-as")
const body = document.querySelector(".body")


console.log(mark_as)

let is_form_displayed = false;
let is_sidebar_displayed = false;
let is_toogle_on = true;

const datas = await fetchData()
let topics = JSON.parse(localStorage.getItem("topics")) || datas[0]
const tip = datas[1]

// function more_loader() {

//   let initial_displayeda_topic = 8;
//   const topics = [...datas[0]]
//   topics = topics.slice(0, initial_displayeda_topic)
//   load_more.addEventListener("click", () => {
//     initial_displayeda_topic += 4
//     render_topics(topics.splice(0, initial_displayeda_topic))
//     console.log(topics)
//     more_loader()
//   })
// }

console.log(topics)
console.log(tip)

render_tip(tip)
render_topics(topics);
// more_loader()
render_average_difficulty(topics)

function completed_topics() {
  const completed_topics = topics.filter(topic => {
    return topic.completed === true
  })
  render_completed_topic(completed_topics)
  render_progrss_bar(topics, completed_topics)
  return completed_topics
}

sort.addEventListener("input", () => {

  let sorted_topic = []
  if (sort.value === "difficulty") {

    sorted_topic = [...topics].sort((a, b) => a.difficulty - b.difficulty)
    console.log(sorted_topic)
    render_topics(sorted_topic)
    addMarkListeners();
    delete_topics();

  }

  else if (sort.value === "time") {
    sorted_topic = [...topics].sort((a, b) => a.duration - b.duration)
    console.log(sorted_topic)
    render_topics(sorted_topic)
    addMarkListeners();
    delete_topics();
  }

  else {
    render_topics(topics)
  }

})

// display topics by catagory

catagory_list.addEventListener("input", () => {
  if (catagory_list.value === "all catagories") {

    render_topics(topics)
    addMarkListeners();
    delete_topics();

  }
  else {
    render_topics(topics.filter(topic => {
      return topic.category.toLowerCase() === catagory_list.value.toLowerCase()
    }))
    addMarkListeners();
    delete_topics();
  }
})

// search bar event handler

search_input.addEventListener("input", () => {
  const search_val = search_input.value.toLowerCase()
  console.log(search_val)

  const topic_searched = topics.filter(topic => {
    return topic.title.toLowerCase().includes(search_val)
  })

  console.log(topic_searched)
  // const to_be_search = topics.filter(topic => topic.title.includes(title.value))
  // console.log(to_be_search)

  render_topics(topic_searched)
  addMarkListeners();
  delete_topics();
})


// add topics btn event controler

add_topic_button.addEventListener("click", (e) => {

  e.preventDefault();

  if (title.value && discription.value) {
    topics.push({
      id: crypto.randomUUID(),
      title: title.value,
      category: catagory.value,
      difficulty: Number(difficulty.value),
      duration: Number(difficulty.value) * 10,
      completed: false,
      description: discription.value
    })
    add_topic_form.classList.add("-right-full")
    add_topic_form.classList.remove("right-5")
    is_form_displayed = false

    render_topics(topics);
    render_average_difficulty(topics)
    addMarkListeners();
    render_total_topic(topics);
    localStorage.setItem("topics", JSON.stringify(topics))
  }

  title.value = "";
  discription.value = "";
  const completed = completed_topics()
  console.log(completed)
  render_progrss_bar(topics, completed)
  delete_topics()
})

// MARK AS COMPLET EVENT HANDLER
function addMarkListeners() {
  document.querySelectorAll(".icon-mark").forEach(icon => {
    icon.addEventListener("click", () => {
      mark_complete(icon.dataset.id);
      localStorage.setItem("topics", JSON.stringify(topics))
    });
  });
}


function mark_complete(id) {

  const to_be_complet = topics.find(
    topic => topic.id === id

  );
  console.log(to_be_complet)

  if (!to_be_complet.completed) {
    to_be_complet.completed = true
    render_topics(topics);
    addMarkListeners();
    delete_topics()
    completed_topics()
    localStorage.setItem("topics", JSON.stringify(topics))
  }

  else {
    to_be_complet.completed = false
    render_topics(topics);
    addMarkListeners();
    completed_topics()
    delete_topics()
    localStorage.setItem("topics", JSON.stringify(topics))
  }

  console.log(to_be_complet);
}

// delete topics event handler

function delete_topics() {
  document.querySelectorAll(".delete-topic").forEach((icon) => {
    icon.addEventListener("click", () => {
      delete_topics_fun(icon.dataset.id)
      render_total_topic(topics)
      const completed = completed_topics()
      render_progrss_bar(topics, completed)
      localStorage.setItem("topics", JSON.stringify(topics))
    })
  })
}

function delete_topics_fun(id) {

  const to_be_deleted = topics.find(
    topic => topic.id == id
  );

  topics.splice(topics.indexOf(to_be_deleted), 1)
  render_topics(topics)
  delete_topics()
  addMarkListeners()

  if (to_be_deleted.completed === true) {
    completed_topics(topics)
  }



  console.log(topics)

}


// TOOGLE EVENT HANDLER

toogle.addEventListener("click", () => {
  if (is_toogle_on) {

    toogle.classList.add("fa-toggle-off")
    toogle.classList.remove("fa-toggle-on")

    document.documentElement.classList.toggle("dark");

    is_toogle_on = false
  }
  else {
    toogle.classList.remove("fa-toggle-off")
    toogle.classList.add("fa-toggle-on")
    document.documentElement.classList.toggle("dark");
    is_toogle_on = true
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


completed_topics()
addMarkListeners();
delete_topics()
render_total_topic(topics)

