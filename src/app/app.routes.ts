import { Routes } from '@angular/router';
import { HomeuserComponent } from './components/layout/homeuser/homeuser.component';
import { LeadslistComponent } from './components/leads/leadslist/leadslist.component';
import { LeadsdetailsComponent } from './components/leads/leadsdetails/leadsdetails.component';

export const routes: Routes = [
    {path:"", redirectTo:"admin/leadslist", pathMatch:'full'},
    {path: "admin", component: HomeuserComponent, children: [
        {path: "leadslist", component: LeadslistComponent},
        {path: "lead/new", component: LeadsdetailsComponent},
        {path: "leads/edit/:id", component: LeadsdetailsComponent}
    ]},
];
