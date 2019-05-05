import { Injectable } from '@angular/core';
import { Place } from '../../shared/models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private _places: Place[] = [
    new Place(
      'id1',
      'Manhattan Mansion',
      'In the heart of New York.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'id2',
      "L'Amour Toujours",
      'Romantic in Paris',
      'https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/03/Shangri-La-Paris-Hotel-Suite-View-2.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'id3',
      'The Foggy Palace',
      'Not your average city trip.',
      'https://i1.trekearth.com/photos/138102/dsc_0681.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  getPlace(id: string): Place {
    return { ...this._places.find(p => p.id === id) };
  }
}
