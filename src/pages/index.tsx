import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"

import { auth } from "../lib/auth"

const readAll = () => {
  return fetch("/.netlify/functions/games-list-all").then(response => {
    return response.json()
  })
}

const IndexPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [games, setGames] = useState([])

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

  const listAllGames = async () => {
    try {
      const res = await readAll()
      setGames(res)
      console.log("Success", res)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    listAllGames()
  }, [])

  return (
    <div>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Sign up</button>
      <button onClick={login}>Log in</button>
      {/* <button onClick={listAllGames}>Read all Games</button> */}
      {token && <button onClick={confirm}>Verify</button>}
      <h1>Padelman</h1>
      {games.map(g => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            // alignItems: "center",
          }}
        >
          <h3>
            {g.data.date["@date"]} - {g.data.arena}
          </h3>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <h4>Spelare 1</h4>
              <h5>{g.data.player1}</h5>
              <h4>Spelare 3</h4>
              <h5>{g.data.player3}</h5>
            </div>
            <div style={{ flex: 1 }}>
              <h4>Spelare 2</h4>
              <h5>{g.data.player2}</h5>
              <h4>Spelare 4</h4>
              <h5>{g.data.player4}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default IndexPage
