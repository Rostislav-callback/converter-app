import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        MatToolbarModule,
        CommonModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class CoreModule {}