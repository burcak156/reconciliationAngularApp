import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconInfoComponent } from './recon-info.component';

describe('ReconInfoComponent', () => {
  let component: ReconInfoComponent;
  let fixture: ComponentFixture<ReconInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
