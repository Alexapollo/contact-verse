import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';
import { ContactPanelComponent } from './components/contact-panel/contact-panel.component';
import { TelephonePanelComponent } from './components/telephone-panel/telephone-panel.component';

const routes: Routes = [
    { path: '', redirectTo: 'contacts-view', pathMatch: 'full' },
    // { path: '**', redirectTo: 'contacts-view' },
    { path: 'contacts-view', component: ContactsViewComponent },
    { path: 'contact/:id', component: ContactPanelComponent },
    { path: 'contact/:contactId/telephone/:telephoneId', component: TelephonePanelComponent }
    // {
    //     path: '',
    //     component: ContactsViewComponent        
    // children: [
    //     { path: '', redirectTo: 'users-view', pathMatch: 'full' },
    //     { path: 'users-view', component: UsersViewComponent },
    //     { path: 'user/:id', component: UserComponent },
    //     { path: 'manage-account', component: ManageAccountViewComponent },
    //     { path: 'html-templates-view', component: HtmlTemplatesViewComponent },
    //     { path: 'html-templates/:id', component: HtmlTemplatesComponent },
    //     { path: 'hotels-view', component: HotelsViewComponent },
    //     { path: 'hotel/:id', component: HotelComponent },
    //     { path: 'hotel/:hotelId/room/:roomId', component: RoomComponent },
    //     { path: 'providers-view', component: ProvidersViewComponent },
    //     { path: 'provider/:id', component: ProviderComponent },
    //     { path: 'services-view', component: ServicesViewComponent },
    //     { path: 'service/:id', component: ServiceComponent },
    //     { path: 'reservations-view', component: ReservationsViewComponent },
    //     { path: 'reservation/:id', component: ReservationComponent }
    // { path: 'manage-account/:action', component: ManageAccountActionsComponent }
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }