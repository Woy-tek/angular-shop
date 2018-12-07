import { Injectable } from "@angular/core";
import { AuthService, Credentials } from "./auth.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { AngularFireDatabase } from "angularfire2/database";

export interface UserData{
    email: string,
    role: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router : Router,
        private db : AngularFireDatabase
    ){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>{
        return this.authService.authState$.pipe(map(state => {

                if(state != null){
                    this.db.list('/users').valueChanges().subscribe(
                        users => {
                            this.authService.role = users.filter( a => (<UserData>a).email === state.email).map(a => (<UserData>a).role)[0];
                            // console.log("ROLE: " + this.authService.role);
                        }
                    );

                    return true;
                }

                this.router.navigate(['/login']);
                return false;
            })
        )
    }
}