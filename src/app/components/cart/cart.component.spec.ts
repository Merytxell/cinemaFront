import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ShowTime } from 'src/app/model/showTimes.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CartComponent ],
      
      providers: [
        {provide : AuthService, useValue : jasmine.createSpyObj('CartService', ['getTotalPrice'])},
        {provide : ApiService,  useValue : jasmine.createSpyObj('AuthService', ['isUser'])}
      ]
    })
    .compileComponents();



  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total price', () => {
    const showTime1: ShowTime = { id: 1, movie: {} as any, hour: '', price: 10, quantity: 2 };
    const showTime2: ShowTime = { id: 2, movie: {} as any, hour: '', price: 20, quantity: 1 };
    component.cart.set(showTime1.id, showTime1);
    component.cart.set(showTime2.id, showTime2);
    const totalPrice = component.getTotalPrice();
    expect(totalPrice).toBe(40);
});

});
