import { MatchEvent } from "./MatchEvent";

export default interface ProcessedPlayer {
    events: MatchEvent[];

    isCurrentlyPlaying: boolean;
    isDonePlaying: boolean;
}
