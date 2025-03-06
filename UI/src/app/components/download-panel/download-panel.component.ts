import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-download-panel',
  imports: [MatExpansionModule],
  templateUrl: './download-panel.component.html',
  styleUrl: './download-panel.component.scss',
  standalone: true
})
export class DownloadPanelComponent implements OnInit {


  readonly panelOpenState = signal(false);

  download(format: "csv" | "pdf"): void {
    // export data in the selected format
  }


  ngOnInit(): void {

  }
}
