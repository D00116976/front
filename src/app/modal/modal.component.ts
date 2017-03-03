import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  delete()
  {
  	console.log("Person to be deleted");
  }
}
