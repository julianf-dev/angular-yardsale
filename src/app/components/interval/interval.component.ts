import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-interval',
  templateUrl: 'interval.component.html'
})

export class IntervalComponent implements OnInit, OnDestroy {

  count = interval(1000);
  suscription!: Subscription;

  ngOnInit(): void {
    this.suscription = this.count.subscribe(d => {
      console.log("contando:", d);
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
