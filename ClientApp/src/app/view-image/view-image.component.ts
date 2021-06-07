import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  url: any;

  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.url = this.route.snapshot.paramMap.get("name");
   

   
  }

  ngOnInit() {
  }
  
  cancel() {

    this.router.navigate(["/Products"]);
  }

}
