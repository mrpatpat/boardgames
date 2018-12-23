import { Solitaire } from "./Solitaire";
import { NewGame } from "./actions/NewGame";
import { SolitaireLogger } from "./util/SolitaireLogger";
import { mainPrompt } from "./Prompts";
/*
 * Run with ts-node
 */

const g = new Solitaire();
const solitaireLogger = new SolitaireLogger();
solitaireLogger.connect(g);
g.$afterAction.subscribe(()=>{ mainPrompt(g) });
g.execute(new NewGame());