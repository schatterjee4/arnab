import { Component, OnInit, Inject, Input } from '@angular/core';


@Component({
    selector: "carousel",
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
    @Input() container: string;
    
    urls: string[];
    images: Array<string>;
    //constructor(private carouselService: CarouselService) { }

    ngOnInit() {
        if (this.container !== undefined) {
            console.log(this.container);

            this.urls = [
               "../assets/carousel/vg-1.jpg",
               "../assets/carousel/vg-2.jpeg",
               "../assets/carousel/vg-3.jpeg",
               "../assets/carousel/vg-4.jpeg"

              ];
           /* this.carouselService.get(this.container).subscribe(
                (urls: string[]) => this.urls = urls
            );*/
        }
    }
}