import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { ProductModal } from "src/app/modals/product.modal";
import { ErrorType } from "src/app/enums/errorType.enum";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { of } from "rxjs";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnChanges {
  @Output() saveProduct: EventEmitter<ProductModal> = new EventEmitter();
  @Input() selectedProduct: ProductModal;
  @Input() products: ProductModal[];

  public errorType = ErrorType["INPUT-ERROR"];

  productForm: FormGroup;
  public nameError: string;
  public priceError: string;
  public creationDateError: string;
  public idError: string;
  public thumbnailUrlError: string;
  public urlError: string;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [
        this.selectedProduct ? this.selectedProduct.name : "",
        Validators.required
      ],
      description: "",
      price: [null, Validators.required, this.ValidPrice],
      id: [null, Validators.required, this.UnicId],
      creationDate: [null, Validators.required],
      thumbnailUrl: "",
      url: ""
    });
  }

  ngOnChanges() {
    this.resetErrors();
    this.productForm.setValue({
      name: this.selectedProduct ? this.selectedProduct.name : null,
      description: this.selectedProduct
        ? this.selectedProduct.description
        : null,
      price: this.selectedProduct ? this.selectedProduct.price : null,
      id: this.selectedProduct ? this.selectedProduct.id : null,
      creationDate: this.selectedProduct
        ? new Date(this.selectedProduct.creationDate)
            .toISOString()
            .split("T")[0]
        : null,
      thumbnailUrl: this.selectedProduct
        ? this.selectedProduct.thumbnailUrl
        : null,
      url: this.selectedProduct ? this.selectedProduct.url : null
    });
  }

  public onNameChange(control: FormControl) {
    if (control.dirty && control.errors && control.errors.required) {
      this.nameError = "Please enter name";
    } else {
      this.nameError = null;
    }
  }

  public onPriceChange(control: FormControl) {
    if (control.dirty && control.errors) {
      if (control.errors.required) {
        this.priceError = "Please enter price";
      }
      if (control.errors.validPrice) {
        this.priceError = "Price must be greater than 0";
      }
    } else {
      this.priceError = null;
    }
  }

  public onCreationDateChange(control: AbstractControl) {
    if (control.dirty && control.errors && control.errors.required) {
      this.creationDateError = "Please enter Date";
    } else {
      this.creationDateError = null;
    }
  }

  public onidChange(control: AbstractControl) {
    if (control.dirty && control.errors) {
      if (control.errors.required) {
        this.idError = "Please enter ID";
      }
      if (control.errors.unicId) {
        this.idError = "ID in use";
      }
    } else {
      this.idError = null;
    }
  }

  public onFormSbmit() {
    this.saveProduct.emit(this.productForm.value);
  }

  private resetErrors() {
    this.nameError = null;
    this.priceError = null;
    this.creationDateError = null;
    this.idError = null;
    this.thumbnailUrlError = null;
    this.urlError = null;
  }

  private UnicId = (control: AbstractControl) =>
    this.products &&
    !this.products.find(
      product =>
        +product.id === +control.value && this.selectedProduct.id !== product.id
    )
      ? of(null)
      : of({ unicId: true });

  private ValidPrice = (control: AbstractControl) => {
    return /^[1-9]+[0-9]*$/.test(control.value)
      ? of(null)
      : of({ validPrice: true });
  };
}
