import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CardService } from './services/card.service';
import { Card } from './models/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly cards_stream$: Observable<Card[]>;
  readonly is_modal_open = signal<boolean>(false);
  readonly is_saving = signal<boolean>(false);
  readonly edit_form: FormGroup<{ card_description: FormControl<string> }>;
  
  selected_card: Card | null = null;

  constructor(
    private readonly card_service: CardService,
    private readonly form_builder: NonNullableFormBuilder
  ) {
    this.cards_stream$ = this.card_service.cards_stream$;
    this.edit_form = this.form_builder.group({
      card_description: this.form_builder.control('', [
        Validators.required,
        Validators.minLength(1),
        this.no_whitespace_validator
      ])
    });
  }

  private no_whitespace_validator(control: FormControl<string>): { [key: string]: boolean } | null {
    const is_whitespace = (control.value || '').trim().length === 0;
    return is_whitespace ? { whitespace: true } : null;
  }

  open_modal(card: Card): void {
    this.selected_card = card;
    this.edit_form.patchValue({ card_description: card.card_description });
    this.is_modal_open.set(true);
    this.is_saving.set(false);
  }

  close_modal(): void {
    this.edit_form.reset({ card_description: '' });
    this.selected_card = null;
    this.is_modal_open.set(false);
    this.is_saving.set(false);
  }

  async save_description(): Promise<void> {
    if (!this.selected_card || this.edit_form.invalid || this.is_saving()) {
      if (this.edit_form.invalid) {
        this.edit_form.markAllAsTouched();
      }
      return;
    }

    this.is_saving.set(true);

    try {
      const { card_description } = this.edit_form.getRawValue();
      const trimmed_description = card_description.trim();
      
      await this.card_service.update_card_description(
        this.selected_card.id,
        trimmed_description
      );
      
      this.is_saving.set(false);
      this.close_modal();
    } catch (error) {
      console.error('Failed to save description:', error);
      this.is_saving.set(false);
    }
  }

  open_add_modal(): void {
    this.selected_card = null;
    this.edit_form.reset({ card_description: '' });
    this.is_modal_open.set(true);
    this.is_saving.set(false);
  }

  async delete_card(card: Card): Promise<void> {
    if (confirm(`Are you sure you want to delete "${card.card_title}"?`)) {
      try {
        console.log('Delete card:', card.id);
      } catch (error) {
        console.error('Failed to delete card:', error);
      }
    }
  }

  track_card(card_index: number, card: Card): number {
    return card.id;
  }
}