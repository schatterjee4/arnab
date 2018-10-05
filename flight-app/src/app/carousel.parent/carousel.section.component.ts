import { Component, OnInit, Inject, Input } from '@angular/core';
import { BasicFormComponent } from "./form.component";
import { CarouselModule } from './carousel/carousel.module';


@Component({
    selector: "carousel-section",
    templateUrl: './carousel.section.component.html',
    styleUrls: ['./carousel.parent.component.scss'],
})
export class CarouselSectionComponent implements OnInit {
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }

    ngOnInit() {
        if (this.containername !== undefined) {
         console.log(this.containername);
        }
    }
}