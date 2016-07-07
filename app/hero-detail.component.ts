import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    private hero: Hero;
    private sub: Subscription;

    constructor(private heroService: HeroService, private route: ActivatedRoute) { }

    ngOnInit(): any {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }

    goBack() {
        window.history.back();
    }
}
