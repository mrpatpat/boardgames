import { Solitaire } from "./Solitaire";
import { NewGame } from "./actions/NewGame";
import { SolitaireLogger } from "./util/SolitaireLogger";
import * as inquirer from "inquirer";
import { ReplaySubject, Observable } from "rxjs";
/*
 * Run with ts-node
 */

const g = new Solitaire();
const solitaireLogger = new SolitaireLogger();
solitaireLogger.connect(g);

const actionQuestion = {
    type: "list",
    name: "action",
    message: "Choose your action",
    choices: ["new game"]
};

const answerFn = (answers: any) => {
    switch (answers.action) {
        case "new game":
            g.execute(new NewGame());
            inquirer.prompt(actionQuestion).then(answerFn);
            break;
    }
};

inquirer.prompt(actionQuestion).then(answerFn);
