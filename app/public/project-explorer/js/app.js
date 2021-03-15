let currentPage = window.location.href

window.onload = async function () {
  // document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
  let logOutEl = document.createElement("button")
  let check = document.cookie.split("=")
  if (check[0] === "uid" && check[1]) {
    let response = await fetch(`/api/users/${check[1]}`)
    let result = await response.json()
    let userStatus = document.getElementById("userStatus")
    let headerNav = document.getElementById("headerNav")
    logOutEl.innerText = "Logout"
    let greetEl = document.createElement("span")
    greetEl.innerHTML = `<span id="username">Hi ${result.firstname}</span>`
    userStatus.classList.add("invisible")
    headerNav.appendChild(logOutEl)
    headerNav.appendChild(greetEl)
  }
  logOutEl.onclick = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    window.location.href = "/project-explorer/index.html"
  }
}

if (currentPage.includes("/project-explorer/index.html")) {
  let showcase = document.getElementsByClassName("showcase")
  ;(async function () {
    let response = await fetch("/api/projects")
    let result = await response.json()
    let projects = result
      .map(project => {
        return `<div class="card col-2">
      <section class="card-body">
        <h3 class="card-title text-primary">${project.name}</h3>
        <ul class="list-unstyled">
          <li class="card-subtitle">${project.authors.map(author => author).join(", ")}</li>
          <li class="card-text">
          ${project.abstract}
          </li>
          <li>${project.tags.map(tag => `#${tag}`).join(" ")}</li>
        </ul>
      </section>
    </div>`
      })
      .join("")
    showcase[0].innerHTML = projects
  })()
}

if (currentPage.includes("/project-explorer/register.html")) {
  ;(async function () {
    try {
      const progRes = await fetch("/api/programs")
      const programs = await progRes.json()

      let progOptions = programs.map(program => `<option>${program}</option>`)
      progOptions = progOptions.join("")
      document.getElementById("program").innerHTML = progOptions

      const yearRes = await fetch("/api/graduationYears")
      const gradYears = await yearRes.json()

      let gradOptions = gradYears.map(gradYear => `<option>${gradYear}</option>`)
      gradOptions = gradOptions.join("")
      document.getElementById("graduationYear").innerHTML = gradOptions
    } catch (e) {
      console.log(e)
    }
  })()

  const signupForm = document.getElementById("signupForm")
  signupForm.addEventListener("submit", e => {
    e.preventDefault()
    const programs = document.getElementById("program").value
    const graduationYear = document.getElementById("graduationYear").value
    const firstname = document.getElementById("firstName").value
    const lastname = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const matricNumber = document.getElementById("matric").value

    const data = { firstname, lastname, email, password, programs, graduationYear, matricNumber }
    handleRegSubmit(data)
  })

  async function handleRegSubmit(data) {
    try {
      const payload = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const response = await payload.json()
      if (response.status === "ok") {
        document.cookie = `uid=${response.data.id};path=/`
        window.location.replace("/project-explorer/index.html")
      } else {
        let errorDiv = document.createElement("div")
        errorDiv.classList.add("alert", "alert-danger", "w-100")
        let errors = response.errors.map(error => {
          return `<p>${error}</p>`
        })
        errorDiv.innerHTML = errors.join("")
        signupForm.prepend(errorDiv)
        throw "Unsuccessful"
      }
    } catch (e) {
      console.log(e)
    }
  }
}

if (window.location.href.includes("/project-explorer/login.html")) {
  const loginBtn = document.getElementById("loginForm")
  loginBtn.onsubmit = async function (e) {
    e.preventDefault()
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value
    const data = { email, password }

    const payload = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const response = await payload.json()

    if (response.status === "ok") {
      document.cookie = `uid=${response.data.id};path=/`
      window.location.replace("/project-explorer/index.html")
    } else {
      const errorDiv = document.createElement("div")
      errorDiv.classList.add("alert", "alert-danger", "w-100")
      errorDiv.textContent = "Invalid email/password"
      loginForm.prepend(errorDiv)
    }
  }
}

if (window.location.href.includes("/project-explorer/createproject.html")) {
  let check = document.cookie.split("=")
  if (check[0] !== "uid") {
    window.location.replace("/project-explorer/login.html")
  }
  const createProjectForm = document.getElementById("createProjectForm")
  createProjectForm.onsubmit = async function (e) {
    e.preventDefault()
    const name = document.getElementById("name").value
    const abstract = document.getElementById("abstract").value
    const authors = document.getElementById("authors").value.split(",")
    const tags = document.getElementById("tags").value.split(" ")
    const data = { name, abstract, authors, tags }

    const payload = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const response = await payload.json()
    if (response.status === "ok") {
      window.location.replace("/project-explorer/index.html")
    } else {
      let errorDiv = document.createElement("div")
      errorDiv.classList.add("alert", "alert-danger", "w-100")

      let errors = response.errors.map(error => {
        return `<p>${error}</p>`
      })
      errorDiv.innerHTML = errors.join("")

      createProjectForm.prepend(errorDiv)
    }
  }
}

if (window.location.href.includes("/project-explorer/viewproject.html")) {
  const projectName = document.getElementById("project_name")
  const projectAuthor = document.getElementById("project_author")
  const projectAbstract = document.getElementById("project_abstract")
  const projectAuthors = document.getElementById("project_authors")
  const projectTags = document.getElementById("project_tags")
  let arr = location.search
  if (arr.includes("?id=")) {
    let id
    let newArr = arr.split("?")
    newArr.find(item => {
      if (item.includes("id=")) {
        let value = item.split("=")[1]
        id = value
        return
      }
    })
    ;(async function () {
      console.log(id)
      let response = await fetch(`/api/projects/${id}`)
      let result = await response.json()
      console.log(result)
      if (result) {
        let name = await (await fetch(`/api/users/${result.createdBy}`)).json()
        projectName.innerText = result.name
        projectAbstract.innerText = result.abstract
        projectAuthor.innerHTML = `Created by: <br/> ${name.firstname} ${name.lastname}`
        projectAuthors.innerText = result.authors.join(", ")
        projectTags.innerText = result.tags.map(tag => `#${tag}`).join(", ")
      }
    })()
  }
}
