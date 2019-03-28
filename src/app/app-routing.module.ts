import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './features/auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './features/places/places.module#PlacesPageModule' },
  { path: 'bookings', loadChildren: './features/bookings/bookings.module#BookingsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
