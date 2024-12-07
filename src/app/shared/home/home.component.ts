import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animatedUsername: string = '';
  waveUsername: string[] = [];
  ngOnInit(): void {
    this.prepareWaveUserName();
    // this.typeUsername();
  }
  get userName() {
    return localStorage.getItem('userName');
  }
  prepareWaveUserName () {
    this.waveUsername = this.userName!.split('');
  }
  // typeUsername() {
  //   let i = 0;
  //   this.animatedUsername = '';
  //   const interval = setInterval(() => {
  //     if (i < this.userName!.length) {
  //       this.animatedUsername += this.userName![i];
  //       i++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, this.typingSpeed);
  // }
}
