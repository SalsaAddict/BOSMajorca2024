import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
  override serialize(tree: UrlTree): string {
    let url = super.serialize(tree);
    return url.toLowerCase();
  }
}
