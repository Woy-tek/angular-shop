import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public data: AngularFireList<any[]>;

  constructor(private db : AngularFireDatabase) { }

  ngOnInit() {
    this.data = this.db.list('/users');
  }

  getData() : Observable<any>{
    return this.data.valueChanges()
  }

  getD(){
    this.getData().subscribe(
      a => {
        console.log(a);
      }
    )
  }

}
