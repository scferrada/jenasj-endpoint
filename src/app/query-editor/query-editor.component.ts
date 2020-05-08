import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { Subscription, Observable } from 'rxjs';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.css']
})
export class QueryEditorComponent implements OnInit {

  private eventDeleteSubscription: Subscription;
  private eventSubmitSubscription: Subscription;

  @Input() eventDelete: Observable<void>;
  @Input() eventSubmit: Observable<void>;

  @Output() submitResults = new EventEmitter<Object>();

  constructor(private queryService: QueryService) { }

  ngOnInit(): void {
    this.eventDeleteSubscription = this.eventDelete.subscribe(
      ()=>this.deleteText()
    );
    this.eventSubmitSubscription = this.eventSubmit.subscribe(
      ()=>this.submitText()
    );
  }
  submitText(): void {
    this.queryService.executeQuery(this.codeModel.value)
    .subscribe(x => {this.emitQueryResult(x)});
  }

  emitQueryResult(x: Object) {
    this.submitResults.emit(x);
  }

  ngOnDestroy(){
    this.eventDeleteSubscription.unsubscribe();
    this.eventSubmitSubscription.unsubscribe();
  }

  deleteText(){
    this.codeModel = {
      language: 'sql',
      uri: 'main.json',
      value:''};
  }

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'sql',
    uri: 'main.json',
    value: `
    SELECT ?c1 ?c2 ?d WHERE {
      {?c1  wdt:P31/wdt:P279* wd:Q6256 ; #countries
            wdt:P2250 ?lifex1 ; wdt:P2131 ?nGDP1 ;
            wdt:P4010 ?GDP1 ; wdt:P2219 ?growth1 ;
            wdt:P1081 ?hdi1 ; wdt:P361 wd:Q12585 } #LATAM
      SIMILARITY JOIN
      ON (?lifex1, ?nGDP1, ?GDP1, ?growth1, ?hdi1) 
         (?lifex2, ?nGDP2, ?GDP2, ?growth2, ?hdi2)
      TOP 1 USING 'manhattan' AS ?d
      {?c2  wdt:P31/wdt:P279* wd:Q6256 ; #countries
            wdt:P2250 ?lifex2 ; wdt:P2131 ?nGDP2 ;
            wdt:P4010 ?GDP2 ; wdt:P2219 ?growth2 ;
            wdt:P1081 ?hdi2 ; wdt:P30 wd:Q46 }} #Europe`,
  };

  options = {
    contextmenu: true,
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: 0,
    scrollbar:{
      handleMouseWheel: true,
      horizontal: 'hidden',
    },
  };
}
