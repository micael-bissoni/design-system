import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Subscription, timer } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ds-clipboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './clipboard.component.html',
})
export class ClipboardComponent implements OnDestroy {
  @Input() content: string = '';
  @Output() contentCopied = new EventEmitter<string>();

  copied = false;

  sub?: Subscription;

  onCopy() {
    navigator.clipboard.writeText(this.content);
    this.contentCopied.emit(this.content)
    this.copied = true;
    this.sub = timer(3000).subscribe(() => {
      this.copied = false;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
