import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExchangeComponent } from './file-exchange.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeComponent;
  let fixture: ComponentFixture<FileExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
