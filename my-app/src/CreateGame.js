import React, { useState } from "react";
import {
  GiCardKingHearts,
  GiCardJackHearts,
  GiCardQueenHe,
  GiCardAceDiamonds,
  GiCardQueenHearts,
} from "react-icons/gi";

const CreateGame = () => {
  const [inputUserOne, setInputUserOne] = useState("");
  const [inputUserTwo, setInputUserTwo] = useState("");
  const [gameCreatedText, setGameCreatedText] = useState(false);
  const [userOneCard, setUserOneCard] = useState("");
  const [userOneCardList, setUserOneCardList] = useState([]);
  const [userTwoCard, setUserTwoCard] = useState("");
  const [userTwoCardList, setUserTwoCardList] = useState([]);
  const [winnerText, setWinnerText] = useState(false);
  const [warwWinnerText, setWarWinnerText] = useState(false);
  const [winner, setWinner] = useState("");
  const [war, setWar] = useState(false);
  const [warText, setWarText] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [warCards, setWarCards] = useState([]);

  // change https://aspenwar.herokuapp.com/ to http://127.0.0.1:8000/  for local dev

  const createNewGame = async () => {
    const endpoint = `https://aspenwar.herokuapp.com/api/create/${inputUserOne}/${inputUserTwo}`;
    const data = {
      user_one: inputUserOne,
      user_two: inputUserTwo,
    };
    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, configs);
    const res = await response.json();
    console.log(res.gameID);
    sessionStorage.setItem("gameID", res.gameID);
    sessionStorage.setItem("user_one", inputUserOne);
    sessionStorage.setItem("user_two", inputUserTwo);

    if (res.gameID) {
      setGameCreatedText(true);
    }
  };

  const userOne = sessionStorage.getItem("user_one");
  const userTwo = sessionStorage.getItem("user_two");

  const drawCard = async () => {
    console.log("clicked");
    setWinnerText(false);
    setWarText(false);
    setWarWinnerText(false);
    setGameOver(false);
    try {
      const response = await fetch(
        `https://aspenwar.herokuapp.com/api/getcards/${userOne}/${userTwo}`
      );
      const res = await response.json();
      if (res) {
        setUserOneCard(res.user_one_card);
        setUserOneCardList(res.user_one_cards);
        setUserTwoCard(res.user_two_card);
        setUserTwoCardList(res.user_two_cards);
        setWinnerText(true);
        setWinner(res.winner);
      }
      if (res.Tie) {
        setUserOneCard(res.user_one_card);
        setUserTwoCard(res.user_two_card);
        setWar(true);
        setWarText(true);
      }
      if (res.game_over) {
        setGameOver(true);
      } else {
        console.log("error with res");
      }
    } catch {
      console.log("error");
    }
  };

  const drawWarCard = async () => {
    console.log("clicked");
    setWinnerText(false);
    setWarText(false);
    setWarWinnerText(false);
    setGameOver(false);
    try {
      const response = await fetch(
        `https://aspenwar.herokuapp.com/api/war/${userOne}/${userTwo}/${gameId}/${userOneCard}/${userTwoCard}/${warCards}`
      );
      const res = await response.json();
      if (res) {
        setUserOneCard(res.user_one_card);
        setUserOneCardList(res.user_one_cards);
        setUserTwoCard(res.user_two_card);
        setUserTwoCardList(res.user_two_cards);
        setWarWinnerText(true);
        setWinner(res.winner);
        setWar(false);
        setWarCards([]);
      }
      if (res.Tie) {
        setUserOneCard(res.user_one_card);
        setUserTwoCard(res.user_two_card);
        setUserOneCardList(res.user_one_cards);
        setUserTwoCardList(res.user_two_cards);
        setWar(true);
        setWarText(true);
        console.log(res.cards);
        setWarCards(res.cards);
      }
      if (res.game_over) {
        setGameOver(true);
      } else {
        console.log("error with res");
      }
    } catch {
      console.log("error");
    }
  };

  function cardCheck(x) {
    if (x <= 10) {
      return x;
    }
    if (x === 11) {
      return <GiCardJackHearts width={40} height={50} color={"red"} />;
    }
    if (x === 12) {
      return <GiCardQueenHearts width={40} height={50} color={"red"} />;
    }
    if (x === 13) {
      return <GiCardKingHearts width={40} height={50} color={"red"} />;
    }
    if (x === 14) {
      return <GiCardAceDiamonds width={40} height={50} color={"red"} />;
    }
  }

  const gameId = sessionStorage.getItem("gameID");

  return (
    <div>
      {!gameId && (
        <div className="UserInputGrid">
            <div>
          <label for="user one"> User One</label> <br />
          <input
            type="text"
            id="email"
            placeholder="Name .."
            onChange={(e) => setInputUserOne(e.target.value)}
          />{" "}
          </div>
          <div>
          <label for="user two"> User Two</label> <br />
          <input
            type="text"
            id="pass"
            placeholder="Name .. "
            onChange={(e) => setInputUserTwo(e.target.value)}
          />{" "}
          </div>
        </div>
      )}
{!gameId && <div className="button">
<button onClick={(e) => createNewGame()}>
            {" "}
            Create New Game
          </button> 
          </div>}

      <div>
        {gameCreatedText && !gameId && <p> Congrats! game has been created. Goodluck</p>}
      </div>

      {gameId && userOneCard&& (
        <div className="cardsgrid">
          {userOneCard > 0 && (
            <div>
              <h3>
                {" "}
                {userOne}:{" "}
                <span className="cardleft">
                  {" "}
                  {userOneCardList.length} cards left
                </span>
              </h3>{" "}
              <br />
              <p className="card">{cardCheck(userOneCard)}</p>
            </div>
          )}

          {userTwoCard > 0 && (
            <div>
              <h3>
                {" "}
                {userTwo} :{" "}
                <span className="cardleft">
                  {" "}
                  {userTwoCardList.length} cards left
                </span>
              </h3>{" "}
              <br />
              <p className="card">{cardCheck(userTwoCard)}</p>
            </div>
          )}
        </div>
      )}
      {winnerText && !warText && (
        <div className="winnerText">
          <p>
            {" "}
            {winner} <span> has won this round</span>
          </p>
        </div>
      )}

      {warwWinnerText && !warText && (
        <div className="winnerText">
          <p>
            {" "}
            {winner} <span> has won the war round </span>
          </p>
        </div>
      )}

      {warText && (
        <div className="winnerText">
          <p> Tie game. Time for war!</p>
        </div>
      )}

      {gameOver && (
        <div>
          <p> Game is over</p>
        </div>
      )}

      {gameId && !war && (
        <div className="button">
          <button onClick={(e) => drawCard()}> Draw Cards</button> <br />
        </div>
      )}

      {gameId && war && !winner && (
        <div className="button">
          <button onClick={(e) => drawWarCard()}> War</button> <br />
        </div>
      )}
    </div>
  );
};

export default CreateGame;
