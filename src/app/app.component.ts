import { Component } from '@angular/core';
import { Subject } from 'rxjs';

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

  deleteQuery(){
    this.deleteSubject.next();
  }

  submitQuery(){
    this.submitSubject.next();
  }

  renderResults(o: Object){
    this.renderSubject.next(o);
  }

}