import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AichatbotService } from '../../services/aichatbot.service';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
import * as moment from 'moment';
import { LoadingMaskService } from 'src/app/shared/services/loading-mask.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  showAddNewOrganizationModel = false;
  organizationList: any = [];

  addNewOrganizationForm!: FormGroup;
  constructor(
    private aiChatService: AichatbotService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private clipboard: Clipboard,
    private maskService: LoadingMaskService
  ) {}

  ngOnInit(): void {
    this.initializeOrganizationForm();
    this.getAllOrganizations();
  }

  initializeOrganizationForm() {
    this.addNewOrganizationForm = this.formBuilder.group({
      organizationName: ['', [Validators.required]],
      organizationWebsite: [''],
      organizationEmail: [''],
      organizationPhone: [''],
      isActive: [true],
    });
  }

  copyToClipboard(data: any) {
    const successful = this.clipboard.copy(data);

    if (successful) {
      this.messageService.add({
        severity: 'info',
        summary: 'Copied',
      });
    }
  }

  getAllOrganizations() {
    this.maskService.showMask(true);
    this.aiChatService.getAllOrganizations().subscribe({
      next: (res: any) => {
        console.log('Organization List', res);

        const mappedData = res.data.map((res: any) => {
          res.createdAt = moment(res.createdAt).format(
            'MMMM Do YYYY, h:mm:ss a'
          );

          return res;
        });
        this.organizationList = mappedData;

        this.maskService.showMask();
      },
      error: (error: any) => {
        console.error('Failed', error);
        this.maskService.showMask();
      },
    });
  }

  saveOrganizationForm() {
    console.log('organization', this.addNewOrganizationForm.value);

    this.maskService.showMask(true);
    const payload = {
      ...this.addNewOrganizationForm.value,
    };

    this.aiChatService.addNewOrganization(payload).subscribe({
      next: (res: any) => {
        console.log('Organization success', res);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `New ${this.addNewOrganizationForm.value.organizationName} saved successfully`,
        });

        this.addNewOrganizationForm.reset();
        this.showAddNewOrganizationModel = false;

        this.getAllOrganizations();
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: `Oops! something went wrong`,
        });

        console.log('Failed', error);
      },
    });
  }
}
