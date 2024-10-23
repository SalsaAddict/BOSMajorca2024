export namespace Timetable {
  export interface Timetable {
    Days: Day[];
    Meals: Meal[];
    Areas: Area[];
    Items: Item[];
  }
  export interface Day {
    Date: string;
    Day: string;
    Start: number;
    End: number;
    Theme: string;
  }
  export interface Meal {
    title: string;
    hour: number;
    hours: number;
  }
  export interface Area {
    Id: string;
    Description: string;
  }
  export interface Item {
    Day: string;
    AreaId: string;
    Hour: number;
  }
  export interface Workshop extends Item {
    Act: string;
    Title: string;
    LevelId: number;
    Level: string;
    GenreId: string;
    Genre: string;
  }
  export interface Activity extends Item {
    Hours: number;
    Title: string;
    Subtitle?: string;
    Description?: string;
    Category: string;
    Opacity: number;
  }
  export interface DisplayItem extends Activity {
    IsWorkshop: boolean;
    Favourite?: boolean;
  }
  export function isWorkshop(item: Item): item is Workshop {
    let workshop = item as Workshop;
    if (typeof workshop.Act === 'string')
      if (workshop.Act.length > 0) return true;
    return false;
  }
  export function isActivity(item: Item): item is Activity {
    return !isWorkshop(item);
  }
}
