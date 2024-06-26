import { render, getFormValues } from "./framework/engine.js"
import Framework from "./framework/framework.js"
import Input from "./components/input.js"
import List from "./components/list.js"
import Form from "./components/form.js"
import Link from "./components/link.js"
import Component from "./components/component.js"

// Initialize the framework
const win = new Framework()


// Create the Header Component
const header = new Component("header", { id: "header" })
const title = new Component("h1", { id: "title" }, ["TO:DO List"])
const input = new Input({ id: "input", placeholder: "Add your task here", name: "task", type: "text" })
const checkAll = new Input({ id: "checkAll", type: "button", value: "Check all" })
const form = new Form({ id: "task-manager" }, checkAll, input)
form.actionListener("submit", (e) => {
    const task = getFormValues(e).task;
    list.update(task, list.counter)
})
header.addElement(title, form)
win.addComponent(header)

// Create the Main Component
const main = new Component("main", { id: "main" })
const list = new List({ id: "list" })
checkAll.actionListener('click', () => {
    list.checkAll()
})
main.addElement(list)
win.addComponent(main)
// list.routeBinder = (routes) => { win.setRoutes(routes) }

//Creating List Footer
const listFooter = new Component("div", { id: "list-footer" })
const linkBox = new Component("div", { id: "link-box", className: "link-box" })
const link = new Link("All")
const link2 = new Link("Active")
const link3 = new Link("Completed")
const clear = new Input({ id: "clear-completed", type: "button", value: "Clear Completed" })
clear.actionListener('click', () => {
    list.clearCompleted()
})

win.setRoutes([
    ["/", () => { list.all() }, link],
    ["/#/active", () => { list.filterChild(false)}, link2],
    ["/#/completed", () => [ list.filterChild(true)], link3]
])

linkBox.addElement(link, link2, link3)
listFooter.addElement(list.counter, linkBox, clear)

list.addFooter(render(listFooter))

// Create the Footer Component
const footer = new Component("footer", { id: "footer" })
const p1 = new Component("p", {}, "Double-click to edit a todo")
const p2 = new Component("p", {}, "Created by Dream Team")
const p3 = new Component("p", {}, "Part of mini-framework project")
footer.addElement(p1, p2, p3)
win.addComponent(footer)


// Render the Page
win.render()