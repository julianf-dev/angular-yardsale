const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve) => {
    resolve('valor 1')
  })
}


const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4')
    }, 3000)
    setTimeout(() => {
      observer.next(null)
    }, 8000)
    setTimeout(() => {
      observer.next('valor 5 $')
    }, 10000)
  })
}

(async () => {
  const rta = await doSomething();
  console.log(rta)
})();

(() => {
  const obs$ = doSomething$();
  obs$
  //ciertas transformaciones
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta)
  })
})();


//test formData
const formData = new FormData()
formData.append('archivo', 'test')
for (const value of formData.values()) {
  console.log(value);
}
