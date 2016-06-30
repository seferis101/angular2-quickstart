import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> { // ACHTUNG: in Vorlage keine Angabe des Rückgabetyps!
        return Promise.resolve(HEROES);
    }
}
