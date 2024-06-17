export class Platform {
    id_plataform!: number;
    name_plataform!: string;
  
    constructor(id_plataform: number, name_plataform: string) {
      this.id_plataform = id_plataform;
      this.name_plataform = name_plataform;
    }
  }
  
  export class Lead {
    id_lead!: number;
    data_value!: Date;
    name_lead!: string;
    number_lead!: string;
    status_lead!: boolean;
    selected: boolean = false;
    plataform_lead!: Platform;
  
    constructor(id_lead: number, data_value: Date, name_lead: string, number_lead: string, status_lead: boolean, plataform_lead: Platform) {
      this.id_lead = id_lead;
      this.data_value = data_value;
      this.name_lead = name_lead;
      this.number_lead = number_lead;
      this.status_lead = status_lead;
      this.plataform_lead = plataform_lead;
    }
  }
  