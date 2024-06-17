import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead, Platform } from '../models/lead';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  http = inject(HttpClient);

  api = "http://localhost:5000/leads"

  constructor() { }

  getLeads(): Observable<Lead[]>{
    return this.http.get<{sucess: boolean, leads: any[]}>(this.api+"/getLeads").pipe(
      map(response => {
        if (response.sucess) {
          return response.leads.map(lead => new Lead(
            lead.id_lead,
            new Date(lead.data_value),
            lead.name_lead,
            lead.number_lead,
            lead.status_lead,
            new Platform(lead.plataform_lead.id_plataform, lead.plataform_lead.name_plataform)
          ));
        } else {
          return [];
        }
      })
    );
  }
  
  deleteLead(id: number): Observable<string>{
    return this.http.post<string>(this.api+"/deleteLead/"+id, {responseType: 'text' as 'json'});
  }



  createLead(name_lead: string, number_lead: string, id_plataform: number): Observable<string>{
    const payload = {
      name: name_lead,
      number: number_lead,
      id_plataform: id_plataform
    };
    console.log(payload);
    return this.http.post<string>(this.api+"/createLead/", payload, {responseType: 'text' as 'json'});
  }

  updateLead(id_lead: number, name_lead: string, number_lead: string, id_plataform: number): Observable<{ success: boolean, lead: string }> {
    const payload = {
      name: name_lead,
      number: number_lead,
      id_plataform: id_plataform
    };
    return this.http.post<{ success: boolean, lead: string }>(this.api+"/updateLead/"+id_lead, payload, {responseType: 'text' as 'json'});
  }

  getbyId(id: number): Observable<Lead>{
    return this.http.get<{success: boolean, lead: any}>(this.api+"/getLead/"+id).pipe(
      map(response => {
        const leadTest = new Lead(
          response.lead.id_lead,
          response.lead.data_value,
          response.lead.name_lead,
          response.lead.number_lead,
          response.lead.status_lead,
          new Platform(response.lead.plataform_lead.id_plataform, response.lead.plataform_lead.name_plataform)
        );
        return leadTest;
      })
    );
  }
}
  

