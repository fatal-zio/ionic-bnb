import { Injectable } from '@angular/core';
import { Place } from '../../shared/models/place.model';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private baseUrl = 'https://ionic-bnb.firebaseio.com/';

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'id1',
      'Manhattan Mansion',
      'In the heart of New York.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'id2',
      // tslint:disable-next-line: quotemark
      "L'Amour Toujours",
      'Romantic in Paris',
      'https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/03/Shangri-La-Paris-Hotel-Suite-View-2.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'fdr'
    ),
    new Place(
      'id3',
      'The Foggy Palace',
      'Not your average city trip.',
      'https://i1.trekearth.com/photos/138102/dsc_0681.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'jdp'
    )
  ]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  get places() {
    return this._places.asObservable();
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://i1.trekearth.com/photos/138102/dsc_0681.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.http
      .post<{ name: string }>(this.baseUrl + 'offered-places.json', {
        ...newPlace,
        id: null
      })
      .pipe(
        switchMap(response => {
          generatedId = response.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(
          place => place.id === placeId
        );
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );

        this._places.next(updatedPlaces);
      })
    );
  }
}
