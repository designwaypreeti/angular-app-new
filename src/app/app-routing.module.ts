import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { IsLoggedinService } from './shared/guard/is-loggedin.service'
import { LoginComponent } from './login/login.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { RegisterComponent } from './register/register.component'
import { ProfileComponent } from './profile/profile.component'
import { AuthGuardService } from './shared/guard/auth-guard.service'
import { DashboardComponent } from './dashboard/dashboard.component'
import { EventCreateComponent } from './events/event-create/event-create.component'
import { CheckTokenService } from './shared/guard/check-token.service'
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { OrdersComponent } from './orders/orders.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { SubscriptionComponent } from './superadmin/subscription/subscription.component';
import { AdminGuardService } from './shared/guard/admin-guard.service';
import { OrganiserGuardService } from './shared/guard/organiser-guard.service';
import { SubscriptionListComponent } from './superadmin/subscription-list/subscription-list.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsLoggedinService]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [IsLoggedinService]
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
        canActivate: [IsLoggedinService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [IsLoggedinService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService, CheckTokenService, OrganiserGuardService]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuardService, CheckTokenService,OrganiserGuardService]
    },
    {
        path: 'events/create',
        component: EventCreateComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'events/:id',
        component: EventDetailsComponent,
        canActivate: [AuthGuardService, OrganiserGuardService]
    },
    {
        path: 'events',
        component: EventListComponent,
        canActivate: [AuthGuardService, OrganiserGuardService]
    },
    {
        path: 'venues',
        component: VenueListComponent,
        canActivate: [AuthGuardService, OrganiserGuardService]
    },
    {
        path: 'superadmin',
        component: SuperadminComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'superadmin/subscription',
        component: SubscriptionListComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    }, 
    {
        path: 'superadmin/subscription/create',
        component: SubscriptionComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'superadmin/subscription/update/:id',
        component: SubscriptionComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: '',
        component: EventListComponent,
        canActivate: [AuthGuardService]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
