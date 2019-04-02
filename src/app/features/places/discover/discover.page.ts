import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../../core/services/place.service';
import { Place } from '../../../shared/models/place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {
  places: Place[];

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.places = this.placeService.places;
  }
}
