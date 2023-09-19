import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const fitAddon = new FitAddon();

function Shell() {
  const [loading, setLoading] = useState(true);
  const xtermRef = useRef<any>(null);

  useEffect(() => {
    if (!xtermRef.current || xtermRef.current.element) return;
    setTimeout(() => {
      setLoading(false);
      const xterm = new XTerm({
        cursorBlink: true,
        fontSize: 14,
      });

      xterm.loadAddon(fitAddon);

      xterm.open(xtermRef.current);
      fitAddon.fit();
      xterm.writeln("Welcome to Fyra");
      xterm.write("root@fyra:~$ ");

      let allowInput = true;

      /**
       * This is a postion tracker for the input
       * first index being the line
       */
      let input: number[] = [];
      let pos = 0;

      xterm.onData((e) => {
        if (!allowInput) return;
        console.log(e);
        console.log(`Pos: ${pos}`)

        let content: number[] = [];
        // convert the string to an array of numbers but remember that the invisible characters are multiple characters long
        // split using a regex that matches the invisible characters

        var utf8 = unescape(encodeURIComponent(e));

        console.log(`UTF8: ${utf8}`);

        for (var i = 0; i < utf8.length; i++) {
            content.push(utf8.charCodeAt(i));
        }

        for (let e of content) {
          console.log(e);
          switch (e) {
            // \r
            case 13:
              console.log("RETURN");
              break;
            // \n
            case 10:
              console.log("NEW LINE");
              break;
            case 3:
              input = [];
              pos = 0;
              xterm.write("\n");
              xterm.write("root@fyra:~$ ");
              break;
            case 27:
              console.log("UP");
              break;
            case 28:
              console.log("DOWN");
              break;
            case 127:
              break;
            default:
              // insert the character into the input array at the pos
              input.splice(pos, 0, e);
              pos++;
              xterm.write(String.fromCharCode(e));
              break;
          }
        }
        console.log(input);
      });

      xterm.onKey((e) => {
        switch (e.domEvent.key) {
          case "Enter":
            console.log("Enter");
            xterm.writeln("");
            xterm.writeln(input.join("\r"));

            console.log(input);
            
            //convert the input to a string
            let command = "";
            for (let item of input) command += String.fromCharCode(item);

            if (command === "clear") {
              setTimeout(() => {
                xterm.clear();
              }, 50);
            }

            input = [];
            pos = 0;

            setTimeout(() => {
              xterm.write("root@fyra:~$ ");
            }, 100);
            break;
          case "ArrowUp":
            console.log("UP");
            break;
          case "ArrowDown":
            console.log("DOWN");
            break;
          case "Backspace":
            if (pos === 0) break;
            input = input.slice(0, pos - 1).concat(input.slice(pos));
            pos--;
            xterm.write("\b \b");
            break;
        }
      });
    }, 1000);
  }, []);

  return (
    <Box
      sx={{
        height: "95%",
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
      ref={xtermRef}
    >
      {loading && <CircularProgress />}
    </Box>
  );
}

export default Shell;