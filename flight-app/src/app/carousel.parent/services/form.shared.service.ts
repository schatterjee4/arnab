import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Flight } from '../models/flight.results.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export const states = [{"key":"JFK","value":"New York"},{"key":"CCU","value":"Kolkata"},{"key":"MAA","value":"Chennai"},{"key":"DEL","value":"Delhi"},{"key":"ZRH","value":"Zurich"},{"key":"DXB","value":"Dubai"}];
export const months = ['NAN','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export const status = [{"key":"C","value":"Cancelled"},{"key":"OK","value":"Confirmed"}];
// tslint:disable-next-line:max-line-length
export const airlines = [{"key":"KLM","value":"Royal Dutch Airlines"},{"key":"EY","value":"Etihad Airways"},{"key":"LH","value":"Lufthansa"},{"key":"LX","value":"Swiss Airline"},{"key":"AF","value":"Air France"}];

@Injectable()
export class FormService {
    data: any;
    http: Http;

    constructor(http: Http) {
        this.http = http;
        console.log('Inside service');
        //this.config = this.http.get('/config.json');
        this.data = {
            fareRouteTwo: '',
            fareRouteOne: '',
            triptype: ' ',
            dest: '',
            origin: '',
            datefrom: '',
            dateto: '',
            adult: '',
            child: '',
            infant: ''
        }
        console.log(this.data['adult']);
    }
    setOption(option, value) {
        this.data =  this.get();
        this.data[option] = value;
        this.saveData(this.data);
    }
    get() {
        if(localStorage.getItem('currentUserData'))
        {
            this.data = JSON.parse(localStorage.getItem('currentUserData'));
        }
      
        return this.data;
    }
    saveData(data: Object){
        localStorage.setItem('currentUserData', JSON.stringify(data));

    }
 getOutboundFlights(orig:String, dest:String): Observable<any[]> {
         //this.http.get('../../assets/flight-outbound-results.json')
        const responseOutbound = this.http.get('../../assets/airmultiavailability.json').pipe(
        //const responseOutbound = this.http.get('http://104.42.45.156:3000/api/v1.0/airmultiavailability?type=1').pipe(
            map((res:Response) => (
                console.log( res.json()),
               // tslint:disable-next-line:max-line-length
               res.json().flightInfo.filter(items => items.basicFlightInfo.departureLocation.cityAirport === orig && items.basicFlightInfo.arrivalLocation.cityAirport == dest )
            ))
          );
         // console.log(this.http.get('http://104.42.45.156:3000/api/v1.0/airmultiavailability?type=1'));
          return responseOutbound;
    } 
    getInboundFlights(orig:String, dest:String): Observable<Flight[]> {
        return this.http.get('../../assets/flight-inbound-results.json').pipe(
            map((res:Response) => (
               res.json().flightDetails.filter(items => items.source == orig && items.destination == dest )
            ))
          );
    } 
    fetchView(pnr, lname): Observable<any> {
        return this.http.get('http://localhost:3000/fetchDetails?lastName='+lname+'&pnr='+pnr.toUpperCase()).pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    } 
    fetchRefund(pnr, lname): Observable<any> {
        return this.http.get('http://localhost:3000/fetchRefundAmount?lastName='+lname+'&pnr='+pnr.toUpperCase()).pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    } 
    confirmCancel(pnr, refundAmount): Observable<any> {
        let objectArr = {};
        objectArr['pnr']= pnr;
        objectArr['refundAmount']= refundAmount;
        let requestObj = JSON.stringify(objectArr);

        // tslint:disable-next-line:max-line-length
        return this.http.post('http://localhost:3000/updateCancelStatus', requestObj, { headers: new Headers({ 'Content-Type': 'application/json' }) }).pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    } 
    savePnr(): Observable<any>
    {
        const data = this.get();
        let objectArr = {};
        objectArr['paxArray']= data['items'];
        objectArr['source']= data['fareRouteOne']['source'];
        objectArr['destination']= data['fareRouteOne']['destination'];
        objectArr['category']= data['fareRouteOne']['category'];
        objectArr['carrierName']= data['fareRouteOne']['carrierName'];
        objectArr['aircraftType']= data['fareRouteOne']['aircraftType'];
        objectArr['duration']= data['fareRouteOne']['duration'];
        objectArr['endTime']= data['fareRouteOne']['endTime'];
        objectArr['startTime']= data['fareRouteOne']['startTime'];
        objectArr['carrier']= data['fareRouteOne']['carrier'];
        objectArr['traveldate']=  data['datefrom']['month']+"/"+data['datefrom']['day']+"/"+data['datefrom']['year'];
        objectArr['price']= data['totalPrice'];
        objectArr['baseFare']= data['fareRouteOneVal']*1;
        objectArr['fop']= data['fop'];
        objectArr['ccLastFour']= data['ccLastFour'];
        objectArr['ccLength']= data['ccLength'];
        objectArr['ccType']= data['ccType'];

        if( data['fareRouteTwoVal'])
        {
            objectArr['baseFare']= objectArr['baseFare']*1 + data['fareRouteTwoVal']*1;

        }

        objectArr['taxFuel']= data['taxFuel'];
        objectArr['taxAirport']= data['taxAirport'];
        objectArr['taxFuel']= data['taxFuel'];
        objectArr['chargeService']= data['chargeService'];
        objectArr['feesDevelopment']= data['feesDevelopment'];
         
        let requestObj = JSON.stringify(objectArr);
        let resp;
         // tslint:disable-next-line:max-line-length
         return this.http.post('http://localhost:3000/storeData', requestObj, { headers: new Headers({ 'Content-Type': 'application/json' }) }).pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    }

    getStatusDescr(statusCode: String)
    {
        return status.filter(item => statusCode == item.key);

    }
    getAirlineDescr(code: String)
    {
        return airlines.filter(item => code == item.key);

    }
    fetchConfig(): Observable<any> {
        return this.http.get('http://localhost:3000/fetchConfig').pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    }
    getConfigByName(name:string):any
    {
        const configdata =this.get()['rmsConfig'];
        return configdata.rmsConfig.filter(item => name==item.configName )[0];
    }
}
