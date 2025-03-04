import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-download-panel',
  imports: [MatExpansionModule],
  templateUrl: './download-panel.component.html',
  styleUrl: './download-panel.component.scss',
  standalone: true
})
export class DownloadPanelComponent {
  readonly panelOpenState = signal(false);
}
