import { Component, OnInit } from '@angular/core';
import { DroneService } from '../../shared/drone/drone.service';

@Component({
  selector: 'app-deployments-count',
  templateUrl: './deployments-count.component.html',
  styleUrls: ['./deployments-count.component.scss']
})
export class DeploymentsCountComponent implements OnInit {

  count = 0;
  counto = 0;

  constructor(private droneService: DroneService) {
  }

  ngOnInit() {
    this.droneService.getDeploymentsCount().first()
      .map(response => response.counter)
      .subscribe(count => this.count = +count);
  }

}
