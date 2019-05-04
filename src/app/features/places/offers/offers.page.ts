import { Component, OnInit } from '@angular/core';
import { Place } from '../../../shared/models/place.model';
import { PlaceService } from '../../../core/services/place.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.offers = this.placeService.places;
  }

  onEdit(id, slidingItem) {
    console.log(id);
  }
}
