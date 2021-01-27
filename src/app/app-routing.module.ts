import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { LibroComponent } from './components/libro/libro.component';

const routes: Routes = [
  { path: 'biblioteca', component: BibliotecaComponent },
  { path: 'libro/:id', component: LibroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'biblioteca' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
