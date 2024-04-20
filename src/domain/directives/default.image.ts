import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'img[src]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()',
  },
})
export class DefaultImage {
  @Input() src!: string;
  public defaultImg: string = 'assets/movie-placeholder.png';

  public onError() {
    this.src = this.defaultImg;
  }

  public checkPath(src: string) {
    return src ? src : this.defaultImg;
  }
}
