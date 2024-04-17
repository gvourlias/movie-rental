import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { IAuthService } from '@services';
import { AUTH_SERVICE_TOKEN } from '@injectionTokens';
import { AuthFacade } from '@facade';

@NgModule({})
export class SharedDomainModule {
  /**
   * On a big project, you may want to run the project in a kind of mock mode,
   * where each service instead of making actual calls to the server, it mocks those calls.
   *
   * I use this pattern in my projects to mock those calls and develop features faster.
   * @param serviceTypeAuth
   * @returns
   */
  static configure(
    serviceTypeAuth: Type<IAuthService>
  ): ModuleWithProviders<SharedDomainModule> {
    return {
      ngModule: SharedDomainModule,
      providers: [
        AuthFacade,
        { provide: AUTH_SERVICE_TOKEN, useClass: serviceTypeAuth },
      ],
    };
  }
}
