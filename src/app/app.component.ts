import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  // If the event arrives from the child successfully
  onLoaded(img:string){
    console.log('log padre', img)
    }

  toggleImg() {
    this.showImg = !this.showImg;
  }


}
