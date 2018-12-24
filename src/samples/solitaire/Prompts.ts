import * as inquirer from "inquirer";
import { MoveFromTableauToFoundation } from "./actions/MoveFromTableauToFoundation";
import { NewGame } from "./actions/NewGame";
import { Solitaire } from "./Solitaire";
import { StockToTalon } from "./actions/StockToTalon";
import { StandardCard } from "../../cards-core/fifty-two-cards/StandardCard";
import { SolitaireLogger } from "./util/SolitaireLogger";
import { ConsoleReset } from "../../core/util/ConsoleColors";
import { StandardCardStack } from "../../cards-core/fifty-two-cards/StandardCardStack";
import { MoveFromTableauToTableau } from "./actions/MoveFromTableauToTableau";
import { BaseErrorEvent } from "../../core/events/BaseErrorEvent";
import { MoveFromTalonToTableau } from "./actions/MoveFromTalonToTableau";
import { MoveFromTalonToFoundation } from "./actions/MoveFromTalonToFoundation";

//TODO huge refactoring
const renderCardAndAboveFromTableau = (g: Solitaire, c: StandardCard) => {
    const stack = new StandardCardStack();
    const tab = g.getTableauForCard(c);
    let drawn = tab!.draw()!;
    while (drawn !== c) {
        stack.push(drawn);
        drawn = tab!.draw()!;
    }
    stack.push(drawn);
    tab!.push(...stack.getCards().reverse());
    return stack
        .getCards()
        .map(x => ConsoleReset + SolitaireLogger.getOpenCardString(x))
        .join("");
};

const talonToFoundationPrompt = (g: Solitaire) => {
    const talonCard = g.getState().talon.peek();
    if (talonCard && !talonCard.isFaceDown()) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "foundation",
                    message:
                        "Place " +
                        SolitaireLogger.getOpenCardString(
                            g.getState().talon.peek()
                        ) +
                        " on top of",
                    choices: g.getState().foundations.map((t, i) => {
                        return {
                            name:
                                ConsoleReset +
                                (t.peek()
                                    ? SolitaireLogger.getOpenCardString(
                                          t.peek()
                                      )
                                    : "foundation " + i),
                            value: t
                        };
                    })
                }
            ])
            .then((answers: any) => {
                g.execute(new MoveFromTalonToFoundation(answers.foundation));
            });
    } else {
        g.triggerError(new BaseErrorEvent("no face up card on talon!"));
    }
};

const talonToTableauPrompt = (g: Solitaire) => {
    const talonCard = g.getState().talon.peek();
    if (talonCard && !talonCard.isFaceDown()) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "tableau",
                    message:
                        "Place " +
                        SolitaireLogger.getOpenCardString(
                            g.getState().talon.peek()
                        ) +
                        " on top of",
                    choices: g.getState().tableaus.map((t, i) => {
                        return {
                            name:
                                ConsoleReset +
                                (t.peek()
                                    ? SolitaireLogger.getOpenCardString(
                                          t.peek()
                                      )
                                    : "tableau " + i),
                            value: t
                        };
                    })
                }
            ])
            .then((answers: any) => {
                g.execute(new MoveFromTalonToTableau(answers.tableau));
            });
    } else {
        g.triggerError(new BaseErrorEvent("no face up card on talon!"));
    }
};

const tableauToTableauPrompt = (g: Solitaire) =>
    inquirer
        .prompt([
            {
                type: "list",
                name: "card",
                message: "Select from tableau",
                choices: g
                    .getState()
                    .tableaus.map(t => t.getCards())
                    .reduce((x, y) => [...x, ...y])
                    .filter(x => !x.isFaceDown())
                    .map(x => {
                        return {
                            name: renderCardAndAboveFromTableau(g, x),
                            value: x
                        };
                    })
            },
            {
                type: "list",
                name: "tableau",
                message: "Place on top of",
                choices: g.getState().tableaus.map((t, i) => {
                    return {
                        name:
                            ConsoleReset +
                            (t.peek()
                                ? SolitaireLogger.getOpenCardString(t.peek())
                                : "tableau " + i),
                        value: t
                    };
                })
            }
        ])
        .then((answers: any) => {
            const tableau = g.getTableauForCard(answers.card);
            if (tableau) {
                g.execute(
                    new MoveFromTableauToTableau(
                        answers.card,
                        tableau,
                        answers.tableau
                    )
                );
            }
        });

const tableauToFoundationPrompt = (g: Solitaire) =>
    inquirer
        .prompt([
            {
                type: "list",
                name: "card",
                message: "Choose your card on tableau",
                choices: g
                    .getState()
                    .tableaus.map(t => t.peek())
                    .filter(x => x && !x.isFaceDown())
                    .map(x => {
                        return {
                            name:
                                ConsoleReset +
                                SolitaireLogger.getOpenCardString(x),
                            value: x
                        };
                    })
            },
            {
                type: "list",
                name: "foundation",
                message: "Choose target foundation",
                choices:  g.getState().foundations.map((t, i) => {
                    return {
                        name:
                            ConsoleReset +
                            (t.peek()
                                ? SolitaireLogger.getOpenCardString(
                                      t.peek()
                                  )
                                : "foundation " + i),
                        value: t
                    };
                })
            }
        ])
        .then((answers: any) => {
            const tableau = g.getTableauForCard(answers.card);
            if (tableau) {
                g.execute(
                    new MoveFromTableauToFoundation(
                        answers.card,
                        tableau,
                        answers.foundation
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
            choices: [
                "stock to talon",
                "tableau to tableau",
                "talon to tableau",
                "talon to foundation",
                "tableau to foundation",
                "new game",
                "exit"
            ]
        })
        .then((answers: any) => {
            switch (answers.action) {
                case "stock to talon":
                    g.execute(new StockToTalon());
                    break;
                case "tableau to foundation":
                    tableauToFoundationPrompt(g);
                    break;
                case "talon to foundation":
                    talonToFoundationPrompt(g);
                    break;
                case "tableau to tableau":
                    tableauToTableauPrompt(g);
                    break;
                case "talon to tableau":
                    talonToTableauPrompt(g);
                    break;
                case "new game":
                    g.execute(new NewGame());
                    break;
                case "exit":
                    break;
            }
        });
