import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { Lead } from '../../../models/lead';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LeadService } from '../../../services/lead.service';

@Component({
selector: 'app-leadslist',
standalone: true,
imports: [ MdbTabsModule, CommonModule, RouterLink,MdbModalModule],
templateUrl: './leadslist.component.html',
styleUrls: ['./leadslist.component.css']
})
export class LeadslistComponent {
leads: Lead[] = [];
leadSelecionado: number | null = null;
leadModal!: Lead ;

modalServices = inject(MdbModalService);
@ViewChild('modalLeadDetail') modalLeadDetail!: TemplateRef<any>;
modalRef!: MdbModalRef<any>;
LeadService = inject(LeadService);

constructor(private router: Router , private modalService: MdbModalService ) {
this.leads = [];
this.findAll();
let leadNovo = history.state.leadNovo;
let leadEditado = history.state.leadEditado;
if (leadNovo) {
  
  leadNovo.id_lead = this.generateNewId();
  this.leads.push(leadNovo);
}
if (leadEditado) {
  leadEditado.id_lead = +leadEditado.id_lead;
  const indice = this.leads.findIndex(x => x.id_lead === leadEditado.id_lead);
  console.log(indice)
  if (indice !== -1) {
    this.leads[indice] = leadEditado;

  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Selecione um lead!',
      icon: 'error',
      confirmButtonText: 'Continuar'
    });
  }
}
}

findAll(){
  this.LeadService.getLeads().subscribe({
    next: leads => {
      this.leads = leads;
    }, 
    error(err){
      alert('algo inesperado')
    }
  })
}

generateNewId(): number {
return this.leads.length > 0 ? Math.max(...this.leads.map(lead => lead.id_lead)) + 1 : 1;
}

checkboxChange(id: number, event: any): void {
const isChecked = event.target.checked;
if (isChecked) {
this.leads.forEach(lead => {
if (lead.id_lead === id) {
lead.selected = true;
}
});
} else {

  this.leads.forEach(lead => {
    if (lead.id_lead === id) {
      lead.selected = false;
    }
  });
}

this.updateLeadSelecionado();
}

updateLeadSelecionado(): void {
const selectedLead = this.leads.find(lead => lead.selected);
this.leadSelecionado = selectedLead ? selectedLead.id_lead : null;
}

alterarLeadSelecionado(): void {
if (this.leadSelecionado !== null) {
this.router.navigate([`/admin/leads/edit/${this.leadSelecionado}`]);
} else {
Swal.fire({
title: 'Erro!',
text: 'Você precisa selecionar algum registro da Tabela!',
icon: 'error',
confirmButtonText: 'Continuar'
});
}
}

deleteByid(): void {
const selectedLeads = this.leads.filter(lead => lead.selected);

if (selectedLeads.length === 0) {
  Swal.fire({
    title: 'Erro!',
    text: 'Você precisa selecionar algum registro da Tabela!',
    icon: 'error',
    confirmButtonText: 'Continuar'
  });
  return;
}

Swal.fire({
  title: 'Tem certeza que deseja deletar os registros selecionados?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Deletar',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    selectedLeads.forEach(selectedLead => {
    this.LeadService.deleteLead(selectedLead.id_lead).subscribe({
      next: leads =>{
        Swal.fire({
          title: 'Sucesso!',
          text: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Continuar'
        })
        this.findAll();
      },
      error: err =>{
        Swal.fire({
          title: 'Erro!',
          text: 'Você precisa selecionar algum registro da Tabela!',
          icon: 'error',
          confirmButtonText: 'Continuar'
          });
      }
    })
    });

    this.leadSelecionado = null;
  }
});
}

toggleAllCheckboxes(event: any): void {
const checked = event.target.checked;
this.leads.forEach(lead => lead.selected = checked);
this.updateLeadSelecionado();
}

details(lead: Lead){
this.leadModal = lead;
this.modalRef = this.modalService.open(this.modalLeadDetail);
}

}