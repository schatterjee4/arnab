import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../services/form.shared.service";
import { NgbdModalComponent } from "../flight.booking.popup/flight.booking.pop.component";
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
@Component({
  selector: 'app-flight-booking-component',
  templateUrl: './flight.booking.component.html',
  styleUrls: ['./flight.booking.component.scss']
})

export class FlightBookingComponent {
  data: any;
  origin:String;
  dest:String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: FormService,
    private  modal: NgbdModalComponent
  ) { }

  ngOnInit() {
    setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});
    this.data = this._dataService.get();
    console.log(this.data);
    this.origin = this.data['origin'];
    console.log(this.origin);
    if(this.data.datefrom!=null)
    {
        this.data.datefrom = this.data.datefrom['day']+' '+months[this.data.datefrom['month']]+' '+this.data.datefrom['year'];
    }
    if(this.data.dateto!=null)
    {
        this.data.dateto = this.data.dateto['day']+' '+months[this.data.dateto['month']]+' '+this.data.dateto['year'];
    }
    setTimeout(() => {this.modal.closeActive();
    },2000);
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }

}
