import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { FooterComponent } from './footer/footer.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    DropdownModule,
    ChartModule,
    TooltipModule,
		ToolbarModule,
		SplitButtonModule,
		InputTextModule
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
