import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {resolve} from 'url';

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> { // ACHTUNG: in Vorlage keine Angabe des Rückgabetyps!
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 3000) // wait 3 seconds
        );
    }
}
