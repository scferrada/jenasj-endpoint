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
    {name: "Similar Elections", 
     description: "Obtain the three other elections, similar to the German General Election in 2017", 
     query:`PREFIX wdt:<http://www.wikidata.org/prop/direct/>
PREFIX wd:<http://www.wikidata.org/entity/>

SELECT ?election1 ?election2 ?candidates1 ?candidates2 ?parties1 ?parties2 ?d WHERE {
    {SELECT (wd:Q15062956 as ?election1)  (count(distinct ?candidate1) as ?candidates1)
            (count(distinct ?party1) as ?parties1) 
            (count(distinct ?ideology1) as ?ideo1) WHERE {
            wd:Q15062956 wdt:P726 ?candidate1 .
            ?candidate1 wdt:P102 ?party1 . ?party1 wdt:P1387 ?ideology1 .
        }}
    SIMILARITY JOIN 
    ON (?candidates1, ?parties1, ?ideo1) (?candidates2, ?parties2, ?ideo2)
    TOP 2 USING 'manhattan' AS ?d
    {SELECT ?election2 (count(distinct ?candidate2) as ?candidates2)
            (count(distinct ?party2) as ?parties2) 
            (count(distinct ?ideology2) as ?ideo2) WHERE {
            ?class wdt:P279* wd:Q40231 .
            ?election2 wdt:P31 ?class ; wdt:P726 ?candidate2 .
            ?candidate2 wdt:P102 ?party2 . ?party2 wdt:P1387 ?ideology2 .
} group by ?election2}}`},
]