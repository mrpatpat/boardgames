import { Solitaire } from "./Solitaire";
import { NewGame } from "./actions/NewGame";
import { SolitaireLogger } from "./util/SolitaireLogger";
import { mainPrompt } from "./Prompts";
import { merge } from "rxjs";
import { filter } from "rxjs/operators";
import { WinEvent } from "./WinEvent";
/*
 * Run with ts-node
 */

const g = new Solitaire();
const solitaireLogger = new SolitaireLogger();
solitaireLogger.connect(g);
g.$getEventStream()
    .pipe(filter(e => e instanceof WinEvent))
    .subscribe(e => {
        g.end();
        solitaireLogger.disconnect();
    });
merge(g.$afterAction, g.$errors).subscribe(e => {
    mainPrompt(g);
});

g.execute(new NewGame());
