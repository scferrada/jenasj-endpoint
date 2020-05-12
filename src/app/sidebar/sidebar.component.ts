import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { ExampleQuery } from '../model/exquery';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

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
  @Output() selectexample = new EventEmitter<ExampleQuery>();

  deleteQuery(){
    this.deletetxt.emit();
  }

  submitQuery(){
    this.submittxt.emit();
  }

  openExampleDialog(){
    const dialogRef = this.dialog.open(ExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)  
        this.selectexample.emit(result)
      }
      );
  }

  openShareDialog(){
    this.dialog.open(ShareDialogComponent);
  }

}
