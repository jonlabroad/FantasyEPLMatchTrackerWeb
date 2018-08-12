import CacheKey from "./CacheKey"

export default class ColorCommentator {

    private static singleGoalTemplates : Array<string> = new Array<string>(
        "{footballerName} has scored a goal!",
        "Goal! Scored by {footballerName}",
        "Goal {footballerName}! He will be delighted by that one!",
        "Goal {footballerName}! The goalkeeper has football pie all over his shirt!",
        "Yesss! Goal by {footballerName}!",
        "{footballerName} sticks it in! Thank you and good night!",
        "Goal {footballerName}! He must have a foot like a traction engine!",
        "Boof! 'Eat my goal!' says {footballerName}",
        "{footballerName}! What a goal!",
        "{footballerName} pops one in!",
        "A wonderful finish by {footballerName}",
        "{footballerName} scores a good goal!",
        "Alexi Lalas: '{footballerName} is lucky that the opposing goalkeeper is in such terrible form'",
    );

    // This likely won't happen!
    private static multiGoalTemplates : Array<string> = new Array<string>(
        "Wow! {eventNum} goals scored by {footballerName}!",
        "Incredible!!! {eventNum} goals scored by {footballerName}!",
        "{footballerName} scores {eventNum}! Oh what a night he is having!!!"
    )

    private static negativeGoalTemplates : Array<string> = new Array<string>(
        "Goal miscredited! {footballerName} will be disappointed to not have his name on it!",
        "{footballerName} has a goal taken away and given to his teammate. No matter how generous he may be, he would still like to have that one!",
        "Correction: {footballerName} did not actually score that last goal after review"
    );

    private static under60Templates : Array<string> = new Array<string>(
        "{footballerName} steps onto the pitch",
        "{footballerName} is getting started out there",
        "{footballerName} enters the fold",
        "{footballerName} looks warmed up and ready to go",
        "{footballerName} gets into the game",
        "{footballerName} enters the game",
        "Alexi Lalas: '{footballerName} will definitely not see the pitch tonight. Will he even make the bench?'",
    );

    private static over60Templates : Array<string> = new Array<string>(
        "{footballerName} is going the distance tonight",
        "{footballerName} has played the majority of the match",
        "The manager has no interest in taking {footballerName} off this early",
        "{footballerName} has played over 60 minutes tonight",
        "All that fitness training has paid off for {footballerName}, as he still looks to have plenty of energy left",
        "{footballerName} has been hustling all night, and shows no sign of stopping",
        "The manager would be insane to take off {footballerName} this early",
        "It is every great player's desire to be on the pitch as much as possible, and {footballerName} is no different",
        "Alexi Lalas: '{footballerName} looks tired, I'm surprised he has gone on this long'",
    );

    private static assistTemplates : Array<string> = new Array<string>(
        "{footballerName} gets an assist!",
        "{footballerName} assisted a goal!",
        "An amazing ball played in by {footballerName}!",
        "Playing an effective final ball is an art form, perfected by {footballerName}!",
        "Assist! {footballerName}!",
        "A decisive play started by {footballerName}!",
        "{footballerName} credited with the assist!",
        "The final pass was made by {footballerName}!",
        "Alexi Lalas: '{footballerName} looks like he is playing with lead boots out there. His passing play is simply horrific'",
    );

    private static negativeAssistTemplates : Array<string> = new Array<string>(
        "Assist has been taken away from {footballerName} after careful review"
    );

    private static cleanSheetTemplates : Array<string> = new Array<string>(
        "{footballerName} has kept a clean sheet so far tonight!",
        "{footballerName} hasn't let anything get by him tonight!",
        "Can nothing get by {footballerName}?",
        "{footballerName} will be delighted by the defense's superb play tonight",
        "{footballerName} has earned a clean sheet",
        "Alexi Lalas: '{footballerName} and his defense will have a lot of trouble keeping a clean sheet today'",
    );

    private static negativeCleanSheetTemplates : Array<string> = new Array<string>(
        "{footballerName} has lost his clean sheet!",
        "{footballerName} slips up and concedes a goal for the first time tonight",
        "{footballerName} could possibly be blamed for giving up the clean sheet",
        "{footballerName} will be disappointing in losing the clean sheet",
        "{footballerName} and company concede their first goal of the night",
        "Alexi Lalas: 'There is no way that {footballerName} will concede a goal'",
    );

