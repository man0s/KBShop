import { TestBed, async } from '@angular/core/testing';
import { EShopComponent } from './eshop.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EShopComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EShopComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FE'`, () => {
    const fixture = TestBed.createComponent(EShopComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FE');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(EShopComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('FE app is running!');
  });
});
