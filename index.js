// A React Calculator
function Calculator() {
  const [display, setDisplay] = React.useState(0);
  const [num, setNum] = React.useState(0);
  const [operator, setOperator] = React.useState(null);
  const [bracket, setBracket] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  const handleKeyPress = ({ key }) => {
    const obj = {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      "+": "add",
      "-": "subtract",
      "*": "multiply",
      "/": "divide",
      "=": "equals",
      Enter: "equals",
      ".": "decimal",
    };
    if (obj[key]) {
      handleClick({ e: key === "Enter" ? "=" : key, id: obj[key] });
    }
  };

  const handleClick = async ({ e, id }) => {
    const btn = document.getElementById(id);
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
    if (e === "=") {
      if (["/", "*", "+", "-"].includes(display.slice(-1))) return;
      const disp = bracket ? display + ")" : display;
      setBracket(false);
      setDisplay(eval(disp).toString());
      setNum(eval(disp).toString());
    } else if (e === "AC") {
      setDisplay(0);
      setOperator(null);
      setNum(0);
    } else if (e === "C") {
      if (display === 0 || !display.length) return;
      if (operator) setOperator(null);
      if (num.length) setNum(num.slice(0, -1) === "" ? 0 : num.slice(0, -1));
      if (bracket && display.endsWith("(-")) setDisplay(display.slice(0, -2));
      else setDisplay(display.slice(0, -1) === "" ? 0 : display.slice(0, -1));
    } else if (e === ".") {
      if (num.toString().includes(".")) return;
      setOperator(null);
      setDisplay(display + e);
      setNum(num + e);
    } else if (/[0-9]/.test(e)) {
      if (parseInt(display) === 0) {
        setDisplay(e);
        setNum(e);
      } else {
        setOperator(null);
        setDisplay(display + e);
        setNum(num + e);
      }
    } else if (/[+\-\*\/]/.test(e)) {
      if (operator) {
        if (e === "-") {
          if (operator === "-") {
            if (bracket) return;
            setDisplay(display + "(-");
            setBracket(true);
          } else {
            setDisplay(display + "(-");
            setBracket(true);
          }
        } else {
          if (bracket) {
            setDisplay(display.slice(0, -3) + e);
            setBracket(false);
          } else {
            setDisplay(display.slice(0, -1) + e);
          }
        }
      } else {
        if (parseInt(display) === 0) return;
        setOperator(e);
        setNum(0);
        if (bracket) {
          setDisplay(display + ")" + e);
          setBracket(false);
        } else setDisplay(display + e);
      }
    }
  };

  return (
    <div class="container">
      <div class="grid">
        <div class="display" id="display">
          {display}
        </div>
        <div
          onClick={() => handleClick({ e: "AC", id: "clear" })}
          class="button clear"
          id="clear"
        >
          AC
        </div>
        <div
          onClick={() => handleClick({ e: "C", id: "backspace" })}
          class="button backspace"
          id="backspace"
        >
          C
        </div>
        <div
          onClick={() => handleClick({ e: "/", id: "divide" })}
          class="button operator divide"
          id="divide"
        >
          /
        </div>
        <div
          onClick={() => handleClick({ e: "*", id: "multiply" })}
          class="button operator multiply"
          id="multiply"
        >
          *
        </div>
        <div
          onClick={() => handleClick({ e: "7", id: "seven" })}
          class="button seven"
          id="seven"
        >
          7
        </div>
        <div
          onClick={() => handleClick({ e: "8", id: "eight" })}
          class="button eight"
          id="eight"
        >
          8
        </div>
        <div
          onClick={() => handleClick({ e: "9", id: "nine" })}
          class="button nine"
          id="nine"
        >
          9
        </div>
        <div
          onClick={() => handleClick({ e: "-", id: "subtract" })}
          class="button operator subtract"
          id="subtract"
        >
          -
        </div>
        <div
          onClick={() => handleClick({ e: "4", id: "four" })}
          class="button four"
          id="four"
        >
          4
        </div>
        <div
          onClick={() => handleClick({ e: "5", id: "five" })}
          class="button five"
          id="five"
        >
          5
        </div>
        <div
          onClick={() => handleClick({ e: "6", id: "six" })}
          class="button six"
          id="six"
        >
          6
        </div>
        <div
          onClick={() => handleClick({ e: "+", id: "add" })}
          class="button operator add"
          id="add"
        >
          +
        </div>
        <div
          onClick={() => handleClick({ e: "1", id: "one" })}
          class="button one"
          id="one"
        >
          1
        </div>
        <div
          onClick={() => handleClick({ e: "2", id: "two" })}
          class="button two"
          id="two"
        >
          2
        </div>
        <div
          onClick={() => handleClick({ e: "3", id: "three" })}
          class="button three"
          id="three"
        >
          3
        </div>
        <div
          onClick={() => handleClick({ e: "=", id: "equals" })}
          class="button equals"
          id="equals"
        >
          =
        </div>
        <div
          onClick={() => handleClick({ e: "0", id: "zero" })}
          class="button zero"
          id="zero"
        >
          0
        </div>
        <div
          onClick={() => handleClick({ e: ".", id: "decimal" })}
          class="button decimal"
          id="decimal"
        >
          .
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
