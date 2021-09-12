/**
 * @jest-environment jsdom
 */
import regeneratorRuntime from "regenerator-runtime"
import React from "react"
import Header from "../../views/shared/Header"
import { cleanup, render, screen } from "@testing-library/react"
const { userOne } = require("./fixtures/db")

afterEach(cleanup)

test("User firstname renders in Header", () => {
  render(<Header user={userOne} />)
  const welcomeMessage = screen.getByTestId("username").textContent
  expect(welcomeMessage).toEqual("Hi " + userOne.firstname)
})
