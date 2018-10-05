import {Component, ViewEncapsulation, Optional, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './flight.booking.popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./flight.booking.popup.scss']
})
export class NgbdModalOptions {
  closeResult: String;
  @Input() modaltype;
  @Input() size;
 
 
  constructor(public activeModal: NgbActiveModal) {
  }

  
}
@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  modalRef :NgbModalRef;
  constructor(private modalService: NgbModal) {}

  openVerticallyCentered( type?:any, size?:any, cssclass?:any) {
    this.modalRef = this.modalService.open(NgbdModalOptions, { backdrop : 'static',
    keyboard : false, windowClass: cssclass, centered:true});
    this.modalRef.componentInstance.modaltype = type;
    this.modalRef.componentInstance.size = size;
    //modalRef.componentInstance.name = 'World';
   /* modalRef.componentInstance.data = {
      foo: 'bar',
      name: 'World'
    }*/
  }
  closeActive(){
    this.modalRef.close();
  }
}
