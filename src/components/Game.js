import React, { useRef, useState, useEffect } from "react";

import { Screen } from "./Screen";


const getScreen = (xSize, ySize) => {
  const screen = new Array(ySize);
  for (let y = 0; y < ySize; y++) {
    screen[y] = new Array(xSize);
    for (let x = 0; x < xSize; x++) {
      screen[y][x] = {
        char: "", color: "white", bgColor: "black"
      };
    }
  }
  return screen;
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = async (screen, refresh) => {
  const print = (x, y, s) => {
    for (let dx = 0; dx < s.length; dx++) {
      screen[y][x+dx].char = s.slice(dx, dx+1);
    }
  }

  const stars = new Array(10);
  for (let i = 0; i < stars.length; i++) {
    stars[i] = {x: randInt(0, 40), y: randInt(0, 24)}
  }

  while (true) {
    for (let i = 0; i < stars.length; i++) {
      let x = stars[i].x;
      let y = stars[i].y;
      print(x, y, " ");
      y += 1;
      if ( y > 23 ) {
        y = 0;
      }
      x += randInt(-1, 2);
      if ( x < 0 ) {
        x = 39;
      }
      if ( x > 39 ) {
        x = 0;
      }
      print(x, y, "＊");
      stars[i].x = x;
      stars[i].y = y;
    }
    refresh();
    await sleep(100);
  }
}


export const Game = (props) => {
  const xSize = 40;
  const ySize = 24;
  const screenRef = useRef(getScreen(xSize, ySize));
  const screen = screenRef.current;
  const run = useRef(false);
  // eslint-disable-next-line
  const [dummyState, setDummyState] = useState([]);

  const refresh = () => {
    setDummyState([]);
  }

  useEffect(() => {
    if (!run.current) {
      run.current = true;
      game(screen, refresh);
    }
  } , [screen]);

  const element = (
    <Screen screen={screen}/>
  );

  return element;
}
