import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() imgPropiedad = ''
  @Output() loaded = new EventEmitter<string>();
  imageDefault= "https://www.dten.com/wp-content/uploads/2022/05/default-image.jpg"

  constructor() { }

  ngOnInit(): void {
  }

  imgError(){
    this.imgPropiedad = this.imageDefault;
  }

  imgLoaded(){
    console.log('load hijo');
    this.loaded.emit(`string del hijo al padre: ${this.imgPropiedad}`);
  }
}
