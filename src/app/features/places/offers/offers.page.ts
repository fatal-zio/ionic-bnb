import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../../shared/models/place.model';
import { PlaceService } from '../../../core/services/place.service';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSub: Subscription;

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.placesSub = this.placeService.places.subscribe(places => {
      this.offers = places;
    });
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    console.log(id);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
