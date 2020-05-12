import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { Subscription, Observable } from 'rxjs';
import { QueryService } from '../query.service';
import { ExampleQuery } from '../model/exquery';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.css']
})
export class QueryEditorComponent implements OnInit {

  private eventDeleteSubscription: Subscription;
  private eventSubmitSubscription: Subscription;
  private exampleSelectSubscription: Subscription;

  @Input() eventDelete: Observable<void>;
  @Input() eventSubmit: Observable<void>;
  @Input() exampleSelect: Observable<ExampleQuery>;

  @Output() submitResults = new EventEmitter<Object>();

  constructor(private queryService: QueryService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventDeleteSubscription = this.eventDelete.subscribe(
      ()=>this.deleteText()
    );
    this.eventSubmitSubscription = this.eventSubmit.subscribe(
      ()=>{
        let text: string = this.formatQuery(this.codeModel.value);
        if(text){
          this.submitText(text);
          this.routes.navigate([], {queryParams: {q: text}, queryParamsHandling: 'merge'});
        } else {
          this.routes.navigate([], {});
        }
      }
    );
    this.exampleSelectSubscription = this.exampleSelect.subscribe(
      q => this.replaceText(q.query)
    );
  }
  formatQuery(value: string): string {
    let parts = value.split("\n");
    let edited_parts = [];
    parts.forEach(element => {
      let n = element.indexOf("#");
      edited_parts.push(element.substring(0, n==-1? element.length: n).trim());
    });
    let joint = edited_parts.join(" ");
    return joint;
  }

  replaceText(query: string): void {
    this.codeModel = {
      language: 'sql',
      uri: 'main.json',
      value: query
    }
  }
  submitText(text: string): void {
    if(text)
      this.queryService.executeQuery(text)
        .subscribe(x => {this.emitQueryResult(x)});
  }

  emitQueryResult(x) {
    console.log(x);
    this.submitResults.emit(x);
  }

  ngOnDestroy(){
    this.eventDeleteSubscription.unsubscribe();
    this.eventSubmitSubscription.unsubscribe();
    this.exampleSelectSubscription.unsubscribe();
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
    value: `PREFIX wdt:<http://www.wikidata.org/prop/direct/>
PREFIX wd:<http://www.wikidata.org/entity/>

SELECT ?c1 ?c2 ?d WHERE {
  {?c1  wdt:P31 wd:Q6256 ; #countries
        wdt:P2250 ?lifex1 ; wdt:P2131 ?nGDP1 ;
        wdt:P4010 ?GDP1 ; wdt:P2219 ?growth1 ;
        wdt:P1081 ?hdi1 ; wdt:P361 wd:Q12585 } #LATAM
  SIMILARITY JOIN
  ON  (?lifex1, ?nGDP1, ?GDP1, ?growth1, ?hdi1) 
      (?lifex2, ?nGDP2, ?GDP2, ?growth2, ?hdi2)
  TOP 1 USING 'manhattan' AS ?d
  {?c2  wdt:P31 wd:Q6256 ; #countries
        wdt:P2250 ?lifex2 ; wdt:P2131 ?nGDP2 ;
        wdt:P4010 ?GDP2 ; wdt:P2219 ?growth2 ;
        wdt:P1081 ?hdi2 ; wdt:P30 wd:Q46 }} #Europe
        `,
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
