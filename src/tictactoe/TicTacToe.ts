import { Game } from "../core/Game";
import { Action } from "../core/Action";
import { Player } from "../core/Player";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface ITicTacToeState {
  grid: string[];
  currentPlayerId: number;
  players: Player[];
}

export class Mark extends Action<ITicTacToeState> {
  private player: TicTacToePlayer;

  constructor(origin: TicTacToePlayer, private cell: number) {
    super(origin);
    this.player = origin;
  }

  isAllowed(state: ITicTacToeState): boolean {
    return (
      this.player === state.players[state.currentPlayerId],
      this.cell < state.grid.length &&
        this.cell >= 0 &&
        state.grid[this.cell] === "-"
    );
  }

  transform(state: ITicTacToeState): ITicTacToeState {
    const n = state.grid.slice(0);
    n[this.cell] = this.player.name;
    return {
      ...state,
      grid: n,
      currentPlayerId: state.currentPlayerId === 0 ? 1 : 0
    };
  }
}

export class TicTacToePlayer extends Player {
  constructor(isX: boolean) {
    super(isX ? "x" : "o");
  }
}

export class TicTacToe extends Game<ITicTacToeState> {
  public $winner: Observable<TicTacToePlayer>;

  constructor() {
    const xp = new TicTacToePlayer(true);
    const op = new TicTacToePlayer(false);

    super({
      grid: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      players: [xp, op],
      currentPlayerId: 0
    });

    this.$winner = this.$afterAction.pipe(
      filter(a => this.actionCausedWin(a)),
      map(a => a.origin)
    );
  }

  public markAsCurrentPlayer(cell: number) {
    const { currentPlayerId, players } = this.$state.getValue();
    this.execute(new Mark(players[currentPlayerId], cell));
  }

  public actionCausedWin(action: Action<ITicTacToeState>) {
    const { grid } = this.$state.getValue();
    const winStr = action.origin.name + action.origin.name + action.origin.name;
    return (
      grid[0] + grid[1] + grid[2] === winStr ||
      grid[3] + grid[4] + grid[5] === winStr ||
      grid[6] + grid[7] + grid[8] === winStr ||
      grid[0] + grid[3] + grid[6] === winStr ||
      grid[1] + grid[4] + grid[7] === winStr ||
      grid[2] + grid[5] + grid[8] === winStr ||
      grid[0] + grid[4] + grid[8] === winStr ||
      grid[2] + grid[4] + grid[6] === winStr 
    );
  }
}
