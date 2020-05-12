import { ExampleQuery } from './exquery';

export const examples: ExampleQuery[] = [
    {name: "Similar Countries", 
     description: "Obtains Latin American countries similar to European ones, w.r.t. welfare indicators.",
     query:`PREFIX wdt:<http://www.wikidata.org/prop/direct/>
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
        `},
    {name: "Similar Chemicals", description: "", query:""},
    {name: "Similar Elections", description: "", query:""},
]