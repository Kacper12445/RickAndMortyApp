import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchingPageComponent } from './pages/searching-page/searching-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'searching', component: SearchingPageComponent },
  { path: 'library', component: LibraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
