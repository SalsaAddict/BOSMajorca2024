import { Timetable } from './timetable';

export type RGB = [number, number, number];

export enum Genre {
  Bachata,
  Salsa,
  Other
}

export enum Activity {
  Party,
  Performance
}

export type Category = keyof typeof Genre | keyof typeof Activity;

export type Categories = {
  [Property in Category]: RGB;
};

export const Colors: Categories = {
  Bachata: [100, 255, 150],
  Salsa: [50, 200, 255],
  Other: [255, 130, 255],
  Party: [255, 220, 80],
  Performance: [255, 150, 127]
};

export class Color {
  static rgba(rgb: RGB, a: number) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
  }
  static radialGradient(rgb: RGB, a: number) {
    let rgbEnd: RGB = [rgb[0] - 50, rgb[1] - 50, rgb[2] - 50],
      start = this.rgba(rgb, a - 0.1),
      end = this.rgba(rgbEnd, a);
    return `radial-gradient(circle,${start},${end})`;
  }
  static backgroundImage(category: Category, opacity: number) {
    return this.radialGradient(Colors[category], opacity);
  }
  static itemBackgroundImage(item: Timetable.DisplayItem) {
    if (item.Favourite === false) {
      return 'radial-gradient(circle, #FFF, #CCC)';
    }
    return this.backgroundImage(item.Category as Category, item.Opacity);
  }
}
