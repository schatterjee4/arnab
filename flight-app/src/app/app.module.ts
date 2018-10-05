import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselParentModule } from './carousel.parent/carousel.parent.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormService} from './carousel.parent/services/form.shared.service';
import { HttpModule } from '@angular/http';
import { FlightNavComponent } from './carousel.parent/flight.navigation/flight.navigation';
import { NgbdModalComponent, NgbdModalOptions } from './carousel.parent/flight.booking.popup/flight.booking.pop.component';
@NgModule({
  declarations: [
    AppComponent,
    FlightNavComponent,
    NgbdModalComponent,
    NgbdModalOptions

  ],
  imports: [
    BrowserModule,
    CarouselParentModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpModule

  ],
 entryComponents: [NgbdModalOptions],
  providers: [FormService,     NgbdModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
