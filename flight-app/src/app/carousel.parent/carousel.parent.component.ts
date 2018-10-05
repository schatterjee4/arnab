import { Component, OnInit, Inject, Input } from '@angular/core';


@Component({
    selector: "carousel-parent",
    templateUrl: './carousel.parent.component.html',
    styleUrls: ['./carousel.parent.component.scss'],
})
export class CarouselParentComponent implements OnInit {
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }

    ngOnInit() {
        if (this.containername !== undefined) {
         console.log(this.containername);
        }
    }
}