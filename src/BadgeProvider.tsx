export default class BadgeProvider {
    public static getBadgeUrl(teamCode : number) {
        return `https://platform-static-files.s3.amazonaws.com/premierleague/badges/t${teamCode}.png`;
    }
}