import { InjectionToken } from "@angular/core";
import { IAuthService } from "./services/auth";

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('AuthService');

