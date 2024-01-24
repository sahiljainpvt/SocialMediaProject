import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-unathorized-menu',
  templateUrl: './unathorized-menu.component.html',
  styleUrls: ['./unathorized-menu.component.scss'],
})
export class UnathorizedMenuComponent {
  @Input()
  unathorizedText!: string;
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClose() {
    document.body.style.overflow = 'auto';
    this.closeMenu.emit(true);
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
