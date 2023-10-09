import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiophileComponent } from './audiophile.component';

describe('AudiophileComponent', () => {
  let component: AudiophileComponent;
  let fixture: ComponentFixture<AudiophileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiophileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiophileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
