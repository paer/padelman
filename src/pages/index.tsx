import React, { useState } from "react"
import { useLocation } from "@reach/router"

import { auth } from "../lib/auth"

const IndexPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const location = useLocation()

  let urlToken = ""
  if (location.hash.includes("#confirmation_token=")) {
    urlToken = location.hash.replace("#confirmation_token=", "")
  }

  const [token, setToken] = useState(urlToken)

  const confirm = async () => {
    try {
      const res = await auth.confirm(token)
      console.log("Success", res)
      setToken("")
    } catch (error) {
      console.log("Error", error)
      setToken("")
    }
  }

  const signup = async () => {
    try {
      const res = await auth.signup(email, password)
      console.log("Success", res)
    } catch (error) {
      console.log("Error", error)
    }
  }

  const login = async () => {
    try {
      const res = await auth.login(email, password)
      console.log("Success", res)
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Sign up</button>
      <button onClick={login}>Log in</button>
      {token && <button onClick={confirm}>Verify</button>}
      <h1>Padelman</h1>
      <h2>Bokade tider</h2>
      <h3>2020-12-06</h3>
      <h4>Spelare 1</h4>
      <h5>Pär</h5>
      <h4>Spelare 2</h4>
      <h5>Pär</h5>
      <h4>Spelare 3</h4>
      <h5>Pär</h5>
      <h4>Spelare 4</h4>
      <h5>Pär</h5>
    </div>
  )
}

export default IndexPage
