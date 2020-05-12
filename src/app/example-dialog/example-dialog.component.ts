import { Component, OnInit} from '@angular/core';
import { examples } from '../model/examples';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.css']
})
export class ExampleDialogComponent implements OnInit {

  qexamples = examples;

  constructor() { }

  ngOnInit(): void {
  }

}
