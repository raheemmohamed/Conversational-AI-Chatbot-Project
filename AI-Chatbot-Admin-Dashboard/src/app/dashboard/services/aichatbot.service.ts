import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AichatbotService {
  readonly apiURL = environment.apiEndpointURL;

  constructor(private http: HttpClient) {}

  getAllCompanies() {}

  uploadAndTrainModel() {}

  uploadKnowledgeBaseTxt(payload: any) {
    const knowledgeUploadAPI =
      this.apiURL + '/api/v1/organization/uploadKnwoledge';
    return this.http.post(knowledgeUploadAPI, payload);
  }

  addNewOrganization(payload: any) {
    const addNewOrganizationAPI =
      this.apiURL + '/api/v1/organization/addNewOrganization';

    return this.http.post(addNewOrganizationAPI, payload);
  }

  getAllOrganizations() {
    const getAllOrganizationAPI =
      this.apiURL + '/api/v1/organization/getAllOrganizations';
    return this.http
      .get(getAllOrganizationAPI)
      .pipe(map((res: any) => res.response));
  }

  addNewTrainingModel(payload: any) {
    const addNewTrainingModel =
      this.apiURL + '/api/v1/organization/addNewTrainingModel';

    return this.http.post(addNewTrainingModel, payload);
  }

  getAllTrainedModelList() {
    const getAllTrainedModelListAPI =
      this.apiURL + '/api/v1/organization/getAllTrainedList';
    return this.http
      .get(getAllTrainedModelListAPI)
      .pipe(map((res: any) => res.response));
  }
}
