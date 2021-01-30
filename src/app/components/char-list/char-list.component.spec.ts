import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharListComponent } from './char-list.component';

describe('CharListComponent', () => {
  let component: CharListComponent;
  let fixture: ComponentFixture<CharListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
