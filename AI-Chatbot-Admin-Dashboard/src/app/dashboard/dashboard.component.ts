import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { LayoutService } from '../core/services/app.layout.service';
import { AichatbotService } from './services/aichatbot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { FileUpload } from 'primeng/fileupload';
import { LoadingMaskService } from '../shared/services/loading-mask.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  display: boolean = false;

  filteredOrganizations: any[] = [];

  uploadedFiles: any[] = [];

  AddNewModelForm!: FormGroup;

  valRadio = '';

  organizations: any[] = [];

  trainedModelsList: any[] = [];

  @ViewChild('fileUpload', { static: true })
  fileupload!: FileUpload;

  constructor(
    public layoutService: LayoutService,
    private aiChatService: AichatbotService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private clipboard: Clipboard,
    private maskService: LoadingMaskService
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.getAllOrganizations();
    this.getAllTrainedModelList();
  }

  initializeForm() {
    this.AddNewModelForm = this.formBuilder.group({
      organization: ['', [Validators.required]],
      url: ['', [Validators.required]],
    });
  }

  getAllOrganizations() {
    this.maskService.showMask(true);
    this.aiChatService.getAllOrganizations().subscribe({
      next: (res: any) => {
        console.log('Organization List', res);
        this.organizations = res.data;

        this.maskService.showMask();
      },
      error: (error: any) => {
        console.error('Failed', error);
        this.maskService.showMask();
      },
    });
  }

  getAllTrainedModelList() {
    this.maskService.showMask(true);

    this.aiChatService.getAllTrainedModelList().subscribe({
      next: (res: any) => {
        console.log('getAllTrainedModelList', res);
        this.trainedModelsList = res.data;
        this.maskService.showMask();
      },
      error: (error: any) => {
        console.error('Failed', error);
        this.maskService.showMask();
      },
    });
  }
  saveForm() {
    this.maskService.showMask(true);

    const payload = {
      ...this.AddNewModelForm.value,
      organization: {
        isActive: this.AddNewModelForm.value.organization.isActive,
        organizationName:
          this.AddNewModelForm.value.organization.organizationName,
        organizationId: this.AddNewModelForm.value.organization._id,
      },
    };

    console.log('this is my form', payload);

    this.aiChatService.addNewTrainingModel(payload).subscribe({
      next: (res: any) => {
        this.display = false;
        this.getAllTrainedModelList();
        this.AddNewModelForm.reset();
        this.uploadedFiles = [];
        console.log('Save New model', res);
        this.maskService.showMask();
      },
      error: (error: any) => {
        console.log('Failed', error);
        this.maskService.showMask();
      },
    });
  }

  filterOrganization(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.organizations.length; i++) {
      const organization = this.organizations[i];
      if (
        organization.organizationName
          .toLowerCase()
          .indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(organization);
      }
    }

    this.filteredOrganizations = filtered;
  }

  onUpload(event: any) {
    this.maskService.showMask(true);
    for (const file of event.files) {
      file.icon = 'assets/icons/txt.png';
      this.uploadedFiles.push(file);
    }
    console.log('uploaded File', this.uploadedFiles);

    const formData = new FormData();
    formData.append('file', this.uploadedFiles[0]);

    this.aiChatService.uploadKnowledgeBaseTxt(formData).subscribe({
      next: (res: any) => {
        console.log('Success', res);
        this.AddNewModelForm.get('url')?.setValue(res.data.url);
        console.log('this.AddNewModelForm', this.AddNewModelForm);

        this.maskService.showMask();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'File Uploaded Successfully',
        });
      },
      error: (error: any) => {
        console.error('Error', error);
        this.maskService.showMask();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File Upload Failed' + error.message,
        });
      },
    });
  }

  copyToClipboard(data: any): void {
    const successful = this.clipboard.copy(data);

    if (successful) {
      this.messageService.add({
        severity: 'info',
        summary: 'Copied',
      });
    }
  }

  fileOnSelect(event: any) {
    console.log('im file onselect', event);
    console.log('im fileupload classs from viewchild', this.fileupload);

    console.log('im content', this.fileupload.content.nativeElement);

    setTimeout(() => {
      const firstDiv = this.fileupload.content.nativeElement.querySelector(
        '.p-fileupload-row div:first-child'
      );

      const imgElement = document.createElement('img');
      imgElement.src = 'assets/icons/txt.png';
      imgElement.style.width = '70%';
      imgElement.style.height = '70%';
      firstDiv.appendChild(imgElement);
    });

    // const files = this.fileupload.files.forEach((res: any) => {
    //   res.objectURL = 'assets/icons/txt.png';
    // });

    this.fileupload.cd.markForCheck();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
