import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { MainComponent } from '../layout/main/main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
      FooterComponent,
      HeaderComponent,
      SidebarComponent,
      MainComponent,
    ],
    exports: [FooterComponent, HeaderComponent, SidebarComponent, MainComponent],
    imports: [CommonModule, RouterModule,  ReactiveFormsModule, MatListModule,
        MatSidenavModule],
  })
  export class SharedModule {}