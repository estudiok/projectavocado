import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})

export class ComponentsModule {}
