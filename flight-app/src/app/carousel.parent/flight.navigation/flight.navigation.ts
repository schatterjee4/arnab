import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-flight-navigation-component',
  templateUrl: './flight.navigation.component.html',
  styleUrls: ['./flight.navigation.component.scss']
})
export class FlightNavComponent {
  title = 'app';
  name:String;
  constructor(private route: ActivatedRoute,router: Router) { 
    router.events.subscribe((s:any) => {
    if(s instanceof NavigationEnd) {
      this.name = s.urlAfterRedirects;
      if(this.name!=null )
      {
        this.name = this.name.replace("/","");
        this.name = this.name=="" || this.name=="cancel"  || this.name=="view"  || this.name=="refund"  ?"one":this.name;
      }
    }});
    console.log(router.url);  // to print only path eg:"/login"
  }
}
