import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public data: AngularFireList<any[]>;

  constructor(private db : AngularFireDatabase, private authService : AuthService
    ,private router : Router) { }

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

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
