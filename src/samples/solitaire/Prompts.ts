import * as inquirer from "inquirer";
import { MoveFromTableauToFoundation } from "./actions/MoveFromTableauToFoundation";
import { NewGame } from "./actions/NewGame";
import { Solitaire } from "./Solitaire";

const tableauToFoundationPrompt = (g: Solitaire) =>
    inquirer
        .prompt([
            {
                type: "list",
                name: "card",
                message: "Choose your card on tableau",
                choices: g.getFaceUpCardsFromAllTableaus().map(x => x.getName())
            },
            {
                type: "list",
                name: "foundation",
                message: "Choose target foundation",
                choices: ["0", "1", "2", "3"]
            }
        ])
        .then((answers: any) => {
            const card = g.getFaceUpCardsFromAllTableaus().find(x => x.getName() === answers.card);
            if (card) {
                g.execute(
                    new MoveFromTableauToFoundation(
                        card,
                        g.getState().foundations[+answers.foundation]
                    )
                );
            }
        });

export const mainPrompt = (g: Solitaire) =>
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "Choose your action",
            choices: ["tableau to foundation", "new game", "exit"]
        })
        .then((answers: any) => {
            switch (answers.action) {
                case "tableau to foundation":
                    tableauToFoundationPrompt(g);
                    break;
                case "new game":
                    g.execute(new NewGame());
                    break;
                case "exit":
                    break;
            }
        });
