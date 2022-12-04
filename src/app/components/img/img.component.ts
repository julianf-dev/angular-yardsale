import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  imgURL: string = ''
  // cada que llegue el input corra este metodo
  @Input('imgURL')
  set changeImg(newImg: string){
    this.imgURL = newImg;
  }
  @Input() alt:string  = ''
  @Output() loaded = new EventEmitter<string>();


  imageDefault= "https://www.dten.com/wp-content/uploads/2022/05/default-image.jpg"
  counter = 0;
  counterFn: number | undefined

    imgError(){
      this.imgURL = this.imageDefault;
    }


    imgLoaded(){
      //console.log('load hijo');
      /* Use the variable loaded to emit the message to the parent*/
      //this.loaded.emit(`string del hijo al padre: ${this.imgURL}`);
    }

  /* Components life cicly*/
  constructor() {
    // run before render
    // don't run async
    // run once time
    /* Crea la instancia unicamente de la clase */
    //console.log('Constructor', 'ImgValue =>', this.imgURL);
  }

  ngOnChanges(changes: SimpleChanges) {
    // run before render
    // run many times
    // run with input changes
    //console.log('OnChanges', 'ImgValue =>', this.imgURL);
    // corre cada que cambie algun input, llegan todos los cambios
    //console.log('changes',changes)
    // un solo cambio
  }

  ngOnInit(): void {
    // run before- during render
    // run async functions - fetch call API
    // run once time
    //console.log('ngOnInit', 'ImgValue =>', this.imgURL);

    /* Correr una tarea que corra por cada segundo incrementando counter*/
   /*  this.counterFn = window.setInterval(()=> {
      this.counter += 1;
      console.log('run counter')
    }, 1000) */

  }

  ngAfterViewInit(): void {
    // run after render
    // handler schild components
    // se relaciona con directivas
    //console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // Only run when we delete a component
    //console.log('ngOnDestroy');
    /* window.clearInterval(this.counterFn); */

  }

  /* End */



}
