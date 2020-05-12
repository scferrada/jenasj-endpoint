import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
  toasttxt: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  base_url = "http://localhost:4200"
  share_url = this.base_url+this.router.url;

  copy(url: string){
    if ((navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(url);
    } else if ((window as any).clipboardData) {
      (window as any).clipboardData.setData('url', url);
    } else {
      this.toasttxt = "could not copy URL";
      return;
    }
    this.toasttxt = "copied to clipboard!";
  }

}
