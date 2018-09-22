import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = 0.0;
  long:any = 0.0;
  timestamp:any;
  distance:any = 0.0;
  accuracy:any = 0.0;
  altitude:any = 0.0;
  heading:any = 0.0;
  speed:any = 0.0;
  destination:any;
  submitted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingController : LoadingController,
    private nativeGeocoder: NativeGeocoder,
    public geolocation: Geolocation) {

  }

  ionViewWillEnter(){
    this.updateLocation();
  }

  updateLocation(){
    let loading = this.loadingController.create({
      content: 'loading..'
  });

    loading.present();
    this.geolocation.getCurrentPosition().then( position  =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
      this.altitude = position.coords.altitude;
      this.heading = position.coords.heading;
      this.speed = position.coords.speed;
      this.timestamp = position.timestamp;
      this.timestamp = new Date(this.timestamp);
      loading.dismiss();
    }).catch ( error => {
      alert(error)
      loading.dismiss();
    });
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    this.distance = d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getCoordinate(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

  this.nativeGeocoder.reverseGeocode(-6.5574205, 106.7314220, options)
    .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
    .catch((error: any) => console.log(error));

  console.log(this.destination)
  this.nativeGeocoder.forwardGeocode(this.destination, options)
    .then((coordinates: any[]) => console.log(coordinates))
    // .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
    .catch((error: any) => console.log(error));
  }

}
