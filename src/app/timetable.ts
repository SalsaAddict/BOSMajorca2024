export namespace Timetable {
  export interface Timetable {
    Days: Day[];
  }
  export interface Day {
    Day: string;
    Start: number;
    End: number;
  }
}
