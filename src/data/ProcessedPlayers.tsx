import ProcessedPlayer from "./ProcessedPlayer";

export type MappedProcessedPlayers = {[key: number]: ProcessedPlayers};

export type ProcessedPlayers = {
    players: {[key: number]: ProcessedPlayer}
}