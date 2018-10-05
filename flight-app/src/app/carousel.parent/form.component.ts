import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService,states} from './services/form.shared.service';
import { NgbTypeaheadSelectItemEvent, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'basic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./carousel.parent.component.scss']
})
export class BasicFormComponent implements OnInit {

  myForm: FormGroup;
  clickedItem:string;
    public model: any;

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService, config: NgbDatepickerConfig) { 
    config.minDate = {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()};
    config.markDisabled = (date: NgbDateStruct) => {
      const today = new Date();
      //console.log("dd"+date.month);
      //console.log("dt"+today.getMonth());

    // alert(  today.getMonth());
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getMonth() < today.getMonth();
    };
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.value.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    formatter = (x: {value: string}) => x.value;

    /*setModel(e: NgbTypeaheadSelectItemEvent, fubi: any) {
      this.model = e.item.name;
    }*/
   /* selectedItem(item){
      this.clickedItem=item.item;
      console.log(item.id);
    }*/
   
  ngOnInit() {
    
    this.myForm = this.fb.group({
      triptype: 'one',
      dest: '',
      origin: '',
      datefrom:'',
      dateto:'',
	  adult:'0',
	  child:'0',
	  infant:'0'
    });

   // this.myForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    if (this.myForm.valid) {
      console.log("Form Submitted!");
     //tbd
    }
    console.log("Form entry!");
    Object.keys(this.myForm.controls).forEach((key: string) => {
      console.log(this.myForm.controls[key].value);
      this._dataService.setOption(key,this.myForm.controls[key].value);

    });
    this._dataService.fetchConfig().subscribe((data: any) => {
      this._dataService.setOption('rmsConfig', data);

    });
    this.router.navigate(['search']);
  }
  add(refinput)
  {
    refinput.value=refinput.value!="" && refinput.value!=null? refinput.value*1+1:1;
    this.myForm.controls[refinput.id].setValue(refinput.value);
  }
  remove(refinput){
    refinput.value=refinput.value!="" && refinput.value!=null && refinput.value!=0 ? refinput.value*1-1:0;
    this.myForm.controls[refinput.id].setValue(refinput.value);

  }
}