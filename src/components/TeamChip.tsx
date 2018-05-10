import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamChipProps {
    chip : String
}

class ChipUtil {
    static GetChipName(chip : String) {
        if (chip == "3xc") {
            return "Triple Captain";
        }
        else if (chip == "wildcard") {
            return "Wildcard";
        }
        else if (chip == "freehit") {
            return "Free Hit";
        }
        else if (chip == "bboost") {
            return "Bench Boost";
        }
        else {
            return chip;
        }
    }
}

export var TeamChip = function TeamChip(props : TeamChipProps) {
    return (
        <span className="team-chip">
            {props.chip != null && props.chip.length > 0 ? `*  ${ChipUtil.GetChipName(props.chip)}  *` : ""}
        </span>
    );
}

export default {TeamChip};