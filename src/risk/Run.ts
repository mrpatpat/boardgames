import { RiskPlayer } from "./RiskPlayer";
import { Risk, IRiskState } from "./Risk";
import { simpleContinent } from "./SimpleContinent";
import { SelectStarterCountry } from "./SelectStarterCountry";
import { Deploy } from "./Deploy";
import { Attack } from "./Attack";
import { EndAttack } from "./EndAttack";
import { Move } from "./Move";
import { EndTurn } from "./EndTurn";
import { EventLogger } from "../core/util/EventLogger";

/**
 * You can run this with ts-node 
 */

const adrian = new RiskPlayer("Adrian");
const fatih = new RiskPlayer("Fatih");

const g = new Risk([adrian, fatih], simpleContinent);
const l = new EventLogger<IRiskState, RiskPlayer>();
l.connect(g.$getEventStream());

g.execute(new SelectStarterCountry(adrian, 0));
g.execute(new SelectStarterCountry(fatih, 4));
g.execute(new Deploy(adrian, 0));
g.execute(new Attack(adrian, 0, 1));
g.execute(new EndAttack(adrian));
g.execute(new Move(adrian, 1, 0));
g.execute(new Deploy(fatih, 4));
g.execute(new Attack(fatih, 4, 3));
g.execute(new Attack(fatih, 3, 1));
g.execute(new Attack(fatih, 3, 1));
g.execute(new Attack(fatih, 3, 1));
g.execute(new EndTurn(fatih));

g.end();
l.disconnect();
