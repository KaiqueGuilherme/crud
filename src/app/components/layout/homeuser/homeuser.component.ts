import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LeadslistComponent } from '../../leads/leadslist/leadslist.component';

@Component({
  selector: 'app-homeuser',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LeadslistComponent],
  templateUrl: './homeuser.component.html',
  styleUrl: './homeuser.component.css'
})
export class HomeuserComponent {

}
