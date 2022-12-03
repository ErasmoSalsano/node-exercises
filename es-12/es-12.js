// Create agetResults function that uses async and await.
// Inside of the function, call the luckyDraw function for each of the players: Tina, Jorge, Julien

// Log out the resolved value for each promise and handle any promise rejections.

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

const players = ["Tina", "Jorge", "Julien"];

async function agetResults(people) {
  try {
    const res = await Promise.allSettled(
      people.map((person) => luckyDraw(person))
    );

    res.forEach((partial) =>
      partial.value
        ? console.log(partial.value)
        : console.error(partial.reason.message)
    );
  } catch (error) {
    console.error(`Promise allSettled error: ${error.message}`);
  }
}

agetResults("ciao");
agetResults(players);
