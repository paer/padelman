import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"

import { auth } from "../lib/auth"

const readAll = () => {
  return fetch("/.netlify/functions/games-list-all").then(response => {
    return response.json()
  })
}

type CourtProps = {
  players: [string?, string?, string?, string?]
}

const Court = ({
  players: [player1, player2, player3, player4],
}: CourtProps) => {
  // const textStyles = [{}, {}, {}, {}]

  // useEffect(() => {
  //   const container = <div className="court-serve">{player1}</div>
  //   console.log({ container })
  // }, [])

  return (
    <div className="court-wrapper">
      <div className="court-main">
        <div className="court-upper">
          <div className="court-back"></div>
          <div className="court-serves">
            <div className="court-serve">
              <span>{player1}</span>
            </div>
            <div className="court-serve">
              <span>{player2}</span>
            </div>
          </div>
        </div>
        <div className="court-lower">
          <div className="court-serves">
            <div className="court-serve">
              <span>{player3}</span>
            </div>
            <div className="court-serve">
              <span>{player4}</span>
            </div>
          </div>
          <div className="court-back"></div>
        </div>
        <div className="court-outer-border"></div>
      </div>
      <div className="court-net"></div>
    </div>
  )
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
      <input
        type="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <div></div>
      <button onClick={signup}>Sign up</button>
      <button onClick={login}>Log in</button>
      {/* <button onClick={listAllGames}>Read all Games</button> */}
      {token && <button onClick={confirm}>Verify</button>}
      <h1>Padelman</h1>
      {/* <Court players={["Ola", "Sebastian", "Pär", "Oscar"]} /> */}
      {games
        .sort(
          (g1, g2) =>
            new Date(g1.data.date["@date"]).getTime() -
            new Date(g2.data.date["@date"]).getTime()
        )
        .map(g => (
          <>
            <h3>
              {g.data.date["@date"]} - {g.data.arena}
            </h3>
            <Court
              players={[
                g.data.player1,
                g.data.player2,
                g.data.player3,
                g.data.player4,
              ]}
            />
            <div style={{ height: 60 }}></div>
          </>
          // <div
          //   style={{
          //     display: "flex",
          //     flexDirection: "column",
          //     justifyContent: "center",
          //     textAlign: "center",
          //     // alignItems: "center",
          //   }}
          // >
          //   <h3>
          //     {g.data.date["@date"]} - {g.data.arena}
          //   </h3>
          //   <div style={{ display: "flex" }}>
          //     <div style={{ flex: 1 }}>
          //       <h4>Spelare 1</h4>
          //       <h5>{g.data.player1}</h5>
          //       <h4>Spelare 3</h4>
          //       <h5>{g.data.player3}</h5>
          //     </div>
          //     <div style={{ flex: 1 }}>
          //       <h4>Spelare 2</h4>
          //       <h5>{g.data.player2}</h5>
          //       <h4>Spelare 4</h4>
          //       <h5>{g.data.player4}</h5>
          //     </div>
          //   </div>
          // </div>
        ))}
    </div>
  )
}

export default IndexPage
