import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ShowTime } from 'src/app/model/showTimes.model';
import { CartService } from 'src/app/services/cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
 
    cartService = jasmine.createSpyObj('CartService', ['getTotalPrice', 'addShowTime', 'getCart']);

    cartService.getCart.and.returnValue(new Map<number, ShowTime>());

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: ApiService, useValue: jasmine.createSpyObj('AuthService', ['isUser']) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

   
    component.cart = cartService.getCart();

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

  it('should add a show time', () => {
    const showTime1: ShowTime = { id: 1, movie: {} as any, hour: '', price: 10, quantity: 1 };
    component.addShowTime(showTime1);
    expect(cartService.addShowTime).toHaveBeenCalledWith(showTime1);
    expect(cartService.getCart).toHaveBeenCalled();
  });
});
