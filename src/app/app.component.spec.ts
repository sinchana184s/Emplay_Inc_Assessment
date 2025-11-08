import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { CardService } from './services/card.service';
import { Card } from './models/card';

class CardServiceStub {
  private readonly cards_subject = new BehaviorSubject<Card[]>([
    { id: 1, card_title: 'Stub Card', card_description: 'Stub description' }
  ]);

  readonly cards_stream$ = this.cards_subject.asObservable();

  update_card_description = jasmine.createSpy('update_card_description');
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: CardService, useClass: CardServiceStub }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the card title from the stream', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card__title')?.textContent).toContain('Stub Card');
  });
});
