import { Component, OnInit, Input } from "@angular/core";
import { ErrorType } from "src/app/enums/errorType.enum";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent {
  @Input() message: string;
  @Input() type: ErrorType;

  public inputError = ErrorType["INPUT-ERROR"];
  public generalError = ErrorType["GENERAL-ERROR"];
}
