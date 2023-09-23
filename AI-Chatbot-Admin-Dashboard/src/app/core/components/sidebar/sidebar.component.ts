import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  ngOnInit(): void {}
}
