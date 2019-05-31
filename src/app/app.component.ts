import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee, faSave, faTrashAlt, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo-ui';

  public form: FormGroup;
  public activityList: FormArray;
  public applicationList: any;
  public timeList: any = [];
  public acivityList: any;
  public faPlus = faPlus;
  public faSave = faSave;
  public faTrashAlt = faTrashAlt;
  public faSearch = faSearch;
  public isSearch: boolean = false;
  public activitiesList: any;
  public selectedApplication: any;
  public selectedTime: any = [];

  get activityFormGroup() {
    return this.form.get('activities') as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      psid: [null, Validators.compose([Validators.required])],
      application: [null],
      date: [null],
      activities: this.formBuilder.array([this.createActivities()])
    });

    this.activityList = this.form.get('activities') as FormArray;

    this.loadAplication();
    this.loadTime();
  }

  private loadAplication() {
    this.activityService.getRequest('application/list').subscribe(data => {
      this.applicationList = data;
      console.info('Applications: ' + this.applicationList);
      this.selectedApplication = 0;
    }, error => {

    });
  }

  private loadTime() {
    for (let i = 1; i <= 8; i++) {
      this.timeList.push(i);
    }
  }

  public onChangePSID(psid): void {
    console.log('psid : ' + psid)
    let body = {
      "role": { "id": 6 }
    }
    this.activityService.postRequest('activity/searchByRoleId', body).subscribe(data => {
      console.log("acivityList: " + JSON.stringify(data))
      this.acivityList = data;
    }, error => {

    });
  }

  public createActivities(): FormGroup {
    return this.formBuilder.group({
      activity: [null],
      desc: [null],
      time: [null]
    });
  }

  public addActivities(): void {
    this.activityList.push(this.createActivities());
  }

  public removeActivity(index): void {
    this.activityList.removeAt(index);
  }

  public onChangeApplication(): void {

  }

  public onChangeActivities(index): void {

  }

  public onChangeTime(index): void {

  }

  public editActivity(): void {

  }

  public searchActivities(): void {
    this.isSearch = true;
    let body = {
      "psid": this.form.value.psid,
      "effortSpendDate": this.form.value.date
    }

    this.activityService.postRequest('daily_activity/searchByPSIDAndDate1', body).subscribe(data => {
      console.log("DATA: " + JSON.stringify(data))
      this.activitiesList = data;
      this.selectedApplication = this.activitiesList[0].application.id; 
      console.log("activitiesList :" + this.activitiesList.length)
      for(let i=0; i<this.activitiesList.length; i++) {
        this.selectedTime.push(this.activitiesList[i].effortSpendTime);
      }
    }, error => {

    })
  }

  public submit(index): void {
    console.log('SAVE')
    console.log(this.form.value);
    let body = {
      'id': this.activitiesList[index].id,
      'psid': this.form.value.psid,
      'application': { 'id': this.form.value.application },
      'activity': { 'id': this.form.value.activities[index].activity },
      'activityDesc': this.form.value.activities[index].desc,
      'effortSpendTime': this.form.value.activities[index].time,
      'effortSpendDate': this.form.value.date,
      'effortEntryDate': new Date()
    };
    if (this.isSearch) {
      if (body.activity.id == null) {
        body.activity.id = this.activitiesList[index].activity.id
      }
      if (body.activityDesc == null) {
        body.activityDesc = this.activitiesList[index].activityDesc
      }
      if (body.effortSpendTime == null) {
        body.effortSpendTime = this.activitiesList[index].effortSpendTime
      }
      this.activityService.putRequest('daily_activity', body).subscribe(data => {
      }, error => {

      })
    } else {
      this.activityService.postRequest('daily_activity', body).subscribe(data => {
      }, error => {

      })
    }
  }

  ngOnDestroy(): void {

  }

}
