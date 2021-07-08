
import {NgModule} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatSliderModule} from '@angular/material/slider';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatDividerModule} from '@angular/material/divider';
import {LayoutModule} from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatInputModule,
        MatCardModule,
        MatCarouselModule,
        MatSliderModule,
        NgImageSliderModule,
        MatDividerModule,
        LayoutModule,
        MatGridListModule,
        MatListModule,
        CdkTableModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule

    ],
    exports:[
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatInputModule,
        MatCardModule,
        MatCarouselModule,
        MatSliderModule,
        NgImageSliderModule,
        MatDividerModule,
        LayoutModule,
        MatGridListModule,
        MatListModule,
        CdkTableModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
    ]
})
export class MyMaterialModule{

}