    private static bonus1Templates : Array<string> = new Array<string>(
        "{footballerName} has put in quite the performance tonight!",
        "{footballerName} has left everything out the pitch tonight",
        "{footballerName} put in a great performance tonight",
        "It's no surprise that {footballerName} was considered one of the best players out there",
        "Another day, another solid performance by {footballerName}",
        "The skills of {footballerName} were certainly put on display tonight!",
        "Alexi Lalas: '{footballerName} might as well hang up his boots, he just isn't up to this level of competition'",
    );

    private static bonus2Templates : Array<string> = new Array<string>(
        "{footballerName} showed why he is one of the best in the business tonight",
        "{footballerName} missed the Man of the Match award, but was certainly a very close second",
        "{footballerName} with one of his best performances of the season!",
        "{footballerName} was one of the stars on display during this match",
        "Another day, another amazing performance by {footballerName}",
        "It felt like {footballerName} barely put a foot wrong tonight!",
        "Alexi Lalas: '{footballerName} had no business being on the pitch tonight'",
    );

    private static bonus3Templates : Array<string> = new Array<string>(
        "Could this have been one of the best ever performances by {footballerName}?",
        "{footballerName} with a scintillating performance!!! Can it get any better?",
        "{footballerName} was simply amazing tonight. That was liquid football!",
        "The Man of the Match Award deservedly goes to {footballerName}!",
        "{footballerName} will act like it's no big deal, but he was far and away the best player out there!",
        "{footballerName} is playing like a world-beater!",
        "With more performances like this, {footballerName} may go down as one of the all-time greats!",
        "{footballerName}... the new GOAT??? It's becoming harder and harder to argue against!",
        "Alexi Lalas: 'What can I say? {footballerName} was simply terrible out there today'",
    );

    public static GetGoalCommentary(footballerName : any, num : number, gameweek : number) : string {
        var vals = ColorCommentator.singleGoalTemplates;
        if (num > 1) {
            vals = ColorCommentator.multiGoalTemplates;
        }
        if (num < 0) {
            vals = this.negativeGoalTemplates;
        }
        var hashString = `${footballerName}${num}${gameweek}`;
        var index = ColorCommentator.getIndex(hashString, vals.length);
        return vals[index]
            .replace("{footballerName}", footballerName)
            .replace("{eventNum}", num.toString());
    }

    public static GetMinutesCommentary(footballerName : any, num : number, gameweek : number) : string {
        var vals = ColorCommentator.under60Templates;
        if (num >= 60) {
            vals = ColorCommentator.over60Templates;
        }
        var hashString = `${footballerName}${num}${gameweek}`;
        var index = ColorCommentator.getIndex(hashString, vals.length);
        return vals[index]
            .replace("{footballerName}", footballerName)
            .replace("{eventNum}", num.toString());
    }

    public static GetAssistCommentary(footballerName : any, num : number, gameweek : number) : string {
        var vals = ColorCommentator.assistTemplates;
        if (num < 0) {
            vals = this.negativeAssistTemplates;
        }
        var hashString = `${footballerName}${num}${gameweek}`;
        var index = ColorCommentator.getIndex(hashString, vals.length);
        return vals[index]
            .replace("{footballerName}", footballerName)
            .replace("{eventNum}", num.toString());
    }    

    public static GetCleanSheetCommentary(footballerName : any, num : number, gameweek : number) : string {
        var vals = ColorCommentator.cleanSheetTemplates;
        if (num < 0) {
            vals = ColorCommentator.negativeCleanSheetTemplates;
        }
        var hashString = `${footballerName}${num}${gameweek}`;
        var index = ColorCommentator.getIndex(hashString, vals.length);
        return vals[index]
            .replace("{footballerName}", footballerName)
            .replace("{eventNum}", num.toString());
    }

    public static GetBonusCommentary(footballerName : any, num : number, gameweek : number) : string {
        var vals = ColorCommentator.bonus1Templates;
        if (num == 2) {
            vals = ColorCommentator.bonus2Templates;
        }
        if (num == 3) {
            vals = ColorCommentator.bonus3Templates;
        }
        var hashString = `${footballerName}${num}${gameweek}`;
        var index = ColorCommentator.getIndex(hashString, vals.length);
        return vals[index]
            .replace("{footballerName}", footballerName)
            .replace("{eventNum}", num.toString());
    }

    private static getIndex(s : string, len : number) {
        var hashCode = Math.abs(ColorCommentator.getHashCode(s));
        return hashCode % len;
    }

    private static getHashCode(s : string) : number {
        var h = 0, l = s.length, i = 0;
        if ( l > 0 )
          while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };

}