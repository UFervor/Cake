import { createApp } from 'vue'
import App from './App.vue'
import "./style.css";

createApp(App).mount('#app')

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import "../node_modules/xterm/css/xterm.css";

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

const terminalContainer = document.getElementById('terminal')!;
term.open(terminalContainer);

term.options.windowOptions!.fullscreenWin = true;
fitAddon.fit();

var history: string[] = []

window.addEventListener("resize", () => {
    fitAddon.fit();
    term.reset();
    for (let i = 0; i < (term.rows - 30) / 2 - 1; i++) {
        term.writeln('');
    }
    for (let i = 0; i < history.length; i++) {
        i < history.length - 1 ? term.writeln(' '.repeat(Math.max(0, (term.cols - history[i].length) / 2)) + history[i]) : term.write(' '.repeat(Math.max(0, (term.cols - history[i].length) / 2)) + history[i]);
    }
});

term.options.theme = {
    background: '#000000',
    foreground: '#FFA500',
};
term.options.cursorBlink = true;

var asciiCake = [
    "            ,:/+/-                      ",
    "            /M/              .,-=;//;-  ",
    "       .:/= ;MH/,    ,=/+%$XH@MM#@:     ",
    "      -$##@+$###@H@MMM#######H:.    -/H#",
    " .,H@H@ X######@ -H#####@+-     -+H###@ ",
    "  .,@##H;      +XM##M/,     =%@###@X;-  ",
    "X%-  :M##########$.    .:%M###@%:       ",
    "M##H,   +H@@@$/-.  ,;$M###@%,          -",
    "M####M=,,---,.-%%H####M$:          ,+@##",
    "@##################@/.         :%H##@$- ",
    "M###############H,         ;HM##M$=     ",
    "#################.    .=$M##M$=         ",
    "################H..;XM##M$=          .:+",
    "M###################@%=           =+@MH%",
    "@################M/.          =+H#X%=   ",
    "=+M##############M,       -/X#X+;.      ",
    "  .;XM##########H=    ,/X#H+:,          ",
    "     .=+HM######M+/+HM@+=.              ",
    "         ,:/%XM####H/.                  ",
    "              ,.:=-.                    "
];

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayLines(lines: string[], interval: number = 0) {
    let lineIndex = 0;

    while (lineIndex < lines.length) {
        const termWidth = term.cols;
        const line = lines[lineIndex];
        const leadingSpaces = ' '.repeat(Math.max(0, (termWidth - line.length) / 2));
        term.writeln(leadingSpaces + line);
        history.push(line);
        lineIndex++;
        if (lineIndex < lines.length) {
            await sleep(interval);
        }
    }
};

async function displayText(text: string, interval: number = 0) {
    const textLength = text.length;

    let partialText = '';
    for (let charIndex = 0; charIndex <= textLength; charIndex++) {
        partialText = ' '.repeat(Math.max(0, (term.cols - charIndex) / 2)) + text.substring(0, charIndex);
        term.write('\x1b[2K\r');
        term.write(partialText);
        await sleep(interval);
    }
}

term.focus();

for (let i = 0; i < (term.rows - 30) / 2 - 1; i++) {
    term.writeln('');
}

await displayText("A cake for you:", 25);
history.push("A cake for you:");
term.writeln('');
history.push("");
term.writeln('');
history.push("");
term.writeln('');
history.push("");
term.writeln('');
history.push("");
await displayLines(asciiCake, 100);
term.writeln('');
history.push("");
term.writeln('');
history.push("");
term.writeln('');
history.push("");
term.writeln('');
history.push("");
await displayText("Felix natalis.", 25);
history.push("Felix natalis.");
