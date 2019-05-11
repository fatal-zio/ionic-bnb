import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaceService } from '../../../core/services/place.service';
import { Place } from '../../../shared/models/place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  private placesSub: Subscription;

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.placesSub = this.placeService.places.subscribe(places => {
      this.places = places;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
