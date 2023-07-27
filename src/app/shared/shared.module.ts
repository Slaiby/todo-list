import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdPartiesModule } from './modules/third-parties.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { FilterTodoPipe } from './pipes/filter-todo.pipe';
import { SearchByName } from './pipes/search-todo.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [FilterTodoPipe, SearchByName, LoaderComponent],
  imports: [CommonModule, ThirdPartiesModule],
  exports: [ThirdPartiesModule, FilterTodoPipe, SearchByName, LoaderComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true,
        },
      ],
    };
  }
}
