

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  calculateGST() {
    this.gstAmount = (this.amount * this.gstPercent) / 100;
    this.totalAmount = this.amount + this.gstAmount;
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
  }

  isDarkMode = false;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
}
}