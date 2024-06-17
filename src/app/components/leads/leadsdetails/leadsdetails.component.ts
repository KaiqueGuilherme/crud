import { Component, ViewChild, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Lead, Platform } from '../../../models/lead';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LeadService } from '../../../services/lead.service';

@Component({
  selector: 'app-leadsdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './leadsdetails.component.html',
  styleUrl: './leadsdetails.component.css'
})
export class LeadsdetailsComponent {
  date = new Date();
  lead: Lead = new Lead(0, this.date, '', '', true, new Platform(0, ''));
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  LeadService = inject(LeadService);
  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id && id > 0) {
      this.findByid(id);
    }
  }

  findByid(id: number): void {
    this.LeadService.getbyId(id).subscribe({
      next: lead =>{
        this.lead = lead;
      },
      error: err =>{
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao Buscar o Lead!',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/admin/leadslist']);
  }

  save(): void {
    if (this.lead.id_lead > 0) {
      console.log(this.lead);
      this.LeadService.updateLead(
        this.lead.id_lead,
        this.lead.name_lead,
        this.lead.number_lead,
        this.lead.plataform_lead.id_plataform
      ).subscribe({
        next: response =>{
          Swal.fire({
            title: 'Sucesso!',
            text: 'Lead Editado Com sucesso!',
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
          this.router.navigate(['/admin/leadslist']);
        },
        error: err =>{
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao Buscar o Lead!',
            icon: 'error',
            confirmButtonText: 'Continuar'
          });
          console.log(err)
        }
      })
    } else {
      this.LeadService.createLead(
        this.lead.name_lead,
        this.lead.number_lead,
        this.lead.plataform_lead.id_plataform).subscribe({
        next: response =>{
          console.log(response)
          Swal.fire({
            title: 'Sucesso!',
            text: 'Lead Editado Com sucesso!',
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
          this.router.navigate(['/admin/leadslist']);
        },
        error: err =>{
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao Buscar o Lead!',
            icon: 'error',
            confirmButtonText: 'Continuar'
          });

        }
      })
    }
  }
}
