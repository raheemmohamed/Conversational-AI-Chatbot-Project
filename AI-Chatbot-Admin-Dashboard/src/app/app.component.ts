import { Component, OnInit } from '@angular/core';
import { LoadingMaskService } from './shared/services/loading-mask.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AI-chatbot-dashboard';
  showMaskSpinner: boolean = false;
  constructor(private maskService: LoadingMaskService) {}

  ngOnInit(): void {
    this.maskService
      .listenMaskChanges()
      .pipe(delay(100))
      .subscribe((res: any) => {
        console.log('Show mask', res);
        this.showMaskSpinner = res.status;
      });
  }
}
