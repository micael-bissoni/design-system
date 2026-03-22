import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ds-clipboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './clipboard.component.html',
})
export class ClipboardComponent {
  @Input() content: string = '';
  @Output() contentCopied = new EventEmitter<string>();

  showOverlay = true;

  onMouseOver() {
    this.showOverlay = true;
  }

  onMouseOut() {
    this.showOverlay = false;
  }

  onCopy() {
    navigator.clipboard.writeText(this.content);
    this.contentCopied.emit(this.content)
  }
}
