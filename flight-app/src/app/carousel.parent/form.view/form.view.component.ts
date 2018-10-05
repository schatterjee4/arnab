import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService} from '../services/form.shared.service';


@Component({
  selector: 'basic-view-form',
  templateUrl: './form.view.component.html',
  styleUrls: ['../carousel.parent.component.scss']
})
export class BasicViewFormComponent implements OnInit {

  myviewForm: FormGroup;
  clickedItem:string;
    public model: any;

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService) { 
  
  }

 

    /*setModel(e: NgbTypeaheadSelectItemEvent, fubi: any) {
      this.model = e.item.name;
    }*/
   /* selectedItem(item){
      this.clickedItem=item.item;
      console.log(item.id);
    }*/
   
  ngOnInit() {
    
    this.myviewForm = this.fb.group({
      pnrSrch: '',
      lnameSrch: ''
     
    });

    this.myviewForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    if (this.myviewForm.valid) {
      console.log("Form Submitted!");
     //tbd
    }
    console.log("Form entry!");
    Object.keys(this.myviewForm.controls).forEach((key: string) => {
      this._dataService.setOption(key,this.myviewForm.controls[key].value);

    });
    this.router.navigate(['view']);
  }
  
}