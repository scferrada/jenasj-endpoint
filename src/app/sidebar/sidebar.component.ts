import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @Output() deletetxt = new EventEmitter<void>();
  @Output() submittxt = new EventEmitter<void>();


  deleteQuery(){
    this.deletetxt.emit();
  }

  submitQuery(){
    this.submittxt.emit();
  }

  openExampleDialog(){
    let exampleDialog = this.dialog.open(ExampleDialogComponent);
  }

}
