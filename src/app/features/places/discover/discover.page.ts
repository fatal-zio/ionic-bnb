import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../../core/services/place.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
  }

}
