import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-site',
  templateUrl: './client-site.component.html',
  styleUrls: ['./client-site.component.css']
})
export class ClientSiteComponent implements OnInit {

  date : Date

  constructor() { }

  ngOnInit() {
    this.date = new Date("mm");
    this.date.getDate();
  }

}
