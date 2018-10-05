import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../services/form.shared.service";
import { NgbdModalComponent } from "../flight.booking.popup/flight.booking.pop.component";
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
@Component({
  selector: 'app-flight-booking-cancel-component',
  templateUrl: './flight.booking.cancel.component.html',
  styleUrls: ['./flight.booking.cancel.component.scss']
})

export class FlightCancelledComponent implements OnInit {
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

    this.data = this._dataService.get()['viewRecord'];
    setTimeout(()=> {this.modal.closeActive();}, 2000);

  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }

}
