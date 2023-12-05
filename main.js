let cardID = null;
const titleInput = document.getElementById("title")
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")
const textArea = document.getElementById("desc")
const container = document.getElementById("blog-container")

async function getData() {
    try {
        const data = await fetch("http://localhost:3000/blogs")
        const response = await data.json()
        if (response.length < 1) {
            const warn = document.createElement("h3")
            warn.className = "font-bold text-2xl text-center text-black-500 w-full"
            warn.innerText = "Data not found!"
            container.appendChild(warn)
        } else {
            for (const x of response) {

                const blog = document.createElement("div")
                blog.className = "w-[23.5%] bg-green-50 px-4 py-5 space-y-2"

                const title = document.createElement("h3")
                title.className = "text-2xl font-bold text-center"
                title.innerText = x.Title

                const name = document.createElement("h4")
                name.className = "text-xl font-semibold text-center"
                name.innerText = x.firstName + " " + x.lastName

                const desc = document.createElement("p")
                desc.className = "text-base font-normal text-center"
                desc.innerText = x.dec

                const time = document.createElement("p")
                time.className = "text-base font-normal text-center"
                time.innerText = x.created

                const iconContainer = document.createElement("div");
                iconContainer.className = "flex justify-between items-center"

                const trash = document.createElement("i")
                trash.className = "fa-solid fa-trash cursor-pointer"
                trash.addEventListener("click", () => {
                    const index = x.id
                    // console.log(index);

                    const option = {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }

                    fetch(`http://localhost:3000/blogs/${index}`, option)
                    response.splice(index - 0, 1)
                })

                const edit = document.createElement("i")
                edit.className = "fa-solid fa-pen-to-square cursor-pointer"
                edit.addEventListener("click", async () => {
                    cardID = x.id;
                    window.location.hash = "#/register"
                    const response = await fetch(`http://localhost:3000/blogs/${x.id}`)
                    response.json().then((res) => {
                        titleInput.value = res.Title
                        firstNameInput.value = res.firstName
                        lastNameInput.value = res.lastName
                        textArea.value = res.dec
                    })
                })

                iconContainer.appendChild(trash)
                iconContainer.appendChild(edit)

                container.appendChild(blog)

                blog.appendChild(title)
                blog.appendChild(name)
                blog.appendChild(desc)
                blog.appendChild(time)
                blog.appendChild(iconContainer)
            }

        }

    } catch (err) {
        const warn = document.createElement("h3")
        warn.className = "font-bold text-2xl text-center text-red-500"
        warn.innerText = "Data not found!"
        container.appendChild(warn)
    }
}

async function sendData(id) {
    const date = new Date()
    if (titleInput.value && firstNameInput.value && lastNameInput.value && textArea.value) {
        if (id) {
            const option = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    Title: titleInput.value,
                    dec: textArea.value,
                    created: date.getHours() + ":" + date.getMinutes() + "  " + date.getDate() + "/" + date.getMonth()
                        + 1 + "/" + date.getFullYear()
                })
            }

            const dataUpdate = fetch(`http://localhost:3000/blogs/${id}`, option)
            // console.log(dataSend);
            if (dataUpdate) {
                window.location.hash = "/"
            }
        } else {
            const option = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    Title: titleInput.value,
                    dec: textArea.value,
                    created: date.getHours() + ":" + date.getMinutes() + "  " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
                })
            }

            const dataSend = fetch('http://localhost:3000/blogs', option)
            // console.log(dataSend);
            if (dataSend) {
                location.hash = "/"
            }
        }
    }

    titleInput.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            firstNameInput.focus()
        }
    })

    firstNameInput.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            lastNameInput.focus()
        }
    })

    lastNameInput.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            textArea.focus()
        }
    })

    textArea.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            sendData(cardID)
        }
    })


    document.getElementById("title").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("desc").value = "";
}

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault()
    sendData(cardID)
})


function hashChange() {
    const route = window.location.hash.substring(1);
    // alert(route);
    if (route == "/" || route == "") {
        document.getElementById("user-details").style.display = "block"
        document.getElementById("register-form").style.display = "none"
    } else if (route == "/register") {
        document.getElementById("user-details").style.display = "none"
        document.getElementById("register-form").style.display = "block"
    }
}

getData()

window.addEventListener("hashchange", hashChange)
window.addEventListener("DOMContentLoaded", hashChange)

// console.log(window.location.hash.substring(1));