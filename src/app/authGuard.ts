import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router : Router
    ){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>{
        return this.authService.authState$.pipe(map(state => {
                this.router.navigate(['/login']);
                return false;
            })
        )
    }
}