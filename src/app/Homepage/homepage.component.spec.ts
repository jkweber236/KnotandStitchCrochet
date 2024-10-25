import { TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'knotandstitchcrochet' title`, () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('knotandstitchcrochet');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, knotandstitchcrochet',
    );
  });
});
