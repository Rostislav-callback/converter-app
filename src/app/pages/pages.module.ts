import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ConvertComponent } from './convert/convert.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    declarations: [
        ConvertComponent
    ],
    imports: [
        MatToolbarModule,
        PagesRoutingModule,
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule
    ],
})

export class PagesModule {}