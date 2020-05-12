import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.css']
})
export class QueryResultsComponent implements OnInit {

  result = null;
  displayCols = [];
  private eventSubmitSubscription: Subscription;
  @Input() eventRender: Observable<Object>;

  constructor() { }

  ngOnInit(): void {
    this.eventSubmitSubscription = this.eventRender.subscribe(
      x => {
        this.result = x;
        this.displayCols = [];
        for(var key in x[0]){
          this.displayCols.push(key);
        }
      }
    );
  }

  ngOnDestroy(): void{
    this.eventSubmitSubscription.unsubscribe();
  }

}
