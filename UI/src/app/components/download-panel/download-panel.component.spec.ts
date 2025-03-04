import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPanelComponent } from './download-panel.component';

describe('DownloadPanelComponent', () => {
  let component: DownloadPanelComponent;
  let fixture: ComponentFixture<DownloadPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
