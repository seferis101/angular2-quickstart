import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {HeroService} from './hero.service';
import {Hero} from './hero';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();

    error: any;
    navigated = false; // true if navigated here
    private sub: Subscription;

    constructor(private heroService: HeroService, private route: ActivatedRoute) { }

    ngOnInit(): any {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) { // edit existing hero
                let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            } else { // create new hero
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
    
    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
}
