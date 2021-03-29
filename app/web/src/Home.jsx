import React from "react"
import Layout from "./shared/Layout"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Jumbotron, Button } from "react-bootstrap"

const Home = () => {
  return (
    <>
      <Layout>
        <header class="d-flex flex-column order-2">
          <Jumbotron>
            <h1>Welcome to Project Explorer</h1>
            <p>
              Project Explorer is a repository for final year projects across all departments at
              your institution. You can submit your project and search projects submitted by others
              to learn from.
            </p>
            <Button variant="primary" href="/signup">
              Get Started
            </Button>
            <Button variant="secondary" href="/login" className="ml-3">
              Login
            </Button>
          </Jumbotron>
        </header>
        <main class="p-2 order-3">
          <div class="d-flex flex-row justify-content-between mr-5 ml-5 showcase">
            <div class="card col-2">
              <section class="card-body">
                <h3 class="card-title text-primary">Project Title</h3>
                <ul class="list-unstyled">
                  <li class="card-subtitle">Author 1, Author 2</li>
                  <li class="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem eum
                    enim.
                  </li>
                  <li>#ElonMusk #BillGates</li>
                </ul>
              </section>
            </div>

            <div class="card col-2">
              <section class="card-body">
                <h3 class="card-title text-primary">Project TItle</h3>
                <ul class="list-unstyled">
                  <li>Author 1, Author 2</li>
                  <li class="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem eum
                    enim.
                  </li>
                  <li>#ElonMusk #BillGates</li>
                </ul>
              </section>
            </div>

            <div class="card col-2">
              <section class="card-body">
                <h3 class="card-title text-primary">Project Title</h3>
                <ul class="list-unstyled">
                  <li>Author 1, Author 2</li>
                  <li class="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem eum
                    enim.
                  </li>
                  <li>#ElonMusk #BillGates</li>
                </ul>
              </section>
            </div>

            <div class="card col-2">
              <section class="card-body">
                <h3 class="card-title text-primary">Project Title</h3>
                <ul class="list-unstyled">
                  <li>Author 1, Author 2</li>
                  <li class="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem eum
                    enim.
                  </li>
                  <li>#ElonMusk #BillGates</li>
                </ul>
              </section>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Home
