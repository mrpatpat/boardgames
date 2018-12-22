import { Card } from "../Card";
import { fiftyTwoCardsData } from "./FiftyTwoCardsData";
import { StandardCardStack } from "./StandardCardStack";

export enum StandardCardSuites {
    Hearts,
    Clubs,
    Diamonds,
    Spades
}

export class StandardCard extends Card {
    private suit: StandardCardSuites;
    private faceDown: boolean = false;

    constructor(suit: string, private value: number) {
        super(value + suit, `${StandardCard.getValueLiteral(value)} ${suit}`);
        this.suit = StandardCard.getSuiteType(suit);
    }

    public isFaceDown(): boolean {
        return this.faceDown;
    }

    public setFaceDown(value: boolean) {
        this.faceDown = value;
    }
    public getSuit(): StandardCardSuites {
        return this.suit;
    }

    public getValue(): number {
        return this.value;
    }

    public static getSuiteType(suite: string): StandardCardSuites {
        switch (suite) {
            case "hearts":
                return StandardCardSuites.Hearts;
            case "spades":
                return StandardCardSuites.Spades;
            case "clubs":
                return StandardCardSuites.Clubs;
            case "diamonds":
                return StandardCardSuites.Diamonds;
            default:
                throw new Error("unknown suite type " + suite);
        }
    }

    public static getValueLiteral(value: number): string {
        switch (value) {
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
            case 14:
                return "A";
            default:
                return value + "";
        }
    }

    public static buildDeck(): StandardCardStack {
        return new StandardCardStack(fiftyTwoCardsData.map(
            data => new StandardCard(data.suit, data.value)
        ));
    }
}
