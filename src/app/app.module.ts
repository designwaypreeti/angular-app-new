import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ColorPickerModule } from 'ngx-color-picker';
import { MatTabsModule, MatDialog, MatDialogRef } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { LoginComponent } from './login/login.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { RegisterComponent } from './register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { CardModalComponent } from './profile/card-modal/card-modal.component'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ToastrModule } from 'ngx-toastr'
import { ProfileCardComponent } from './profile/profile-card/profile-card.component'
import { ProfileBankDetailsComponent } from './profile/profile-bank-details/profile-bank-details.component'
import { ProfileBankDetailsCardComponent } from './profile/profile-bank-details-card/profile-bank-details-card.component'
import { AuthGuardService } from './shared/guard/auth-guard.service'
import { IsLoggedinService } from './shared/guard/is-loggedin.service'
import { EventCreateComponent } from './events/event-create/event-create.component'
import { MainService } from './shared/services/main.service'
import { ProfileSubscriptionComponent } from './profile/profile-subscription/profile-subscription.component'
import { AppRoutingModule } from './app-routing.module'
import { CheckTokenService } from './shared/guard/check-token.service'
import { TicketCardComponent } from './events/ticket-card/ticket-card.component'
import { CreateTicketComponent } from './events/create-ticket/create-ticket.component'
import { VenueCreateModalComponent } from './venue/venue-create-modal/venue-create-modal.component'
import { AgmCoreModule } from '@agm/core'
import { DndDirective } from './shared/directives/dnd.directive'

import { CloudinaryModule } from '@cloudinary/angular-5.x'
import * as  Cloudinary from 'cloudinary-core';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { TicketSalesComponent } from './ticket-sales/ticket-sales.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { CleanInputDirective } from './shared/directives/clean-input.directive';
import { OrdersComponent } from './orders/orders.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { SuperadminDashboardComponent } from './superadmin/superadmin-dashboard/superadmin-dashboard.component';
import { SubscriptionComponent } from './superadmin/subscription/subscription.component';
import { SuperadminHeaderComponent } from './superadmin-header/superadmin-header.component';
import { SubscriptionListComponent } from './superadmin/subscription-list/subscription-list.component'
import { SuperadminService } from "./shared/services/superadmin.service";
import { AdminGuardService } from "./shared/guard/admin-guard.service";
import { OrganiserGuardService } from "./shared/guard/organiser-guard.service";
import { OrderDialogComponent } from "./orders/order-dialog/order-dialog.component";
import { FilterPipe } from './shared/pipes/filter.pipe';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { PayemntsComponent } from './payemnts/payemnts.component';
import { PaymentsDialogComponent } from './payemnts/payments-dialog/payments-dialog.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    CardModalComponent,
    ProfileCardComponent,
    ProfileBankDetailsComponent,
    ProfileBankDetailsCardComponent,
    EventCreateComponent,
    ProfileSubscriptionComponent,
    TicketCardComponent,
    CreateTicketComponent,
    VenueCreateModalComponent,
    DndDirective,
    EventDetailsComponent,
    EventListComponent,
    VenueListComponent,
    TicketSalesComponent,
    TicketBookingComponent,
    CleanInputDirective,
    OrdersComponent,
    DialogComponent,
    SuperadminComponent,
    SuperadminDashboardComponent,
    SubscriptionComponent,
    SuperadminHeaderComponent,
    SubscriptionListComponent,
    OrderDialogComponent,
    FilterPipe,
    PayemntsComponent,
    PaymentsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZtIhJkaK4XblD4GF9NQ6fm5D0XlB7T_A'
    }),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'rubiq-solutions'}),
    ColorPickerModule,
    MatTabsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    SelectDropDownModule,
    ChartsModule
  ],
  providers: [
    AuthGuardService,
    IsLoggedinService,
    CheckTokenService,
    MainService,
    SuperadminService,
    AdminGuardService,
    OrganiserGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    OrderDialogComponent,
    PaymentsDialogComponent
  ]
})
export class AppModule { }
