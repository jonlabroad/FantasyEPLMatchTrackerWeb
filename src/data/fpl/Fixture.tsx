export default interface Fixture
{
    id: number;
    
    kickoff_time_formatted: string;
    
    started: boolean;
    
    event_day: number;
    
    deadline_time: string;
    
    deadline_time_formatted: string;
    
    stats: any; // type?
       
    code: number;
    
    kickoff_time: string;
    
    team_h_score: number;
    
    team_a_score: number;
    
    finished: boolean;
    
    minutes: number;
    
    provisional_start_time: boolean;
    
    finished_provisional: boolean;

    eventId: number;
    
    team_a: number;
    
    team_h: number;
}
