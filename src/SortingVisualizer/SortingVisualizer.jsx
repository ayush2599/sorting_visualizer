import React from "react";
import "./SortingVisualizer.css";

import { getbubbleSortAnimations } from "../SortingAlgorithms/bubbleSort";
import { getinsertionSortAnimations } from "../SortingAlgorithms/insertionSort";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getquickSortAnimations } from "../SortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../SortingAlgorithms/heapSort";
import { getselectionSortAnimations } from "../SortingAlgorithms/selectionSort";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";
const SORTED_COLOR = "green";
const UNTOUCHED_COLOR = "black";

const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity",
};

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  disableSortButtons() {
    document.getElementById("mergeSort").disabled = true;
    let buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("quickSort").disabled = true;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("insertionSort").disabled = true;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("bubbleSort").disabled = true;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";
  }
  restoreStoreButtons() {
    document.getElementById("mergeSort").disabled = false;
    let buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
    /*buttonStyle.background = "#14E014";*/
    buttonStyle.background = "#F84949";
    buttonStyle.cursor = "pointer";

    document.getElementById("quickSort").disabled = false;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
    /*buttonStyle.background = "#14E014";*/
    buttonStyle.background = "#F84949";
    buttonStyle.cursor = "pointer";

    document.getElementById("bubbleSort").disabled = false;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
    /*buttonStyle.background = "#14E014";*/
    buttonStyle.background = "#F84949";
    buttonStyle.cursor = "pointer";

    document.getElementById("insertionSort").disabled = false;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
    /*buttonStyle.background = "#14E014";*/
    buttonStyle.background = "#F84949";
    buttonStyle.cursor = "pointer";
    /*buttonStyle.hover.backgroundColor = "#000";*/
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getbubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getquickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length - 1; i++) {
      const isColorChange = i % 6 === 0 || i % 6 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 6 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        if (barOneIndex === -1) {
          continue;
        }
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort() {
    const animations = getinsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  selectionSort() {
    const animations = getselectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex];
        setTimeout(() => {
          barStyle.style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="heading">
          <h1>Sorting Visualizer</h1>
        </div>
        <div
          className="nav"
          style={{ display: "flex", justifyContents: "between" }}
        >
          <div className="buttons">
            <button
              title="Generates a new random array"
              style={{
                position: "relative",
              }}
              className="btn-reset"
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
            <button
              title="O(NlogN) Time Complexity"
              id="mergeSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
            <button
              title="O(NlogN) Time Complexity"
              id="quickSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="bubbleSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="insertionSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.insertionSort()}
            >
              Insertion Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="selectionSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.selectionSort()}
            >
              Selection Sort
            </button>
            <button
              title="O(NlogN) Time Complexity"
              id="heapSort"
              style={{
                position: "relative",
              }}
              onClick={() => this.heapSort()}
            >
              Heap Sort
            </button>
            <div className="footer">
              <a href="https://ayushkarn.netlify.app/">
                <FontAwesomeIcon icon={faGlobe} className="icon" />
              </a>
              <a href="https://www.linkedin.com/in/ayush-karn25">
                <FontAwesomeIcon icon={faLinkedin} className="icon" />
              </a>
              <a href="https://www.instagram.com/ayush_diaries">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
              </a>
              <a href="https://www.github.com/ayush2599">
                <FontAwesomeIcon icon={faGithub} className="icon" />
              </a>
              <br />
              Ayush Karn
            </div>
          </div>
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>
      </>
    );
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
export default SortingVisualizer;
