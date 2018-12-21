import { Risk } from "./Risk";
import { bufferCount, concat } from "rxjs/operators";
import { RiskPlayer } from "./RiskPlayer";
import { EndTurn } from "./EndTurn";
import { simpleContinent } from "./SimpleContinent";
import { SelectStarterCountry } from "./SelectStarterCountry";
import { Deploy } from "./Deploy";
import { Attack } from "./Attack";
import { Move } from "./Move";
import { EndAttack } from "./EndAttack";

describe("Risk", ()=>{

    it("play", async (done)=>{

        const adrian = new RiskPlayer("Adrian");
        const fatih = new RiskPlayer("Fatih");

        const g = new Risk([adrian, fatih], simpleContinent);

        const $all = g.$state.pipe(concat(g.$beforeAction, g.$afterAction));
        $all.subscribe(()=>{}, ()=>{}, ()=>{
            console.log("done");
            done();
        });

        g.execute(new SelectStarterCountry(adrian, 0));

        g.execute(new SelectStarterCountry(fatih, 4));

        g.execute(new Deploy(adrian, 0));
        g.execute(new Attack(adrian, 0, 1));
        g.execute(new EndAttack(adrian));
        g.execute(new Move(adrian, 1, 0));

        g.execute(new Deploy(fatih, 4));
        g.execute(new Attack(fatih, 4, 3));
        g.execute(new Attack(fatih, 3, 1));
        g.execute(new EndTurn(fatih));

        //spam some events to see previous in jest
        g.execute(new EndTurn(adrian));
        g.execute(new EndTurn(fatih));

        g.end();

    });

})