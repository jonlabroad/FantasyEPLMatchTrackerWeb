import * as React from "react";
import * as ReactDOM from "react-dom";
import Chip from "./Chip";

export interface ChipStripTeamProps {
    team : any,
    gameweek : number
}

export default class ChipStripTeam extends React.Component<ChipStripTeamProps, {}> {
    private static chipNames : string[] = ["3xc", "wildcard", "freehit", "bboost"];

    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    getCurrentChip() : string[] {
        if (this.props.team.history == null) {
            return [];
        }
        for (var i in this.props.team.history.chips) {
            var chip = this.props.team.history.chips[i];
            if (chip.event == this.props.gameweek) {
                return [chip.name];
            }
        }
        return [];
    }

    getChipsRemaining() : string[] {
        if (this.props.team.history == null) {
            return [];
        }
        var remainingChips = ChipStripTeam.chipNames.slice();
        for (var i in this.props.team.history.chips) {
            var chip = this.props.team.history.chips[i];
            var index = remainingChips.indexOf(chip.name);
            remainingChips.splice(index, 1);
        }
        return remainingChips;
    }

    render() {
        var chipsEnabled : string[] = this.getCurrentChip();
        var chipsAvailable : string[] = this.getChipsRemaining();
        console.log(chipsAvailable);
        return (
            <div className="chipstrip-team d-flex justify-content-around">
                <Chip
                    chipText={"Triple Cptn"}
                    enabled={chipsEnabled.indexOf("3xc") >= 0}
                    available={chipsAvailable.indexOf("3xc") >= 0}
                />
                <Chip
                    chipText={"Wildcard"}
                    enabled={chipsEnabled.indexOf("wildcard") >= 0}
                    available={chipsAvailable.indexOf("wildcard") >= 0}
                />
                <Chip
                    chipText={"Free Hit"}
                    enabled={chipsEnabled.indexOf("freehit") >= 0}
                    available={chipsAvailable.indexOf("freehit") >= 0}
                />
                <Chip
                    chipText={"Bench Boost"}
                    enabled={chipsEnabled.indexOf("bboost") >= 0}
                    available={chipsAvailable.indexOf("bboost") >= 0}
                />
            </div>
        );
    }
}