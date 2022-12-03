function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const players = ["Joe", "Caroline", "Sabrina"];

// Promise.allSettled(players.map((p) => luckyDraw(p))).then((res) =>
//   res.map((res) =>
//     res.status === "fulfilled"
//       ? console.log(res.value)
//       : console.error(res?.reason?.message)
//   )
// );

// luckyDraw(players[0])
//   .then((dataPlayer1) => console.log(dataPlayer1))
//   .catch((error) => console.error(error))
//   .then(() => luckyDraw(players[1]))
//   .then((dataPlayer2) => console.log(dataPlayer2))
//   .catch((error) => console.error(error))
//   .then(() => luckyDraw(players[2]))
//   .then((dataPlayer3) => console.log(dataPlayer3))
//   .catch((error) => console.error(error));

luckyDraw(players[0])
  .then((dataPlayer1) => console.log(dataPlayer1))
  .then(() => luckyDraw(players[1]))
  .then((dataPlayer2) => console.log(dataPlayer2))
  .then(() => luckyDraw(players[2]))
  .then((dataPlayer3) => console.log(dataPlayer3))
  .catch((error) => console.error(error));
