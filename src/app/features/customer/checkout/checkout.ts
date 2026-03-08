import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  checkoutFormGroup!: FormGroup;

  orderItems: OrderItem[] = [
    { name: 'T‑shirt', quantity: 2, price: 19.99 },
    { name: 'Sneakers', quantity: 1, price: 79.99 },
  ];

  get orderTotal(): number {
    return this.orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      billingAddress: this.formBuilder.group({
        sameAsShipping: [true],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', Validators.required],
        nameOnCard: ['', Validators.required],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{16}$/)],
        ],
        securityCode: [
          '',
          [Validators.required, Validators.pattern(/^\d{3,4}$/)],
        ],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
      }),
    });

    const sameAsShippingControl = this.checkoutFormGroup.get('billingAddress.sameAsShipping');

    // Değişimleri dinle
    sameAsShippingControl?.valueChanges.subscribe((same: boolean) => {
      this.updateBillingAddress(same);
    });

    // Sayfa yüklendiğinde varsayılan (true) durumu için tetikle
    this.updateBillingAddress(sameAsShippingControl?.value);
  }

  updateBillingAddress(same: boolean) {
    const billing = this.checkoutFormGroup.get('billingAddress')!;
    if (same) {
      billing.patchValue(this.checkoutFormGroup.get('shippingAddress')!.value);
      billing.disable();
    } else {
      billing.enable();
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      alert('Lütfen formu kontrol edin. Eksik veya hatalı bir alan var (Örn: Kart numarası boşluksuz 16 hane olmalı).');
      return;
    }

    console.log('form value', this.checkoutFormGroup.value);
    console.log('order total', this.orderTotal);

    // Satın alma işlemi başarılı olduğunda kullanıcıya göster ve formu temizle
    alert('Sipariş başarıyla tamamlandı!');
    this.checkoutFormGroup.reset();
  }
}
