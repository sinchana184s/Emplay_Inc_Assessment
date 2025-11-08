import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Card, card_update_schema, cards_schema } from '../models/card';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly cards_subject = new BehaviorSubject<Card[]>([]);
  readonly cards_stream$ = this.cards_subject.asObservable();
  private readonly storage_key = 'card_manager.cards';

  constructor(private readonly http_client: HttpClient, @Inject(PLATFORM_ID) private readonly platform_id: object) {
    void this.load_cards();
  }

  async load_cards(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http_client.get<unknown>('/data/cards.json'));
      const parsed_cards = cards_schema.parse(response);
      const hydrated_cards = this.restore_cards(parsed_cards);
      this.cards_subject.next(hydrated_cards);
    } catch (error) {
      console.error('Failed to load cards.', error);
    }
  }

  async update_card_description(card_id: number, updated_description: string): Promise<void> {
    try {
      const validated_payload = card_update_schema.parse({ card_id, updated_description });
      const current_cards = this.cards_subject.getValue();
      const updated_cards = current_cards.map((card) =>
        card.id === validated_payload.card_id
          ? { ...card, card_description: validated_payload.updated_description }
          : card
      );
      this.cards_subject.next(updated_cards);
      this.persist_cards(updated_cards);
    } catch (error) {
      console.error('Failed to update card description.', error);
    }
  }

  private restore_cards(default_cards: Card[]): Card[] {
    if (!this.is_browser()) {
      return default_cards;
    }

    try {
      const stored_snapshot = window.sessionStorage.getItem(this.storage_key);
      if (!stored_snapshot) {
        this.persist_cards(default_cards);
        return default_cards;
      }

      const parsed_snapshot = JSON.parse(stored_snapshot) as unknown;
      const validated_snapshot = cards_schema.parse(parsed_snapshot);
      return validated_snapshot;
    } catch (error) {
      console.warn('Discarding corrupted card snapshot from sessionStorage.', error);
      this.clear_storage();
      this.persist_cards(default_cards);
      return default_cards;
    }
  }

  private persist_cards(cards: Card[]): void {
    if (!this.is_browser()) {
      return;
    }

    try {
      window.sessionStorage.setItem(this.storage_key, JSON.stringify(cards));
    } catch (error) {
      console.error('Unable to persist cards into sessionStorage.', error);
    }
  }

  private clear_storage(): void {
    if (!this.is_browser()) {
      return;
    }

    try {
      window.sessionStorage.removeItem(this.storage_key);
    } catch (error) {
      console.error('Unable to clear stored cards snapshot.', error);
    }
  }

  private is_browser(): boolean {
    return isPlatformBrowser(this.platform_id);
  }
}

