import { ChartService } from './../../services/ChartService.service';
import { Component, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-download-panel',
  imports: [MatExpansionModule],
  templateUrl: './download-panel.component.html',
  styleUrl: './download-panel.component.scss',
  standalone: true
})
export class DownloadPanelComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  readonly panelOpenState = signal(false);

  downloadPdf(): void {
    console.log(this.chartService.chartCanvas);

    if (this.chartService.chartCanvas) {
      const canvas = this.chartService.chartCanvas;

      const scaleFactor = 0.55;
      const width = canvas.width * scaleFactor;
      const height = canvas.height * scaleFactor;

      // Create a PDF with dimensions matching the canvas
      const pdf = new jsPDF('l', 'px', [width + 27, height + 20]);

      // Add the image to the PDF, scaled down
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, width, height);

      // Save the PDF
      pdf.save('chart.pdf');
    }
    else {
      console.error('Chart canvas is not found');
    }
  }


  ngOnInit(): void {

  }
}
