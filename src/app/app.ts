

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';
Chart.register(...registerables);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})
export class AppComponent {

  // GST
  amount = 0;
  gstPercent = 18;

  gstAmount = 0;
  totalAmount = 0;

  // EMI
  loanAmount = 0;
  interestRate = 8;
  tenure = 5;

  emi = 0;
  totalInterest = 0;
  totalPayment = 0;
emiChart: Chart | undefined;

@ViewChild('emiPieChart')
emiPieChart!: ElementRef<HTMLCanvasElement>;
//for pichart 
createPieChart(principal: number, interest: number) {

  const canvas = document.getElementById('emiPieChart') as HTMLCanvasElement;

  if (!canvas) {
    console.log('Canvas not found');
    return;
  }

  if (this.emiChart) {
    this.emiChart.destroy();
  }

  this.emiChart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Principal Amount', 'Interest Amount'],
      datasets: [{
        data: [principal, interest]
      }]
    },
    options: {
      responsive: true
    }
  });
}

  calculateGST() {
    const principal = this.amount;
    this.gstAmount = (this.amount * this.gstPercent) / 100;
    this.totalAmount = this.amount + this.gstAmount;


    this.gstAmount = this.gstAmount;
this.totalAmount = this.totalAmount;
//this.totalInterest = this.totalPayment - principal;

    setTimeout(() => {
      this.createPieChart(
        principal,
        this.gstAmount
      );
    }, 0);
  }

  calculateEMI() {

    const principal = this.loanAmount;
    const monthlyRate = this.interestRate / 12 / 100;
    const months = this.tenure * 12;

    if (principal <= 0 || months <= 0) {
      return;
    }

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    this.emi = emi;
    this.totalPayment = emi * months;
    this.totalInterest = this.totalPayment - principal;

    this.createPieChart(
  principal,
  this.totalInterest
);
this.emi = emi;
this.totalPayment = emi * months;
this.totalInterest = this.totalPayment - principal;

    setTimeout(() => {
      this.createPieChart(
        principal,
        this.totalInterest
      );
    }, 0);
  }

  isDarkMode = false;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
}

selectedCalculator: 'gst' | 'emi' = 'gst';

showCalculator(type: 'gst' | 'emi') {
  this.selectedCalculator = type;
}
}