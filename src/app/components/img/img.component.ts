import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() imgURL = ''
  @Output() loaded = new EventEmitter<string>();


  imageDefault= "https://www.dten.com/wp-content/uploads/2022/05/default-image.jpg"
  counter = 0;
  counterFn: number | undefined

  /* Components life cicly*/
  constructor() {
    // run before render
    // don't run async
    // run once time
    /* Crea la instancia unicamente de la clase */
    console.log('Constructor', 'ImgValue =>', this.imgURL);
  }

  imgError(){
    this.imgURL = this.imageDefault;
  }


  imgLoaded(){
    console.log('load hijo');
    /* Use the variable loaded to emit the message to the parent*/
    this.loaded.emit(`string del hijo al padre: ${this.imgURL}`);
  }

  ngOnChanges() {
    // run before render
    // run many times
    // run with input changes
    console.log('OnChanges', 'ImgValue =>', this.imgURL);
  }

  ngOnInit(): void {
    // run before render
    // run async functions - fetch
    // run once time
    console.log('ngOnInit', 'ImgValue =>', this.imgURL);

    /* Correr una tarea que corra por cada segundo incrementando counter*/
    this.counterFn = window.setInterval(()=> {
      this.counter += 1;
      console.log('run counter')
    }, 1000)

  }

  ngAfterViewInit(): void {
    // run after render
    // manipulate the child components
    // se relaciona con directivas
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // Only run when we delete a component
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);

  }

  /* End */



}
