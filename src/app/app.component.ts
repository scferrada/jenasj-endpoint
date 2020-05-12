import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ExampleQuery } from './model/exquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-simjoin';

  deleteSubject: Subject<void> = new Subject<void>();
  submitSubject: Subject<void> = new Subject<void>();
  renderSubject: Subject<Object> = new Subject<Object>();
  exampleSubject: Subject<ExampleQuery> = new Subject<ExampleQuery>();

  deleteQuery(){
    this.deleteSubject.next();
  }

  submitQuery(){
    this.submitSubject.next();
  }

  renderResults(o: Object){
    this.renderSubject.next(o);
  }

  selectExample(q: ExampleQuery){
    this.exampleSubject.next(q);
  }

}