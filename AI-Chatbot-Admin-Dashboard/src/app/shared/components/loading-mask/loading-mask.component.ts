import { Component, Input, OnInit } from '@angular/core';
import { LoadingMaskService } from '../../services/loading-mask.service';

@Component({
  selector: 'app-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.scss'],
})
export class LoadingMaskComponent implements OnInit {
  @Input() showMaskSpinner: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
