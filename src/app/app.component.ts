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

  deleteQuery(){
    this.deleteSubject.next();
  }

  submitQuery(){
    this.submitSubject.next();
  }

}