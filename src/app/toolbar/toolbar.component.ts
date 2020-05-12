import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { ExampleQuery } from '../model/exquery';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  @Output() selectexample = new EventEmitter<ExampleQuery>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openExampleDialog(){
    let dialogRef = this.dialog.open(ExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      this.selectexample.emit(result)
    });
  }

  openHelpDialog(){
    this.dialog.open(HelpDialogComponent);
  }

}
