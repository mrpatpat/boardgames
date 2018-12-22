import { Card } from "./Card";

export class CardStack<T extends Card> {

    constructor(private cards: T[] = []) {}

    public shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public take(card: T): T|undefined {
        const index = this.cards.indexOf(card);
        let took = undefined;
        if (index > -1) {
            took = this.cards.splice(index, 1)[0];
        }
        return took;
    }

    public clear() {
        this.cards = [];
    }

    public push(...cards:T[]) {
        cards.forEach(c=>this.cards.push(c));
    }

    public draw(): T|undefined {
        return this.cards.pop();
    }

    public drawMany(amount: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < amount; i++) {
            const c = this.draw();
            if(c) {
                result.push(c);
            }
        }
        return result;
    }

    public peek(): T {
        return this.peekMany(1)[0];
    }

    public peekMany(amount: number): T[] {
        return this.cards.slice(this.cards.length-1-amount, this.cards.length).reverse();
    }

    public getCards(): T[] {
        return this.cards;
    }

}