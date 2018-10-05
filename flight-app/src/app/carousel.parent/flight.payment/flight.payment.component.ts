import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormService } from '../services/form.shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbdModalOptions, NgbdModalComponent } from '../flight.booking.popup/flight.booking.pop.component';


@Component({
    selector: 'app-flight-payment',
    templateUrl: './flight.payment.component.html',
    styleUrls: ['./flight.payment.component.scss'],
    
})
export class FlightPaymentComponent implements OnInit {
    myPaymentForm: FormGroup;
    pnr:string;
    points:number;
    remainingPoints:Number;
    multiplier:number;
    check: boolean;
    disabled:String;
    ccNumber: string;
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService,
        private  modal: NgbdModalComponent 

    ) { }

    ngOnInit() {
        this.myPaymentForm = this.fb.group({
            totalPrice: this._dataService.get()['totalPrice'],
            fop:'cc'
        });
        this.points=0;
        this.remainingPoints=0;
        this.multiplier=Math.floor(Math.random() * 100);
        this.check=false;
       // alert(this._dataService.get()['totalPrice']);
      //  this.myPaymentForm.value.totalPrice = this._dataService.get()['totalPrice'];
        if (this.containername !== undefined) {
            console.log(this.containername);
        }
    }
    onSubmit() {
        this.pnr =  this.makeid();
        this._dataService.setOption('fop',  this.myPaymentForm.value.fop);
        if(this.myPaymentForm.value.fop==='cc'){
          let ccnum = this.ccNumber.replace(/\s/g, '');
        this._dataService.setOption('ccLastFour',  ccnum.substring(ccnum.length-4, ccnum.length));
        this._dataService.setOption('ccLength',  ccnum.length);
        this._dataService.setOption('ccType',  this.ccType());
        }

        setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});

        this._dataService.savePnr().subscribe((data:any) => {
            if(data!=null)
            {
                this.modal.closeActive();
                this._dataService.setOption("bookingRef", data.pnr);
                this.modal.openVerticallyCentered(null,'md','');

                    this.router.navigate(['bookingdetails']);
               
            }
          //  console.log(this.outboundFlights);

        },
        complete => {
          console.log('done');
          this.modal.closeActive();
         
        });
     
    }
    makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < 5; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
      }
      generatePoints(price)
      {
          this.points = price*1 + (this.multiplier * 1);
          this.remainingPoints = 0;
      }
      updatePoints(price,event)
      {
        if ( event.target.checked ) {
            this.points = this.points - price*1 ;
            this.check = true;
        }else{
            this.points = price*1 + (this.multiplier * 1);
            this.check=false;
        }
      }
      ccFormat(event: any) {
        var v =  this.ccNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        var len=match.length;
        for (let i= 0; i<len; i+=4) {
            parts.push(match.substring(i, i+4));
        }
    
        if (parts.length) {
            this.ccNumber= parts.join(' ');
        } 
          return  this.ccNumber;
        
    }
    ccType(): string
    {
        const regexAmex =   new RegExp('^3[47][0-9]{5,}$');
        let regexVisa= new RegExp('^4[0-9]{6,}$');
        // tslint:disable-next-line:max-line-length
        let regexMasterCard= new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');
        let regexDiscover=new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{4,}$');
        let ccType='';
        let ccnum = this.ccNumber.replace(/\s/g, '');

        // tslint:disable-next-line:max-line-length
        const arrayCheck = [{'key':"AMEX","regex":regexAmex},{'key':"MASTERCARD","regex":regexMasterCard},{'key':"VISA","regex":regexVisa},{'key':"DISCOVER","regex":regexDiscover}];
        arrayCheck.forEach(reg => {
            if(reg.regex.test(ccnum) && ccType=='')
            {
                ccType=reg.key;
                return;
            }
      
          });
          return ccType;
    }


}
