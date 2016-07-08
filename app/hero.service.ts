import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes'; // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> { // ACHTUNG: in Vorlage keine Angabe des Rückgabetyps!
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError), 3000) // wait 3 seconds
        );
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero); // change hero
        }
        return this.post(hero); // create new hero
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = '${this.heroesUrl}/${hero.id}';

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new Hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
            .post(this.heroesUrl,
                JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<void> {
        console.error('A http error occurred', error);
        return Promise.reject(error.message || error);
    }
}
