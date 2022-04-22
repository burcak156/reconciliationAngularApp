import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reconciliation } from '../reconciliation';
import { ReconciliationService } from '../reconciliation.service';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-recon-info',
  templateUrl: './recon-info.component.html',
  styleUrls: ['./recon-info.component.css']
})
export class ReconInfoComponent implements OnInit {

  id: number;
  token: string;
  gwtoken: string;
  gwflag: string;
  recon: Reconciliation;
  ImgUrl: string;
  public edited = true;
  public pageExpired = false;

  closeResult: string;
  // router: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reconService: ReconciliationService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      this.gwtoken = params['gwtoken'];
      this.gwflag = params['gwflag'];
       console.log("apigw:" + this.gwtoken);
    });


    this.recon = new Reconciliation();
    this.reconService.getReconById(this.id, this.token, this.gwtoken, this.gwflag).subscribe(data => {
      this.recon = data;
      if (this.recon.balance > 0) {
        this.recon.balanceType = 'Borç';
      }
      else {
        this.recon.balanceType = 'Alacak';
      }
      this.recon.balance = Math.abs(this.recon.balance);
      this.ImgUrl = 'data:image/jpeg;base64,' + this.recon.captchaImg;
    }, (error: HttpErrorResponse) => {
      this.edited = false;
      this.pageExpired=true;
    });

  

  }
  onSubmit() {

    if (this.recon.inBalance == null || this.recon.inBalanceType == null) {
      alert("Lütfen tüm alanları Doldurunuz.");
    }else if (this.recon.captchaText == null || this.recon.captchaText == "") {
      alert("Lütfen güvenlik kodunu doldurunuz.");
    }
    else {
      this.reconService.updateRecon(this.id, this.token, this.gwtoken, this.gwflag, this.recon).subscribe(data => {
        this.goToEmployeeList();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  goToEmployeeList() {
    alert("Mutabakat Başarıyla Onaylandı !");
    this.edited = false;
    this.router.navigate(['/']);
  }


}
