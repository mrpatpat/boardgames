import { Solitaire } from "./Solitaire";
import { NewGame } from "./actions/NewGame";
import { SolitaireLogger } from "./util/SolitaireLogger";

/*
 * Run with ts-node
 */

const g = new Solitaire();
const solitaireLogger = new SolitaireLogger();

solitaireLogger.connect(g);

g.execute(new NewGame());