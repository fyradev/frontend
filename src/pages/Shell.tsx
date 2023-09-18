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
       * The input is an array of strings which each string is a line
       * The line variable is the current line
       * The pos variable is the current position in the line
       */
      let input: string[] = [];
      let line = 0;
      let pos = 0;

      xterm.onData((e) => {
        if (!allowInput) return;
        console.log(e);
        let content = e.split("");
        for (let e of content) {
            console.log(e);
          switch (e) {
            case "\r":
              console.log("NEW LINE");
              xterm.writeln("");

              line++;
              pos = 0;

              break;
            case "\u0003":
              input = [];
              line = 0;
              pos = 0;
              xterm.write("\n");
              xterm.write("root@fyra:~$ ");
              break;
            case "\u001b[A":
              console.log("UP");
              break;
            case "\u001b[B":
              console.log("DOWN");
              break;
            case "\u007F":
              if (pos === 0) break;
              input[line] = input[line].slice(0, -1);
              pos--;
              xterm.write("\b \b");
              break;
            default:
              input[line] = input[line] ? input[line] + e : e;
              pos++;
              xterm.write(e);
              break;
          }
        }
        console.log(input);
      });

      xterm.onKey((e) => {
        switch (e.domEvent.key) {
          case "Enter":
            console.log("NEW LINE");
            xterm.writeln("");
            xterm.write(input.join("\n"));

            console.log(input.join("\\"));
            console.log(input.join("\\") === "clear\\");
            if (input.join("\\") === "clear\\") {
              setTimeout(() => {
                xterm.clear();
              }, 50);
            }

            input = [];
            line = 0;
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
