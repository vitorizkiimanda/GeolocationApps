import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = 0.0;
  long:any = 0.0;
  distance:any = 0.0;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation) {

  }

  ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then( position  =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    }).catch ( error => console.log(error));
  }

  updateLocation(){
    this.geolocation.getCurrentPosition().then( position  =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    }).catch ( error => console.log(error));
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

}
