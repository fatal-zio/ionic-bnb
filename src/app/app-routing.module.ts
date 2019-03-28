import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './features/auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './features/places/places.module#PlacesPageModule' },
  { path: 'discover', loadChildren: './features/places/discover/discover.module#DiscoverPageModule' },
  { path: 'offers', loadChildren: './features/places/offers/offers.module#OffersPageModule' },
  { path: 'new-offer', loadChildren: './features/places/offers/new-offer/new-offer.module#NewOfferPageModule' },
  { path: 'edit-offer', loadChildren: './features/places/offers/edit-offer/edit-offer.module#EditOfferPageModule' },
  { path: 'place-detail', loadChildren: './features/places/discover/place-detail/place-detail.module#PlaceDetailPageModule' },
  { path: 'place-bookings', loadChildren: './features/places/offers/place-bookings/place-bookings.module#PlaceBookingsPageModule' },
  { path: 'bookings', loadChildren: './features/bookings/bookings.module#BookingsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
