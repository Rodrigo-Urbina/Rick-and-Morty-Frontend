import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ForgotPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ForgotPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
