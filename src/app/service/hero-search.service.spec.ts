import { HttpModule, Http, BaseRequestOptions, Jsonp, JsonpModule,
    Response,
    ResponseOptions,
    XHRBackend} from '@angular/http';


import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { HeroSearchService } from './hero-search.service';
import { Hero } from '../model/hero';

describe('HeroSearchService', () => {
    let heroSearchService: HeroSearchService;
    let backend: MockBackend;

    let MockHeroesArray: Array<Hero> = [ 
        {id: 1, name: 'Superman'},
        {id: 2, name: 'IronMan'},
        {id: 3, name: 'Hulk'},
        {id: 4, name: 'Batman'},
        {id: 5, name: 'Aquaman'}
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
        
            providers: [HeroSearchService, 
                        {provide:XHRBackend, useClass: MockBackend},
                        MockBackend
                ]
        });
        backend = TestBed.get(MockBackend); 
        backend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(MockHeroesArray)
            })));
          });

        heroSearchService = TestBed.get(HeroSearchService); 
    });

    it('should be created', inject([HeroSearchService], (heroSearchService: HeroSearchService, backend) => {
        expect(heroSearchService).toBeTruthy();
        
//        heroSearchService.search("string").subscribe((h) =>
//            expect(h.length).toBe(5)
//        );
    }));
    

    
});
